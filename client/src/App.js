import logo from "../src/components/images/logo.png";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import './App.css';
import React, {useState, useEffect} from "react";
import Main from "./components/views/Main";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import CreateBlog from "./components/views/CreateBlog";
import axios from "axios";
import Detail from "./components/views/Detail";
import Edit from "./components/views/Edit";
import Food from "./components/views/category/Food";
import Music from "./components/views/category/Music";
import Sport from "./components/views/category/Sport";
import TopLiked from "./components/views/category/TopLiked";


function App() {
  const [tab, setTab] = useState("Login");
  const [loggedUser, setLoggedUser] = useState({});
  const [isLogged, setIsLogged] = useState(true);
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

  const logout=()=>{

    axios.post("http://localhost:8000/api/users/logout", 
    {},
    {
        withCredentials: true
    },)
    .then(res => {
      console.log(res);
        console.log(res.data);
        setIsLogged(false);
    })
    .catch((err)=>{
        console.log(err);
    });
  }
  return (
    <BrowserRouter>
      <div className="content">
        <div className="header">
              <img id="logo" src={logo} alt="Logo of the App"/>
              <h1 id="contact">"Share your thoughts with us..."</h1>
          </div>
          <nav>
              <ul id="ul1">
                  <li className="border"><Link to="/" className="active1">HOME</Link></li>
                  <li className="border"><Link to="/new" className="nonactive1">{`WRITE BLOG>>`}</Link></li>
                  <li className="border"><Link to="/registration" className="nonactive1">{`REGISTRATION>>`}</Link></li>
                    <li className="border"><Link to="/login" className="nonactive1">{`LOGIN`}</Link></li>
                    <Link to="/" className="logout"><button className="border" style={{backgroundColor: "#303030", color: "#bdbdbd", fontWeight: "bold"}} onClick={logout}>{`LOGOUT`}</button></Link>
              </ul>
              <div id="vertical-line"></div>
          </nav>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/login" element={<Login tab={tab} setTab={setTab}/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/:id" element={<Detail/>}/>
            <Route path="/new" element={<CreateBlog/>}/>
            <Route path="/edit/:id" element={<Edit/>}/>
            <Route path="/food" element={<Food/>}/>
            <Route path="/music" element={<Music/>}/>
            <Route path="/sport" element={<Sport/>}/>
            <Route path="/topLiked" element={<TopLiked/>}/>
          </Routes>
          <footer className="back">
              <a id="back-a" href="#">Back To Top</a>
          </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
