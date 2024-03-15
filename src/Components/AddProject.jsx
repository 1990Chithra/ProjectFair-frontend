import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from '../Assets/img1.jpg'
import { addProjectAPI } from '../Services/allAPI';

function AddProject() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //to hold token

  const [token,setToken] = useState("")
  //get token from sessionstorage
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])

  const [projectDetails,setProjectDetails]=useState({
    title:"",language:"",github:"",link:"",overview:"",projectImage:""
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
  console.log(projectDetails);

  const projectAdd=async()=>{
    const {title,language,github,link,overview,projectImage}=projectDetails

    if(!title||!language||!github||!link||!overview||!projectImage){
      alert("Please enter the details")
    }
  else{
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("link",link)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)

    
      const reqHeader={
      "Content-Type": "multipart/form-data",//request contain a file upload content
      "Authorization" :`Bearer ${token}`//req contain a token for backend
      }
    // //api call
      const result=await addProjectAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status === 200)
      {
        // alert("Project added successfully...")
        console.log(result.data);//successfull
        handleClose()
        setProjectDetails({
          title:"",language:"",github:"",link:"",overview:"",projectImage:"",
        })
        setPreview("")

      }
      else{
          alert(result.reponse.data)
          console.log(result.reponse.data);//error message 'project already exist'

          }
    }
  }
  return (
    <div>
        <Button variant="success" onClick={handleShow}> Add Project</Button>

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
                <img src={preview?preview:img} alt="" width={"300px"} height={"300px"} style={{paddingLeft:'20px'}}/>
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
          <Button variant="primary" onClick={projectAdd}>Add</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddProject