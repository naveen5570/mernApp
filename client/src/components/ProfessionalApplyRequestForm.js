import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Link, useHistory, useParams } from 'react-router-dom';
import Header from './Header';
import Headertop from './Headeradmintop';

class ProfessionalApplyRequestForm extends Component {
  
  constructor() {
    
    //console.log(id);
    
    super();
    this.state = {
      time_of_service:'',
      fees:'',
      request_applied:'',
      professional_id:''
    };
    
  }



  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const token = localStorage.getItem("professional-token");
    const u = jwtDecode(token);
    //alert('clicked');
    e.preventDefault();
    const params = this.props.params;
    
    const data = {
          
          time_of_service:this.state.time_of_service,
          fees:this.state.fees,
          request_applied:params.id,
          professional_id:u.id
      
    };
    
    axios
      .post('/api/requests/apply', data)
      .then(res => {
        this.setState({
          time_of_service:"",
          fees:"",
          request_applied:"",
          professional_id:""
        });
        alert(res.data.msg);
        //window.location.href = "http://localhost:8082/request-applied"; 
      })
      .catch(err => {
        //alert(err.data.msg);
        console.log("Error in Creating request");
      })
  };



  // get service name

  componentDidMount() {
    const params = this.props.params;
    console.log(params.id);
    axios
      .get('/api/requests/'+params.id)
      .then(res => {
        this.setState({
          reqqs: res.data
         })
         //console.log(res.data);
      })
      .catch(err =>{
        console.log('Error from ShowBookList');
      })
      
  };

  render() {
    //const { id } = this.props;
    
    //console.log('test=>'+JSON.stringify(this.props));
    const params = this.props.params;
    return (
<div>
      <Headertop/>
	  <div className='container-fluid'>
      <div className='row'>
      <Header />
		<div className='col-md-10 menu-right'>
      <div className="dashboard-right">
        

        <form noValidate onSubmit={this.onSubmit} className="request form" encType="multipart/form-data">
          
          <div className="card-box">
            
            
            
            <div className="row">
              <div className="col-md-5 form-group">
                <label className="form-label lang">Estimate time of Service (in hours)</label>
                <input className="form-control" type="text" name="time_of_service" placeholder="Type Here" value={this.state.time_of_service} onChange={this.onChange} />
              </div>
              </div>
              <div className="row">
              <div className="col-md-5 form-group">
                <label className="form-label lang">Fees Applicable</label>
                <input className="form-control" type="text" name="fees" placeholder="Type Here" value={this.state.fees} onChange={this.onChange} />
                <input type="hidden" name="professional_id" value=''/>
              </div>
            </div>
            
            <input className="button-nav" name="submit" value="Apply" type="submit"  />
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

export default () => {
  const params = useParams();
  console.log(params);
  return (
      <ProfessionalApplyRequestForm params={params} />
  )
}

//export default ProfessionalApplyRequestForm;