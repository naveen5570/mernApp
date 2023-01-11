import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import Header from './Header';
import jwtDecode from 'jwt-decode';
import Stripe from 'react-stripe-checkout';
import Headertop from './Headeradmintop';
import Headeruser from './Headeruser';

class ProfessionalApplyRequestForm extends Component {
  
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
    //const { id } = this.props;
    const { id } = this.props;
    const applications = this.state.application;
    console.log(applications);
    //console.log('test=>'+JSON.stringify(this.props));

    const handleToken = (totalAmount,token)=>{
        try{
          axios.post("/api/stripe/pay",{
            token: token.id,
            amount: totalAmount,
            req_id: applications.map((application) => (
              application.request_applied
            )),
            p_id: applications.map((application) => (
              application.professional_id
            ))
          }).then(res => {
            //console.log("Print-showapplicationDetails-API-response: " + JSON.stringify(res.data));
            
            window.location.href = "/hired-successfully"; 

          })
          .catch(err => {
            console.log("Error from viewAppDetails");
          });
    
        }catch(error){
          console.log(error);
        }
      }

    const tokenHandler = (token)=>{
        //alert('adadf');
        handleToken(100,token);
      }
    
    return (
<div>
      <Headertop/>
	  <div className='container-fluid'>
      <div className='row'>
      <Headeruser/>
		<div className='col-md-10 menu-right'>
      <div className="dashboard-right ">
    <div className="dashboard-cart">
        <h2 className="page-title lang">Plumber</h2>
<div className="row"><div className="col-md-6 with_border_right"><h4 className="lang">Pay Using</h4><p><Stripe  stripeKey="pk_test_51KqNoBEsO5lD4LSjMb0558uN5fHcBYw3ANIGpkRx25OOVgRdWffTxNlZTzsvV7PH4ikP18rTuZ8jPQoeeEv2r7oW00MOseB3Be" token={tokenHandler}  /></p></div><div className="col-md-6">
    <h4 className="lang">Booking Summary</h4>
    <p className="cart-content"><span className="lang">Service Type:</span> {applications.map((application) => (
        <span>{application.appdetails.map((appdetail) => (<span className="lang">{appdetail.repair_explanation}</span>))}</span>
      ))}</p>
    <p className="cart-content"><span className="lang">Estimated Service time:</span> {applications.map((application) => (
        <span className="lang">{application.time_of_service} hrs</span>
      ))}</p>
    <p className="cart-content"><span className="lang">Professional Name:</span> {applications.map((application) => (
        <span>{application.professionaldetails.map((professionaldetail) => (<span className="lang">{professionaldetail.name}</span>))}</span>
      ))}</p>
    <p className="cart-content"><span className="lang">Visitation Fee:</span> {applications.map((application) => (
        <span className="lang">${application.fees}</span>
      ))}</p>
    <p className="cart-content"><span className="lang">Total Service Amount:</span> {applications.map((application) => (
        <span className="lang">${application.fees}</span>
      ))}</p>
    <p className="cart-content"><span className="lang">Amount Payable:</span> {applications.map((application) => (
        <span className="lang">${application.fees}</span>
      ))}</p>
    <p className="terms lang">By Proceeding you accept our T&C, privacy and cancellation policy</p>
    </div></div>
        
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
    console.log(params);
  return (
      <ProfessionalApplyRequestForm params={params} />
  )
}

//export default ProfessionalApplyRequestForm;