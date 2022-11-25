import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useHistory, useParams  } from 'react-router-dom';


class DisapproveProfessional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reason:'',
      id:''
    };
  }

  componentDidMount() {
    const params = this.props.params;
    
      
  };
  onChange = e => {
    //alert('tt');
    this.setState({ [e.target.name]: e.target.value });
      
  };
onSubmit = e => {
  e.preventDefault();
  const params = this.props.params;
  //alert(this.state.reason);
  const data = {
    id: params.id,
    reason:this.state.reason

};
//alert(this.state.reason)
axios
  .post('/api/professionals/disapprove-professional',data)
  .then(res => {
    this.setState({
      id:'',
      reason:''
    });
    alert(res.data.msg);
      window.location.href = "/admin/professionals-list";
  })
  .catch(err =>{
    alert(err.message);
    console.log('Error from ProfessionalList');
    
    //window.location.href = "/admin/professionals-list";
  })


}
  render() {
      return(
          <>
          <form noValidate onSubmit={this.onSubmit}>
          <div className="card-box">
            <h4 className="lang">Basic Information</h4>
            
            <div className="row">
              
              <div className="form-group col-md-12">
                <label className="form-label lang">Reason For Disapproval</label>
                <textarea className="form-control" name="reason" placeholder="Type Reason here" value={this.state.reason} onChange={this.onChange}></textarea>
                <input type="hidden" name="id" value=''/><br/>
                <input className="form-control button-nav" name="submit" value="Disapprove" type="submit" />
              </div>
            </div>
          </div>
          </form>
          </>
      )
}
}

export default () => {
    const params = useParams();
    //console.log(params);
  return (
      <DisapproveProfessional params={params} />
  )
}