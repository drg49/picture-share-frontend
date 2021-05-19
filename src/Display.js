import load from './load.gif'

const Display = (props) => {
    
    const posts = props.posts
    
    const loaded = () => {
        return <div>
            {posts.map((post) => {
                return (
                    <article key={post._id}>
                        <img src={post.img} alt={`${post.name} post`}/>
                        <h3>{post.name}</h3>
                        <p>{post.body}</p>
                        <button onClick={() => {
                            props.selectPost(post)
                            props.history.push("/edit") 
                        }}>Edit</button>
                        <button onClick={() => {props.deletePost(post)}}>Delete</button>
                    </article>
                )
            })}
        </div>
    }

    const loading = () => {
        return  (
        <>
            <img id="load" src={load} alt="The page is loading."/>
            <h4>Loading images</h4>
        </>
        )
    }

    return posts.length > 0 ? loaded() : loading()

}

export default Display