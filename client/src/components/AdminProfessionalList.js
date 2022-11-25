import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import ReqCard from './ProfessionalCard';
import Header from './Headeradmin';
import Headertop from './Headeradmintop';

class AdminProfessionalList extends Component {
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
      .get('/api/professionals')
      .then(res => {
        this.setState({
          reqqs: res.data
         });
      })
      .catch(err =>{
        console.log('Error from ShowBookList');
      })
      
  };
  
  onSubmit = e => {
    alert('test');
    }


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
<Headertop/>
      <div className="container-fluid">
      <div className='row'>
        <Header />
        <div className='col-md-10 menu-right'>
      
      <div className="ShowBookList">
        <div className="container">
          
          <h2 className="lang">All Professionals</h2>

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

export default AdminProfessionalList;