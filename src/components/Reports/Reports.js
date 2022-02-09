import React from 'react'
import Dashhead from '../Dashhead/Dashhead';
import axios from 'axios'
import moment from 'moment'
import "./Reports.scss"
import { DataGrid } from '@mui/x-data-grid';
const Reports = (props) => {
    const [data,setData] = React.useState([])
    const divref = React.useRef(null)
    console.log(divref);
    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/report/all-report`,{headers:{token:process.env.REACT_APP_TOKEN}})
        .then(res=>{
            console.log(res);
            if(res.data.result.length >0){
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
                    <Dashhead id="3" />
                </div>

                <div className="col-10 container100" ref={divref}>
                    <h1 className="heading" style={{textAlign:"center"}}>Reports</h1>
                    <div className="m-auto" style={{ height: '80%', width: '80%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={12}
                        rowsPerPageOptions={[5]}
                        onRowClick={(para)=>props.history.push("/reportdetail",para.row)}
                    />
                    </div>

                    
                    
                </div>

            </div>
        </div>
    );
}

export default Reports;
const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'collectionName', headerName: 'Collection', width: 350 },
    { field: 'reason', headerName: 'Reason', width: 300 },
    { field: 'createdAt', headerName: 'Time', width: 300 },
    { field: 'status', headerName: 'Status', width: 200 },
    
  ];

  //<td data-label="Time">{moment.parseZone(item.createdAt).local().format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
  //