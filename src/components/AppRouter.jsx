import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import NotFound from "../pages/NotFound";
import Registration from "../pages/Registration";
import Authorization from "../pages/Authorization";
import PostId from "../pages/PostId";
import Profile from "../pages/Profile";

const AppRouter = () => {
    return (  
        <Routes>
            <Route index path="/about" element={<About/>}/>
            <Route exact path="/posts" element={<Posts/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/auth" element={<Authorization/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route exact path="/posts/:id" element={<PostId/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}
 
export default AppRouter;