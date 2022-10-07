import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios'
import Dashhead from '../Dashhead/Dashhead'
import {useForm} from 'react-hook-form'
import { DataGrid } from '@mui/x-data-grid';
import SimpleSnackbar from '../utils/Snackbar'
import {connect} from 'react-redux'
import Alert from '@mui/material/Alert'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
function UpdateCategory(props) {
    console.log(props);
    const [category,setCategory]=React.useState("")
    const [cost,setCost] = React.useState("")
    const {register,handleSubmit,formState:{errors},setValue}=useForm()
    const [error,setError]=React.useState("")
    const [open,setOpen]=React.useState(false)
    const [currency,setCurrency]=React.useState("")
    console.log(category.length);

    const handleCategory = ()=>{
       
    }

    React.useEffect(()=>{   
        setValue("category",props.location.state.name)
        setValue("cost",props.location.state.approximation)
        setCurrency(props.location.state.currency)
    },[])

    const onSubmit = (data)=>{
        console.log(data);
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/category/create-category`,{name: data.category,approximation:data.cost,_id:props.location.state._id,currency })
        .then(res=>{
            console.log(res);
            if(res.data.msg==="Success"){
                setOpen(true)
                props.history.push("addcategories")
            }

        })
        .catch(err=>{
            console.log(err);
            setError("Something went wrong check your inputs")
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
            setError("Something went wrong check your inputs")
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
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                <Select 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                label="Currency"
                onChange={(e)=>setCurrency(e.target.value)}
                >
                {
                currencyCodes.map((item,ix)=><MenuItem key={ix} value={item.currency_code}>{item.currency_code}</MenuItem>)
                }

                </Select>
            </FormControl>
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
            {error.length>0?<Alert className="alert" severity="error">{error}</Alert>:null}



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
  
  const currencyCodes = [
    {
    currency_code: "AFN"
    },
    {
    currency_code: "ALL"
    },
    {
    currency_code: "DZD"
    },
    {
    currency_code: "USD"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "AOA"
    },
    {
    currency_code: "XCD"
    },
    {
    currency_code: "XCD"
    },
    {
    currency_code: "XCD"
    },
    {
    currency_code: "ARS"
    },
    {
    currency_code: "AMD"
    },
    {
    currency_code: "AWG"
    },
    {
    currency_code: "AUD"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "AZN"
    },
    {
    currency_code: "BSD"
    },
    {
    currency_code: "BHD"
    },
    {
    currency_code: "BDT"
    },
    {
    currency_code: "BBD"
    },
    {
    currency_code: "BYR"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "BZD"
    },
    {
    currency_code: "XOF"
    },
    {
    currency_code: "BMD"
    },
    {
    currency_code: "BTN"
    },
    {
    currency_code: "BOB"
    },
    {
    currency_code: "BAM"
    },
    {
    currency_code: "BWP"
    },
    {
    currency_code: "NOK"
    },
    {
    currency_code: "BRL"
    },
    {
    currency_code: "USD"
    },
    {
    currency_code: "BND"
    },
    {
    currency_code: "BGN"
    },
    {
    currency_code: "XOF"
    },
    {
    currency_code: "BIF"
    },
    {
    currency_code: "KHR"
    },
    {
    currency_code: "XAF"
    },
    {
    currency_code: "CAD"
    },
    {
    currency_code: "CVE"
    },
    {
    currency_code: "KYD"
    },
    {
    currency_code: "XAF"
    },
    {
    currency_code: "XAF"
    },
    {
    currency_code: "CLP"
    },
    {
    currency_code: "CNY"
    },
    {
    currency_code: "AUD"
    },
    {
    currency_code: "AUD"
    },
    {
    currency_code: "COP"
    },
    {
    currency_code: "KMF"
    },
    {
    currency_code: "XAF"
    },
    {
    currency_code: "NZD"
    },
    {
    currency_code: "CRC"
    },
    {
    currency_code: "HRK"
    },
    {
    currency_code: "CUP"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "CZK"
    },
    {
    currency_code: "DKK"
    },
    {
    currency_code: "DJF"
    },
    {
    currency_code: "XCD"
    },
    {
    currency_code: "DOP"
    },
    {
    currency_code: "USD"
    },
    {
    currency_code: "ECS"
    },
    {
    currency_code: "EGP"
    },
    {
    currency_code: "SVC"
    },
    {
    currency_code: "GBP"
    },
    {
    currency_code: "XAF"
    },
    {
    currency_code: "ERN"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "ETB"
    },
    {
    currency_code: "FKP"
    },
    {
    currency_code: "DKK"
    },
    {
    currency_code: "FJD"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "XPF"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "XAF"
    },
    {
    currency_code: "GMD"
    },
    {
    currency_code: "GEL"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "GHS"
    },
    {
    currency_code: "GIP"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "DKK"
    },
    {
    currency_code: "XCD"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "USD"
    },
    {
    currency_code: "QTQ"
    },
    {
    currency_code: "GNF"
    },
    {
    currency_code: "CFA"
    },
    {
    currency_code: "GYD"
    },
    {
    currency_code: "HTG"
    },
    {
    currency_code: "AUD"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "HNL"
    },
    {
    currency_code: "HKD"
    },
    {
    currency_code: "HUF"
    },
    {
    currency_code: "ISK"
    },
    {
    currency_code: "INR"
    },
    {
    currency_code: "IDR"
    },
    {
    currency_code: "IRR"
    },
    {
    currency_code: "IQD"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "ILS"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "XOF"
    },
    {
    currency_code: "JMD"
    },
    {
    currency_code: "JPY"
    },
    {
    currency_code: "JOD"
    },
    {
    currency_code: "KZT"
    },
    {
    currency_code: "KES"
    },
    {
    currency_code: "AUD"
    },
    {
    currency_code: "KWD"
    },
    {
    currency_code: "KGS"
    },
    {
    currency_code: "LAK"
    },
    {
    currency_code: "LVL"
    },
    {
    currency_code: "LBP"
    },
    {
    currency_code: "LSL"
    },
    {
    currency_code: "LRD"
    },
    {
    currency_code: "LYD"
    },
    {
    currency_code: "CHF"
    },
    {
    currency_code: "LTL"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "MOP"
    },
    {
    currency_code: "MKD"
    },
    {
    currency_code: "MGF"
    },
    {
    currency_code: "MWK"
    },
    {
    currency_code: "MYR"
    },
    {
    currency_code: "MVR"
    },
    {
    currency_code: "XOF"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "USD"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "MRO"
    },
    {
    currency_code: "MUR"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "MXN"
    },
    {
    currency_code: "USD"
    },
    {
    currency_code: "MDL"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "MNT"
    },
    {
    currency_code: "XCD"
    },
    {
    currency_code: "MAD"
    },
    {
    currency_code: "MZN"
    },
    {
    currency_code: "MMR"
    },
    {
    currency_code: "NAD"
    },
    {
    currency_code: "AUD"
    },
    {
    currency_code: "NPR"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "ANG"
    },
    {
    currency_code: "XPF"
    },
    {
    currency_code: "NZD"
    },
    {
    currency_code: "NIO"
    },
    {
    currency_code: "XOF"
    },
    {
    currency_code: "NGN"
    },
    {
    currency_code: "NZD"
    },
    {
    currency_code: "AUD"
    },
    {
    currency_code: "KPW"
    },
    {
    currency_code: "GBP"
    },
    {
    currency_code: "USD"
    },
    {
    currency_code: "NOK"
    },
    {
    currency_code: "OMR"
    },
    {
    currency_code: "PKR"
    },
    {
    currency_code: "USD"
    },
    {
    currency_code: null
    },
    {
    currency_code: "PAB"
    },
    {
    currency_code: "PGK"
    },
    {
    currency_code: "PYG"
    },
    {
    currency_code: "PEN"
    },
    {
    currency_code: "PHP"
    },
    {
    currency_code: "NZD"
    },
    {
    currency_code: "PLN"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "USD"
    },
    {
    currency_code: "QAR"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "RON"
    },
    {
    currency_code: "RUB"
    },
    {
    currency_code: "RWF"
    },
    {
    currency_code: "SHP"
    },
    {
    currency_code: "XCD"
    },
    {
    currency_code: "XCD"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "XCD"
    },
    {
    currency_code: "WST"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "STD"
    },
    {
    currency_code: "SAR"
    },
    {
    currency_code: "GBP"
    },
    {
    currency_code: "XOF"
    },
    {
    currency_code: "RSD"
    },
    {
    currency_code: "SCR"
    },
    {
    currency_code: "SLL"
    },
    {
    currency_code: "SGD"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "SBD"
    },
    {
    currency_code: "SOS"
    },
    {
    currency_code: "ZAR"
    },
    {
    currency_code: "GBP"
    },
    {
    currency_code: "KRW"
    },
    {
    currency_code: "SSP"
    },
    {
    currency_code: "EUR"
    },
    {
    currency_code: "LKR"
    },
    {
    currency_code: "SDG"
    },
    {
    currency_code: "SRD"
    },
    {
    currency_code: "NOK"
    },
    {
    currency_code: "SZL"
    },
    {
    currency_code: "SEK"
    },
    {
    currency_code: "CHF"
    },
    {
    currency_code: "SYP"
    },
    {
    currency_code: "TJS"
    },
    {
    currency_code: "TZS"
    },
    {
    currency_code: "THB"
    },
    {
    currency_code: "CDF"
    },
    {
    currency_code: "XOF"
    },
    {
    currency_code: "NZD"
    },
    {
    currency_code: "TOP"
    },
    {
    currency_code: "TTD"
    },
    {
    currency_code: "TND"
    },
    {
    currency_code: "TRY"
    },
    {
    currency_code: "TMT"
    },
    {
    currency_code: "USD"
    },
    {
    currency_code: "AUD"
    },
    {
    currency_code: "UGX"
    },
    {
    currency_code: "UAH"
    },
    {
    currency_code: "AED"
    },
    {
    currency_code: "GBP"
    },
    {
    currency_code: "USD"
    },
    {
    currency_code: "USD"
    },
    {
    currency_code: "UYU"
    },
    {
    currency_code: "UZS"
    },
    {
    currency_code: "VUV"
    },
    {
    currency_code: "VEF"
    },
    {
    currency_code: "VND"
    },
    {
    currency_code: "USD"
    },
    {
    currency_code: "USD"
    },
    {
    currency_code: "GBP"
    },
    {
    currency_code: "XPF"
    },
    {
    currency_code: "MAD"
    },
    {
    currency_code: "YER"
    },
    {
    currency_code: "ZMW"
    },
    {
    currency_code: "ZWD"
    }
    ]
  
