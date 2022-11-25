import React, { Component } from 'react';
import '../App.css';
import '../script.js';
import { Link } from 'react-router-dom';

class Headeruser extends Component {
  constructor() {
    super();
    this.state = {
      phone:''
    };
  }



  
  

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
      <div className="col-md-2 dash_menu">
        <div className="left_menu">
        <ul><li><a className="lang">Dashboard </a></li>
            <li><Link className="lang" to='/create-request'>Create Request</Link></li>
            <li><Link to='/pending-requests' className="lang">Pending Requests</Link></li>
            <li ><Link className="lang" to='/user-active-requests'>Active Requests</Link></li>
            <li><a className="lang">Closed Requests</a></li>
            <li><Link to='/request-applications-list' className="lang">Request Applications</Link></li>
            <li><Link to='/user-logout' className="lang">Logout</Link></li>
        </ul>
        </div>
        
        </div>
        
        
    );
  }
}

export default Headeruser;