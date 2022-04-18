import React, {useState, useEffect} from "react";
import "./CreateBlog.css";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const Edit=()=>{

    const navigate = useNavigate();
    const {id} = useParams();
    const categories = ["Food", "Music", "Sport"];
    const [feErrors, setFeErrors] = useState("");
    const [beErrors, setBeErrors] = useState("");
    const [updateForm, setUpdateForm] = useState({
        photo: "",
        title: "",
        categories: categories[0],
        desc: ""
    });
    const onChangeHandler = (e) => {
        setUpdateForm({
            ...updateForm,
            [e.target.name]: e.target.value
        })
        if (e.target.value === "" && (e.target.name === "title" || e.target.name === "desc")){
            setFeErrors("(*) Mandatory fields can't be empty!");
        }
        else {
            setFeErrors("");
        }
    }
    useEffect(() => {
        axios.get(`http://localhost:8000/api/blogs/${id}`)
            .then(res =>
                {
                    console.log(res.data.results);
                    setUpdateForm({
                        photo: res.data.results.photo,
                        title: res.data.results.title,
                        categories: res.data.results.categories,
                        desc: res.data.results.desc
                    });
                })
            .catch(err => console.log(err))
    }, [id]);

    const onSubmitHandler=(e)=>{
        e.preventDefault();
        if (updateForm.title === "" || updateForm.desc === ""){
            setFeErrors("(*) Mandatory fields can't be empty!");
        }
        else if (feErrors !== ""){
            navigate("/new");
        }
        else {
        axios.patch(`http://localhost:8000/api/blogs/${id}/update`, updateForm)
            .then(res=>{
                console.log(res);
                navigate("/");})
            .catch(err=>{
                console.log(err.response.data);
                setBeErrors(err.response.data.err.errors.title.kind);
                navigate(`/edit/${id}`);
            });
    }}
    return (
        <div className="Main-Create">
        <form onSubmit={onSubmitHandler}>
            <div className="Title">
                <h1>TYPE YOUR THOUGHTS BELOW!</h1>
                <div className="Select-Div">
                    <label>Choose your blog category:</label>
                    <select name="categories" value={updateForm.categories} className="Options" onChange={onChangeHandler}>
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
                    value={updateForm.title}
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
                    value={updateForm.desc}
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
            <input type="submit" className="Btn" value="EDIT"/>
        </form>
            {
                feErrors ? <span className="red-span" style={{fontSize: "16px"}}>{feErrors}</span> : ''
            }
    </div>
    );
}

export default Edit;