import React, {useState, useEffect} from "react";
import "./CreateBlog.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CreateBlog =()=>{

    const navigate = useNavigate();
    const categories = ["Food", "Music", "Sport"];
    const [feErrors, setFeErrors] = useState("");
    const [beErrors, setBeErrors] = useState("");
    const [loginError, setLoginError] = useState("");
    const [form, setForm] = useState({
        photo: "",
        title: "",
        categories: categories[0],
        desc: ""
    });
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        if (e.target.value === "" && (e.target.name === "title" || e.target.name === "desc")){
            setFeErrors("(*) Mandatory fields can't be empty!");
        }
        else {
            setFeErrors("");
        }
        
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (form.title === "" || form.desc === ""){
            setFeErrors("(*) Mandatory fields can't be empty!");
        }
        else if (feErrors !== ""){
            navigate("/new");
        }
        else {
            axios.post("http://localhost:8000/api/blogs/new", form,
        {
            withCredentials: true
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
            .catch(err => {
                console.log(err.response.data.verified);
                setLoginError(err.response.data.verified)
                setBeErrors(err.response.data.err.errors.title.kind);
                console.log(loginError);
                navigate("/new");
            });
        }
    }
    console.log(loginError);
    return(
        <div className="Main-Create">
            <form onSubmit={onSubmitHandler}>
                <div className="Title">
                    <h1>TYPE YOUR THOUGHTS BELOW!</h1>
                    {
                        loginError === false ? <span className="red-span" style={{fontSize: "16px", marginBottom: "2em"}}>You MUST login first!</span> : ''
                    }
                    <div className="Select-Div">
                        <label>Choose your blog category:</label>
                        <select name="categories" className="Options" onChange={onChangeHandler}>
                            { 
                                categories.map((position, i) => {
                                    return (<option className="Opt" value={position} key={i}>{position}</option>)
                                })
                            }
                        </select>
                    </div>
                    <input 
                        type="text"
                        name="title"
                        autoFocus
                        id="title"
                        placeholder="Enter blog title..."
                        onChange={onChangeHandler}
                    />
                    {   
                        beErrors === "unique" ?
                        <span className="red-span" style={{fontSize: "16px"}}>Title must be unique!</span>
                        :
                        ""
                    }
                </div>
                <div>
                    <textarea
                        name="desc"
                        placeholder="Start typing..."
                        onChange={onChangeHandler}
                    />
                    {   
                        beErrors ?
                        <span className="red-span" style={{fontSize: "16px"}}>{beErrors.desc && beErrors.desc.message}</span>
                        :
                        ""
                    }
                </div>
                <input type="submit" className="Btn" value="PUBLISH"/>
            </form>
            {
                feErrors ? <span className="red-span" style={{fontSize: "16px"}}>{feErrors}</span> : ''
            }
        </div>
    );
}

export default CreateBlog;