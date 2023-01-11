import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import ReqCard from './ReqCard';
import Header from './Header';
import Headertop from './Headeradmintop';
import {getDistance, getPreciseDistance} from 'geolib';


class RequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqqs: [],
      prof:[],
      p_lat: '',
      p_long:''
    };
  }


  
  componentDidMount() {
    const token = localStorage.getItem("professional-token");
    axios.get('/api/professionals/get-professional/'+token).then(res => {
      this.setState({
        prof: res.data
       });
       const f1_address = res.data.office_address+" "+res.data.state_or_province+" "+res.data.country+" "+res.data.zipcode;
       //console.log(f1_address);
       axios
             .get('http://api.positionstack.com/v1/forward?access_key=f0933b9c4cbdd1c4f51a52efefebe1dd&query='+f1_address)
             .then(res1=>{
             console.log('latitude11=>'+res1.data.data[0].latitude);
             localStorage.setItem("p-lat",res1.data.data[0].latitude);
             localStorage.setItem("p-long",res1.data.data[0].longitude);
             
             
             })
             .catch(err1=>{
             console.log('location api not working');
             });
               
       
       if(res.data.status==2)
    {
    window.location.href="/disapproved-professional";
    }
    else if(res.data.status==0)
    {
    window.location.href='/waiting-for-approval'; 
    }
    else if(res.data.status==3)
    {
    window.location.href='/professional-profile'; 
    }
    })
    .catch(err =>{
      console.log('Error from professional');
    })
    

    
    if(!token)
    {
      window.location.href = "/login-as-professional";
    }
    
    
    axios
      .get('/api/requests/request-list')
      .then(res => {
        //console.log(JSON.stringify(res.data));
        const arr = res.data;
        arr.map(item=>{
//console.log(item.address_1);
const f_address = item.address_1+" "+item.address_2+" "+item.state_or_province+" "+item.zipcode;
//console.log(f_address);
axios
      .get('http://api.positionstack.com/v1/forward?access_key=f0933b9c4cbdd1c4f51a52efefebe1dd&query='+f_address)
      .then(res1=>{
      //console.log('latitude=>'+res1.data.data[0].latitude);
      
      
      console.log ('p_lat=>'+this.state.p_lat);
      var dis = getDistance(
      {latitude: localStorage.getItem("p-lat"), longitude: localStorage.getItem("p-long")},
      {latitude: 51.528308, longitude: -0.3817765},
    );
    console.log('distance=>'+dis/1000);
      })
      .catch(err1=>{
      console.log('location api not working');
      });
        });
        
        this.setState({
          reqqs: res.data
         });
      })
      .catch(err =>{
        console.log('Error from ShowBookList');
      });

    
      
  };
  

  render() {
    
    const reqqs = this.state.reqqs;
    //console.log('render=>'+this.state.p_loc);
    //console.log("PrintBook: " + JSON.stringify(reqqs));
    let reqList;

    if(!reqqs) {
      reqList = "there is no book record!";
    } else {
      reqList = reqqs.map((reqq, k) =>
      <ReqCard reqq={reqq} key={k} />
      );
    }

    return (
      <div>
<Headertop/>
      <div className="container-fluid">
      <div className='row'>
        <Header />
        <div className='col-md-10 menu-right'>
      
      <div className="ShowBookList">
        <div className="container">
          <br/><br/>

          <div className="list">
             {reqList}
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

export default RequestList;