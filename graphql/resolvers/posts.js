const post=require("../../models/post.js")

module.exports={
    Query:{
        async getPosts(){
            try{
                const posts=await post.find();
                return posts;
            }
            catch(err)
            {
                throw new Error(err)
            }
        },
        async getPost(_,{ postId }){
            try {
                const Post=await post.findById(postId)
                if(Post){
                    return Post;
                }              
                else{
                    throw new Error("Post not found");
                }  
            } catch (error) {
                throw new Error(error); 
            }
        }
    },
    Mutation:{
        async createPost(_,{ body }){
            
        }
    }
}