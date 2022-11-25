import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';

class AdminLogin extends Component {
  
  constructor() {
    super();
    this.state = {
      email:'',
      password:''
    };
  }
  componentDidMount() {
    if(localStorage.getItem("admin_token"))
    {

    
    const token = localStorage.getItem("admin_token");
    if(token)
    {
      window.location.href = "/admin/professionals-list";
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
      .post('/api/admin/login', data)
      .then(res => {
        this.setState({
          email:'',
          password:''
        });
        //alert(res.status);
        if(res.status==200)
        {
            alert('admin logged in');
        window.location.href = "/admin/professionals-list"; 
        //window.location.href = "http://localhost:3000/create-request"; 
        }
        else
        {
          alert(res.data.msg);
        }
        localStorage.setItem('admin_token', res.data.admin_token);
        localStorage.setItem('admin_name', res.data.admin_name);
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
      <div className="top-header">
      <div className="container">
      <div className="row">
        <div className="col-md-2">
        <Link to='/'><img src="/img/logo.jpg" width="90"/></Link>
        </div>
        <div className="col-md-4  ">
      
        </div>
        <div className="col-md-6">
          <ul><li><Link to="/register-as-professional" className="lang">Register As Professional</Link></li><li><a className='button-nav lang'>Sign Up</a></li></ul>
        </div>
      </div>
      </div>
      </div>
      <div className='col-md-12 banner-header'><h1 className="lang">Lorem Ipsum</h1></div>
      <div className="middle-section">
        <div className="middle">
        <div className="row">
          <div className="col-md-12 right_section login">
            
          <div className="content-right">
          <h3 className="lang">Sign in</h3>
<div className="social"><li><a href="#"><img src="img/fb.png"/></a></li><li><a href="#"><img src="img/g+.png"/></a></li><li><a href="#"><img src="img/in.png"/></a></li></div>
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
          
        </div>
        </div>
      </div>
	  </div>
    );
  }
}

export default AdminLogin;