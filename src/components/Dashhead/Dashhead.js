import React from 'react';
import "./Dashhead.scss"
import {withRouter} from 'react-router'

const Dashhead = ({id,history,height}) => {
    return (
        <div className="shadow-lg dashhead">
            <h1><i className="fas fa-cogs"></i> Admin</h1>

            <div className="linksdiv">
            <div className={id==="1"?"linkdivActive":"linkdiv"} onClick={()=>history.push("/home")}>
                <p><i className="fas fa-home"></i> <span style={{marginLeft:'10px'}}>Home</span></p>
            </div>


            <div className={id==="3"?"linkdivActive":"linkdiv"} onClick={()=>history.push("/reports")}>
                <p><i className="fas fa-clipboard-list"></i> <span style={{marginLeft:'10px'}}>Reports</span></p>
            </div>

            <div className={id==="4"?"linkdivActive":"linkdiv"} onClick={()=>history.push("/addvendors")}>
                <p><i className="fas fa-clipboard-list"></i> <span style={{marginLeft:'10px'}}>Add Vendors</span></p>
            </div>

            <div className={id==="5"?"linkdivActive":"linkdiv"} onClick={()=>history.push("/addcategories")}>
                <p><i className="fas fa-clipboard-list"></i> <span style={{marginLeft:'10px'}}>Add Categories</span></p>
            </div>

            </div>
        </div>
    );
}

export default withRouter(Dashhead);