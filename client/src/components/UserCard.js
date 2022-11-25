import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const UserCard = (props) => {
    const  reqq  = props.reqq;

    return(
        <>
                
                
                <tr>
                <td className="lang">{ reqq.name }</td>
                <td className="lang">{ reqq.email }</td>
                <td className="lang">{ reqq.createdAt }</td>
                <td><Link className="lang" to={`/view-Professional/${reqq._id}`} >View</Link></td>
                </tr>

                
                
                </>   
            
    )
};

export default UserCard;