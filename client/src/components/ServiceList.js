import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Header from './Headeradmin';
import Headertop from './Headeradmintop';

class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqqs: []
    };
  }

  componentDidMount() {


    
    const token = localStorage.getItem("admin_token");
    if(!token)
    {
      window.location.href = "/admin/login";
    }
    const u = jwtDecode(token);
    console.log(u.id);
    
    axios
      .get('/api/services')
      .then(res => {
        this.setState({
          reqqs: res.data
         });
      })
      .catch(err =>{
        console.log('Error from ServiceList');
      })
      
      
  };
  

  render() {
    const reqqs = this.state.reqqs;
    

    return (
      <div>
<Headertop/>
      <div className="container-fluid">
      <div className='row'>
        <Header />
        <div className='col-md-10 menu-right'>
      
      <div className="ShowBookList">
        <div className="container">
        
<div className="list">

<h1 className="page-title lang">Services List <div className="btn btn-info btn-right lang"><Link to="/admin/add-service">Add Service</Link></div></h1>

<div className="card-container1 col-md-12">

 <div className="desc list_container">
  
<table id="datatable">
          <tr><th className="lang">Name</th><th className="lang">Description</th><th className="lang">Added On</th><th className="lang">Action</th></tr>
   {reqqs.map(reqq => {
          return <tr><td className="lang">{reqq.name}</td><td className="lang">{reqq.description}</td><td className="lang">{reqq.createdAt}</td><td className="lang"><Link to={`/admin/edit-service/${reqq._id}`}>Edit</Link>/<Link to={`/admin/delete-service/${reqq._id}`}>Delete</Link></td></tr>
            
        })}
   </table>
   </div>
   </div>
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

export default ServiceList;