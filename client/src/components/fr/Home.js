import React, { Component } from 'react';
import '../../App.css';
import '../../Style.css';
import '../../script.js';
import { Link, useHistory, useParams } from 'react-router-dom';
import Footer from './inc/Footer';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: [],
      services:[]
    };
  }



  componentDidMount() {
    axios
      .get('/api/fr/pages')
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
        .get('/api/fr/services')
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
      
<div className="top-banner">
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
          <Link className="nav-link lang" aria-current="page" to="/fr/professional">Register As A Professional</Link>
        </li>
        <li className="nav-item"><Link  to="/login-as-professional" className="nav-link lang">Professional Login</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Sign In</Link>
        </li>
		  <li className="nav-item">
          <Link className="nav-link btn btn-info" aria-current="page" to="/register">Sign Up</Link>
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
<h2>
        <span>{homes.banner_h1}</span>
      </h2>	
<h1><span>{homes.banner_h2}</span></h1>
<h3>
        <span>{homes.banner_h3}</span>
      </h3>
<a href={homes.banner_link} className="btn btn-info">Get Started</a>
</div>
</div>
<div className="banner-bottom">
<div className="container">
<div className="row">
<div className="col-md-3">
<div className="icon-div">
<img src="../img/icon1.png"/><h4>Professional<br/>Services</h4>
</div>
</div>	
<div className="col-md-3">
<div className="icon-div">
<img src="img/icon2.png"/><h4>Affordable<br/>Services</h4>
</div>
</div>	
<div className="col-md-3 third">
<div className="icon-div">
<img src="img/icon3.png"/><h4>24/7 Services</h4>
</div>
</div>	
<div className="col-md-3">
<div className="icon-div">
<img src="img/icon4.png"/><h4>Experienced<br/>and Reliable</h4>
</div>
</div>	
</div>
</div>	
</div>
<div className="how_we_work">
<div className="container">
<h2>
        <span>{homes.how_heading}</span>
      </h2>
<h5>
        <span>{homes.how_description}</span>
      </h5>
<div className="row">
<div className="col-md-4">
<div className="feature">
<div className="image">
<img src="img/feature1.png"/>
</div>
<h4>{homes.how_1_heading}</h4>
<p>{homes.how_1_description}</p>
</div>	
</div>	
<div className="col-md-4">
<div className="feature">
<div className="image img2">
<img src="img/feature2.png"/>
</div>
<h4>{homes.how_2_heading}</h4>
<p>{homes.how_2_description}</p>
</div>	
</div>	
<div className="col-md-4">
<div className="feature">
<div className="image">
<img src="img/feature3.png"/>	
</div>
<h4>{homes.how_3_heading}</h4>
<p>{homes.how_3_description}</p>
</div>
</div>	

	</div>
</div>	
</div>
<div className="services">
<div className="container">
<h2>{homes.services_heading}</h2>
<h5>{homes.services_description}</h5>
<div className="row">
{services.map(service => {
          return <div className="col-md-3">
          <div className="service">
            <img src={`img/${service.icon}`}/>
            <h6>{service.name}</h6>
            <p>{service.description}</p>
            </div></div>
        })}





</div>
</div>
</div>
<div className="mid-section">
<div className="container">
<div className="row">
<div className="col-md-8">
<div className="content">
<h3>{homes.section_1_heading}</h3>
<p>
{homes.section_1_description}
</p>
<a href={homes.section_1_link} className="btn btn-info">Get Started</a>
</div>	
</div>
<div className="col-md-4">
<div className="img">
<img src="img/img.png"/>	
</div>
</div>	
</div>
</div>	
</div>
<div className="services customer_satisfaction">
<div className="container">
<h2>Customer Satisfaction Is Our Priority</h2>
<h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</h5>
<div className="row">
<div className="col-md-4">
<div className="service customer">
<img src="img/consumer1.png"/>
<h1>300+</h1>
<p>Verfied Professionals</p>
</div>
</div>
<div className="col-md-4">
<div className="service customer">
<img src="img/consumer2.png"/>
<h1>3500</h1>
<p>Job Successfully Completed</p>
</div>
</div>
<div className="col-md-4">
<div className="service customer">
<img src="img/consumer3.png"/>
<h1>98%</h1>
<p>Customer<br/>Satisfaction</p>
</div>
</div>
</div>
</div>
</div>
<Footer/>

      </>
        
        
    );
  }
}

export default Home;