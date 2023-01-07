import React from 'react'
import Dashhead from '../Dashhead/Dashhead';
import axios from 'axios'
import moment from 'moment'
import { DataGrid } from '@mui/x-data-grid';
import {connect} from 'react-redux'
const Vendors = (props) => {
    const [data,setData] = React.useState([])
    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/user/vendors`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res);
            if(res.data.result.length>0){
                let arr = res.data.result.map((item,index)=>({id:index+1,...item}))
                setData(arr)
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
                    <Dashhead id="7" />
                </div>

                <div className="col-10 container100">
                    <h1 className="heading" style={{textAlign:"center"}}>Reports</h1>
                    <div className="m-auto" style={{ height: '80%', width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={12}
                        rowsPerPageOptions={[5]}
                    />
                    </div>

                    
                    
                </div>

            </div>
        </div>
    );
}

const mapStateToProps = ({EventUser})=>{
    return {
        user:EventUser
    }
}

export default connect(mapStateToProps)(Vendors);
const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'mobileNo', headerName: 'Mobile No', width: 200 },
    
  ];

  //<td data-label="Time">{moment.parseZone(item.createdAt).local().format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
  //