import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Headertop from './Headeradmintop';
import Headeruser from './Headeruser';

class Request extends Component {
  constructor() {
    super();
    
    this.state = {
      specialisation:'Plumber',
      repair_explanation:'',
      repair_immediately:'',
      address_1: '',
      address_2: '',
      country: 'Canada',
      state_or_province: 'Alberta',
      city:'',
      zipcode:'',
      status: '',
      user_id:''
    };
    
  }

  
  

  componentDidMount() {
    const token = localStorage.getItem("token");
    if(!token)
    {
      window.location.href = "/";
    }
    const u = jwtDecode(token);
    console.log(u.id);
    
      
  };

  

  onChange = e => {
    //alert('tt');
    this.setState({ [e.target.name]: e.target.value });
    
      
    
  };

  


  onSubmit = e => {
    //alert('clicked');
    const token = localStorage.getItem("token");
    const u = jwtDecode(token);
    e.preventDefault();
//alert(this.state.state_or_province);
    const data = {
          specialisation: this.state.specialisation,
          repair_explanation: this.state.repair_explanation,
          repair_immediately: this.state.repair_immediately,
          address_1: this.state.address_1,
          address_2: this.state.address_2,
          country: this.state.country,
          state_or_province: this.state.state_or_province,
          city:this.state.city,
          zipcode: this.state.zipcode,
          status: this.state.status,
          user_id: u.id
      
    };
    //alert('clicked');
    axios
      .post('/api/requests/place', data)
      .then(res => {
        this.setState({
          specialisation:'',
          repair_explanation:'',
          repair_immediately:'',
          address_1: '',
          address_2: '',
          country: '',
          state_or_province: '',
          city:'',
          zipcode:'',
          status: '',
          user_id:''
        });
        //alert(res.data.msg);
        window.location.href = "/request-created"; 
      })
      .catch(err => {
        //alert(err.data.msg);
        console.log("Error in Creating request");
      })
  };



  render() {
    
    /* const books = this.state.books;
    console.log("PrintBook: " + books);
    let bookList;

    if(!books) {
      bookList = "there is no book record!";
    } else {
      bookList = books.map((book, k) =>
        <BookCard book={book} key={k} />
      );
    }
*/
    return (
<div>
      <Headertop/>
	  <div className='container-fluid'>
      <div className='row'>
      
        <Headeruser/>
		<div className='col-md-10 menu-right'>
      <div className="dashboard-right">
        <h1 className="lang">Create a Request</h1>

        <form noValidate onSubmit={this.onSubmit} className="request form" encType="multipart/form-data">
          <div className="card-box">
            <h4 className="lang">Professional Information</h4>
            <div className="row form-group">

              <label className="form-label col-md-12 lang">What Service do you Required?</label>

              <div className="form-check col-md-12 form-check-radio">
                <div className='check-box'>
                  <input type="radio" onChange={this.onChange} defaultChecked={this.state.name === "Plumber"} name="specialisation" className="form-check-input" value="Plumber" /><label className="form-check-label" >Plumbing Services</label>
                </div>
              </div>
              <div className="form-check col-md-12 form-check-radio">
                <div className='check-box'>
                  <input type="radio" onChange={this.onChange} defaultChecked={this.state.name === "Carpenter"}  name="specialisation" className="form-check-input" value="Carpenter" /><label className="form-check-label" >Carpenter Services</label>
                </div>
              </div>

              <div className="form-check col-md-12 form-check-radio">
                <div className='check-box'>
                  <input type="radio" onChange={this.onChange} defaultChecked={this.state.name === "Pest Control"}  name="specialisation" className="form-check-input" value="Pest Control" /><label className="form-check-label" >Pest Control Services</label>
                </div>
              </div>
              <div className="form-check col-md-12 form-check-radio">
                <div className='check-box'>
                  <input type="radio" onChange={this.onChange} defaultChecked={this.state.name === "Roofing"}  name="specialisation" className="form-check-input" value="Roofing" /><label className="form-check-label" >Roofing Services</label>
                </div>
              </div>
              <div className="form-check col-md-12 form-check-radio">
                <div className='check-box'>
                  <input type="radio" onChange={this.onChange} name="specialisation" defaultChecked={this.state.name === "AC Repair"}  className="form-check-input" value="AC Repair" /><label className="form-check-label" >AC Repair and Services</label>
                </div>
              </div>
              <div className="form-check col-md-12 form-check-radio">
                <div className='check-box'>
                  <input type="radio" onChange={this.onChange} defaultChecked={this.state.name === "Electrician"}  name="specialisation" className="form-check-input" value="Electrician" /><label className="form-check-label" >Electrician Services</label>
                </div>
              </div>
              <div className="form-check col-md-12 form-check-radio">
                <div className='check-box'>
                  <input type="radio" onChange={this.onChange} defaultChecked={this.state.name === "Cleaning and Disinfection"}  name="specialisation" className="form-check-input" value="Cleaning and Disinfection" /><label className="form-check-label" >Cleaning and Disinfection Services</label>
                </div>
              </div>
              <div className="form-check col-md-12 form-check-radio">
                <div className='check-box'>
                  <input type="radio" onChange={this.onChange} defaultChecked={this.state.name === "Pest Control"}  name="specialisation" className="form-check-input" value="Electrical Appliance Repair" /><label className="form-check-label" >Electrical Appliance Repair</label>
                </div>
              </div>

            </div>
            
            <div className="row">
              
              <div className="form-group col-md-12">
                <label className="form-label lang">Explain in Brief What You Needs To Be Repaired?</label>
                <textarea className="form-control" name="repair_explanation" placeholder="Type here" value={this.state.repair_explanation} onChange={this.onChange}></textarea>
              </div>
            </div>
            
            <div className="row form-group">

              <label className="form-label col-md-12 lang">Do you Need the Repair Immediately?</label>

              <div className="form-check col-md-12 form-check-radio">
                <div className='check-box'>
                  <input type="radio" name="repair_immediately" onChange={this.onChange} defaultChecked={this.state.name === "Yes"} className="form-check-input" value="Yes"/><label className="form-check-label" >Yes</label>
                </div>
                <div className='check-box'>
                  <input type="radio" name="repair_immediately" className="form-check-input" onChange={this.onChange} defaultChecked={this.state.name === "No"} value="No" /><label className="form-check-label" >No</label>
                </div>
              </div>
              </div>
            
          </div>
          <div className="card-box">
            <h4 className="lang">Address</h4>

            <div className="row">
              <div className="col-md-12 form-group">
                <label className="form-label lang">Address 1</label>
                <input className="form-control" type="text" name="address_1" placeholder="Type Address 1" value={this.state.address_1} onChange={this.onChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 form-group">
                <label className="form-label lang">Address 2</label>
                <input className="form-control" type="text" name="address_2" placeholder="Type Address 2" value={this.state.address_2} onChange={this.onChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="form-label lang">Country</label>
                <select className="form-control" name="country"  >
                  <option value={this.state.country} onChange={this.onChangeCountry}>Canada</option>
                </select>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label lang">Province</label>
                <select className="form-control" name="state_or_province" value={this.state.state_or_province} onChange={this.onChange} >
                <option value="Alberta" onChange={this.onChange} defaultSelected={this.state.name === "Alberta"}>Alberta</option>
	<option value="British Columbia" onChange={this.onChange} defaultSelected={this.state.name === "British Columbia"}>British Columbia</option>
	<option value="Manitoba" onChange={this.onChange} defaultSelected={this.state.name === "Manitoba"}>Manitoba</option>
	<option value="New Brunswick" onChange={this.onChange} defaultSelected={this.state.name === "New Brunswick"}>New Brunswick</option>
	<option value="Newfoundland and Labrador" onChange={this.onChange} defaultSelected={this.state.name === "Newfoundland and Labrador"}>Newfoundland and Labrador</option>
	<option value="Northwest Territories" onChange={this.onChange} defaultSelected={this.state.name === "Northwest Territories"}>Northwest Territories</option>
	<option value="Nova Scotia" onChange={this.onChange} defaultSelected={this.state.name === "Nova Scotia"}>Nova Scotia</option>
	<option value="Nunavut" onChange={this.onChange} defaultSelected={this.state.name === "Nunavut"}>Nunavut</option>
	<option value="Ontario" onChange={this.onChange} defaultSelected={this.state.name === "Ontario"}>Ontario</option>
	<option value="Prince Edward Island" onChange={this.onChange} defaultSelected={this.state.name === "Prince Edward Island"}>Prince Edward Island</option>
	<option value="Quebec" onChange={this.onChange} defaultSelected={this.state.name === "Quebec"}>Quebec</option>
	<option value="Saskatchewan" onChange={this.onChange} defaultSelected={this.state.name === "Saskatchewan"}>Saskatchewan</option>
	<option value="Yukon" onChange={this.onChange} defaultSelected={this.state.name === "Yukon"}>Yukon</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="form-label lang">City</label>
                <input className="form-control" type="text" name="city" placeholder="Type Here" value={this.state.city} onChange={this.onChange} />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label lang">Postal Code</label>
                <input className="form-control" type="text" name="zipcode" placeholder="Type Here" value={this.state.zipcode} onChange={this.onChange} />
              </div>
            </div>
            <input type="hidden" name="user_id" value=''/><br/>
            <input className="form-control button-nav" name="submit" value="Create Request" type="submit" />
          </div>
          
          
        </form>

      </div>
</div>
</div>
</div>
</div>

      


    );
  }
}

export default Request;