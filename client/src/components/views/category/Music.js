import React, {useState, useEffect} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import moment from "moment";


const Music = ()=>{

    const [blogs, setBlogs] = useState([]);
    const [loggedUser, setLoggedUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8000/api/blogs/getMusicBlogs")
            .then(res => {
                console.log(res.data);
                setBlogs(res.data.results)
            })
            .catch(err => console.log(err))
    }, [])
    console.log(blogs)

    useEffect(() => {
        axios.get("http://localhost:8000/api/users",
            {withCredentials: true}
            )
            .then(res => {
                console.log(res.data.username);
                setLoggedUser(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    const onClickDelete = (blogId, i)=>{
        axios.delete(`http://localhost:8000/api/blogs/${blogId}/delete`)
            .then(res => {
                console.log(res);
                setBlogs(blogs.filter(blog => blog._id !== blogId));
            })
            .catch(err => console.log(err));
            navigate("/");
    }

    return(
        <div>
        {
                blogs.map((blog, index)=>{
                    return (
                        <div key={index} className="Blogs">
                        <div className="One-Blog">
                            <div className="Title-Div">
                                <Link to ={`/${blog._id}`} style={{textDecoration: "none"}}><h1 className="Link-H1">{blog.title}</h1></Link>
                                
                            </div>
                            <p className="category">Blog category: {blog.categories}</p>
                            <div className="author-likes">  
                                <div className="author">
                                    <div> 
                                        {
                                            blog.createdBy.username === loggedUser.username ?
                                            (
                                                <p>Blog created by: YOU |</p>
                                            ) :
                                            (
                                                <p>Blog created by: {blog.createdBy.username} <span className="Line"> | </span> </p>
                                            ) 
                                        }
                                    </div>
                                    <p>Creation Date: {moment(`${blog.createdAt}`).format('l')}</p>
                                </div>
                                <div className="Likes">
                                    <p>{blog.likes} Like(s)</p>
                                </div>
                            </div>
                            
                            {
                                blog.createdBy.username === loggedUser.username ?
                                (<div>
                                    <button className="Edit-Btn" onClick={()=>navigate(`/edit/${blog._id}`)}>EDIT</button>
                                    <button className="Delete-Btn" onClick={()=>onClickDelete(blog._id)}>DELETE</button>
                                </div>
                                ) :
                                null
                            }
                            <div className="DESC">
                                <p id="descript">{blog.desc}</p>
                            </div>
                        </div>
                    </div>
                    );
                })
            }
    </div>
    );
}

export default Music;