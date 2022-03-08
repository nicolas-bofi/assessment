import React, { useEffect, useState } from 'react';
import axios from "axios";
import Post from "./Post"
import '../styles/index.css';


function App() {
  const [posts, setPosts]: [any, any] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories]: [string[], any] = useState([])
  const [visible, setVisible] = useState(3)

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

  function loadMore() {
    setVisible(visible + 3)
  }

  function isSelectable(post){
    var toReturn = false
    post.categories.forEach(category => {
      if(category.name === selectedCategory){
        toReturn =  true
      }
    })
    return toReturn
  }

  function all(){
    return (
      <div>
        {
          posts.slice(0, visible).map(function(post: any){
            return <Post key={post.id} {...{post: post}}/>
          })
        }
        {
          visible < posts.length &&
            <div onClick={loadMore} className="load-more">Load more</div>
        }
      </div>
    )
  }

  function filtered(){
    return (
      <div>
        {
          posts.filter((post) => isSelectable(post)).slice(0, visible).map(function(p: any){
            console.log(p.title)
            return <Post key={p.id} {...{post: p}}/>
          })
        }
        {
          visible < posts.filter((post) => isSelectable(post)).length &&
            <div onClick={loadMore} className="load-more">Load more</div>
        }
      </div>
    )
  }

  return (
    <div id="list">
      <h1>Posts</h1>
      <div id='categorieList' >
        {categories.map((category:string) => 
          <div key={category.toString()} onClick={() => {setSelectedCategory(category); setVisible(3)}} className={category === selectedCategory ? "selected" : "notSelected"}>{category}</div>
        )}
      </div>
      {selectedCategory === "All" ? all() : filtered()}
    </div>
  );
}

export default App;
