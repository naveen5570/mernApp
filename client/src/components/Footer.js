import React, { Component } from 'react';
import '../App.css';
import '../Style.css';
import '../script.js';
import { Link } from 'react-router-dom';

class Footer extends Component {
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
      <footer>
      <div className="container">
      <div className="row">
      <div className="col-md-3">
      <h4></h4>	
      <p><img src="/img/phn.png"/>1800-295-45678</p><p><img src="/img/email.png"/>info@gmail.com</p><p><img src="/img/footer-add.png"/>Toronto, Canada</p></div>
      <div className="col-md-2">
      <h2>Our Links</h2>
      <ul>
      <li><a href="#" className="lang">Home</a></li>
      <li><a href="#" className="lang">About Us</a></li>
      <li><a href="#" className="lang">Contact</a></li>
      <li><a href="#" className="lang">News</a></li>
      <li><a href="#" className="lang">Pages</a></li>
      </ul>
      </div>
      <div className="col-md-3">
      <h2>Our Services</h2>
      <ul>
      <li><a href="#" className="lang">Plumbing Services</a></li>
      <li><a href="#" className="lang">Carpenter Services</a></li>
      <li><a href="#" className="lang">Pest Control Services</a></li>
      <li><a href="#" className="lang">Roofing Services</a></li>
      <li><a href="#" className="lang">AC Repair and Services</a></li>
      <li><a href="#" className="lang">Electrician Services</a></li>
      <li><a href="#" className="lang">Cleaning and DisInfection Services</a></li>
      </ul>	
      </div>
      <div className="col-md-4">
      <h3 className="lang">Subscribe To Our Newsletter</h3>
      <input type="text" /> <input type="submit" className="btn btn-success"/>
      <div className="social"><a href="#"><img src="/img/fb-footer.png"/></a><a href="#"><img src="/img/twitter.png"/></a><a href="#"><img src="/img/insta.png"/></a></div>
      </div>
      </div>	
      </div>	
      <div className="footer_bottom"><p className="lang">Copyright 2021. All rights are reserved.</p></div>
      </footer>
        
        
    );
  }
}

export default Footer;