import React,{useState,useEffect} from 'react'
import {Container, Row, Col, FloatingLabel, Form, Button} from "react-bootstrap"

const TextBoxes = () => {
    const [article,setArticle]=useState('')
    const [sum,setSum]=useState('')
  
    const  onSubmit=()=>{
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
        <Container>
            <Row className="g-2">
                <Col md>
                    <FloatingLabel controlId="floatingInputGrid" label="Article">
                            <Form.Control as="textarea" placeholder="Enter article" rows="10" value={article} placeholder="Enter Article" onChange={(e)=>setArticle(e.target.value)}/>    
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel controlId="floatingSelectGrid" label="Summary">
                        <Form.Control as="textarea" placeholder="Enter article" rows="10" value={sum} placeholder="Summary"/>    
                    </FloatingLabel>
                </Col>
            </Row>
            <Button variant="primary" size="lg" type="submit" onClick={onSubmit}> Generate Summary </Button>
        </Container>
    );
}

export default TextBoxes;