import React, { Component } from 'react';
import '../App.css';
import '../script.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Headeradmintop extends Component {
  constructor() {
    super();
    this.state = {
      phone:''
    };

  }

changeLang=()=>{
  //alert('entered');
  const token = localStorage.getItem("lang");
  if(token=='fr')
  {
    var elements = document.getElementsByClassName('lang');
    //alert(window.location.href);
    Array.prototype.forEach.call(elements, function(element) {
      if(element.innerHTML!=null || element.innerHTML=='') {
      const data = {
        content:element.innerHTML
      };
      axios
      .post('/api/requests/translate',data)
      .then(res => {
        //alert(res.data.data);
        //console.log(res.data.data);
        element.innerHTML=res.data.data;
      })
      .catch(err =>{
        console.log('Error from ServiceList');
      })
    
      }
    
    
    });   
  }
  else
  {
    var elements = document.getElementsByClassName('lang');
    //alert(window.location.href);
    Array.prototype.forEach.call(elements, function(element) {
      if(element.innerHTML!=null || element.innerHTML=='') {
      const data = {
        content:element.innerHTML
      };
      axios
      .post('/api/requests/translate1',data)
      .then(res => {
        //alert(res.data.data);
        //console.log(res.data.data);
        element.innerHTML=res.data.data;
      })
      .catch(err =>{
        console.log('Error from ServiceList');
      })
    
    
      }
    
    });  
  }
  

}

  componentDidMount() {
  //this.changeLang();
  
  this.interval = setTimeout(this.changeLang,3000);  
      
  };
  componentWillUnmount() {
    // Clear the interval right before component unmount
    clearInterval(this.interval);
}
  

  handleClick() 
  {   
    //alert(window.location.href); 
    if(window.location.href=="https://sample-mer.herokuapp.com/admin/phome")
    {
      //alert("ttt");
      window.location.href = "/admin/frphome";
    }
    else if(window.location.href=="https://sample-mer.herokuapp.com/admin/home")
    {
      window.location.href = "/admin/frhome";
    }
    

    document.getElementById("loader-container").style.display = "block";
    localStorage.setItem('lang', 'fr');
   // Translate API 
var elements = document.getElementsByClassName('lang');
//alert(window.location.href);
Array.prototype.forEach.call(elements, function(element) {
  if(element.innerHTML!=null || element.innerHTML=='') {
  const data = {
    content:element.innerHTML
  };
  axios
  .post('/api/requests/translate',data)
  .then(res => {
    //alert(res.data.data);
    //console.log(res.data.data);
    element.innerHTML=res.data.data;
    
  })
  .catch(err =>{
    console.log('Error from ServiceList');
  })


  }

}); 
setTimeout(function(){document.getElementById('loader-container').style.display="none"},10000);  
  };


  handleClick1() 
  {   
    if(window.location.href=="https://sample-mer.herokuapp.com/admin/frhome")
    {
      window.location.href = "/admin/home";
    }
    else if(window.location.href=="https://sample-mer.herokuapp.com/admin/frphome")
    {
      //alert("ttt");
      window.location.href = "/admin/phome";
    } 
    document.getElementById("loader-container").style.display = "block";
    localStorage.setItem('lang', 'en');
    //alert('ttt');
   // Translate API 
var elements = document.getElementsByClassName('lang');
//alert(window.location.href);
Array.prototype.forEach.call(elements, function(element) {
  if(element.innerHTML!=null || element.innerHTML=='') {
  const data = {
    content:element.innerHTML
  };
  axios
  .post('/api/requests/translate1',data)
  .then(res => {
    //alert(res.data.data);
    //console.log(res.data.data);
    element.innerHTML=res.data.data;
  })
  .catch(err =>{
    console.log('Error from ServiceList');
  })

  }


}); 
setTimeout(function(){document.getElementById('loader-container').style.display="none"},10000);
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
      <>
      <div id="loader-container">
      <div className="loader"></div>
   </div>
      <div className="dashboard-top-header">
      <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          
        <Link to='/'><img src="/img/logo-final.png" width="90"/></Link>
        </div>
        <div className="col-md-7">
      
        </div>
        <div className="col-md-3 language">
          
        <button onClick={this.handleClick1}><img src='/en.png'/></button>
          <button onClick={this.handleClick}><img src='/fr.png'/></button>
          
        </div>
      </div>
      </div>
      </div>
        </>
        
    );
  }
}

export default Headeradmintop;