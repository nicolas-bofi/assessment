import React, { useEffect, useState } from 'react';
import axios from "axios";
import Post from "./Post"
import '../styles/index.css';


function App() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories]: [string[], any] = useState([])


  function handleClick(e){
    e.preventDefault();
    console.log("coucou")
  }

  useEffect(() => {
    axios.get("/api/posts").then(function (response) {
      // handle success
      setPosts(response.data.posts);

      var categoryList: Array<String> = ["All"]
      response.data.posts.forEach(post => {
        post.categories.forEach(category => {
          if(!categoryList.includes(category.name)){
            categoryList.push(category.name)
          }
        });
      });
      setCategories(categoryList)

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
      <div id='categorieList' >
        {categories.map((category:string) => 
          <button key={category.toString()} onClick={() => setSelectedCategory(category)} className={category == selectedCategory ? "selected" : "notSelected"}>{category}</button>
        )}
      </div>
        {posts.map(function(post: any){
          if(selectedCategory == "All" || post.categories.some(c => c.name === selectedCategory)){
            return <Post {...{post: post}}/>
          }
        })}
    </div>
  );
}

export default App;
