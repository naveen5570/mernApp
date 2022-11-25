import React, { Component } from 'react';
import '../App.css';
import '../script.js';
import { Link } from 'react-router-dom';

class Header extends Component {
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
        <ul><li><Link to="/professional-dashboard" className="lang">Dashboard </Link></li>
            <li><Link to="/request-list" className="lang">Open Requests</Link></li>
            <li><Link to="/applied-requests" className="lang">Applied Requests</Link></li>
            <li><Link to="/professional-active-requests" className="lang">Active Requests</Link></li>
            <li><Link to="/completed-requests" className="lang">Completed Requests</Link></li>
            <li><Link to="/" className="lang">My Ratings</Link></li>
            <li><Link to="/view-professional-profile" className="lang">My Profile</Link></li>
            <li><Link to="/professional-logout" className="lang">Logout</Link></li>
        </ul>
        </div>
        
        </div>
        
        
    );
  }
}

export default Header;