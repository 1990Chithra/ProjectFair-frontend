import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { loginAPI, registerAPI } from '../Services/allAPI'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';


function Auth({register}) {

  const location=useNavigate()

  const isRegisterForm=register?true : false

  //state creation

  const [userData,setuserData]=useState({ 
    username:"",
    email:"",
    password:"",
  })

  const registerData=async()=>{
    const {username,email,password}=userData
    if(!username || !email || !password){

      alert("Please enter valid details")
    }
    else{
      //api call
      const result=await registerAPI(userData)
      console.log(result);
      if(result.status==200){
        alert(`${result.data}`)
        location('/login')
      }
      else{
        alert(`${result.response.data}`)

      }

    }

  }

  const loginData=async()=>{

    const {email,password}=userData;
    if(!email || !password){
      alert("Please enter valid details")
    }
    else{
      const result=await loginAPI(userData)
      console.log(result);
      if(result.status == 200){
        alert("Login successful")
        //set user object into session storage
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.user))
        sessionStorage.setItem("token",result.data.token)
      location('/dashboard')
      }
      else{
        alert("Please enter valid details")
      }
      
    }


  }



  return (
    <div>
      <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'style={{color:'white',fontWeight:'600'}}>
          <i class="fa-solid fa-laptop-file fa-fade mx-3 fs-3 text-white"></i>Project Fair
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
        <div className='d-flex  flex-column justify-content-center align-items-center'style={{width:'100%',height:'500px'}}>
        <div className='container'>
          <div className='row'>
            <div className='col'>
                <img src="https://media.tenor.com/images/f19166eab5da90811c036eb5c18faf7d/tenor.gif" alt="" width={'100%'}/>
            </div>
            <div className='col shadow bg-primary p-2'>
              <h3 className='text-center'>Project Fair</h3>
              <h5 className='text-center m-3'>
              {
                isRegisterForm?'register here': 'login here'
              }
              </h5>
              <form>
                {
                  isRegisterForm &&
                  <input type="text" value={userData.username} onChange={e=>setuserData({...userData,username:e.target.value})} placeholder='Enter Name' className='form-control mb-3'/>
                }
                  <input type="text"  value={userData.email} onChange={e=>setuserData({...userData,email:e.target.value})} placeholder='Enter Email' className='form-control mb-3'/>
                  <input type="text"  value={userData.password} onChange={e=>setuserData({...userData,password:e.target.value})} placeholder='Enter Password' className='form-control mb-3'/>
              </form>
                {
                  isRegisterForm?
                  <div className='text-center m-3'>
                    <button onClick={registerData} className='btn btn-success'>Register</button>
                    <Link to={'/login'} style={{textDecoration:'none',color:'wheat'}}>
                      <p className='m-3'>Already register?Please login from here</p>
                    </Link>
                  </div>
                  :
                  <div className='text-center m-3'>
                    <button onClick={loginData} className='btn btn-info'>Login</button>
                    <Link to={'/register'} style={{textDecoration:'none',color:'wheat'}}>
                      <p className='m-3'>New to here?Please Register...</p>
                    </Link>
                  </div>
                  
                  
                }

            </div>
          </div>

        </div>

      <div className='text-center m-3'>
          <Link to={'/'}>
              <button className='btn btn-datk'>Back to Home</button>
          </Link>
      </div>
    </div>
    </div>
    
  )
}

export default Auth