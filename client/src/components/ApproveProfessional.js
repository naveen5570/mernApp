import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useHistory, useParams  } from 'react-router-dom';


class ApproveProfessional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqqs: []
    };
  }

  componentDidMount() {
    const params = this.props.params;
    axios
      .get('/api/professionals/approve-professional/'+params.id)
      .then(res => {
        alert(res.data.msg);
        window.location.href = "/admin/professionals-list";
      })
      .catch(err =>{
        alert(err.message);
        console.log('Error from ProfessionalList');
        window.location.href = "/admin/professionals-list";
      })
    
      
  };
  

  render() {
      return(
          <></>
      )
}
}

export default () => {
    const params = useParams();
    //console.log(params);
  return (
      <ApproveProfessional params={params} />
  )
}