import { Card, Input, Button, Typography,} from "@material-tailwind/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
   
export  default function Register() {
  const navigate = useNavigate()
  const[user, setUser]=useState({
    fullName:"", email:"", password:"",cpassword:""

  })

  const handleInputs = (e)=>{
    let name = e.target.name
    let value = e.target.value

    setUser({...user, [name]:value})
  }
  const postData = async(e)=>{
    e.preventDefault()
    const {fullName, email, password,cpassword} = user
    const response = await fetch('/adminRegister',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        fullName,email,password,cpassword
      })
    })
    const data = await response.json()

    if(response.status === 201){
      localStorage.setItem('token', data.token)
      window.alert('Registration Successful')
      navigate('/')
    }else{
      window.alert('Registration Failed')
    }
  }

    return (
       <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" method='POST'>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Full Name
            </Typography>
            <Input size="lg" placeholder="name@mail.com" className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }} value={user.fullName} onChange={handleInputs} name="fullName"
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input size="lg" placeholder="name@mail.com" className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }} value={user.email} onChange={handleInputs} name="email"
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input type="password" size="lg" placeholder="********" className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }} value={user.password} onChange={handleInputs} name="password"
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Confirm Password
            </Typography>
            <Input type="password" size="lg" placeholder="********" className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }} value={user.cpassword} onChange={handleInputs} name="cpassword"
            />
          </div>
          <Button className="mt-6" fullWidth type="submit" onClick={postData}>Register</Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <NavLink to="/login" className="font-medium text-gray-900">
              Login
            </NavLink>
          </Typography>
        </form>
      </Card>
    );
  }