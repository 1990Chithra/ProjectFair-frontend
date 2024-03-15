import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {Row,Col} from 'react-bootstrap';
import { baseUrl } from '../Services/baseUrl';


function ProjectCard({project}) {
  console.log(project);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div>
      <Card onClick={handleShow} className='p-3 m-2'style={{width:'250px',height:'200px'}}>
      <Card.Img variant="top" src={project?`${baseUrl}/uploads/${project.projectImage}`:"empty image"} />
      <Card.Body>
        <Card.Title className='text-center'>{project.title}</Card.Title>
      </Card.Body>
    </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                <img src={project?`${baseUrl}/uploads/${project.projectImage}`:"empty image"} width={'100%'} alt="" />
                </Col>
                <Col>
                <h3>{project.title}</h3>
                <span><p><b>Project Overview:</b>{project.overview}</p></span>
                <p>Language used:<span><b>{project.language}</b></span></p>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-evenly'>
        <a href="" variant="light"></a>
          <i class="fa-brands fa-github fa-beat text-dark"></i>
        <a href="" variant="light"></a>
          <i class="fa-brands fa-linkedin fa-beat text-dark"></i>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProjectCard