## Mongo DB
- In Mongoose, calling .lean() after a query (like Product.find(...)) tells Mongoose to return plain JavaScript objects instead of  full Mongoose documents.

- Benefits of .lean():

  Performance: Lean queries are faster and use less memory because they skip creating Mongoose document instances.
  Plain objects: The result is a plain JS object, not a Mongoose model instance (so no document methods like .save()).
  
- Use .lean() when you only need to read data and don’t need Mongoose document methods.
```js
featuredProducts = await Product.find({ isFeatured: true }).lean();
```

The minus sign (-) before password means "do not include this field" in the result.
So, the user object will have all fields except password
```js
const user = await User.findById(decoded.userId).select("-password");
```
