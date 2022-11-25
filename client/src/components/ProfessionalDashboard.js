import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import Header from './Header';
import Headertop from './Headeradmintop';
import Footer from './Footer';

class UserDashboard extends Component {
  
  constructor() {
    
    //console.log(id);
    
    super();
    this.state = {
      time_of_service:'',
      fees:'',
      request_applied:'',
      professional_id:'',
      application:[]
    };
    
  }

  componentDidMount() {
    const params = this.props.params;
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('/api/applications/view-application/'+params.id)
      .then(res => {
        //console.log("Print-showapplicationDetails-API-response: " + JSON.stringify(res.data));
        this.setState({
          application: res.data
        })
        
      })
      .catch(err => {
        console.log("Error from viewAppDetails");
      })
  };

  

  



  

  render() {
    const { id } = this.props;
    const applications = this.state.application;
    console.log(applications);
    return (
<div>
      <Headertop/>
      <div className='container-fluid'>
      <div className='row'>
     <Header/>
        
        
<div className="col-md-10 dashboard">
<div className="row">
<div className="col-md-3 "><div className=" dash_box dash_box1"><span><img src="./img/img1.png" width="50"/></span><span><h2>25</h2><p>Total Job Invite<br/>Received</p></span><span className="arrow"><img src="./img/arrow-right.png" width="30"/></span></div></div>
<div className="col-md-3"><div className="dash_box dash_box2"><span><img src="./img/img2.png" width="50"/></span><span><h2>12</h2><p>Total Job Applied</p></span><span className="arrow"><img src="./img/arrow-right.png" width="30"/></span></div></div>
<div className="col-md-3"><div className="dash_box dash_box3"><span><img src="./img/img3.png" width="50"/></span><span><h2>20</h2><p>Job Application<br/>Accepted</p></span><span className="arrow"><img src="./img/arrow-right.png" width="30"/></span></div></div>
<div className="col-md-3"><div className="dash_box dash_box4"><span><img src="./img/img4.png" width="50"/></span><span><h2>2</h2><p>Job Completed</p></span><span className="arrow"><img src="./img/arrow-right.png" width="30"/></span></div></div>
</div> 
<div className="row">
<div className="col-md-8"><div className="card-box notification_list"><h5>Daily Notification</h5><ul>
  <li><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p><span>8:45 pm, 20 oct 2021</span></li>
  <li><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p><span>8:45 pm, 20 oct 2021</span></li>
  <li><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p><span>8:45 pm, 20 oct 2021</span></li>
  <li><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p><span>8:45 pm, 20 oct 2021</span></li>
  </ul></div></div>
<div className="col-md-4"><div className="card-box"><h3>Job Analysis</h3><div id="graph"></div></div></div>  
</div> 
</div>
        </div>
        </div>
        <Footer/>
</div>

      


    );
  }

  
}

export default () => {
    const params = useParams();
    //console.log(params);
  return (
      <UserDashboard params={params} />
  )
}

//export default ProfessionalApplyRequestForm;