import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import ReqCard from './UserCard';
import Header from './Headeradmin';
import Headertop from './Headeradmintop';

class AdminUserList extends Component {
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
      .get('/api/users')
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
<Headertop/>
      <div className="container-fluid">
      <div className='row'>
        <Header />
        <div className='col-md-10 menu-right'>
      
      <div className="ShowBookList">
        <div className="container">
          <br/><br/>

          <div className="list">
          <h1 className="page-title lang">All Users</h1>
          <div className="card-container1 col-md-12">
          
           <div className="desc list_container">
            
          <table>
                    <tr><th className="lang">Name</th><th className="lang">Email</th><th className="lang">Registered On</th><th className="lang">Action</th></tr>
             {reqList}
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

export default AdminUserList;