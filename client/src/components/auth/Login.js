import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login =(props)=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const login =(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/login", 
        {
            email: email,
            password: password
        },
        {
            withCredentials: true
        })
        .then(res => {
            console.log(res.data);
            props.setTab("Logout");
            navigate("/");
            console.log(props.tab)
        })
        .catch((err)=>{
            console.log(err.response.data.message);
            setErrors(err.response.data.message);
        });
    }

    return(
        
        <div className="Main-Div">
            
            <div className="Form">
                <div className="Head">
                    <h1>LOG IN</h1>
                </div>
                <div>
                    <form onSubmit={login}>
                        <div className="Inputs">
                            <label>Email</label>
                            <input 
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <label>Password</label>
                            <input 
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            <input id="Submit" type="submit" value="LOGIN"/>
                        </div>
                    </form>
                        {
                            errors ? (<span className="red-span" style={{fontSize: "14px", marginLeft: "2em"}}>{errors}</span>) : null
                        }
                </div>
            </div>
        </div>
    );
}

export default Login;