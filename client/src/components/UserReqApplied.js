import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const UserReqApplied = (props) => {
    const  reqq  = props.reqq;

    return(
        <div className="card-container col-md-12">
           <div className="desc list_container">
                <h1 className="list_title">
                    <Link className="lang" to={`/request-apply/${reqq._id}`}>
                        { reqq.repair_explanation }
                    </Link>
                    
                </h1>
                <p className="lang">{ reqq.address_1 } { reqq.address_2 } { reqq.state_or_province } { reqq.zipcode } { reqq.state_or_province } { reqq.country }</p><p>{ reqq.createdAt }</p>
                <Link  to={`/application-list/${reqq._id}`} className="btn btn-info btn-right lang">
                        View
                    </Link>
            </div>

        </div>
    )
};

export default UserReqApplied;