const { makeExecutableSchema } = require("@graphql-tools/schema");
const { authors, posts } = require("./data");

// Define Type Definitions
const typeDefs = /* GraphQL */ `
  type Author {
    id: ID!
    firstName: String!
    lastName: String!
    """
    The list of posts by this author
    """
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    author: Author!
    votes: Int!
  }

  type Query {
    posts: [Post]
    author(id: ID!): Author
  }

  type Mutation {
    upvotePost(postId: ID!): Post
  }
`;

// Define Resolvers
const resolvers = {
  // Query types are resolved here
  Query: {
    posts: () => Array.from(posts.values()),
    author: (_, { id }) => { // (parent, args, context, info)
      const author = authors.get(Number(id));
      // Throw an error if author is not found!
      if (!author) throw new Error(`Oops! Author with ID ${id} not found.`);
      return author;
    },
  },

  // Mutation types are resolved here
  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = posts.get(Number(postId));
      if (!post) throw new Error(`Post with ID ${postId} not found.`);
      post.votes += 1;
      return post;
    },
  },

  // Nested Types Author and Post are resolved here
  Author: {
    // When author() is called the system looks up the posts for the author here
    // This allows access to the firstName and lastName fields in a query
    posts: (author) => {
      // Uncomment the line below and see what happens when you query author
      // console.log('Author.posts', author)
      return Array.from(posts.values()).filter((post) => post.authorId === author.id);
    },
  },

  Post: {
    // When posts() is called we look up the author for each post here. 
    author: (post) => {
      // Uncomment the line below to see what happens when you query posts
      // console.log('Post.Author', post)
      return authors.get(post.authorId);
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
