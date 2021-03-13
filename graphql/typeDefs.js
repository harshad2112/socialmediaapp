const { gql } = require("apollo-server")

module.exports=gql`
type Post{
    id: ID!
    username: String!
    createdAt: String!
    body: String!
}
type Query{
    getPosts:[Post]
    getPost(postId: ID!):Post
}
input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
}
type User{
    id: ID!
    email: String!
    token: String!
    createdAt: String!
    username: String!
    data: [data]
}
type data2{
    name: String!
    totalMembers: String!
    Category: String!
}
type data{
    NameofArea: String!
    blockNo: String!
    wardNo: String!
    data2:[data2]
}
type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String! password: String!): User!
    createPost(body: String!): Post!
    DeletePost(PostId: ID!): String!
    
}`

// login
// register
// 