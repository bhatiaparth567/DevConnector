const express=require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator');
const auth=require('../../middleware/auth');
const Post=require('../../models/Post');
const User=require('../../models/Users');
const Profile=require('../../models/Profile');


router.post('/',[auth,[check('text','Text is required').not().isEmpty()
]],async (req,res)=>{

    try {

    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }
    
    const user=await User.findById(req.user.id).select('-password');

    const newPost= new Post({

        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id

    });

    const post=await newPost.save();
    return res.json(post);
    

        
    } catch (error) {

        console.log(error.message);
        res.status(500).json('Server error');
        
    }



});

router.get('/',auth,async (req,res)=>{

    try {

        const post=await Post.find().sort({date:-1});
        res.json(post);

        
    } catch (error) {

        console.log(error.message);
        res.status(400).json("Server error");
        
    }

});

router.get('/:id', auth , async (req,res)=>{
    try {

        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json("Post Not Found");
        }

        res.json(post);

        
    } catch (error) {
        console.log(error);
        if(error.kind==='ObjectId'){
            return res.status(404).json("Post Not Found");
        }
        
        res.status(400).json("Server error");
        
    }
});

router.delete('/:id',auth,async (req,res)=>{
    try {

        const post=await Post.findById(req.params.id);
        //Check on the user
        if(!post){
            return res.json(400).json("Post not found");
        }
        if(post.user.toString()!==req.user.id){
            return res.status(401).json("Not authorised");

        }

        await post.remove();

        res.json("Post removed");

        
    } catch (error) {
        console.log(error);
        if(error.kind==='ObjectId'){
            return res.status(404).json("Post Not Found");
        }
        
        res.status(400).json("Server error");
        
    }
});

router.put('/like/:id',auth,async (req,res)=>{

    try {

        const post=await Post.findById(req.params.id);
        //check if post already liked
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
            return res.status(400).json("Post Already liked");
        }

        post.likes.unshift(req.user.id);
        await post.save();

        res.json(post.likes);

        
    } catch (error) {

        console.log(error.message);
        res.status(400).json("Server error");
        
    }

});

router.put('/unlike/:id',auth,async (req,res)=>{

    try {

        const post=await Post.findById(req.params.id);
        //check if post already liked
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
            return res.status(400).json("Post not yet liked");
        }

        const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.uesr.id);
        post.likes.splice(removeIndex,1);    
        await post.save();

        res.json(post.likes);

        
    } catch (error) {

        console.log(error.message);
        res.status(400).json("Server error");
        
    }

});

router.post('/comment/:id',[auth,[check('text','Text is required').not().isEmpty()
]],async (req,res)=>{

    try {

    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }
    
    const user=await User.findById(req.user.id).select('-password');
    const post=await Post.findById(req.params.id);

    const newComment= new Post({

        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id

    });

    post.comments.unshift(newComment);
    post.save();

    res.json(post.comments);
    

        
    } catch (error) {

        console.log(error.message);
        res.status(500).json('Server error');
        
    }



});

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Pull out comment
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
      // Check user
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      post.comments = post.comments.filter(
        ({ id }) => id !== req.params.comment_id
      );
  
      await post.save();
  
      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  });

module.exports=router;