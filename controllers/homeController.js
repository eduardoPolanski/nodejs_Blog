const mongoose = require('mongoose');
const Post = mongoose.model('Post');


exports.index = async (req, res)=> {
    let responseJson = {
      pageTitle:'HOME',
      posts: [],
      tags: [],
    };

    responseJson.tag = req.query.t;
    const postFilter = (typeof responseJson.tag != 'undefined') ? {tags: responseJson.tag}: {}
            
    const tagsPromise = Post.getTagsList();
    const postsPromise = Post.find(postFilter);

    const [ tags, posts ] = await Promise.all([ tagsPromise, postsPromise]);

    for(let i in tags){
      if(tags[i]._id == responseJson.tag){
        tags[i].class = "selected"; 
      }
    }

    responseJson.tags = tags;
    responseJson.posts = posts;

    res.render('home', responseJson);
} 
  