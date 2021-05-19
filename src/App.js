import React, {useEffect, useState} from "react";
import './App.css';
import { Route, Link, Switch } from "react-router-dom";
import Display from './Display'
import Form from "./Form"

function App() {

  const url = "http://localhost:4000"

  const [posts, setPosts] = useState([])

  const getPosts = () => {
    fetch(url + "/posts/")
    .then((response) => response.json())
    .then((data) => {
      setPosts(data)
    })
  }

  useEffect(() => {getPosts()}, [])

  const handleCreate = (newPost) => {
    fetch(url + "/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })
    .then(() => getPosts)
  }

  const handleUpdate = (post) => {
    fetch(url + "/posts/" + post._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
    .then(() => getPosts())
  }

  const deletePost = (post) => {
    fetch(url + "/posts/" + post._id, {
      method: "DELETE"
    })
    .then(() => {
      getPosts()
    })
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
            <Display {...rp} posts={posts} selectPost={selectPost} deletePost={deletePost} />} />
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
