import { Card,Input,Button, Typography,} from "@material-tailwind/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
   
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword]= useState('')
  const navigate = useNavigate()

  const setData = async(e)=>{
    e.preventDefault()
    const response = await fetch('/adminLogin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        email,password
      })
    })
    const data = await response.json()

    if(response.status === 201){
      localStorage.setItem('token', data.token)
      window.alert('Login Successful')
      navigate('/')
    }else{
      window.alert('Login Failed')
    }
  }

    return (
       <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome back! Enter your details to login.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" method='POST'>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }} value={email} name="email" onChange={e=>setEmail(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }} value={password} name="password" onChange={e=>setPassword(e.target.value)}
            />
          </div>
          <Button className="mt-6" fullWidth type="submit" onClick={setData}>
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <NavLink to="/register" className="font-medium text-gray-900">
              Register
            </NavLink>
          </Typography>
        </form>
      </Card>
    );
  }