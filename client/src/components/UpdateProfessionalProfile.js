import React, { Component, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Header from './Header';
import { set } from 'mongoose';
import Headertop from './Headeradmintop';


class UpdateProfessionalProfile extends Component {
  constructor() {
    super();
    this.state = {
      photo_id: '',
      registered_address: '',
      office_address: '',
      country: '',
      state_or_province: '',
      radius_to_cater: '',
      professional_card: '',
      status: '',
      name:'',
      
      description:'',
      city:'',
      zipcode:'',
      specialisation:'',
      experience:'',
      qualification:'',
      standard_fees:'',
      availability_hours1: '',
      availability_hours2: '',
      specialisations:[]
        
    }
    this.handleCheckbox = this.handleCheckbox.bind(this);
    
  }

  
  componentDidMount() {
    const token = localStorage.getItem("professional-token");
    const ru = jwtDecode(token);
    console.log('test=>'+ru);
    axios.get('/api/professionals/get-professional/'+token).then(res => {
        this.setState({
          prof: res.data,
          registered_address: res.data.registered_address,
      office_address: res.data.office_address,
      country: res.data.country,
      state_or_province: res.data.state_or_province,
      radius_to_cater: res.data.radius_to_cater,
      professional_card: res.data.professional_card,
      status: res.data.status,
      name:res.data.name,
      
      description:res.data.description,
      city:res.data.city,
      zipcode:res.data.zipcode,
      specialisation:res.data.specialisation,
      experience:res.data.experience,
      qualification:res.data.qualification,
      standard_fees:res.data.standard_fees,
      availability_hours1:res.data.availability_hours1,
      availability_hours2:res.data.availability_hours2
         });
         //console.log('status=>'+res.data.status);
         
      })
      .catch(err =>{
        console.log('Error from professional');
      })
    if(!token)
    {
      window.location.href = "/login-as-professional";
    }
    const u = jwtDecode(token);
    console.log(u.id);
    
      
  };

  

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCheckbox = e => {
    const value = e.target.value;
    const checked = e.target.checked;
    if(checked==true)
    {
      this.state.specialisations[value]=value
    }
    else
    {
      console.log('unchecked');
      this.state.specialisations.splice(value, 1);
    }
    //console.log(this.state.specialisations);
  };

  onSubmit = e => {
    const token = localStorage.getItem("professional-token");
    const u = jwtDecode(token);
    
    e.preventDefault();
    console.log(this.state.specialisations);
    const data = {
      photo_id: this.state.photo_id,
      registered_address: this.state.registered_address,
      office_address: this.state.office_address,
      country: this.state.country,
      state_or_province: this.state.state_or_province,
      radius_to_cater: this.state.radius_to_cater,
      professional_card: this.state.professional_card,
      status: this.state.status,
      name:this.state.name,
      
      description:this.state.description,
      city:this.state.city,
      zipcode:this.state.zipcode,
      specialisation:this.state.specialisations,
      experience:this.state.experience,
      qualification:this.state.qualification,
      standard_fees:this.state.standard_fees,
      availability_hours1:this.state.availability_hours1,
      availability_hours2: this.state.availability_hours2,
      
      user_id:u.id
      
    };

    axios
      .post('/api/professionals/profile', data)
      .then(res => {
        
        alert("Profile updated");
        //window.location.href = "/profile-updated";
      })
      .catch(err => {
        //alert(err.data.msg);
        console.log("Error in professional-profile!");
      })
  };



  render() {
    //console.log('specialisation=>'+this.state.specialisation);
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
      
        <Header/>
		<div className='col-md-10 menu-right'>
      <div className="dashboard-right">
        <h1 className="lang">Edit Your Profile</h1>

        <form noValidate onSubmit={this.onSubmit} className="profile form" encType="multipart/form-data">
          <div className="card-box">
            <h4 className="lang">Basic Information</h4>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-label lang">What's Your Name</label>
                <input className="form-control" type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.onChange} />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label lang">Upload your ID proof</label>
                <input className="form-control" type="file" name="photo_id" placeholder="Name" value={this.state.photo_id} onChange={this.onChange} />
              </div>
            </div>
            <div className="row">
              
              <div className="form-group col-md-12">
                <label className="form-label lang">Short description about yourself</label>
                <textarea className="form-control" name="description" placeholder="Type description here" value={this.state.description} onChange={this.onChange}>{this.state.description}</textarea>
              </div>
            </div>
          </div>
          <div className="card-box">
            <h4 className="lang">Address</h4>

            <div className="row">
              <div className="col-md-12 form-group">
                <label className="form-label lang">Registered Address</label>
                <input className="form-control" type="text" name="registered_address" placeholder="Type Registered Address" value={this.state.registered_address} onChange={this.onChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 form-group">
                <label className="form-label lang">Office Address</label>
                <input className="form-control" type="text" name="office_address" placeholder="Type Office Address" value={this.state.office_address} onChange={this.onChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="form-label lang">Country</label>
                <select className="form-control" name="country" value={this.state.country} onChange={this.onChange} >
                  <option value="Canada">Canada</option>
                </select>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label lang">Province</label>
                <select className="form-control" name="state_or_province" value={this.state.state_or_province} onChange={this.onChange} >
                <option value="Alberta">Alberta</option>
	<option value="British Columbia">British Columbia</option>
	<option value="Manitoba">Manitoba</option>
	<option value="New Brunswick">New Brunswick</option>
	<option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
	<option value="Northwest Territories">Northwest Territories</option>
	<option value="Nova Scotia">Nova Scotia</option>
	<option value="Nunavut">Nunavut</option>
	<option value="Ontario">Ontario</option>
	<option value="Prince Edward Island">Prince Edward Island</option>
	<option value="Quebec">Quebec</option>
	<option value="Saskatchewan">Saskatchewan</option>
	<option value="Yukon">Yukon</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 form-group">
                <label className="form-label lang">City</label>
                <input className="form-control" type="text" name="city" placeholder="Type Here" value={this.state.city} onChange={this.onChange} />
              </div>
              <div className="col-md-4 form-group">
                <label className="form-label lang">Postal Code</label>
                <input className="form-control" type="text" name="zipcode" placeholder="Type Here" value={this.state.zipcode} onChange={this.onChange} />
              </div>
              <div className="col-md-2 form-group">
              
                <label className="form-label lang">Available From</label>
                <input className="form-control" type="time" name="availability_hours1" onChange={this.onChange} />
                </div>
                <div className="col-md-2 form-group">
                <label className="form-label lang">To</label>
                <input className="form-control" type="time" name="availability_hours2" onChange={this.onChange} />
              </div>
              
            </div>
            
          </div>
          <div className="card-box">
            <h4 className="lang">Professional Information</h4>

            <div className="row form-group">

              <label className="form-label col-md-12 lang">Choose your specialisation</label>

              <div className="form-check col-md-4">
                <div className='check-box'>
                  <input type="checkbox" onChange={this.handleCheckbox} name="specialisation" className="form-check-input" value="Plumbing Services" defaultChecked /><label className="form-check-label" >Plumbing Services</label>
                </div>
              </div>
              <div className="form-check col-md-4">
                <div className='check-box'>
                  <input type="checkbox" onChange={this.handleCheckbox} name="specialisation" className="form-check-input" value="Carpenter Services" defaultChecked /><label className="form-check-label" >Carpenter Services</label>
                </div>
              </div>

              <div className="form-check col-md-4">
                <div className='check-box'>
                  <input type="checkbox" onChange={this.handleCheckbox} name="specialisation" className="form-check-input" value="Pest Control Services" /><label className="form-check-label" >Pest Control Services</label>
                </div>
              </div>
              <div className="form-check col-md-4">
                <div className='check-box'>
                  <input type="checkbox" onChange={this.handleCheckbox}  name="specialisation" className="form-check-input" value="Roofing Services" defaultChecked /><label className="form-check-label" >Roofing Services</label>
                </div>
              </div>
              <div className="form-check col-md-4">
                <div className='check-box'>
                  <input type="checkbox" onChange={this.handleCheckbox}  name="specialisation" className="form-check-input" value="Ac Repair Services" /><label className="form-check-label" >Ac Repair Services</label>
                </div>
              </div>
              <div className="form-check col-md-4">
                <div className='check-box'>
                  <input type="checkbox" onChange={this.handleCheckbox}  name="specialisation" className="form-check-input" value="Electrician Services"/><label className="form-check-label" >Electrician Services</label>
                </div>
              </div>
              <div className="form-check col-md-4">
                <div className='check-box'>
                  <input type="checkbox" onChange={this.handleCheckbox}  name="specialisation" className="form-check-input" value="Cleaning and Disinfection Services"/><label className="form-check-label" >Cleaning & Disinfection</label>
                </div>
              </div>
              <div className="form-check col-md-4">
                <div className='check-box'>
                  <input type="checkbox" onChange={this.handleCheckbox}  name="specialisation" className="form-check-input" value="Electrical Appliance Repair" /><label className="form-check-label" >Electrical Appliance Repair</label>
                </div>
              </div>

            </div>

            <div className="row">
              <div className="col-md-6 form-group">
                <label className="form-label lang">Experience</label>
                <select className="form-control" name="experience" value={this.state.experience} onChange={this.onChange} >
                  <option value="">Choose Experience (in years)</option>
                  <option value="5">5</option>
                  <option value="5-10">5-10</option>
                  <option value="10-15">10-15</option>
                  <option value="15-20">15-20</option>
                </select>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label lang">Qualification</label>
                <select className="form-control" name="qualification" value={this.state.qualification} onChange={this.onChange} >
                  <option value="">Qualification</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Post Graduate">Post Graduate</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="form-label lang">Standard fees</label>
                <input className="form-control" type="text" name="standard_fees" placeholder="$0.00" value={this.state.standard_fees} onChange={this.onChange} />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label lang">Upload your Professional card</label>
                <input className="form-control" type="file" name="professional_card" placeholder="Name" value={this.state.professional_card} onChange={this.onChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="form-label lang">Please select radius which you can cater to</label>
                <input className="form-control" type="text" name="radius_to_cater" placeholder="Radius in kms" value={this.state.radius_to_cater} onChange={this.onChange} />
              </div>
              </div>
              <input type="hidden" name='status' value="1" />
              <input type="hidden" name='user_id' value={this.state.user_id} />
            <input className="form-control button-nav" name="submit" value="Update Profile" type="submit"  />
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

export default UpdateProfessionalProfile;