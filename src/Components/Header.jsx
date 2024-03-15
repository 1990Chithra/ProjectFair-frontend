import React from 'react'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';


function Header() {


  const location = useNavigate()
  const logout=()=>{
    sessionStorage.clear();
    location('/')
  }
  return (
    <div>
      <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'style={{color:'white',fontWeight:'600'}}>
          <i class="fa-solid fa-laptop-file fa-fade mx-3 fs-3 text-white"></i>Project Fair
          </MDBNavbarBrand>
          <button onclick={logout} className='btn btn-dark'><i class="fa-solid fa-right-from-bracket"></i></button>
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default Header