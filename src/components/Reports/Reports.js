import React from 'react'
import Dashhead from '../Dashhead/Dashhead';
import axios from 'axios'
import moment from 'moment'
import "./Reports.scss"
const Reports = (props) => {
    const [data,setData] = React.useState([])
    const divref = React.useRef(null)
    console.log(divref);
    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/report/all-report`,{headers:{token:process.env.REACT_APP_TOKEN}})
        .then(res=>{
            console.log(res);
            if(res.data.result.length >0){
                setData(res.data.result)
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
    return (
        <div className="reports">
            <div className="row">
                <div className="col-2">
                    <Dashhead id="3" />
                </div>

                <div className="col-10" ref={divref}>
                    <h1 className="heading">Reports</h1>

                    <div className="tablediv">
                    <table  className="ui celled table">
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Collection</th>
                                        <th>Reason</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                    </tr>
                               </thead>
                    <tbody>
                    {
                        data.length>0?(
                            data.map((item,index)=>(    
                                  <tr onClick={()=>props.history.push("/reportdetail",item)} className="table-row" key={index}>
                                        <td data-label="Sr No">{index+1}</td>
                                        <td data-label="Collection">{item.collectionName}</td>
                                        <td data-label="Reason">{item.reason}</td>
                                        <td data-label="Time">{moment.parseZone(item.createdAt).local().format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
                                        <td data-label="Status">{item.status}</td>
                                        
                                   </tr>
                               
                            ))
                        ):null
                    }
                    </tbody>
                    </table>
                    </div>
                    
                </div>

            </div>
        </div>
    );
}

export default Reports;