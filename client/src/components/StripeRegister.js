import React, { Component } from 'react';
import '../App.css';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import Stripe from 'react-stripe-checkout';

class UserRegister extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email:'',
      password:''
    };
  }

  


  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  
  render() {

    const handleToken = (totalAmount,token)=>{
      try{
        axios.post("/api/stripe/pay",{
          token: token.id,
          amount: totalAmount
        });
  
      }catch(error){
        console.log(error);
      }
    }
  

    const tokenHandler = (token)=>{
        handleToken(100,token);
      }
    return (
      <div>
      <Stripe stripeKey="pk_test_51KqNoBEsO5lD4LSjMb0558uN5fHcBYw3ANIGpkRx25OOVgRdWffTxNlZTzsvV7PH4ikP18rTuZ8jPQoeeEv2r7oW00MOseB3Be" token={tokenHandler} />
      
      
      </div>
    );
  }
}

export default UserRegister;