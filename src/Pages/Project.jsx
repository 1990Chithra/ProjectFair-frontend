import React, { useEffect, useState } from 'react'
import ProjectCard from '../Components/ProjectCard';
import {Row,Col} from 'react-bootstrap';
import { getAllProjectAPI } from '../Services/allAPI';


function Project() {

  const [searchKey,setSearchKey]=useState("")
  console.log(searchKey);

  const [allProject,setAllProject]= useState([])
  //api call
  const allProjects=async()=>{

    const token=sessionStorage.getItem("token")
    if(token){
    const reqHeader={
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    try{
        const result=await getAllProjectAPI(searchKey,reqHeader)
        console.log(result);
        if(result.status===200){
        setAllProject(result.data)
        console.log(allProject);
        }
      else{
        alert("failed to retrieve project")
          }

      }catch(error){
        console.error('Error fetching projects:', error);
        alert('Failed to retrieve project');
      }
    }
  };
  useEffect(()=>{
    allProjects()
  },[searchKey])
  return (
    <div>
      <div className='container'>
        <h1 className='text-center m-4'>All Projects</h1>
        <div className='d-flex justify-content-center w-100'>
          <div className='d-flex border border-4 rounded bg-white'>
            <input type="text" className='form-control' placeholder='Search by technology' onChange={e=>setSearchKey(e.target.value)}/>
            <i class="fa-solid fa-magnifying-glass text-dark fs-3 p-2"></i>
          </div>

        </div>
        <div className='w-25'>
        <Row>
          {
            allProject.length > 0? allProject.map((item,index)=>(
                <Col key={index}>
               <ProjectCard project={item}/>
               </Col>
              )):
            
              <div className='text-center'>No projects found</div>
        }
               
        </Row>        
        </div>

      </div>
    </div>
  )
}

export default Project