import React, { Component } from 'react';
import '../App.css';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Headertop from './Headeradmintop';

class WaitingForApproval extends Component {
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
        alert(res.data.msg);
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

    const d_reason = localStorage.getItem("d_reason");
    return (
      <div>
      <Headertop/>
      
      
      <div className='container-fluid'>
      <div className='row'>
      
        <Header />
        <div className='col-md-10 menu-right'>
        <div className="dashboard-right thanks_msg">
        <div className="content-left">
                <h3 className="lang">Registration Successful!</h3>
<h5 className="lang">Your Registration is completed successfully. Please wait for the admin to approve your registration.</h5>

          </div></div>
          
        </div>
        </div>
      </div>
      </div>
    );
  }
}

export default WaitingForApproval;