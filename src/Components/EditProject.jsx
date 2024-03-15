import React, {useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import img from '../Assets/img1.jpg'
import { baseUrl } from '../Services/baseUrl';
import { editUserProject } from '../Services/allAPI';
import { editUserProjectResponseContext } from '../ContextAPI/ContextShare';


function EditProject({project}) {
  
  const {editUserProjectRes,seteditUserProjectRes}=useContext(editUserProjectResponseContext);
  console.log(project);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [projectDetails,setProjectDetails]=useState({
    id:project._id,title:project.title,language:project.language,github:project.github,link:project.link,overview:project.overview,projectImage:""
  });
  console.log(projectDetails);

  //to hold the image url
  const [preview,setPreview]=useState("")
  console.log(preview);
  useEffect(()=>{
    if(projectDetails.projectImage){
      //convert it to a url
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])

  //project update

  const updateProject=async()=>{
    const {id,title,language,github,link,overview,projectImage}=projectDetails
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("link",link)
      reqBody.append("overview",overview)
      preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)


      const token = sessionStorage.getItem("token")
      console.log(token);
      if(preview){
        const reqHeader={
          "Content-Type": "multipart/form-data",//request contain a file upload content
          "Authorization" :`Bearer ${token}`//req contain a token for backend
      }
        //api call
        const result=await editUserProject(id,reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
          seteditUserProjectRes(result.data)
          console.log(result.data);
          alert("Project added successfully")
          handleClose()
        }
        else{
          seteditUserProjectRes(result.data)
          console.log(result.response.data);
        }

      }
     else{
        const reqHeader={
          "Content-Type": "multipart/form-data",//request contain a file upload content
          "Authorization" :`Bearer ${token}`//req contain a token for backend
        }
        //api call
        const result=await editUserProject(id,reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
          seteditUserProjectRes(result.data)
          console.log(result.data);
          alert("Project added successfully")
          handleClose()
        }
        else{
          seteditUserProjectRes(result.response.data)
          console.log(result.response.data);


        }
      }
  
}
  return (
    <div>
    <Button onClick={handleShow}><i className='fa-solid fa-pen'></i></Button>

  <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    size={'lg'}
  >
    <Modal.Header closeButton>
      <Modal.Title>Project Description</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className='row'>
        <div className='col'>
          {/* image */}
          <label style={{marginBottom:'20px'}}>
            <input type="file" style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
            <img src={preview?preview:`${baseUrl}/uploads/${project.projectImage}`}  width={"300px"} height={"300px"} style={{paddingLeft:'20px'}} alt=""/>
          </label>
        </div>
        <div className='col'>
            {/* input */}
            <div className='input'>
              <input type="text" value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} placeholder='Project Title' className='form-control mb-3' />
              <input type="text" value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} placeholder='Language' className='form-control mb-3' />
              <input type="text" value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} placeholder='GitHub Link' className='form-control mb-3' />
              <input type="text" value={projectDetails.link} onChange={(e)=>setProjectDetails({...projectDetails,link:e.target.value})} placeholder='Website Link' className='form-control mb-3' />
              <input type="text" value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} placeholder='Project Description' className='form-control mb-3' />
            </div>
        </div>

      </div>

    </Modal.Body>
    <Modal.Footer>
      <div>
      <Button variant="primary" onClick={updateProject}>Update</Button>
      </div>
    </Modal.Footer>
  </Modal>
</div>
  )
}

export default EditProject