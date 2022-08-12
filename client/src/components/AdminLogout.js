import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import ReqCard from './UserReqCardPendingApplied';
import Header from './Header';

class AdminLogout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqqs: []
    };
  }

  componentDidMount() {
    localStorage.removeItem("admin_token");
    window.location.href = "/";
    
      
  };
  

  render() {
      return(
          <></>
      )
}
}

export default AdminLogout;