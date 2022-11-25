import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const AdminRequestListCard = (props) => {
    const  reqq  = props.reqq;

    return(
        <>
                
                
                <tr>
                <td className="lang">{ reqq.specialisation }</td>
                <td className="lang">{ reqq.address_1 }</td>
                
                <td><Link to={`/view-Professional/${reqq._id}`} className="lang">View</Link></td>
                </tr>

                
                
                </>   
            
    )
};

export default AdminRequestListCard;