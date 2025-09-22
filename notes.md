## Mongo DB
- In Mongoose, calling .lean() after a query (like Product.find(...)) tells Mongoose to return plain JavaScript objects instead of  full Mongoose documents.

- Benefits of .lean():

  Performance: Lean queries are faster and use less memory because they skip creating Mongoose document instances.
  Plain objects: The result is a plain JS object, not a Mongoose model instance (so no document methods like .save()).
  
- Use .lean() when you only need to read data and don’t need Mongoose document methods.
```js
featuredProducts = await Product.find({ isFeatured: true }).lean();
```
