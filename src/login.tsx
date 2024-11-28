import React,{ useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from './header';

function Login()
{
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    useEffect(()=>{
        if(localStorage.getItem('user-info'))
        {
            navigate("/add");
        }
    },[])

    async function login ()
    {
        let item = {email,password};
        let result = await fetch("http://localhost:8000/api/login",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        });
        result = await result.json();
        console.warn("result", result);
        localStorage.setItem('user-info', JSON.stringify(result));
        navigate("/add");
    }


    return(
        <>
        <Header />
        <div className='col-sm-6 offset-sm-3'>
            <h1>Sign-in</h1><br />
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className='form-control' placeholder='Enter Email' />
            <br />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control' placeholder='Enter Password' />
            <br /><br />
            <button className='btn btn-primary' onClick={login}>Sign In</button>
        </div>
        </>
    )
}

export default Login;