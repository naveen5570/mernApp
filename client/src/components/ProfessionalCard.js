import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const ProfessionalCard = (props) => {
    const  reqq  = props.reqq;

    return(
        <div className="card-container col-md-12">
           <div className="desc list_container">
                <h1 className="list_title">
                    <Link to={'/admin/view-professional/'+reqq._id} className="lang">
                        { reqq.name }
                    </Link>
                    
                </h1>
                <p className="lang1">{ reqq.specialisation } </p><p className="lang">{ reqq.createdAt }</p>
                
                 
                  
                 
                 
                 
{(function(){
    if (reqq.status==1) {
        return <Link to={`/admin/disapprove-professional/${reqq._id}`} className="btn btn-info btn-right lang">disapprove</Link>
    } else if (reqq.status==2) {
        return <Link to={`/admin/approve-professional/${reqq._id}`} className="btn btn-info btn-right lang">Approve</Link>
    } else {
        return <><Link to={`/admin/disapprove-professional/${reqq._id}`} className="btn btn-info btn-right lang">disapprove</Link><span className="btn-right">&nbsp;</span><Link to={`/admin/approve-professional/${reqq._id}`} className="btn btn-info btn-right lang">Approve</Link></>
    }
}).call(this)}
            </div>

        </div>
    )
};

export default ProfessionalCard;