import React, { Component } from 'react';
import '../App.css';
import '../script.js';
import { Link } from 'react-router-dom';

class Headeradmin extends Component {
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
      <>
      
      <div className="col-md-2 dash_menu">
        <div className="left_menu">
        <ul><li className="lang"><Link to="/admin">Dashboard </Link></li>
            <li className="lang"><Link to="/admin/professionals-list">Professionals List</Link></li>
            <li className="lang"><Link to="/admin/user-list">Users List</Link></li>
            <li className="lang"><Link to="/admin/request-list">Request List</Link></li>
            <li className="lang"><Link to="/admin/service-list">Service List</Link></li>
            <li className="lang"><Link to="/admin/home">Home</Link></li>
            <li className="lang"><Link to="/admin/phome">Professional Page</Link></li>
            <li className="lang"><Link to="/admin/logout">Logout</Link></li>
        </ul>
        </div>
        
        </div>
        </>
        
    );
  }
}

export default Headeradmin;