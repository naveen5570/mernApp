import React, { Component } from 'react';
import '../../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Header from '../../Headeradmin';
import Headertop from '../../Headeradmintop';
import Footer from '../inc/Footer';

class Adminfrphome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner_h1: '',
      banner_h3: '',
      banner_link: '',
      services_heading:'',
      services_description:'',
      section_1_heading:'',
      section_1_description:'',
      section_1_link:'',
      banner_bottom_heading:'',
      banner_bottom_link:''
    };
  }

  componentDidMount() {
    axios
      .get('/api/fr/pages/professional-page')
      .then(res => {
        console.log('test=>'+res.data.banner_h1);
        this.setState({
        banner_h1: res.data.banner_h1,
        banner_h3: res.data.banner_h3,
        banner_link: res.data.banner_link,
        services_heading:res.data.services_heading,
        services_description:res.data.services_description,
        section_1_heading:res.data.section_1_heading,
        section_1_description:res.data.section_1_description,
        section_1_link:res.data.section_1_link,
        banner_bottom_heading:res.data.banner_bottom_heading,
        banner_bottom_link:res.data.banner_bottom_link
          })
        
      })
      .catch(err => {
        console.log("Error from viewAppDetails");
      })
    
      
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    
    e.preventDefault();
    
    const data = {
        banner_h1: this.state.banner_h1,
        banner_h3: this.state.banner_h3,
        banner_link: this.state.banner_link,
        services_heading:this.state.services_heading,
        services_description:this.state.services_description,
        section_1_heading:this.state.section_1_heading,
        section_1_description:this.state.section_1_description,
        section_1_link:this.state.section_1_link,
        banner_bottom_heading:this.state.banner_bottom_heading,
        banner_bottom_link:this.state.banner_bottom_link
      
    };

    axios
      .post('/api/fr/pages/update-professional-page-detail', data)
      .then(res => {
        
        alert("Details updated");
        //window.location.href = "/admin/phome";
      })
      .catch(err => {
        //alert(err.data.msg);
        console.log("Error in professional-profile!");
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
      
        <Header/>
		<div className='col-md-10 menu-right'>
      <div className="dashboard-right">
        <h1 className="lang">Update Home Page Details</h1>

        <form noValidate onSubmit={this.onSubmit} className="profile form" encType="multipart/form-data">
          <div className="card-box">
            <h4 className="lang">Banner Section</h4>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-label lang">Banner Area First Heading</label>
                <input className="form-control" type="text" name="banner_h1" placeholder="Name" value={this.state.banner_h1} onChange={this.onChange} />
              </div>
              <div className="form-group col-md-6">
              <label className="form-label lang">Banner Area Second Heading</label>
                <input className="form-control" type="text" name="banner_h3" placeholder="Name" value={this.state.banner_h3} onChange={this.onChange} />
              </div>
              <div className="form-group col-md-6">
              <label className="form-label lang">Banner Area Get Started Link</label>
                <input className="form-control" type="text" name="banner_link" placeholder="Name" value={this.state.banner_link} onChange={this.onChange} />
              </div>
            </div>
            
          </div>
          <div className="card-box">
            <h4 className="lang">Section 1</h4>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-label lang">Section 1 Heading</label>
                <input className="form-control" type="text" name="banner_bottom_heading" placeholder="Name" value={this.state.banner_bottom_heading} onChange={this.onChange} />
              </div>
              <div className="form-group col-md-6">
              <label className="form-label lang">Section 1 Link</label>
                <input className="form-control" type="text" name="banner_bottom_link" placeholder="Name" value={this.state.banner_bottom_link} onChange={this.onChange} />
              </div>
              
            </div>
            
          </div>
          <div className="card-box">
            <h4 className="lang">Section 2</h4>
            <div className="row">
            <div className="col-md-6 form-group">
              <label className="form-label lang">Section 2 Heading</label>
                <input className="form-control" type="text" name="section_1_heading" placeholder="Type Registered Address" value={this.state.section_1_heading} onChange={this.onChange} />
              </div>
              <div className="col-md-6 form-group">
              <label className="form-label lang">Section 2 Link</label>
              <input className="form-control" type="text" name="section_1_link" placeholder="Type Registered Address" value={this.state.section_1_link} onChange={this.onChange} />
              </div>
              <div className="col-md-12 form-group">
              <label className="form-label lang">Section 2 Description</label>
              <textarea className="form-control" name="section_1_description" placeholder="Type description here" value={this.state.section_1_description} onChange={this.onChange}></textarea>
              </div>
              
            </div>
            
            </div>
          <div className="card-box">
            <h4 className="lang">Services Section</h4>
            <div className="row">
            <div className="col-md-6 form-group">
              <label className="form-label lang">Service Heading</label>
                <input className="form-control" type="text" name="services_heading" placeholder="Type Registered Address" value={this.state.services_heading} onChange={this.onChange} />
              </div>
              <div className="col-md-12 form-group">
              <label className="form-label lang">Service Description</label>
              <textarea className="form-control" name="services_description" placeholder="Type description here" value={this.state.services_description} onChange={this.onChange}></textarea>
              </div>
            </div>
            <input className="form-control button-nav" name="submit" value="Update Details" type="submit"  />
            </div>
            
            
              
            
          
        </form>

      </div>
</div>
</div>
</div>
<Footer/>
</div>


    );
  }
}

export default Adminfrphome;