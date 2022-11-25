import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';




import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import ProfessionalRegister from './components/ProfessionalRegister';
import ProfessionalLogin from './components/ProfessionalLogin';
import Professional from './components/Professional';
import Request from './components/Request';
import OtpPhone from './components/OtpPhone';
import OtpVerify from './components/OtpVerify';
import PotpVerify from './components/PotpVerify';
import ThanksSignup from './components/ThanksSignup';
import PthanksSignup from './components/PthanksSignup';
import RequestCreated from './components/RequestCreated';
import RequestList from './components/RequestList';
import ApplicationList from './components/RequestApplication';
import ProfileUpdated from './components/ProfileUpdated';
import ProfessionalOtpVerify from './components/ProfessionalOtpVerify';
import ProfessionalOtpPhone from './components/ProfessionalOtpPhone';
import ProfessionalApplyRequestForm from './components/ProfessionalApplyRequestForm';
import ViewApplication from './components/ViewApplication';
import StripeRegister from './components/StripeRegister';
import UserCart from './components/UserCart';
import AppliedRequest from './components/AppliedRequest';
import CompletedRequest from './components/CompletedRequest';
import ViewProfessionalProfile from './components/ViewProfessionalProfile';
import ViewRequest from './components/ViewRequest';
import ViewRequestUser from './components/ViewRequestUser';
import PendingRequests from './components/PendingRequests';
import RequestApplicationsList from './components/RequestApplicationsList';
import UserLogout from './components/UserLogout';
import ProfessionalLogout from './components/ProfessionalLogout';
import HiredSuccessfully from './components/HiredSuccessfully';
import ActiveRequests from './components/ActiveRequests';
import ProfessionalActiveRequests from './components/ProfessionalActiveRequests';
import UserViewProfessionalProfile from './components/UserViewProfessionalProfile';
import AdminViewProfessionalProfile from './components/AdminViewProfessionalProfile';
import AdminProfessionalList from './components/AdminProfessionalList';
import AdminUserList from './components/AdminUserList';
import AdminRequestList from './components/AdminRequestList';
import Home from './components/pages/Home';
import Phome from './components/pages/Phome';
import Adminhome from './components/Adminhome';
import Adminphome from './components/Adminphome';
import AdminLogout from './components/AdminLogout';
import AddService from './components/AddService';
import ServiceList from './components/ServiceList';
import DeleteService from './components/DeleteService';
import EditService from './components/EditService';
import ApproveProfessional from './components/ApproveProfessional';
import DisapproveProfessional from './components/DisapproveProfessional';
import DisapprovedProfessional from './components/DisapprovedProfessional';
import WaitingForApproval from './components/WaitingForApproval';
import UpdateProfessionalProfile from './components/UpdateProfessionalProfile';
import UserDashboard from './components/UserDashboard';
import ProfessionalDashboard from './components/ProfessionalDashboard';

// French routes

import Frhome from './components/fr/Home';
import Frphome from './components/fr/Phome';
import Adminfrhome from './components/fr/admin/Adminfrhome';
import Adminfrphome from './components/fr/admin/Adminfrphome';

const App = () => {
  return (
    
    <Router>
    <div className="App">
      <Routes>
          
          <Route path='/' element={<Home/>} />
          <Route path='/professional' element={<Phome/>} />
          <Route path='/register' element= {<UserRegister/>} />
          <Route path='/login' element={<UserLogin/>} />
          <Route path='/admin' element={<AdminLogin/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          
          <Route exact path='/register-as-professional' element={<ProfessionalRegister/>} />
          <Route exact path='/login-as-professional' element={<ProfessionalLogin/>} />
          <Route exact path='/professional-profile' element={<Professional/>} />
          <Route exact path='/create-request' element={<Request/>} />
          <Route exact path='/phone-otp' element={<OtpPhone/>} />
          <Route exact path='/otp-verify' element={<OtpVerify/>} />
          <Route exact path='/professional-otp-verify' element={<PotpVerify/>} />
          <Route exact path='/professional-phone-otp' element={<ProfessionalOtpPhone/>} />
          <Route exact path='/professional-otp-verify' element={<ProfessionalOtpVerify/>} />
          <Route exact path='/thanks-signup' element={<ThanksSignup/>} />
          <Route exact path='/professional-thanks-signup' element={<PthanksSignup/>} />
          <Route exact path='/request-created' element={<RequestCreated/>} />
          <Route exact path='/profile-updated' element={<ProfileUpdated/>} />
          <Route exact path='/request-list' element={<RequestList/>} />
          <Route exact path='/application-list/:id' element={<ApplicationList/>} />
          <Route exact path='/view-application/:id' element={<ViewApplication/>} />
          <Route  path='/request-apply/:id' element={<ProfessionalApplyRequestForm/>} />
          <Route  path='/stripe-connect' element={<StripeRegister/>} />
          <Route path='/hire/:id' element={<UserCart/>} />
          <Route exact path='/applied-requests' element={<AppliedRequest/>} />
          <Route exact path='/completed-requests' element={<CompletedRequest/>} />
          <Route exact path='/view-professional-profile' element={<ViewProfessionalProfile/>} />
          <Route exact path='/view-professional/:id' element={<UserViewProfessionalProfile/>} />
          <Route exact path='/admin/view-professional/:id' element={<AdminViewProfessionalProfile/>} />
          <Route exact path='/view-request/:id' element={<ViewRequest/>} />
          <Route exact path='/user-view-request/:id' element={<ViewRequestUser/>} />
          <Route exact path='/pending-requests' element={<PendingRequests/>} />
          <Route exact path='/request-applications-list' element={<RequestApplicationsList/>} />
          <Route exact path='/user-logout' element={<UserLogout/>} />
          <Route exact path='/professional-logout' element={<ProfessionalLogout/>} />
          <Route exact path='/hired-successfully' element={<HiredSuccessfully/>} />
          <Route exact path='/user-active-requests' element={<ActiveRequests/>} />
          <Route exact path='/professional-active-requests' element={<ProfessionalActiveRequests/>} />
          <Route exact path='/admin/professionals-list' element={<AdminProfessionalList/>} />
          <Route exact path='/admin/user-list' element={<AdminUserList/>} />
          <Route exact path='/admin/request-list' element={<AdminRequestList/>} />
          <Route exact path='/admin/home' element={<Adminhome/>} />
          <Route exact path='/admin/phome' element={<Adminphome/>} />
          <Route exact path='/admin/logout' element={<AdminLogout/>} />
          <Route exact path='/admin/add-service' element={<AddService/>} />
          <Route exact path='/admin/service-list' element={<ServiceList/>} />
          <Route exact path='/admin/delete-service/:id' element={<DeleteService/>} />
          <Route exact path='/admin/edit-service/:id' element={<EditService/>} />
          <Route exact path='/admin/approve-professional/:id' element={<ApproveProfessional/>} />
          <Route exact path='/admin/disapprove-professional/:id' element={<DisapproveProfessional/>} />
          <Route exact path='/disapproved-professional' element={<DisapprovedProfessional/>} />
          <Route exact path='/waiting-for-approval' element={<WaitingForApproval/>} />
          <Route exact path='/update-professional-profile' element={<UpdateProfessionalProfile/>} />
          



          <Route path='/fr' element={<Frhome/>} />
          <Route path='/fr/professional' element={<Frphome/>} />
          <Route exact path='/admin/frhome' element={<Adminfrhome/>} />
          <Route exact path='/admin/frphome' element={<Adminfrphome/>} />
          <Route exact path='/user-dashboard' element={<UserDashboard/>} />
          <Route exact path='/professional-dashboard' element={<ProfessionalDashboard/>} />
          
          </Routes>
      
    </div>
    </Router>
  );


};

export default App;
