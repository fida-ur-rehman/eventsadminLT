import React from 'react';
import "./Reports.scss"
import Dashhead from '../Dashhead/Dashhead';
import axios from 'axios'
import ModalExampleBasic from '../utils/ModalExampleBasic'
import moment from 'moment'
const ReportDetail = (props) => {
    
    let detail = props.location.state;
    console.log(detail)
    const [bid,setBid]= React.useState([])
    const [event,setEvent]=React.useState([])
    React.useEffect(()=>{
        if(detail.collectionName==="Bid"){
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/bid/single-bid`,{bidId:detail.itemId},{headers:{token:process.env.REACT_APP_TOKEN}})
            .then(res=>{
                console.log(res);
                if(res.data.result){
                    setBid(res.data.result)
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }else if(detail.collectionName==="Event"){
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/event/single-event`,{eventId:detail.itemId},{headers:{token:process.env.REACT_APP_TOKEN}})
            .then(res=>{
                if(res.data.result){
                    setBid(res.data.result)
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }else if(detail.collectionName==="User"){

        }
    },[])
    console.log("bid",bid);

    const renderContent = ()=>{
        //Object.keys(bid).length>2
        if(detail.collectionName==="Bid"){
            return <div>
            <p>{bid.description}</p>
            <p>Event Id: {bid.eventId}</p>
            <table className="ui celled table">
    <thead>
        <tr>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Price</th>
            <th>Quantity</th>
        </tr>
    </thead>
    <tbody>
            {
                bid.services.length>0?(
                    bid.services.map((item,index)=>(
                        <tr>
            <td>{item.category}</td>
            <td>{item.subCategory}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
        </tr>
                    ))
                ):null
            }
              </tbody>
</table>
        </div>
        }else if(detail.collectionName==="Event"){
            return <div>
            <p><b>Event Name: </b>{bid.name}</p>
            <p><b>Event Email: </b>{bid.email}</p>
            <p><b>Event description: </b>{bid.description}</p>
            <p><b>Event address: </b>{bid.eventAddress}</p>
            <p><b>Organizer name: </b>{bid.organiserName}</p>
            <p><b>Organizer Id : </b>{bid.organiserId}</p>
            </div>
        }
    }

    const handleDelete = ()=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/report/delete-report-item`,{itemId:detail.itemId,reportId:detail._id,collectionName:detail.collectionName})
        .then(res=>{
        props.history.push("/home")
            console.log(res);
        })
        .catch(err=>{
            console.log(err.response);
        })
    }

    return (
        <div>
            <div className="row">
                <div className="col-2">
                <Dashhead id="3" />
                </div>
                <div className="col-10">
                
                <div className="row" style={{marginTop:30}}>
                <h1 className="col-8 report-detail-heading">Report Details</h1>
                {detail.status!=="Deleted"?<ModalExampleBasic component={<span className="bid"><i class="fa fa-trash" aria-hidden="true"></i></span>}
                                title="Delete Bid"
                                handleDelete = {handleDelete}
                                description="Are you sure, you want to delete this bid?"
                                />:null}
                </div>
                <h2>{detail.collectionName}</h2>
                <h3>{detail.reason}</h3>
                <h4>{moment.parseZone(detail.createdAt).local().format("dddd, MMMM Do YYYY, h:mm:ss a")}</h4>

                
                        
                  {
                      renderContent()
                  }





                </div>
            </div>
            
        </div>
    );
}

export default ReportDetail;