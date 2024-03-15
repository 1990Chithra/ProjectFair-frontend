import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteUserProject, deleteUserProjectAPI, getUserProjects } from '../Services/allAPI'
import {Row,Col} from 'react-bootstrap';
import EditProject from './EditProject';
import { editUserProjectResponseContext } from '../ContextAPI/ContextShare';
import { addProjectResponseContext } from '../ContextAPI/ContextShare';
function MyProject() {

  const {editUserProjectRes,seteditUserProjectRes}=useContext(editUserProjectResponseContext)
  const {addProjectRes,setAddProjectRes}=useContext(addProjectResponseContext)


    //state creation
    const [allUserProject,setAllUserProject]=useState([])
    //Api call?
    const allUserProjects=async()=>{
        const token=sessionStorage.getItem("token")
        console.log(token);
        if(token){
            const reqHeader={
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            };
            try{
                const result=await getUserProjects(reqHeader)
                console.log(result);
                if(result.status===200){
                setAllUserProject(result.data)
                console.log(allUserProject);
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
        allUserProjects()
      },[addProjectRes,editUserProjectRes])

    const deleteProject=async(pid)=>{
      const token=sessionStorage.getItem('token')
      if(token){
        const reqHeader={
          "Content-Type": "multipart/form-data",//request contain a file upload content
          "Authorization" :`Bearer ${token}`
        }
        try{
            //api fetching
            const result=await deleteUserProjectAPI(pid,reqHeader)
            console.log(result);
            if(result.status === 200){
              alert("Project deleted successfully");
              allUserProjects()
            }

        }
        catch(error){
          console.log(error);
        }
      }
    }
  return (
    <div className='container'>
        <div className='d-flex'>
            <h3>My Projects</h3>
            <div className='ms-auto'>
                {/* Add Project */}
                <AddProject/>
            </div>
        </div>    
            <div className='d-flex align-item-center justify-content-between p-4 border ms-5' style={{width:'400px'}}>
              <Row>
               {
                allUserProject.length>0?(
                    allUserProject.map((item,index)=>(
                    <Col>
                    <div className='d-flex justify-content-between'>
                      <p>{item.title}</p>
                      <div className='btn d-flex justify-content-between'>
                        <button className='btn'><EditProject project={item}/></button>
                        <a href={item.github} target='_blank'><i className='fa-brands fa-github'></i></a>
                        <button onClick={()=>deleteProject(item?._id)} className='btn'><i className='fa-solid fa-trash'></i></button>
                      </div>
                    </div>
                    </Col>
                ))
                ) : (  
                  <div className='text-center'>No Projects Found</div>  
               )}
              </Row>    
            </div>
        
    </div>
  )
}

export default MyProject