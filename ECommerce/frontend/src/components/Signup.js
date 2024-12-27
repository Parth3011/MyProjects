import React,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup=()=>{
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const navigate=useNavigate();

    // const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
        // eslint-disable-next-line
    },[]);
   
    const collectData=async()=>{
        console.warn(name,email,password);
        let result =await fetch('http://localhost:5000/register',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result= await result.json();
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/')
        
    }

    return(
        <div className="register">
            <h1>Register</h1>
            <input type="text" className='inputbox' 
            value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" />
           
            <input type="email" className='inputbox' 
            value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" />
           
            <input type="password" className='inputbox' 
            value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
            
            <button type="button" className='appbutton' onClick={collectData}>Sign Up</button>
        </div>
    )
}

export default Signup;