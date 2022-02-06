import React from 'react'
import {useForm} from 'react-hook-form'
import "./Login.scss"
import axios from 'axios'
import { setUser } from '../redux/user/userActions'
import {connect} from 'react-redux'
// /api/admin/login

const Login = (props) => {
    const {register,handleSubmit,formState:{errors},setError}=useForm()


    const onSubmit = (data,e)=>{
        console.log(data)
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/admin/login`,{email:data.email,password:data.password})
        .then(res=>{
            console.log(res);
            props.setUser(res.data.token)
            props.history.push("/home")
        })
        .catch(err=>{
            console.log(err);
            setError("email")
            setError("password")
        })
//        
    }
    return (
        <div className="logincontainer">
            <div className="shadow-lg formdiv">
            <h1 className="heading">LogIn</h1>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div className="inputdiv">
                <label>Email </label>
                <input {...register('email',{required:true})} className={errors.email?'errorinput':""} placeholder="Enter Your Email" name="email" type="text" />
                {errors.email?<p className="errorname">Name is Invalid</p>:null}
                </div>

                <div className="inputdiv">
                <label>Password </label>
                <input {...register('password',{required:true})} className={errors.password?'errorinput':""} placeholder="Enter Your Password" name="password" type="text" />
                {errors.password?<p className="errorname">Password is Invalid</p>:null}
                </div>

                <button className="submit submit-button" type="submit">LogIn</button>
            </form>
            </div>
        </div>
    );
}
const mapDispatchToProps = (dispatch)=>{
return {
    setUser:(user)=>dispatch(setUser(user))
}
}

export default connect(null,mapDispatchToProps)(Login);