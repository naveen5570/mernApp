import React, { Component } from 'react';
import '../../../App.css';
import '../../../script.js';
import { Link } from 'react-router-dom';

class Headeradmintop extends Component {
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
      <div className="dashboard-top-header">
      <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          
        <Link to='/'><img src="../img/logo.jpg" alt="logo"/></Link>
        </div>
        <div className="col-md-7">
      
        </div>
        <div className="col-md-3">
          <select name="language" id="language">
           <option value="English" >English</option>
           <option value="French" selected="selected">French</option> 
          </select>
        </div>
      </div>
      </div>
      </div>
        </>
        
    );
  }
}

export default Headeradmintop;