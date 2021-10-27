import React,{useState,useEffect} from 'react'
import {Row,Col} from 'reactstrap'
import './App.css';


function App() {
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
    <div className="App">

      <Row>
        <Col md="6">
          <label htmlFor="username" className="form-label">Article</label>
          <input type="text" className="form-control" id="article" value={article} placeholder="Enter Article" onChange={(e)=>setArticle(e.target.value)}/>
        </Col>
        <Col md="6">
          <label htmlFor="username" className="form-label">Summary</label>
          <input type="text" className="form-control" id="summary" value={sum} placeholder="Summary"/>
        </Col>
      </Row>
       <button className="btn btn-primary" onClick={onSubmit} >Submit Article</button>
    </div>
    
  );
}

export default App;
