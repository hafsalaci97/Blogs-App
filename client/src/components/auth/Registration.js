import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const Registration = ()=>{

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const onChangeHandler =(e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const register =(e)=>{
        e.preventDefault();
        
        axios.post("http://localhost:8000/api/users/register", 
        user,
        {
            withCredentials: true
        })
        .then(res => {
            console.log(res.data);
            setUser({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
            setConfirmReg("Thank you for signing up! You can log in now.");
            navigate("/login");
            setErrors({});
        })
        .catch((err)=>{
            console.log(err);
            setErrors(err.response.data.errors);
        });
    }

    return (
        <div className="Main-Div">
            <div className="Form">
                <div className="Head">
                    <h1>SIGN UP</h1>
                </div>
                <div>
                    <form onSubmit={register}>
                        <div className="Inputs">
                            <label>Username</label>
                            {
                                errors.username ? (<span className="red-span" style={{fontSize: "14px"}}>{errors.username.message}</span>) : null
                            }
                            <input 
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={onChangeHandler}
                            />
                            <label>Email</label>
                            {
                                errors.email ? (<span className="red-span" style={{fontSize: "14px"}}>{errors.email.message}</span>) : null
                            }
                            <input 
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={onChangeHandler}
                            />
                            <label>Password</label>
                            {
                                errors.password ? (<span className="red-span" style={{fontSize: "14px"}}>{errors.password.message}</span>) : null
                            }
                            <input 
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={onChangeHandler}
                            />
                            <label>Confirm Password</label>
                            {
                                errors.confirmPassword ? (<span className="red-span" style={{fontSize: "14px"}}>{errors.confirmPassword.message}</span>) : null
                            }
                            <input 
                                type="password"
                                name="confirmPassword"
                                value={user.confirmPassword}
                                onChange={onChangeHandler}
                            />
                            <input id="Submit" type="submit" value="SIGN UP"/>
                        </div>
                    </form>
                </div>
            </div>
    </div>
    );
}

export default Registration;