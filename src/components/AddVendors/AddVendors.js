import React from 'react'
import Dashhead from '../Dashhead/Dashhead'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import "./AddVendors.scss"
import Alert from '@mui/material/Alert'

function AddVendors(props) {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const [error,setError]=React.useState("")
    const onSubmit = (data)=>{
        console.log(data);
        const {name,email,city,organization,address,country,mobileno}=data
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/user/createUser`,{name,email,city,organisation:organization,address,country,mobileNo:mobileno})
        .then(res=>{
        console.log(res);
        props.history.push('addservices',res.data)

        })
        .catch(err=>{
            console.log(err)
            setError("user already exist")
        })
    }
    return (
        <div className="">
            <div className="row">
                <div className="col-2">
                    <Dashhead id="4" />
                </div>

                <div className="col-10 container100 vendordiv">
                    <h1>Add Vendors</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField error={errors.name?true:false} {...register('name',{required:true})} fullWidth className="my-2" id="outlined-basic" variant="outlined" label="Name" />
                    <TextField error={errors.email?true:false} {...register('email',{required:true})} fullWidth className="my-2" id="outlined-basic" variant="outlined" label="Email" />
                    <TextField error={errors.city?true:false} {...register('city',{required:true})} fullWidth className="my-2" id="outlined-basic" variant="outlined" label="City" />
                    <TextField error={errors.mobileno?true:false} {...register('mobileno',{required:true})} fullWidth className="my-2" id="outlined-basic" variant="outlined" label="mobile number (include country code ex +91)" />
                    <TextField error={errors.country?true:false} {...register('country',{required:true})} fullWidth className="my-2" id="outlined-basic" variant="outlined" label="country" />
                    <TextField error={errors.organization?true:false} {...register('organization',{required:true})} fullWidth className="my-2" id="outlined-basic" variant="outlined" label="Organization" />
                    <TextField error={errors.address?true:false} {...register('address',{required:true})} fullWidth className="my-2" id="outlined-basic" variant="outlined" label="Address" />
                    <Button className="btn" type="submit" variant="contained">Submit</Button>
                    </form>

                {error.length>0?<Alert className="alert" severity="error">{error}</Alert>:null}
                    
                </div>



                </div>
                </div>
    )
}

export default AddVendors
