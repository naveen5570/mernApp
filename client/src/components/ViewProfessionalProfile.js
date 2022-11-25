import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Link, useParams } from 'react-router-dom';
import Headertop from './Headeradmintop';

import Header from './Header';

class ViewProfessionalProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqqs: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("professional-token");
    axios.get('/api/professionals/get-professional/'+token).then(res => {
      this.setState({
        prof: res.data
       });
       
    })
    .catch(err =>{
      console.log('Error from professional');
    })
    const p_status = localStorage.getItem("p_status");
    if(!token)
    {
      window.location.href = "/login-as-professional";
    }
    
    const u = jwtDecode(token);
    console.log(u.id);
    
    axios
      .get('/api/professionals/view-profile/'+u.id,
      {
       headers: { 'ngrok-skip-browser-warning':'5'}
      }
      )
      .then(res => {
        this.setState({
          reqqs: res.data
         })
         
      })
      .catch(err =>{
        console.log('Error from Profile');
      })
      
  };
  

  render() {
    const reqqs = this.state.reqqs;
    //console.log("PrintBook: " + JSON.stringify(reqqs));
    

    return (
      <div>
<Headertop/>
      <div className="container-fluid">
      <div className='row'>
        <Header />
        <div className='col-md-10 menu-right'>
      
        <div className="dashboard-right ">
    <div className="dashboard-cart">
        <h2 className="page-title lang">Profile</h2>
        <div className="row">
  <div className="col-md-8">
    <h4><img src="../img/profile-img.jpg" width="80"/>{reqqs.name}</h4>
    <h4 className="lang">About me</h4>
    <p className="lang">{reqqs.description}</p>
    <h4 className="lang">Professional Information</h4>
    <p><strong className="lang">Email:</strong> <span className="lang">{reqqs.email}</span></p>
    <p><strong className="lang">Experience:</strong> <span className="lang">{reqqs.experience} years</span></p>
    <p><strong className="lang">Standard Fees:</strong> <span className="lang">{reqqs.standard_fees}</span></p>
    </div>
    <div className="col-md-4 profile_right">
    <h4 className="lang">Basic Information</h4>
      <p><strong className="lang">Office Address:</strong><span className="lang">{reqqs.office_address}</span></p>
      <p><strong className="lang">Radius to Cater:</strong><span className="lang">{reqqs.radius_to_cater}</span></p>
      <p><strong className="lang">Registered Address:</strong><span className="lang">{reqqs.registered_address}</span></p>
      <p><strong className="lang">Zipcode:</strong> <span className="lang">{reqqs.zipcode}</span></p>
      <p><strong className="lang">City:</strong> <span className="lang">{reqqs.city}</span></p></div>
      
  </div>
        
    </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      
    );
  }
}


export default ViewProfessionalProfile;