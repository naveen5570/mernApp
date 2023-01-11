import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import Headermain from './Headermain';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';


class UserLogin extends Component {
  
  constructor() {

    
    super();
    this.state = {
      email:'',
      password:''
    };
  }

  

  componentDidMount() {
    const clientId ="102143246081-iqodvc2om9ecjrcgdecfindnmpicu06i.apps.googleusercontent.com";
    const initClient = () => {
      gapi.client.init({
      clientId: clientId,
      scope: ''
    });
 };
 gapi.load('client:auth2', initClient);
    if(localStorage.getItem("token"))
    {

    
    const token = localStorage.getItem("token");
    if(token)
    {
      window.location.href = "/create-request";
    }
    const u = jwtDecode(token);
    console.log(u.id);
  }
}




responseSuccess = res => {
  console.log(res.tokenId);
  axios
    .post('/api/users/google-login', {token:res.tokenId})
    .then(res => {
      this.setState({
        email:'',
        password:''
      });
      //alert(res.status);
      if(res.status==200)
      {
      alert(res.data.msg);
      window.location.href = "/create-request"; 
      //window.location.href = "http://localhost:3000/create-request"; 
      }
      else
      {
        alert(res.err);
      }
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.name);
    })
    .catch(err => {
      alert("Error=>"+err);
      console.log("Error in CreateBook!");
    })

}

responseFailure = res =>{
  console.log('fail=>'+res);

}






  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      email:this.state.email,
      password:this.state.password,
      
    };

    axios
      .post('/api/users/login', data)
      .then(res => {
        this.setState({
          email:'',
          password:''
        });
        //alert(res.status);
        if(res.status==200)
        {
        window.location.href = "/create-request"; 
        //window.location.href = "http://localhost:3000/create-request"; 
        }
        else
        {
          alert(res.data.msg);
        }
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.name);
      })
      .catch(err => {
        alert('Email/Password Mismatch');
        console.log("Error in CreateBook!");
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
      <Headermain/>
      <div className='col-md-12 banner-header'><h1 className="lang">Lorem Ipsum</h1></div>
      <div className="middle-section">
        <div className="middle">
        <div className="row">
          <div className="col-md-7 right_section login">
            
          <div className="content-right">
          <h3 className="lang">Sign in</h3>
<div className="social"><li><a href="#"><img src="img/fb.png"/></a></li><li><GoogleLogin 
    clientId="102143246081-iqodvc2om9ecjrcgdecfindnmpicu06i.apps.googleusercontent.com" buttonText=""  
    className ={"google_login"}
    icon = {false}
    onSuccess={this.responseSuccess}
    onFailure ={this.responseFailure}
    /></li><li><a href="#"><img src="img/in.png"/></a></li></div>
<div className="form-register"><p className="lang">or use your email account :</p>
<form noValidate onSubmit={this.onSubmit}>
<input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.onChange}/>
<input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
<p><Link to="/forgot-password">Forgot your password</Link></p>
<input name="submit" value="Sign in" type="submit" className="button-nav"/>
</form>
</div>
            </div>
          </div>
          <div className="col-md-5 left_section login">
          <div className="content-left">
<h3 className="lang">Hello, Friend!</h3>
<p className="lang">Enter your personal details<br/>and start journey with us </p>
<Link to="/" className="button-nav1 lang">
                  Sign Up
              </Link>
          </div>
          </div>
        </div>
        </div>
      </div>
	  </div>
    );
  }
}

export default UserLogin;