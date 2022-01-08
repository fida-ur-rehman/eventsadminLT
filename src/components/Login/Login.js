import React from 'react'
import {useForm} from 'react-hook-form'
import "./Login.scss"

const Login = (props) => {
    const {register,handleSubmit,formState:{errors}}=useForm()

    const onSubmit = (data,e)=>{
        console.log(data)
        props.history.push("/home")
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

export default Login;