import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import Header from './Header';
import Stripe from 'react-stripe-checkout';
import Headertop from './Headeradmintop';

class ViewRequest extends Component {
  
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
      .get('/api/requests/'+params.id)
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
        
		<div className='col-md-10 menu-right'>
      <div className="dashboard-right ">
    <div className="dashboard-cart">
        <h2 className="page-title lang">{applications.repair_explanation}</h2>
<div className="row">
  <div className="col-md-8 border-right"><h2 className="lang">Task Description</h2><p className="lang">{applications.repair_explanation}</p></div>
  <div className="col-md-4">
  <h2 className="lang">Job Location</h2>
  <p className="lang">Address: {applications.address_1} {applications.address_2}</p>
  <p className="lang">Zipcode: {applications.zipcode}</p> </div>
  <div className="col-md-12 "><Link className="btn btn-info lang" to={'/request-apply/'+applications._id}>Apply</Link></div>
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

export default () => {
    const params = useParams();
    //console.log(params);
  return (
      <ViewRequest params={params} />
  )
}

//export default ProfessionalApplyRequestForm;