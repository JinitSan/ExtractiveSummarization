import React,{useState,useEffect} from 'react'
import {Container, Row, Col, FloatingLabel, Form} from "react-bootstrap"
import Button from "../styles/GlobalComponents/Button"
import { H, Section } from "react-headings";

const TextAreaStyle = {
    
    height: '300px',
    borderWidth: "2px",
    backgroundColor:"#FFFFFF",
    fontSize:"16px",
    color:"#000000"
   
}

const Heading = {
    position: "relative",
    top: "0%",
    left:"150px",
    fontSize:"40px",
    color:"white",
    padding:"20px",
    margin: "0 auto",
    marginBottom: '10px',
   

}
const labelStyle = {
    color:"#000000",
    fontSize:"20px"
}
const rowclass = {
    marginTop: '30px'
}
const colclass= {
    float: 'left',
    position:'relative',
    width: '50%',
    margin: '5px'
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
        <Container className="center" fluid>
         <div >
                <H style={Heading}>Content Summarization</H>
            
            <Row >
                <Col md={6} xs={12} style={colclass}>
                    <FloatingLabel controlId="floatingInputGrid" label="Article" style={labelStyle}>
                            <Form.Control as="textarea" placeholder="Enter article" style={TextAreaStyle} value={article} placeholder="Enter Article" onChange={(e)=>setArticle(e.target.value)}/>    
                    </FloatingLabel>
                </Col> 
                <Col md={6} xs={12} style={colclass}>
                    <FloatingLabel controlId="floatingSelectGrid" label="Summary" style={labelStyle}>
                        <Form.Control as="textarea" placeholder="Summary" style={TextAreaStyle} value={sum} placeholder="Summary"/>    
                    </FloatingLabel>
                </Col>
                <Row style={rowclass}>
               
                    <Button    size="md" type="submit" onClick={onSubmit}>Generate Summary</Button>
                
                 </Row>
            </Row> 
     </div>  
        </Container>
    );
}
export default TextBoxes;