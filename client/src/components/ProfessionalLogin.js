import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import Headermain from './Headermain';

class UserLogin extends Component {
  
  constructor() {
    super();
    this.state = {
      email:'',
      password:''
    };
  }
  componentDidMount() {
    if(localStorage.getItem("professional-token"))
    {

    
    const token = localStorage.getItem("professional-token");
    if(token)
    {
      window.location.href = "/request-list";
    }
    const u = jwtDecode(token);
    console.log(u.id);
  }
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
      .post('/api/professionals/login', data)
      .then(res => {
        this.setState({
          email:'',
          password:''
        });
        //alert(res.data.msg);
        //window.location.href='/';
        //setLoginUser(res.data.user);
        localStorage.setItem('professional-token', res.data.token);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('p_status',res.data.status);
        localStorage.setItem('d_reason',res.data.d_reason);
        
        if(res.status===200)
        {
          console.log(res.data.city);
        if(res.data.city!== undefined)
        {
        window.location.href = "/request-list"; 
        }
        else
        {
          window.location.href = "/professional-profile";   
        }
        }
        else
        {
          alert(res.data.msg); 
        }
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
<Link to="/register-as-professional" className="button-nav1 lang">
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