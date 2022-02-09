import React from 'react'
import Dashhead from '../Dashhead/Dashhead'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useForm} from 'react-hook-form'
import Fab from '@mui/material/Fab';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import "./AddVendors.scss"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import DoneIcon from '@mui/icons-material/Done';
import SimpleSnackbar from '../utils/Snackbar'
import Alert from '@mui/material/Alert'
import {connect} from 'react-redux'
//"61d87a153e5888396864922e"
function AddServices(props) {
    console.log(props);
    const userInfo = props.location.state.result
    const {register,handleSubmit,formState:{errors}}=useForm()
    const [service,setServices]=React.useState([])
    const [unit, setUnit] = React.useState('');
    const SiUnits = ['ml','L','kg','lbs','g','cm','m','inch',"pcs", 'boxes']
    const [mainCategory,setMainCategory] =React.useState([])
    const [open,setOpen]=React.useState(false)
    const [mainCategoryR,setMainCategoryR]=React.useState("")
    const [error,setError]=React.useState("")

    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/category/all-category`)
        .then(res=>{
            console.log("all category",res);
            if(res.data.result.length>0){
                setMainCategory(res.data.result);
            }
        })
        .catch(err=>{
            console.log(err);
            setError("Something went wrong")
        })
    },[])

    console.log(mainCategoryR);
    const handleChange = (event) => {
        setUnit(event.target.value);
      };
    const onSubmit = (data)=>{
        console.log(data);
        //props.history.push('addvendors')
       if(mainCategoryR ==="" || unit ===''){
           setError("Fill all details")
       }else{
        let categoryId=null;
        let arr = mainCategory.filter(item=>item.name===mainCategoryR)
        if(arr.length>0){
            categoryId=arr[0]._id
        }
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/service/admin-createService`,{userId:userInfo._id,mobileNo:userInfo.mobileNo,categoryId:categoryId?categoryId:"",category:mainCategoryR,subCategory:data.subcategory,quantity:data.quantity,unit,price:data.price},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            setOpen(true)
            setServices([...service,res.data.result])
        })
        .catch(err=>{
            console.log(err.response)
            setError("Something went wrong check your inputs")
        })
       }
        //61d3ec1b9efbdd00043c8031
    }

    const handleCreateUser=()=>{
        
    }

    const handleServicesDelete = (item)=>{
        console.log(item);
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/service/admin-delete-service`,{serviceId:item._id},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res);
            let serv = service.filter(it=>it._id!==item._id)
         console.log(serv);
         setServices(serv)
        })
        .catch(err=>{
            console.log(err);
            setError("Something went wrong")
        })
         
        // setServices(serv)
        // let serv = service.filter(it=>it._id!==item._id)
        // console.log(serv);
        // setServices(serv)
    }

    return (
        <div className="">
            <div className="row">
                <div className="col-2">
                    <Dashhead id="4" />
                </div>

                <div className="col-10 container100 vendordiv">
                <SimpleSnackbar open={open} setOpen={setOpen} message="Category added" />
                    <h1>Add Services</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="auto-complete-div">
                        <Autocomplete
                        onInputChange={(e,n)=>setMainCategoryR(n)}
                        id="free-solo-demo"
                        freeSolo
                        options={mainCategory.map((option) => option.name)}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                    />
                    </div>
                    <TextField {...register('subcategory',{required:true})} fullWidth className="my-2" id="outlined-basic" variant="outlined" label="Sub Category" />
                    <TextField {...register('quantity',{required:true})} fullWidth className="my-2" id="outlined-basic" variant="outlined" label="Quantity" />
                    <FormControl className="my-3" fullWidth> 
                    <InputLabel id="demo-simple-select-label">Select Unit</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={unit}
                    label="Select Unit"
                    onChange={handleChange}
                    >
                    
                    {
                        SiUnits.map((item,index)=><MenuItem key={index} value={item}>{item}</MenuItem>)
                    }
                    </Select>
                </FormControl>
                    <TextField {...register('price',{required:true})} fullWidth className="my-2" id="outlined-basic" variant="outlined" label="Price" />
                    {error.length>0?<Alert className="alert" severity="error">{error}</Alert>:null}


                    <div style={{textAlign:"center"}}>
                    <Button className="btn" type="submit" variant="contained">Add Service</Button>
                    </div>


                    </form>
                    <div className="tablediv">
                    <table  className="ui celled table">
                                <thead>
                                    <tr>
                                    <th>Sr No.</th>
                                        <th>Category</th>
                                        <th>Sub Category</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th></th>
                                    </tr>
                               </thead>
                    <tbody>
                    {
                        service.length>0?(
                            service.map((item,index)=>(    
                                   <tr className="table-row" key={index}>
                                        <td data-label="Sr No">{index+1}</td>
                                        <td data-label="Collection">{item.category}</td>
                                        <td data-label="Reason">{item.subCategory}</td>
                                        <td data-label="Time">{item.quantity} {item.unit}</td>
                                        <td data-label="Time">{item.price}</td>
                                        <td onClick={()=>handleServicesDelete(item)}><span className="bid"><i class="fa fa-trash" aria-hidden="true"></i></span></td>
                                   </tr>
                               
                            ))
                        ):null
                    }
                    </tbody>
                    </table>
                    </div>

                    <div style={{position:"fixed",bottom:"5%",right:"5%"}}>
              <Tooltip title="Add Services">
              <Fab 
              onClick={()=>props.history.push("addvendors")} color="primary" variant="extended">
                Done
                <DoneIcon sx={{ ml: 1 }} />
                </Fab>
              </Tooltip>
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

export default connect(mapStateToProps)(AddServices)
