import React, { Component } from 'react';
import '../App.css';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Stripe from 'react-stripe-checkout';
import Headermain from './Headermain';

class UserRegister extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email:'',
      password:''
    };
  }
  componentDidMount() {
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


  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      email:this.state.email,
      password:this.state.password,
      otp_verified:"0"
    };

    axios
      .post('/api/users',data)
      .then(res => {
        this.setState({
          name: '',
          email:'',
          password:''
        });
        //alert(res.data.msg);
        if(res.status==200)
        {
        window.location.href = "/phone-otp"; 
        }
        else
        {
          alert(res.data.msg);
        }
      })
      .catch(err => {
        alert(err.data.msg);
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
          <div className="col-md-5 left_section">
            <div className="content-left">
<h3 className="lang">Welcome Back!</h3>
<p className="lang">To keep connected with us please<br/>login with your personal info </p>
<Link to="/login" className="button-nav lang">
                  Sign in
              </Link>
          </div></div>
          <div className="col-md-7 right_section">
          <div className="content-right">
          <h3 className="lang">Create Account</h3>
<div className="social"><li><a href="#"><img src="img/fb.png"/></a></li><li><a href="#"><img src="img/g+.png"/></a></li><li><a href="#"><img src="img/in.png"/></a></li></div>
<div className="form-register"><p className="lang">or use your email for registration :</p>
<form noValidate onSubmit={this.onSubmit}>
<input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.onChange}/>
<input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.onChange}/>
<input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
<input name="submit" value="Sign up" type="submit" className="button-nav"/>
</form>

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

export default UserRegister;