import {Link, useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Detail.css";
import moment from "moment";

const Detail =()=>{
    
    const {id} = useParams();
    const navigate = useNavigate();
    const [blog, setBlogs] = useState([]);
    const [detail, setDetail] = useState([]);
    const [loggedUser, setLoggedUser] = useState({});
    const [likes, setLikes] = useState(detail.likes);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/blogs/${id}`)
            .then(res =>
                {
                    console.log(res.data.results);
                    setDetail({
                        title: res.data.results.title,
                        desc: res.data.results.desc,
                        photo: res.data.results.photo,
                        categories: res.data.results.categories,
                        likes: res.data.results.likes,
                        createdAt: res.data.results.createdAt,
                        username: res.data.results.createdBy.username
                    });
                    setLikes(res.data.results.likes);
                })
            .catch(err => console.log(err))
    }, [id]);

        useEffect(() => {
        axios.patch(`http://localhost:8000/api/blogs/${id}/update`, {
            likes: likes
        },{
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [likes]);
    console.log(likes);

    const increment = () =>{
        console.log(disable);
        setLikes(likes+1);
        // window.location.reload(false);
        setDisable(!disable);
        console.log(disable);
    }

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

    const onClickDelete = ()=>{
        axios.delete(`http://localhost:8000/api/blogs/${id}/delete`)
            .then(res => {
                console.log(res);
                setBlogs(blog.filter(blog => blog._id !== id));
            })
            .catch(err => console.log(err));
            navigate("/");
    }
    // console.log(detail.username)
    // console.log(loggedUser.username)
    // if (detail.username === loggedUser.username){
    //     console.log("TRUE")
    // }
    // else console.log("FALSE");
    return(
        <div className="Detail">
            <div className="Title-Div"><h1 className="Link-H1">{detail.title}</h1></div>
            <p className="category">Blog category: {detail.categories}</p>
            <div className="author-likes">
                <div className="author">
                    <div> 
                        {
                            detail.username === loggedUser.username ?
                            (
                                <p>Blog created by: YOU |</p>
                            ) :
                            (
                                <p>Blog created by: {detail.username} <span className="Line"> | </span> </p>
                            ) 
                        }
                    </div>
                    <p>Creation Date: {moment(`${detail.createdAt}`).format('l')}</p>
                </div>
                <div className="likesBtn">
                    <div className="Likes">
                        <p>{likes} Like(s)</p>
                    </div>
                    <button className="Like-Btn" onClick={()=>increment(detail._id)} disabled={disable}>LIKE</button>
                </div>
            </div>
            {
                detail.username === loggedUser.username ?
                (<div>
                    <button  className="Edit-Btn" onClick={()=>navigate(`/edit/${id}`)}>EDIT</button>
                    <button  className="Delete-Btn" onClick={onClickDelete}>DELETE</button>
                </div>
                ) :
                null
            }
            <div className="DESC-Detail">
                <p id="descript-detail">{detail.desc}</p>
            </div>
        </div>
    );
}

export default Detail;