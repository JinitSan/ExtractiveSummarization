import React,{useState,useEffect} from 'react'
import {Container, Row, Col, FloatingLabel, Form} from "react-bootstrap"
import Button from "../styles/GlobalComponents/Button"
const TextAreaStyle = {
    width:'400px', 
    height: '300px',
    borderWidth: "2px",
    backgroundColor:"#FFFFFF",
    fontSize:"16px",
    color:"#000000"
}

const Heading = {
    position: "absolute",
    top: "20%",
    left:"590px",
    fontSize:"40px",
    color:"white",
    fontFamily:''

}
const labelStyle = {
    color:"#000000",
    fontSize:"20px"
}
const rowclass = {
    position: "absolute",
    top: "75%",
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
            <Row><h1 style={Heading}>Content Summarization</h1>
            </Row>
            <Row >
                <Col md>
                    <FloatingLabel controlId="floatingInputGrid" label="Article" style={labelStyle}>
                            <Form.Control as="textarea" placeholder="Enter article" style={TextAreaStyle} value={article} placeholder="Enter Article" onChange={(e)=>setArticle(e.target.value)}/>    
                    </FloatingLabel>
                </Col> 
                <Col md>
                    <FloatingLabel controlId="floatingSelectGrid" label="Summary" style={labelStyle}>
                        <Form.Control as="textarea" placeholder="Summary" style={TextAreaStyle} value={sum} placeholder="Summary"/>    
                    </FloatingLabel>
                </Col>
            </Row> 
            <Row style={rowclass}>
                <Button  size="md" type="submit" onClick={onSubmit}>Generate Summary</Button>
            </Row>
        </Container>
    );
}
export default TextBoxes;