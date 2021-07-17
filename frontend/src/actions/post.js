import axios from 'axios';
import {setAlert} from './alert';
import { GET_POSTS , POSTS_ERROR, UPDATE_LIKES , LIKE_ERROR ,DELETE_POST , ADD_POST , GET_POST , ADD_COMMENT , REMOVE_COMMENT} from './types';

export const getPosts=()=> async dispatch=>{
    try {

        const res=await axios.get('api/posts');
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
        
    } catch (error) {

        dispatch({
            type:POSTS_ERROR
        })

        dispatch(setAlert('Error in getting posts','danger'));
        
    }
}

export const deletePost=id=> async dispatch=>{
  try {

    const res=await axios.delete(`api/posts/${id}`);

    dispatch({
      type:DELETE_POST,
      payload:id
    })

    dispatch(setAlert('Post Removed','success'));
    
  } catch (error) {

    dispatch(setAlert('Error in deleting posts','danger'));

  }
}

export const addPost=(formData)=> async dispatch=>{
  try {
    
    const config={
      headers:{
        'Content-type':'application/json'
      }

    }
    const res=await axios.post(`api/posts`,formData,config);

    dispatch({
      type:ADD_POST,
      payload:res.data
    })

    dispatch(setAlert('Post added successfully','success'));
    
  } catch (error) {

    dispatch(setAlert('Error in deleting posts','danger'));

  }
}

export const getPost=id=> async dispatch=>{
  try {

      const res=await axios.get(`http://localhost:5000/api/posts/${id}`);
      dispatch({
          type:GET_POST,
          payload:res.data
      })
      
  } catch (error) {

      dispatch({
          type:POSTS_ERROR
      })

      dispatch(setAlert('Error in getting posts','danger'));
      
  }
}

export const addComment=(postId,formData)=> async dispatch=>{
  try {
    
    const config={
      headers:{
        'Content-type':'application/json'
      }

    }
    const res=await axios.post(`http://localhost:5000/api/posts/comment/${postId}`,formData,config);

    dispatch({
      type:ADD_COMMENT,
      payload:res.data
    })

    dispatch(setAlert('Comment added successfully','success'));
    
  } catch (error) {

    dispatch(setAlert('Error in getting comment','danger'));

  }
}

export const deleteComment=(postId,commentId)=> async dispatch=>{
  try {
    
    const res=await axios.delete(`http://localhost:5000/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type:REMOVE_COMMENT,
      payload:commentId
    })

    dispatch(setAlert('Comment deleted successfully','success'));
    
  } catch (error) {

    dispatch(setAlert('Error in deleting comment','danger'));

  }
}

