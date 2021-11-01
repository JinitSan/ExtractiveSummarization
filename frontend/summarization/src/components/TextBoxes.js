import React,{useState,useEffect} from 'react'
import {Container, Row, Col, FloatingLabel, Form, Button} from "react-bootstrap"

const buttonStyle = {
    marginTop:"20px",
    backgroundColor:"#FFFFFF"
}

const TextAreaStyle = {
    width:'400px', 
    height: '300px',
    borderWidth: "2px",
    backgroundColor:"#FFFFFF",
    fontSize:"16px",
    color:"#000000"
}

const labelStyle = {
    color:"#000000",
    fontSize:"20px"
}

const TextBoxes = () => {
    const [article,setArticle]=useState('')
    const [sum,setSum]=useState('')
  
    const  onSubmit=(e)=>{
        e.preventDefault();
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*", },
        body: JSON.stringify({ article: article}) 
        };
        fetch('http://localhost:8000/summary/', requestOptions)
            .then(response => response.json())
            .then(data=> fetch(`http://localhost:8000/result/${data}`,{
                method:'GET',
                headers:{
                'Content-Type':'application/json',
                "Access-Control-Allow-Origin": "*"
                },
            }).then(response=>response.json()).then(data=>setSum(data)));
    }
    return (
        <Container className="center">
            <Row className="g-2">
                <Col md>
                    <FloatingLabel controlId="floatingInputGrid" label="Article" style={labelStyle}>
                            <Form.Control as="textarea" placeholder="Enter article" style={TextAreaStyle} value={article} placeholder="Enter Article" onChange={(e)=>setArticle(e.target.value)}/>    
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel controlId="floatingSelectGrid" label="Summary" style={labelStyle}>
                        <Form.Control as="textarea" placeholder="Summary" style={TextAreaStyle} value={sum} placeholder="Summary"/>    
                    </FloatingLabel>
                    <Button variant="primary" size="md" type="submit" onClick={onSubmit} style={buttonStyle}>Generate Summary</Button>
                </Col>
            </Row>    
        </Container>
    );
}
export default TextBoxes;