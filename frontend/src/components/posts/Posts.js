import React,{Fragment , useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getPosts} from '../../actions/post';
import Spinner from '../layout/spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts , post}) => {

    useEffect(()=>{
        getPosts()
    },[getPosts]);

    const {posts,loading}=post;

    return loading ? (<Spinner />) : (
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">

                <i className="fas fa-user"></i> Welcome to the community

            </p>

            <PostForm />
            

            <div className="posts">
                {
                    posts.map(post=>(
                        <PostItem  post={post} />
                    ))
                }

            </div>
        </Fragment>

        
    )
}

Posts.propTypes = {

    getPosts:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired

}

const mapStateToProps=state=>({
    post:state.post
})

export default connect(mapStateToProps,{getPosts})(Posts);
