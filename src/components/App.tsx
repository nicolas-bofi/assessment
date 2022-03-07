import React, { useEffect, useState } from 'react';
import axios from "axios";
import Post from "./Post"
import '../styles/index.css';


function App() {
  const [posts, setPosts]: [any, any] = useState([]);

  useEffect(() => {
    axios.get("/api/posts").then(function (response) {
      // handle success
      setPosts(response.data.posts);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }, [])
  

  return (
    <div id="list">
      <h1>Posts</h1>
        {posts.map((post:any) => (
          <Post post={post}/>
        ))}
    </div>
  );
}

export default App;
