import React, { Component } from 'react';
import '../App.css';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import Headertop from './Headermain';

class PotpVerify extends Component {
  constructor() {
    super();
    this.state = {
      phone:''
    };
  }



  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      phone: this.state.phone
    };

    axios
      .post('/api/users',data)
      .then(res => {
        this.setState({
          phone: ''
        });
        //alert(res.data.msg);
        window.location.href = "/create-request";
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
      <Headertop/>
      
      <div className='col-md-12 banner-header'><h1 className="lang">Lorem Ipsum</h1></div>
      <div className="middle-section">
        <div className="middle">
        <div className="row">
          <div className="col-md-5 left_section">
            <div className="content-left">
<h3 className='title lang'>Verify Your Phone Number!</h3>

          </div></div>
          <div className="col-md-7 right_section">
          <div className="content-right">
          <h3 className='title_right lang'>Please Enter One-Time Password To Verify Your Account</h3>

<div className="form-register"><p className="lang">A one-time password has been sent to your phone number</p>
<form noValidate onSubmit={this.onSubmit}>
<div id="divOuter">
    <div id="divInner">
        <input id="partitioned" type="text" maxlength="6" />
    </div>
</div>

</form>

</div>
<Link className="button-nav otp lang" to="/professional-thanks-signup">Validate</Link>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    );
  }
}

export default PotpVerify;