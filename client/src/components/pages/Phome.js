import React, { Component } from 'react';
import '../../App.css';
import '../../Style.css';
import '../../script.js';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Footer';

class Phome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: [],
      services:[]
    };
  }



  componentDidMount() {
    axios
      .get('/api/pages/professional-page')
      .then(res => {
        console.log("Print-showapplicationDetails-API-response: " + JSON.stringify(res.data));
        this.setState({
          homes: res.data
        })
      
         
      })
      .catch(err => {
        console.log("Error from viewAppDetails");
      })

      axios
        .get('/api/services')
        .then(res => {
          console.log("Print-services-API-response: " + JSON.stringify(res.data));
          this.setState({
            services: res.data
          })
        })
        .catch(err => {
          console.log("Error from viewAppDetails");
        })
  };
  

  render() {
    
const homes = this.state.homes;
const services = this.state.services;
console.log('this=>'+homes);
    return (
      <>
      
<div className="top-banner top-banner-professional">
<div className="container">
<div className="row">
<div className="col-md-12">
<nav className="navbar navbar-expand-lg navbar-light  navbar-fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><img src="/img/logo-final.png" width="90"/></a>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
      </ul>
      <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
          <Link className="nav-link lang" aria-current="page" to="/professional">Register As A Professional</Link>
        </li>
        <li className="nav-item"><Link to="/login-as-professional" className=" nav-link lang">Professional Login</Link></li>
        <li className="nav-item">
          <Link className="nav-link lang" to="/login">Sign In</Link>
        </li>
		  <li className="nav-item">
          <Link className="nav-link btn btn-info btn-prof lang" aria-current="page" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
        <button className="en lan" data-id="en"><img src='/en.png'/></button>
          <button className="fr lan" data-id="fr"><img src='/fr.png'/></button>
        </li>
          </ul>
    </div>
  </div>
</nav>
	
	
</div>

	</div>
</div>
<div className="center-div">
<h1><span>{homes.banner_h1}</span></h1>
<h3>
        <span>{homes.banner_h3}</span>
      </h3>
<a href={homes.banner_link} className="btn btn-info btn-prof">Get Started</a>
</div>
</div>
<div className="banner-bottom banner-bottom-prof">
<div className="container">
<div className="row">
<div className="col-md-12">
<h2>{homes.banner_bottom_heading}</h2>
<a href={homes.banner_bottom_link} className="btn btn-info btn-prof">Register Now</a>
</div>
</div>
</div>	
</div>
{/*<div className="how_we_work">
<div className="container">
<h2>
        <span>{homes.how_heading}</span>
      </h2>
<h5>
        <span>{homes.how_description}</span>
      </h5>

</div>	
</div>
*/}
<div className="mid-section  mid-section1">
<div className="container">
<div className="row">
<div className="col-md-12"><h3>{homes.section_1_heading}</h3></div>
<div className="col-md-6">
<div className="content">
<p>
{homes.section_1_description}
</p>
<a href={homes.section_1_link} className="btn btn-info btn-prof">Start Registration</a>
</div>	
</div>
<div className="col-md-6">
<div className="img">
<img src="img/mid-section.png"/>	
</div>
</div>	
</div>
</div>	
</div>


<div className="services customer_satisfaction customer_satisfaction1">
<div className="container">
<h2>Lorem Ipsum is simply dummy text</h2>
<h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</h5>
<div className="row">
<div className="col-md-4">
<div className="service customer customer1">
<img src="img/consumer1.png"/>
<h1>300+</h1>
<p>Verfied Professionals</p>
</div>
</div>
<div className="col-md-4">
<div className="service customer customer1">
<img src="img/consumer2.png"/>
<h1>3500</h1>
<p>Job Successfully Completed</p>
</div>
</div>
<div className="col-md-4">
<div className="service customer customer1">
<img src="img/consumer3.png"/>
<h1>98%</h1>
<p>Customer<br/>Satisfaction</p>
</div>
</div>
</div>
</div>
</div>
<div className="services services1">
<div className="container">
<h2>{homes.services_heading}</h2>
<h5>{homes.services_description}</h5>
<div className="row">
{services.map(service => {
          return <div className="col-md-3">
          <div className="service service1">
            <img src={`img/${service.icon}`}/>
            <h6>{service.name}</h6>
            </div></div>
        })}





</div>
</div>
</div>
<Footer/>

      </>
        
        
    );
  }
}

export default Phome;