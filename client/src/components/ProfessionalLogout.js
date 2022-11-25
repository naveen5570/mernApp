import React, { Component } from 'react';
import '../App.css';


class ProfessionalLogout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqqs: []
    };
  }

  componentDidMount() {
    localStorage.removeItem("professional-token");
    window.location.href = "/login-as-professional";
    
      
  };
  

  render() {
      return(
          <></>
      )
}
}

export default ProfessionalLogout;