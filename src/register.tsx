import React, { useState,useEffect } from "react";
import context from "react-bootstrap/esm/AccordionContext";
import { useNavigate } from "react-router-dom";
import Header from './header';

function Register() 
{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('user-info'))
        {
            navigate("/add");
        }
    },[])

    async function signUp() {
        let item = { name, email, password };
        console.warn(item);

        let result = await fetch("http://localhost:8000/api/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        })
        result = await result.json();
        console.warn("result", result);
        localStorage.setItem("user-info", JSON.stringify(result));
        navigate("/add");
    }

    return (
        <>
        <Header />
            <div className="col-sm-6 offset-sm-3">
                <h1>Sign-up</h1><br />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter Name" />
                <br />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter Email" />
                <br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter Password" />
                <br />
                <button onClick={signUp} className="btn btn-primary">Sign Up</button>
            </div>
        </>
    )
}

export default Register;