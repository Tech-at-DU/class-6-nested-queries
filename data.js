// The data for this example is stored here. 

const authors = new Map([
  [1, { id: 1, firstName: "Tom", lastName: "Coleman" }],
  [2, { id: 2, firstName: "Sashko", lastName: "Stubailo" }],
  [3, { id: 3, firstName: "Mikhail", lastName: "Novikov" }],
]);

const posts = new Map([
  [1, { id: 1, authorId: 1, title: "Introduction to GraphQL", votes: 2 }],
  [2, { id: 2, authorId: 2, title: "Welcome to Meteor", votes: 3 }],
  [3, { id: 3, authorId: 2, title: "Advanced GraphQL", votes: 1 }],
  [4, { id: 4, authorId: 3, title: "Launchpad is Cool", votes: 7 }],
]);

module.exports = { authors, posts };
