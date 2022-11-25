import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useHistory, useParams  } from 'react-router-dom';


class DeleteService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqqs: []
    };
  }

  componentDidMount() {
    const params = this.props.params;
    axios
      .delete('/api/services/delete-service/'+params.id)
      .then(res => {
        alert(res.data.msg);
        window.location.href = "/admin/service-list";
      })
      .catch(err =>{
        alert(err.message);
        console.log('Error from ServiceList');
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
      <DeleteService params={params} />
  )
}