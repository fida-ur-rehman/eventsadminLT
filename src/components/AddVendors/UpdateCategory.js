import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios'
import Dashhead from '../Dashhead/Dashhead'
import {useForm} from 'react-hook-form'
import { DataGrid } from '@mui/x-data-grid';
import SimpleSnackbar from '../utils/Snackbar'
import {connect} from 'react-redux'
function UpdateCategory(props) {
    console.log(props);
    const [category,setCategory]=React.useState("")
    const [cost,setCost] = React.useState("")
    const {register,handleSubmit,formState:{errors},setValue}=useForm()
    const [error,setError]=React.useState("")
    const [open,setOpen]=React.useState(false)
    console.log(category.length);

    const handleCategory = ()=>{
       
    }

    React.useEffect(()=>{   
        setValue("category",props.location.state.name)
        setValue("cost",props.location.state.approximation)
    },[])

    const onSubmit = (data)=>{
        console.log(data);
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/category/create-category`,{name: data.category,approximation:data.cost,_id:props.location.state._id })
        .then(res=>{
            console.log(res);
            if(res.data.msg==="Success"){
                setOpen(true)
                props.history.push("addcategories")
            }

        })
        .catch(err=>{
            console.log(err);
        })
    }

    const handleDelete = ()=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/category/delete-category`,{categoryId:props.location.state._id})
        .then(res=>{
            console.log(res);
            props.history.push("addcategories")
            
        })
        .catch(err=>{
            console.log(err.response);
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
                <h1>Update Category</h1>
            
            <form onSubmit={handleSubmit(onSubmit)}>
            <TextField error={errors.category?true:false} className="my-3" {...register('category',{required:true})} fullWidth id="outlined-basic" label="category" variant="outlined" />
            <TextField error={errors.cost?true:false} className="my-3" {...register('cost',{required:true})} fullWidth  id="outlined-basic" label="approximate cost ($)" variant="outlined" />
            <div style={{textAlign:"center"}}>
            <Button className="btn" variant='contained' type="submit">update Category</Button>
            </div>
            </form>
        
            <div style={{textAlign:"center"}}>
               <h1>Or delete category</h1>
               <p>Name: {props.location.state.name}</p>
               <p>Approximation: {props.location.state.approximation}</p>
               <Button onClick={()=>handleDelete()} variant="contained" color="error">Delete</Button>
            </div>




            </div>
            </div>    
        </div>
    )
}


const mapStateToProps = ({EventUser})=>{
    return {
        user:EventUser
    }
}

export default connect(mapStateToProps)(UpdateCategory)
const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: '_id', headerName: 'Object Id', width: 350 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'approximation', headerName: 'Cost Approximation', width: 200 },
    
  ];
  
  