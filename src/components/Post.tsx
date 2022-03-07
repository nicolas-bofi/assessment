import React from 'react'
import '../styles/post.css';

class Post extends React.Component{
    constructor(props) {
        super(props)
        this.state = {post: props.post}
    }
    
    render(){
        return(
            <div className='postCard'>
                <h1>{this.state.post.title}</h1>
                <div className='author'>
                    <img className='avatar' src={this.state.post.author.avatar} alt="author avatar" />
                    <span>{this.state.post.author.name}</span>
                </div>
                
            </div>
        );
    }
}

export default Post