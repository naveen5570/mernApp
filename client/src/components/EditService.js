import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useHistory, useParams  } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Header from './Headeradmin';
import Headertop from './Headeradmintop';

class EditService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
  }

  componentDidMount() {
    const params = this.props.params;
    axios
      .get('/api/services/get-service/'+params.id)
      .then(res => {
        console.log('test=>'+res.data.name);
        this.setState({
        name: res.data.name,
        description: res.data.description
          })
        
      })
      .catch(err => {
        console.log("Error from ServiceApi");
      })
    
      
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const params = this.props.params;
    e.preventDefault();
    
    const data = {
        name: this.state.name,
        description: this.state.description,
        id:params.id

        
      
    };

    axios
      .post('/api/services/update-service', data)
      .then(res => {
        this.setState({
            name: '',
            description: ''
            
        });
        alert("Details updated");
        window.location.href = "/admin/service-list";
      })
      .catch(err => {
        //alert(err.data.msg);
        console.log("Error in professional-profile!");
      })
  };



  render() {
    /* const books = this.state.books;
    console.log("PrintBook: " + books);
    let bookList;

    if(!books) {
      bookList = "there is no book record!";
    } else {
      bookList = books.map((book, k) =>
        <BookCard book={book} key={k} />
      );
    }
*/
    return (

<div>
      <Headertop/>
	  <div className='container-fluid'>
      <div className='row'>
      
        <Header/>
		<div className='col-md-10 menu-right'>
      <div className="dashboard-right">
        <h1 className="lang">Update Service Details</h1>

        <form noValidate onSubmit={this.onSubmit} className="profile form" encType="multipart/form-data">
          <div className="card-box">

            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-label lang">Name</label>
                <input className="form-control" type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.onChange} />
              </div>
              <div className="form-group col-md-12">
              <label className="form-label lang">Description</label>
              <textarea className="form-control" name="description" placeholder="Type description here" value={this.state.description} onChange={this.onChange}></textarea>
              </div>
            </div>
            <input className="form-control button-nav" name="submit" value="Update Details" type="submit"  />
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
    //console.log(params);
  return (
      <EditService params={params} />
  )
}