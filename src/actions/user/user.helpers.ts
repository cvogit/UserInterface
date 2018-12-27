import * as axiosClient from '../../axiosClients/axiosClient';
import * as awsCognito from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import * as userClient from '../../axiosClients/userClient/userClient';
import * as blakeClient from '../../axiosClients/blakeClient/blakeClient';
import { environment } from '../../environment';
import { userTypes } from './user.actions';
import { IUser } from 'src/model/User.model';
import { isLoading } from  '../loading/loading.actions';
import { History } from 'history';
import { managerTypes } from '../manager/manager.actions';
  
/**
 * Get current login user info from the server
 */
export const initUser = () => (dispatch) => {  
  userClient.getUserFromCognitoJwt()
  .then(response => {
    dispatch({
      payload: {
        user:  response.data as IUser
      },
      type: userTypes.USER_INIT
    });
  })
  .catch(error => {
    console.log(error)
  })

  // Reset token once every 50 minutes
  window.setInterval(
    () => refreshCognitoSession()(dispatch)
  , 3000000);
}

/**
 * Log the user in with cognito
 * @param username 
 * @param password 
 * @param history 
 */
export const cognitoLogin = (username: string, password: string, history: History) => (dispatch) => {
  const authenticationData = {
    Password: password,
    Username: username,
  };

  const authenticationDetails = new awsCognito.AuthenticationDetails(authenticationData);
  const poolData = {
    ClientId:   environment.cognitoClientId, 
    UserPoolId: environment.cognitoUserPoolId,
  };

  const userPool = new awsCognito.CognitoUserPool(poolData);
  const userData = {
    Pool:     userPool,
    Username: username,
  };

  const cognitoUser = new awsCognito.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    newPasswordRequired: (userAttributes, requiredAttributes) => {
      dispatch({
        payload: {
          cogUser: cognitoUser,
          isFirstSignin: true
        },
        type: userTypes.FIRST_SIGN_IN
      });
    },
    onFailure: (error) => {
      console.log(error);
    },
    onSuccess: (result: awsCognito.CognitoUserSession) => {
      const roles = result.getIdToken().payload['cognito:groups'];
      if(roles !== undefined) {
        getCognitoManagements()(dispatch);
      }
      
      // Set cognito jwt to header
      axiosClient.addCognitoToHeader(result.getIdToken().getJwtToken());

      dispatch({
        payload: {
          cogUser:  cognitoUser,
          isLogin: true,
          roles
        },
        type: userTypes.COGNITO_SIGN_IN
      });

      history.push("/dashboard/check-ins");

      initUser()(dispatch);

      // Reset token once every 50 minutes
      window.setInterval(
        () => refreshCognitoSession()(dispatch)
      , 3000000);
      }
  });
}

/**
 * Attempt to log user in automatically if the cognito user is still in local storage
 */
export const refreshCognitoSession = () => (dispatch) => {
  isLoading(true)(dispatch); 

  const cognitoUser = getCurrentCognitoUser();
  if (cognitoUser !== null) {

    // Get user session
    cognitoUser.getSession((getSessionError, session) => {
      if (getSessionError) {
        // console.log(getSessionError.message || JSON.stringify(getSessionError));
        isLoading(false)(dispatch); 
        return false;
      }
      if(session) {
        const roles = session.getIdToken().payload['cognito:groups'];
        if(roles !== undefined) {
          getCognitoManagements()(dispatch);
        }

        // Set redux cognito data
        dispatch({
          payload: {
            cogUser:  cognitoUser,
            isLogin: true,
            roles
          },
          type: userTypes.COGNITO_SIGN_IN
        });

        // Put jwt into axios client
        axiosClient.addCognitoToHeader(session.getIdToken().getJwtToken());
        console.log(session.getIdToken().getJwtToken())
        const refreshToken = session.getRefreshToken();
        const awsCreds: any = AWS.config.credentials;

        // Refresh session if needed
        if (awsCreds !== null && awsCreds.needsRefresh()) {
          cognitoUser.refreshSession(refreshToken, (refreshSessionError, refreshSession) => {
            if(refreshSessionError) {
              console.log(refreshSessionError);
            } 
            else {
              awsCreds.params.Logins[`cognito-idp.${environment.awsRegion}.amazonaws.com/${environment.cognitoUserPoolId}`]  = refreshSession.getIdToken().getJwtToken();
              awsCreds.refresh((refreshTokenError)=> {
                if(refreshTokenError)  {
                  console.log(refreshTokenError);
                  isLoading(false)(dispatch); 
                  return true;
                }
                else{
                  isLoading(false)(dispatch); 
                  return true;
                }
              });
            }
          });
        }
        isLoading(false)(dispatch); 
        return true;
      } else {
        isLoading(false)(dispatch); 
        return false;
      }
    });
  } else {
    isLoading(false)(dispatch); 
    return false;
  }
  isLoading(false)(dispatch); 
  return true;
}

/**
 * Return current cognito user from session
 */
export const getCurrentCognitoUser = () => {
  const poolData = {
    ClientId:   environment.cognitoClientId, 
    UserPoolId: environment.cognitoUserPoolId,
  };

  const userPool = new awsCognito.CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser();
  return cognitoUser;
}

export const getCognitoManagements = () => dispatch => {
  blakeClient.findUsersByRole('admin')
  .then(response => {
    const emailList = response.data.Users.map(user => {
      const length = user.Attributes.length;
      return user.Attributes[length - 1].Value;
    })

    const userList = emailList.map(email => {
      return userClient.getUserByEmail(email)
        .then(userResponse => {
          return userResponse.data as IUser;
        })
    })

    Promise.all(userList)
      .then(list => {
        const admins = list.filter( (el) => {
          return el !== "";
        });
        dispatch({
          payload: {
            admins
          },
          type: managerTypes.SET_ADMINS
        })
      })
      .catch(error => {
        console.log(error)
      })
  })
  .catch(error => {
    console.log(error)
  })

  blakeClient.findUsersByRole('staging-manager')  
  .then(response => {
    const emailList = response.data.Users.map(user => {
      const length = user.Attributes.length;
      return user.Attributes[length - 1].Value;
    })

    const userList = emailList.map(email => {
      return userClient.getUserByEmail(email)
        .then(userResponse => {
          return userResponse.data as IUser;
        })
    })

    Promise.all(userList)
      .then(list => {
        const stagings = list.filter( (el) => {
          return el !== "";
        });
        dispatch({
          payload: {
            stagings
          },
          type: managerTypes.SET_STAGINGS
        })
      })
      .catch(error => {
        console.log(error)
      })
  })

  blakeClient.findUsersByRole('trainer')  
  .then(response => {
    const emailList = response.data.Users.map(user => {
      const length = user.Attributes.length;
      return user.Attributes[length - 1].Value;
    })

    const userList = emailList.map(email => {
      return userClient.getUserByEmail(email)
        .then(userResponse => {
          return userResponse.data as IUser;
        })
    })

    Promise.all(userList)
      .then(list => {
        const trainers = list.filter( (el) => {
          return el !== "";
        });
        dispatch({
          payload: {
            trainers
          },
          type: managerTypes.SET_TRAINERS
        })
      })
      .catch(error => {
        console.log(error)
      })
  })
}