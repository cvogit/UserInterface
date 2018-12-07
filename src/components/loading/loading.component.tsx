import * as React from 'react';
import { IState } from '../../reducers';
import { connect } from 'react-redux';

interface IStateProps {
  isLoading: boolean;
}

/**
 * The loading screen the user can enjoy while waiting for resoures
 */
export class Loading extends React.Component<IStateProps> {

  public render() {
    return (
      <>
        {
          this.props.isLoading &&
          <div id="loading-screen" >
            <img src={require('../../assets/LoadingLogo.gif')} alt="loading revature"/>
            {/* <img src={require('../../assets/LoadingCircle.gif')} alt="loading circle"/> */}
          </div>
        }
      </>
    );
  }
};

const mapStateToProps = (state: IState) => (state.loading)
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(Loading)