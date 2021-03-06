import * as React from 'react';
import '../../include/bootstrap';
import '../../App.css';
import profSrc from "../../assets/interns.png"
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import * as userActions from '../../actions/user/user.actions';

/**
 * User Profile Component.
 */

interface IComponentProps {
   user: any
   roles: any[]
   updateUser: (user) => void
}
export class UserProfileComponent extends React.Component<IComponentProps, any>{

   constructor(props: any) {
      super(props);
      this.state = {
         city: '',
         email: '',
         firstname: '',
         lastname: '',
         newPassword: '',
         password: '',
         phoneNumber: '',
         role: '',
         selectState: '',
         selectTz: '',
         states: this.stateBuilder(),
         tzs: this.timeZoneBuilder(),
         userId: 0,
         userState: false,
         zipCode: ''
      }
   }



   public zipChange = (e) => {
      this.setState({
         ...this.state,
         zipCode: e.target.value
      })
   }

   public stateChange = (e) => {
      this.setState({
         ...this.state,
         selectState: e.target.value
      })
   }

   public cityChange = (e) => {
      this.setState({
         ...this.state,
         city: e.target.value
      })
   }

   public lastnameChange = (e) => {
      this.setState({
         ...this.state,
         lastname: e.target.value
      })
   }

   public firstnameChange = (e) => {
      this.setState({
         ...this.state,
         firstname: e.target.value
      })
   }

   public phoneChange = (e) => {
      this.setState({
         ...this.state,
         phoneNumber: e.target.value
      })
   }

   public tzChange = (e) => {
      this.setState({
         ...this.state,
         selectTz: e.target.value
      })
   }
   public submit = (e) => {
      e.preventDefault();
      const user = {
         city: this.state.city,
         email: this.props.user.email,
         firstName: this.state.firstName,
         lastName: this.state.lastName,
         phoneNumber: this.state.phoneNumber,
         state: this.state.selectState,
         timezone: this.state.selectTz,
         userId: this.props.user.userId,
         zipCode: this.state.zipCode,
      }
      this.props.updateUser(user);
   }



   public stateBuilder = () => {
      return <select id="sel1" onChange={e => this.stateChange(e)}>
         <option value="AL">Alabama</option>
         <option value="AK">Alaska</option>
         <option value="AZ">Arizona</option>
         <option value="AR">Arkansas</option>
         <option value="CA">California</option>
         <option value="CO">Colorado</option>
         <option value="CT">Connecticut</option>
         <option value="DE">Delaware</option>
         <option value="DC">District Of Columbia</option>
         <option value="FL">Florida</option>
         <option value="GA">Georgia</option>
         <option value="HI">Hawaii</option>
         <option value="ID">Idaho</option>
         <option value="IL">Illinois</option>
         <option value="IN">Indiana</option>
         <option value="IA">Iowa</option>
         <option value="KS">Kansas</option>
         <option value="KY">Kentucky</option>
         <option value="LA">Louisiana</option>
         <option value="ME">Maine</option>
         <option value="MD">Maryland</option>
         <option value="MA">Massachusetts</option>
         <option value="MI">Michigan</option>
         <option value="MN">Minnesota</option>
         <option value="MS">Mississippi</option>
         <option value="MO">Missouri</option>
         <option value="MT">Montana</option>
         <option value="NE">Nebraska</option>
         <option value="NV">Nevada</option>
         <option value="NH">New Hampshire</option>
         <option value="NJ">New Jersey</option>
         <option value="NM">New Mexico</option>
         <option value="NY">New York</option>
         <option value="NC">North Carolina</option>
         <option value="ND">North Dakota</option>
         <option value="OH">Ohio</option>
         <option value="OK">Oklahoma</option>
         <option value="OR">Oregon</option>
         <option value="PA">Pennsylvania</option>
         <option value="RI">Rhode Island</option>
         <option value="SC">South Carolina</option>
         <option value="SD">South Dakota</option>
         <option value="TN">Tennessee</option>
         <option value="TX">Texas</option>
         <option value="UT">Utah</option>
         <option value="VT">Vermont</option>
         <option value="VA">Virginia</option>
         <option value="WA">Washington</option>
         <option value="WV">West Virginia</option>
         <option value="WI">Wisconsin</option>
         <option value="WY">Wyoming</option>
      </select>
   }

   public timeZoneBuilder = () => {
      return <select id="sel2" onChange={e => this.tzChange(e)}>
         <option value="-12">(GMT-12:00) International Date Line West</option>
         <option value="-11">(GMT-11:00) Midway Island, Samoa</option>
         <option value="-10">(GMT-10:00) Hawaii</option>
         <option value="-9">(GMT-09:00) Alaska</option>
         <option value="-8">(GMT-08:00) Pacific Time (US & Canada)</option>
         <option value="-8">(GMT-08:00) Tijuana, Baja California</option>
         <option value="-7">(GMT-07:00) Arizona</option>
         <option value="-7">(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
         <option value="-7">(GMT-07:00) Mountain Time (US & Canada)</option>
         <option value="-6">(GMT-06:00) Central America</option>
         <option value="-6">(GMT-06:00) Central Time (US & Canada)</option>
         <option value="-6">(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
         <option value="-6">(GMT-06:00) Saskatchewan</option>
         <option value="-5">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
         <option value="-5">(GMT-05:00) Eastern Time (US & Canada)</option>
         <option value="-5">(GMT-05:00) Indiana (East)</option>
         <option value="-4">(GMT-04:00) Atlantic Time (Canada)</option>
         <option value="-4">(GMT-04:00) Caracas, La Paz</option>
         <option value="-4">(GMT-04:00) Manaus</option>
         <option value="-4">(GMT-04:00) Santiago</option>
         <option value="-3.5">(GMT-03:30) Newfoundland</option>
         <option value="-3">(GMT-03:00) Brasilia</option>
         <option value="-3">(GMT-03:00) Buenos Aires, Georgetown</option>
         <option value="-3">(GMT-03:00) Greenland</option>
         <option value="-3">(GMT-03:00) Montevideo</option>
         <option value="-2">(GMT-02:00) Mid-Atlantic</option>
         <option value="-1">(GMT-01:00) Cape Verde Is.</option>
         <option value="-1">(GMT-01:00) Azores</option>
         <option value="0">(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
         <option value="0">(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
         <option value="1">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
         <option value="1">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
         <option value="1">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
         <option value="1">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
         <option value="1">(GMT+01:00) West Central Africa</option>
         <option value="2">(GMT+02:00) Amman</option>
         <option value="2">(GMT+02:00) Athens, Bucharest, Istanbul</option>
         <option value="2">(GMT+02:00) Beirut</option>
         <option value="2">(GMT+02:00) Cairo</option>
         <option value="2">(GMT+02:00) Harare, Pretoria</option>
         <option value="2">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
         <option value="2">(GMT+02:00) Jerusalem</option>
         <option value="2">(GMT+02:00) Minsk</option>
         <option value="2">(GMT+02:00) Windhoek</option>
         <option value="3">(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
         <option value="3">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
         <option value="3">(GMT+03:00) Nairobi</option>
         <option value="3">(GMT+03:00) Tbilisi</option>
         <option value="3.5">(GMT+03:30) Tehran</option>
         <option value="4">(GMT+04:00) Abu Dhabi, Muscat</option>
         <option value="4">(GMT+04:00) Baku</option>
         <option value="4">(GMT+04:00) Yerevan</option>
         <option value="4.5">(GMT+04:30) Kabul</option>
         <option value="5">(GMT+05:00) Yekaterinburg</option>
         <option value="5">(GMT+05:00) Islamabad, Karachi, Tashkent</option>
         <option value="5.5">(GMT+05:30) Sri Jayawardenapura</option>
         <option value="5.5">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
         <option value="5.75">(GMT+05:45) Kathmandu</option>
         <option value="6">(GMT+06:00) Almaty, Novosibirsk</option>
         <option value="6">(GMT+06:00) Astana, Dhaka</option>
         <option value="6.5">(GMT+06:30) Yangon (Rangoon)</option>
         <option value="7">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
         <option value="7">(GMT+07:00) Krasnoyarsk</option>
         <option value="8">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
         <option value="8">(GMT+08:00) Kuala Lumpur, Singapore</option>
         <option value="8">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
         <option value="8">(GMT+08:00) Perth</option>
         <option value="8">(GMT+08:00) Taipei</option>
         <option value="9">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
         <option value="9">(GMT+09:00) Seoul</option>
         <option value="9">(GMT+09:00) Yakutsk</option>
         <option value="9.5">(GMT+09:30) Adelaide</option>
         <option value="9.5">(GMT+09:30) Darwin</option>
         <option value="10">(GMT+10:00) Brisbane</option>
         <option value="10">(GMT+10:00) Canberra, Melbourne, Sydney</option>
         <option value="10">(GMT+10:00) Hobart</option>
         <option value="10">(GMT+10:00) Guam, Port Moresby</option>
         <option value="10">(GMT+10:00) Vladivostok</option>
         <option value="11">(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
         <option value="12">(GMT+12:00) Auckland, Wellington</option>
         <option value="12">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
         <option value="13">(GMT+13:00) Nuku'alofa</option>
      </select>;
   }

   public populateFields() {
      if (!this.state.userState) {
         if (this.props.user !== null) {
            console.log(this.props.user)
            this.setState({
               ...this.state,
               city: this.props.user.city,
               email: this.props.user.email,
               firstname: this.props.user.firstName,
               lastname: this.props.user.lastName,
               phoneNumber: this.props.user.phoneNumber,
               states: this.stateBuilder(),
               tzs: this.timeZoneBuilder(),
               userId: 0,
               userState: true,
               zipCode: this.props.user.zipCode
            })
         }
      }
   }

   public render() {
      this.populateFields();
      return (
         <>
            <div className="reg-form prof-form">
               <form>
                  <div className="card over-card">
                     <div className="card-header text-center">
                        <h1> Profile </h1>
                     </div>
                     <img src={profSrc} alt="profile_pic" id="profilePic" />
                     <div className="card-body form-group">
                        <div className="form-group row">
                           <div className="col">
                              <label> First Name *</label>
                              <input id="fname" type="text" className="form-control reg-inputs" placeholder="" value={this.state.firstname} onChange={e => this.firstnameChange(e)} />
                           </div>
                        </div>
                        <div className="form-group row">
                           <div className="col">
                              <label> Last Name *</label>
                              <input id="lname" type="text" className="form-control reg-inputs" placeholder="" value={this.state.lastname} onChange={e => this.lastnameChange(e)} />
                           </div>
                        </div>
                        <div className="form-group row">
                           <div className="col">
                              <label> Mobile Phone *</label>
                              <input id="phone" type="tel" className="form-control reg-inputs" value={this.state.phoneNumber} placeholder="" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                 required onChange={e => this.phoneChange(e)} />
                              <span className="note">Format: 123-456-7890</span>
                           </div>
                        </div>
                        <div className="form-group row">
                           <div className="col">
                              <label> Time Zone *</label>
                              {this.state.tzs}
                           </div>
                        </div>
                        <div className="form-group row">
                           <div className="col">
                              <label> City *</label>
                              <input id="city" type="text" className="form-control reg-inputs" placeholder="" value={this.state.city} onChange={e => this.cityChange(e)} />
                           </div>
                        </div>
                        <div className="form-group row">
                           <div className="col">
                              <label> State *</label>
                              {this.state.states}
                           </div>
                        </div>
                        <div className="form-group row">
                           <div className="col">
                              <label> Zip Code *</label>
                              <input id="zip" type="text" className="form-control reg-inputs" value={this.state.zipCode} placeholder="" pattern="(\d{5}([\-]\d{4})?)" onChange={e => this.zipChange(e)} />
                           </div>
                        </div>
                     </div>
                     <div className="card-footer col-xs-12 text-center" id="reg-form-footer">
                        <button type="submit" className="btn rev-btn submit-but" onClick={this.submit}> Update </button>
                     </div>
                  </div>
               </form>
            </div>
         </>
      );
   }
}

const mapStateToProps = (state: IState) => (state.user)
const mapDispatchToProps = {
   ...userActions
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfileComponent)