import React, {useState, useEffect} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import moment from "moment";


const TopLiked = ()=>{

    const [blogs, setBlogs] = useState([]);
    const [loggedUser, setLoggedUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8000/api/blogs/getAll")
            .then(res => {
                console.log(res.data);
                const result = res.data.results.sort((a, b)=>b.likes - a.likes);
                setBlogs(result);
            })
            .catch(err => console.log(err))
    }, [])
    console.log(blogs.likes)

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
                            <div>
                                SET IMAGE HERE
                            </div>
                            <div>
                                <div>
                                    <Link to ={`/${blog._id}`}><h3>{blog.title}</h3></Link>
                                    <p>Category: {blog.categories}</p>
                                </div>
                                <div>
                                    {
                                        blog.createdBy.username === loggedUser.username ?
                                            (
                                                <p>Author: YOU</p>
                                            ) :
                                            (
                                                <p>Author: {blog.createdBy.username}</p>
                                            ) 
                                    }
                                    <p>Creation Date: {moment(`${blog.createdAt}`).format('l')}</p>
                                    <div>
                                        <h4>{blog.likes} Likes</h4>
                                    </div>
                                </div>
                                {
                                    blog.createdBy.username === loggedUser.username ?
                                    (<div>
                                        <button onClick={()=>navigate(`/edit/${blog._id}`)}>EDIT</button>
                                        <button onClick={()=>onClickDelete(blog._id)}>DELETE</button>
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

export default TopLiked;