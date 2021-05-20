import load from './load.gif'

const Display = (props) => {
    
    const posts = props.posts
    
    const loaded = () => {
        return <div>
            {props.postsToRender.map((post) => {
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
            <button onClick={props.handleShowMorePosts}>Load more</button>
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

    return props.postsToRender.length > 0 ? loaded() : loading()

}

export default Display