import React,{useState,useEffect} from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';

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
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <form>
                    <label htmlFor="defaultFormContactMessageEx" className="grey-text">
                        Enter Article
                    </label>
                    <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="10" />
                    </form>
                </MDBCol>
                <MDBCol md="6">
                    <form>
                    <label htmlFor="defaultFormContactMessageEx" className="grey-text">
                        Summary
                    </label>
                    <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="10" />
                        <div className="text-center mt-4">
                        <MDBBtn color="warning" outline type="submit" onClick={onSubmit}>
                                    Generate Summary
                            <MDBIcon far icon="paper-plane" className="ml-2" />
                        </MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default TextBoxes;