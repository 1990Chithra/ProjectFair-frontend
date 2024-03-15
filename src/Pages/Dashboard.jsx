import React from 'react'
import { Col,Row } from 'react-bootstrap'
import MyProject from '../Components/MyProject'
import MyProfile from '../Components/MyProfile'
import { Link } from 'react-router-dom'
import Header from '../Components/Header';


function Dashboard() {
  const existingUser=JSON.parse(sessionStorage.getItem("existingUser"))
  console.log(existingUser);
  return (
    <div>
      <Header/>
      <div>
        <Row>
          <h2 className='m-3'>Welcome<span className='text-primary'></span></h2>
          <Col>
          {/* Project content */}
           <MyProject/> 
          </Col>
          <Col>
          {/* Profile */}
          <MyProfile/>
          </Col>
        </Row>
         <Row>
          <Col>
          <Link to={'/project'}>
                <div className='text-center'>
                <button className='btn btn-outline-dark btn-lg m-3 round-pill shadow text-white'>View Projects</button>
                </div>
          </Link>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Dashboard