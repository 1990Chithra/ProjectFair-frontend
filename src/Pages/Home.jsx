import React, { useEffect, useState } from 'react'
import Titleimage from '../Assets/img1.jpg'
import ProjectCard from '../Components/ProjectCard'
import {Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getHomeProjectAPI} from '../Services/allAPI';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';

function Home() {
  //to hold project details
  const [homeProject,setHomeProject]=useState([])
  //Api call to get home project details from the mongodb
  const getHomeProject=async()=>{
    const result = await getHomeProjectAPI()
    console.log(result);
    if(result.status===200){
        setHomeProject(result.data)
        console.log(homeProject);
    }
    else{
      // console.log(result.response.message);
      console.log("Api fetching project details failed");
    }

  }
  useEffect(()=>{
      getHomeProject()
  },[])
  return (
    <div>
      <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'style={{color:'white',fontWeight:'600'}}>
          <i class="fa-solid fa-laptop-file fa-fade mx-3 fs-3 text-white"></i>Project Fair
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>

            <h1 className='text-center m-4'>Project Fair</h1>

            <p style={{textAlign:'justify'}}>Project management is the use of specific knowledge, skills, tools and techniques to deliver something of value to people.
              The development of software for an improved business process, the construction of a building, the relief effort 
              after a natural disaster, the expansion of sales into a new geographic market—these are all examples of projects.</p>
              
              <div className='text-center'>
                <Link to={'/login'}>
                <button className='btn btn-outline-dark btn-lg m-5 round-pill shadow text-white'>Get Started</button>
                </Link>
              </div>
          </div>
          
          <div className='col-6'>
              <img src={Titleimage} alt="" style={{padding:'30px'}}/>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h2 className='text-center m-4'>Explore Our Project</h2>
            <marquee>
              <div>
              <Row>

                {
                  homeProject.length>0?homeProject.map((item)=>(
                      <Col>
                      <ProjectCard project={item}/>
                      </Col>
                  )):"empty"
                }
             </Row>

              </div>
            </marquee>
          </div>
        </div>
       
      </div>

    </div>
  )
}

export default Home