# GraphQL Posts and Authors Example 
This example was built with `graphql-tools` and `express`. It simulates a social media site with posts and authors. 

Take a look at `data.js`. Notice all of the data is stored as JavaScript `Map`s. These are special key-value structures, different from objects. There are two maps here: `posts` and `authors`.

`Map` was introduced in 2015. Read more about them here: https://www.digitalocean.com/community/tutorials/js-maps-introduction 

This example also implements nested queries. We use this when we have fields that need to fetch related data. In this case a post may need to look up the name of an author, or an author may need to provide a list of posts. 

This example code uses graphql-tools: https://the-guild.dev/graphql/tools/docs/generate-schema

## JS Map 
See `data.js` for an example that implements `Map`. 

### **🗺️ JavaScript `Map` Object Explained**

A **`Map`** in JavaScript is a built-in data structure that **stores key-value pairs** and allows fast lookup, insertion, and deletion of values based on keys.

---

## **🔹 Key Features of `Map`**
✅ **Preserves insertion order** – Unlike objects, `Map` remembers the order in which keys were inserted.  
✅ **Efficient key lookups** – Faster than objects when checking for the existence of a key (`O(1)` complexity).  
✅ **Any data type as a key** – Unlike objects (which only support strings or symbols as keys), `Map` supports **numbers, objects, functions, and even other Maps** as keys.  
✅ **Built-in methods** – Provides useful methods like `.get()`, `.set()`, `.delete()`, and `.has()`.

---

## **🔹 Basic Usage**
### **1️⃣ Creating a `Map`**
```javascript
const myMap = new Map();
```

### **2️⃣ Adding Key-Value Pairs**
```javascript
myMap.set("name", "Alice");
myMap.set(1, "one"); // Number as a key
myMap.set(true, "boolean"); // Boolean as a key
```

### **3️⃣ Retrieving Values**
```javascript
console.log(myMap.get("name")); // Output: Alice
console.log(myMap.get(1)); // Output: one
console.log(myMap.get(true)); // Output: boolean
```

### **4️⃣ Checking for Key Existence**
```javascript
console.log(myMap.has("name")); // true
console.log(myMap.has("age")); // false
```

### **5️⃣ Deleting a Key**
```javascript
myMap.delete(1);
console.log(myMap.has(1)); // false
```

### **6️⃣ Getting Map Size**
```javascript
console.log(myMap.size); // Output: 2 (only "name" and "boolean" remain)
```

---

## **🔹 Why Use `Map` Instead of an Object?**
| Feature | `Object` | `Map` |
|---------|---------|-------|
| 🔹 Key Types | Only strings & symbols | Any data type (numbers, objects, functions, etc.) |
| 🔹 Order | Not guaranteed | Maintains insertion order |
| 🔹 Performance | Slower for large datasets | Faster key lookups |
| 🔹 Size Property | `Object.keys(obj).length` (expensive) | `.size` (fast) |
| 🔹 Iteration | Requires `for...in` | Directly iterable with `.forEach()`, `for...of` |

---

## **🔹 Iterating Over a `Map`**
### **🔁 Using `.forEach()`**
```javascript
myMap.forEach((value, key) => {
  console.log(`${key} => ${value}`);
});
```
✅ **Output:**
```
name => Alice
true => boolean
```

### **🔁 Using `for...of`**
```javascript
for (let [key, value] of myMap) {
  console.log(`${key}: ${value}`);
}
```

---

## **🔹 Example: Using `Map` for Fast Lookups**
Instead of using an array and `find()`, which is slow (`O(n)` complexity), we can use a `Map` for instant lookup (`O(1)` complexity).

### **🚀 Array Approach (Slow)**
```javascript
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

const user = users.find(user => user.id === 2); // O(n) complexity
console.log(user.name); // Bob
```

### **🚀 Map Approach (Fast)**
```javascript
const usersMap = new Map([
  [1, { id: 1, name: "Alice" }],
  [2, { id: 2, name: "Bob" }]
]);

console.log(usersMap.get(2).name); // Bob (O(1) complexity)
```

---

## **🔹 When to Use `Map` vs. `Object`?**
- **Use `Map` when:**
  - You need **fast lookups** and insertions.
  - Keys are **not just strings** (e.g., numbers, objects).
  - You want to **maintain key order**.
  - You need built-in methods like `.size`, `.forEach()`, etc.

- **Use `Object` when:**
  - You’re dealing with **structured data** that doesn’t require quick key-value operations.
  - You only need **string keys**.
  - You need to serialize data (`JSON.stringify()` works natively with objects but not with `Map`).

---

## **🔹 Practical Example: Using `Map` in GraphQL**
Instead of this **slow array lookup**:
```javascript
const authors = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

const findAuthor = (id) => authors.find(author => author.id === id);
```
We can use a **fast `Map` lookup**:
```javascript
const authors = new Map([
  [1, { id: 1, name: "Alice" }],
  [2, { id: 2, name: "Bob" }]
]);

const findAuthor = (id) => authors.get(id);
```
✅ **Lookups now take `O(1)` time instead of `O(n)`.** 🚀

---

## **🔹 Conclusion**
✅ `Map` is **faster** than objects for large datasets.  
✅ `Map` supports **any key type** (numbers, objects, functions).  
✅ `Map` provides **useful methods** like `.get()`, `.set()`, `.delete()`, and `.has()`.  
✅ `Map` is **iterable** and maintains key order.

### **💡 Want a Challenge?**
Try implementing a **GraphQL API that stores users and posts in a `Map` instead of an array**! 🚀 

#### **What is `Array.from()`?**
`Array.from()` is a JavaScript method that **creates a new array from an iterable or array-like object**.

📌 **Syntax:**
```javascript
Array.from(iterable, mapFunction)
```
- `iterable` → Can be an array-like object (e.g., `NodeList`, `Map`, `Set`, `arguments`, etc.).
- `mapFunction` (optional) → A function to apply to each item before adding it to the new array.

---

### **🔹 Why Use `Array.from()` with `Map`?**
A **`Map`** stores key-value pairs and is **not an array**. It’s an **iterable**, but to use array methods (like `.filter()`, `.map()`, `.sort()`), we need to **convert it into an array** first.

**Example: Converting a `Map` to an Array**
```javascript
const users = new Map([
  [1, { id: 1, name: "Alice" }],
  [2, { id: 2, name: "Bob" }],
]);

console.log(Array.from(users));
```
✅ **Output:**
```json
[
  [1, { "id": 1, "name": "Alice" }],
  [2, { "id": 2, "name": "Bob" }]
]
```
**Note:** The result is an **array of key-value pairs**, not just values.

---

### **🔹 Extracting Only the Values from a `Map`**
We often only need **the values** (not the keys). `Array.from()` helps us convert a `Map` into an array of values:

```javascript
const usersArray = Array.from(users.values());
console.log(usersArray);
```
✅ **Output:**
```json
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" }
]
```
Now, `usersArray` is a **normal array**, and we can use `.filter()`, `.map()`, `.sort()`, etc.

---

### **🔹 Practical Example: Using `Array.from()` in GraphQL**
When we store authors or posts in a `Map`, we need to return an array in our GraphQL resolvers.

❌ **Without `Array.from()` (Wrong)**
```javascript
const authors = new Map([
  [1, { id: 1, name: "Alice" }],
  [2, { id: 2, name: "Bob" }],
]);

const resolvers = {
  Query: {
    authors: () => authors.values(), // Returns an iterator, NOT an array!
  },
};
```
✅ **With `Array.from()` (Correct)**
```javascript
const resolvers = {
  Query: {
    authors: () => Array.from(authors.values()), // Converts to an array
  },
};
```
🔹 Now, GraphQL correctly returns a **list of authors** instead of an iterator.

---

### **🔹 Another Use Case: Filtering Data in a `Map`**
Imagine you store posts in a `Map`, and you want to get only the posts written by a specific author.

```javascript
const posts = new Map([
  [1, { id: 1, title: "GraphQL Basics", authorId: 1 }],
  [2, { id: 2, title: "Advanced GraphQL", authorId: 2 }],
]);

const getPostsByAuthor = (authorId) =>
  Array.from(posts.values()).filter((post) => post.authorId === authorId);

console.log(getPostsByAuthor(1));
```
✅ **Output:**
```json
[
  { "id": 1, "title": "GraphQL Basics", "authorId": 1 }
]
```

---

### **🔹 Summary**
| **Feature**               | **Without `Array.from()`** | **With `Array.from()`** |
|---------------------------|-----------------|----------------|
| 🚀 Converts `Map` to array | ❌ No | ✅ Yes |
| 🛠️ Can use `.map()`, `.filter()` | ❌ No | ✅ Yes |
| 🎯 Used in GraphQL resolvers | ❌ Fails | ✅ Works |

---

### **🔹 Final Thoughts**
- **`Array.from()`** is used to **convert iterables (like `Map` values) into arrays**.
- This is **necessary in GraphQL** when returning lists from a `Map`.
- It helps when **filtering, mapping, or modifying data** inside a `Map`.

## Nested Queries 

### **🔹 Why Do We Have `Author` and `Post` in the Resolvers?**
In GraphQL, **nested queries** require explicit resolver functions for non-scalar types like `Author` and `Post`. These resolvers tell GraphQL **how to fetch related data** when a field needs more than just returning a value from an object.

---

## **🔹 How GraphQL Resolves Queries**
A GraphQL resolver is triggered **for each field** in a query. This means:
1. The **top-level resolver** (like `Query.authors`) provides a **list of authors**.
2. If the client requests **nested fields**, GraphQL will call **resolvers for `Author` and `Post`** to fetch those fields.

---

### **🔹 Example GraphQL Query**
Suppose we send this GraphQL query:
```graphql
query {
  posts {
    title
    author {
      firstName
      lastName
    }
  }
}
```
GraphQL resolves this step by step:
1. It first calls `Query.posts`, returning a **list of posts**.
2. Each post has an `author` field, so GraphQL calls the `Post.author` resolver to fetch the related author.

---

## **🔹 Why Do We Need `Author` and `Post` in Resolvers?**
In your schema, `Post` has an `author`, and `Author` has a list of `posts`. Since these are **nested relationships**, we need resolvers for them.

### **🛠 Example: Resolvers with `Author` and `Post`**
```javascript
const resolvers = {
  Query: {
    posts: () => Array.from(posts.values()), // Gets all posts
    author: (_, { id }) => authors.get(Number(id)), // Gets an author by ID
  },

  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = posts.get(Number(postId));
      if (!post) throw new Error(`Post with ID ${postId} not found.`);
      post.votes += 1;
      return post;
    },
  },

  // 🔹 Resolving the `posts` field inside `Author`
  Author: {
    posts: (author) => {
      console.log("Resolving Author.posts", author);
      return Array.from(posts.values()).filter((post) => post.authorId === author.id);
    },
  },

  // 🔹 Resolving the `author` field inside `Post`
  Post: {
    author: (post) => {
      console.log("Resolving Post.author", post);
      return authors.get(post.authorId);
    },
  },
};
```

---

## **🔹 Step-by-Step Execution for the Query**
```graphql
query {
  posts {
    title
    author {
      firstName
      lastName
    }
  }
}
```
| **Step** | **What Happens?** |
|----------|------------------|
| 1️⃣ `Query.posts` is called | Returns all posts |
| 2️⃣ GraphQL sees `author { firstName lastName }` inside `posts` | It calls `Post.author` for each post |
| 3️⃣ `Post.author(post)` resolver runs | Fetches the correct author for each post |
| 4️⃣ GraphQL sees `firstName` and `lastName` inside `Author` | It directly extracts these scalar values |

---

### **🔹 Without `Author` and `Post` Resolvers, What Happens?**
If we remove:
```javascript
Post: {
  author: (post) => authors.get(post.authorId);
}
```
Then **GraphQL won’t know how to resolve the `author` field in `Post`**, and it will return `null` for `author`.

---

## **🔹 Another Example: Fetching an Author with Their Posts**
### **GraphQL Query**
```graphql
query {
  author(id: "1") {
    firstName
    lastName
    posts {
      title
    }
  }
}
```
### **Step-by-Step Execution**
1. **`Query.author(id: 1)`** is called → Returns `Tom Coleman`.
2. **GraphQL sees `posts { title }` inside `Author`**.
3. **It calls `Author.posts(author)`**.
4. **The resolver finds all posts where `authorId === author.id`** and returns them.
5. **GraphQL extracts `title` from each post**.

✅ **Response:**
```json
{
  "data": {
    "author": {
      "firstName": "Tom",
      "lastName": "Coleman",
      "posts": [
        { "title": "Introduction to GraphQL" }
      ]
    }
  }
}
```

---

## **🔹 Summary**
| **Resolver Type** | **What It Does** |
|-------------------|-----------------|
| `Query.posts` | Fetches all posts |
| `Query.author(id)` | Fetches a specific author by ID |
| `Post.author` | Resolves the `author` field inside `Post` (fetches the correct author) |
| `Author.posts` | Resolves the `posts` field inside `Author` (fetches the author's posts) |

### **✅ Why Do We Need `Author` and `Post` in Resolvers?**
✔️ GraphQL **only auto-resolves scalar fields** (e.g., `title`, `firstName`).  
✔️ If a field contains **nested data**, **GraphQL must call another resolver**.  
✔️ `Author.posts` and `Post.author` **define the relationships**.  

---

## Challenges 
Solve at least one of the challenges below. 

### **🚀 Challenge**
#### **1️⃣ Add a "Comments" Feature**
Extend the schema to include a `Comment` type and allow posts to have multiple comments.

✅ **Tasks:**
- Define a `Comment` type with `id`, `content`, `postId`, and `authorId`.
- Add a **query** to fetch comments for a specific post.
- Implement a **mutation** to allow adding a comment to a post.

💡 **Example Query:**
```graphql
query {
  posts {
    title
    comments {
      content
      author {
        firstName
      }
    }
  }
}
```
---

#### **2️⃣ Add a "Category" to Posts**
Modify the schema to **add a category field** to `Post`. Allow filtering posts by category.

✅ **Tasks:**
- Add a `category` field to the `Post` type.
- Modify `Query.posts(category: String)` to **filter posts by category**.
- Implement a **mutation** to update a post’s category.

💡 **Example Query:**
```graphql
query {
  posts(category: "GraphQL") {
    title
    category
  }
}
```
---

### **🔥 Intermediate Challenges**
#### **3️⃣ Implement a "Follow Author" System**
Allow users to **follow authors** and query their followed authors' posts.

✅ **Tasks:**
- Add a `followerIds` field to `Author` (a list of user IDs).
- Implement a **mutation** `followAuthor(userId: ID!, authorId: ID!): Author`.
- Add a **query** to fetch posts from followed authors.

💡 **Example Mutation:**
```graphql
mutation {
  followAuthor(userId: "10", authorId: "2") {
    firstName
    lastName
    followers
  }
}
```
---

#### **4️⃣ Implement Post Upvoting Leaderboard**
Create a **leaderboard** that shows the top 3 posts with the most upvotes.

✅ **Tasks:**
- Modify the `posts` query to accept `limit: Int` and `sortByVotes: Boolean`.
- Return posts **sorted by votes** in descending order.
- Allow **limiting the number of returned posts**.

💡 **Example Query:**
```graphql
query {
  posts(limit: 3, sortByVotes: true) {
    title
    votes
  }
}
```
---

### **💡 Advanced Challenges**
#### **5️⃣ Add a "User" System**
Introduce a `User` type that can:
- Write posts.
- Comment on posts.
- Follow authors.

✅ **Tasks:**
- Define `User` with `id`, `name`, and `followingAuthors`.
- Modify `Post` and `Comment` to **link to users**.
- Allow users to **write posts, comment on posts, and follow authors**.

💡 **Example Query:**
```graphql
query {
  user(id: "1") {
    name
    followingAuthors {
      firstName
    }
    posts {
      title
    }
  }
}
```
---

#### **6️⃣ Implement a GraphQL Subscription**
Set up a **subscription** so users get real-time updates when a post is upvoted.

✅ **Tasks:**
- Implement a `Subscription` type with `postUpdated(postId: ID!): Post`.
- Modify `upvotePost` to **trigger the subscription**.
- Use Apollo Server or WebSockets to send real-time updates.

💡 **Example Subscription:**
```graphql
subscription {
  postUpdated(postId: "1") {
    title
    votes
  }
}
```
---

### **📌 Summary**
| **Challenge** | **Key Concepts Covered** |
|--------------|--------------------------|
| Add Comments | Nested Queries & Mutations |
| Filter Posts by Category | Query Arguments & Filtering |
| Follow an Author | Many-to-Many Relationships |
| Post Leaderboard | Sorting & Pagination |
| Add Users | Authentication & Role Management |
| Live Post Updates | GraphQL Subscriptions |

---



























