const { ApolloServer }= require("apollo-server");
 const mongoose=require("mongoose")

const { MONGODB } = require("./config.js")
const typeDefs=require("./graphql/typeDefs.js")
const resolvers=require("./graphql/resolvers")

const PORT=3010;
const server=new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MONGODB,{useNewUrlParser:true,useUnifiedTopology: true})
    .then(()=>
    {console.log("mongoose connected")
    return server.listen({port: PORT})
    })
    .then((res)=>{
        console.log(`server started on port: ${PORT}`);
    })