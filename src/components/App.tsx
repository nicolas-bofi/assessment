import React, { useEffect, useState } from 'react';
import axios from "axios";

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
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post:any) => (
          <li key={post.id}>
            {post.title}. {post.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
