import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios'
import Dashhead from '../Dashhead/Dashhead'
import {useForm} from 'react-hook-form'
import { DataGrid } from '@mui/x-data-grid';
import SimpleSnackbar from '../utils/Snackbar'
function CreateCategory(props) {
    const [category,setCategory]=React.useState("")
    const [cost,setCost] = React.useState("")
    const {register,handleSubmit,formState:{errors}}=useForm()
    const [error,setError]=React.useState("")
    const [open,setOpen]=React.useState(false)
    console.log(category.length);

    const handleCategory = ()=>{
       
    }

    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/category/all-category`)
        .then(res=>{
            console.log("all category",res);
            if(res.data.result.length>0){
                let arr = res.data.result.map((item,index)=>({id:index+1,...item}))
                setCategory(arr);
            }
        })
        .catch(err=>{
            console.log(err);
            setError("Something went wrong")
        })
    },[open])

    const onSubmit = (data)=>{
        console.log(data);
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/category/create-category`,{name: data.category,approximation:data.cost,_id:data.categoryid })
        .then(res=>{
            console.log(res);
            if(res.data.msg==="Success"){
                setOpen(true)
            }

        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className="">
        <div className="row">
            <div className="col-2">
                <Dashhead id="5" />
            </div>

            <div className="col-10 container100 vendordiv">
                <SimpleSnackbar open={open} setOpen={setOpen} message="Category added" />
                <h1>Add Categories</h1>
            
            <form onSubmit={handleSubmit(onSubmit)}>
            <TextField className="my-3" {...register('categoryid')} fullWidth id="outlined-basic" label="category object id (optional)" variant="outlined" />
            <TextField error={errors.category?true:false} className="my-3" {...register('category',{required:true})} fullWidth id="outlined-basic" label="category" variant="outlined" />
            <TextField error={errors.cost?true:false} className="my-3" {...register('cost',{required:true})} fullWidth  id="outlined-basic" label="approximate cost ($)" variant="outlined" />
            <div style={{textAlign:"center"}}>
            <Button className="btn" variant='contained' type="submit">Add Category</Button>
            </div>
            </form>
            <div className="m-auto" style={{ height: 400, width: '80%' }}>
      <DataGrid
        rows={category}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>





            </div>
            </div>    
        </div>
    )
}

export default CreateCategory
const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: '_id', headerName: 'Object Id', width: 350 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'approximation', headerName: 'Cost Approximation', width: 200 },
    
  ];
  
  