import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import ReqCard from './ReqCard';
import Header from './Header';

class Dashboard extends Component {
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
      window.location.href = "/admin";
    }
    const u = jwtDecode(token);
    console.log(u.id);
    
    axios
      .get('/api/requests/admin-request-list')
      .then(res => {
        this.setState({
          reqqs: res.data
         });
      })
      .catch(err =>{
        console.log('Error from ShowBookList');
      })
      
  };
  

  render() {
    const reqqs = this.state.reqqs;
    //console.log("PrintBook: " + JSON.stringify(reqqs));
    let reqList;

    if(!reqqs) {
      reqList = "there is no book record!";
    } else {
      reqList = reqqs.map((reqq, k) =>
      <ReqCard reqq={reqq} key={k} />
      );
    }

    return (
      <div>
<div className="dashboard-top-header">
      <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          
        <Link to='/' ><img src="../img/logo.jpg"/></Link>
        </div>
        <div className="col-md-7">
      
        </div>
        <div className="col-md-3">
          
        </div>
      </div>
      </div>
      
      </div>
      <div className="container-fluid">
      <div className='row'>
        <Header />
        <div className='col-md-10 menu-right'>
      
      <div className="ShowBookList">
        <div className="container">
          <br/><br/>

          <div className="list">
             {reqList}
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

export default Dashboard;