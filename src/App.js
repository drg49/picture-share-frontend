import React, {useEffect, useState} from "react";
import './App.css';
import { Route, Link, Switch } from "react-router-dom";
import Display from './Display'
import Form from "./Form"

const postsPerPage = 3;
let arrayForHoldingPosts = [];


function App() {
  const [postsToShow, setPostsToShow] = useState([]);
  const [next, setNext] = useState(3);

  const url = "https://picture-share-backend.herokuapp.com"
  

  const loopWithSlice = (start, end, val) => {
    const slicedPosts = val.slice(start, end)
    arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    setPostsToShow(arrayForHoldingPosts);
  };

  const getPosts = (a, b) => {
    fetch(url + "/posts/")
    .then((response) => response.json())
    .then((data) => {
      loopWithSlice(a, b, data.reverse()) //This shows that the newest posts show at the top
    })
  }

  useEffect(() => {
    getPosts(0, postsPerPage)
  }, [])

  const handleShowMorePosts = () => {
    getPosts(next, next + postsPerPage);
    setNext(next + postsPerPage);
  };
  

  const handleCreate = (newPost) => {
    fetch(url + "/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })
    .then(() => getPosts(next, next + postsPerPage))
    .then(() => window.location.reload())
  }

  const handleUpdate = (post) => {
    fetch(url + "/posts/" + post._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
    .then(() => getPosts(next, next + postsPerPage))
    .then(() => window.location.reload())
  }

  const deletePost = (post) => {
    fetch(url + "/posts/" + post._id, {
      method: "DELETE"
    })
    .then(() => {
      getPosts(next, next + postsPerPage)
    })
    .then(() => window.location.reload())
  }

  const emptyPost = {
    name: "",
    img: "",
    body: ""
  }

  const [selectedPost, setSelectedPost] = useState(emptyPost)

  const selectPost = (post) => {
    setSelectedPost(post)
  }

  return (
    <div className="App">
      <h1>Share an Image!</h1>
      <hr />
      <Link to="/create">
        <button>Create Post</button>
      </Link>
      <main>
        <Switch>
          <Route exact path="/" render={(rp) =>
            <Display {...rp} postsToRender={postsToShow} selectPost={selectPost} deletePost={deletePost} handleShowMorePosts={handleShowMorePosts}/>} />
            
          <Route exact path="/create" render={(rp) =>
            <Form {...rp} label="Create" post={emptyPost} handleSubmit={handleCreate} />} />
          <Route exact path="/edit" render={(rp) => 
              <Form {...rp} label="Update" post={selectedPost} handleSubmit={handleUpdate} />} />
        </Switch>
      
      </main>
    </div>
  );
}

export default App;
