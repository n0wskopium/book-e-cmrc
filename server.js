const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('bookstore');
    console.log('Connected to MongoDB');
    await initializeDatabase();
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

// Initialize database with sample data
async function initializeDatabase() {
  const booksCollection = db.collection('books');
  const count = await booksCollection.countDocuments();
  
  if (count === 0) {
    await booksCollection.insertMany([
      { 
        title: 'Kafka on the shore', 
        author: 'Haruki Murakami', 
        image: 'https://i.pinimg.com/736x/67/0e/9d/670e9d4f77d9d84b0f9f3ae268ea2353.jpg', 
        price: 24.99,
        isFeatured: true,
        isBestseller: true,
        salesCount: 150
      },
      { 
        title: 'The Wind-Up Bird Chronicle', 
        author: 'Haruki Murakami', 
        image: 'https://i.pinimg.com/236x/bb/67/7e/bb677e86f6281b648aff06b28540d886.jpg', 
        price: 19.99,
        isFeatured: true,
        salesCount: 80
      },
      { 
        title: 'Sun and Steel', 
        author: 'Yukio Mishima', 
        image: 'https://i.pinimg.com/736x/24/0f/47/240f47ef89ada1b329010abbff093a66.jpg', 
        price: 29.99,
        isBestseller: true,
        salesCount: 200
      }
    ]);
    console.log('Sample books inserted');
  }
}

// API Endpoints

// Search books
app.get('/api/books', async (req, res) => {
  try {
    const searchTerm = req.query.q || '';
    const query = {
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { author: { $regex: searchTerm, $options: 'i' } }
      ]
    };
    const books = await db.collection('books').find(query).toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Featured books
app.get('/api/books/featured', async (req, res) => {
  try {
    const books = await db.collection('books')
      .find({ isFeatured: true })
      .limit(10)
      .toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Best sellers
app.get('/api/books/bestsellers', async (req, res) => {
  try {
    const books = await db.collection('books')
      .find({ isBestseller: true })
      .sort({ salesCount: -1 })
      .limit(10)
      .toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cart endpoints
app.post('/api/cart', async (req, res) => {
  try {
    const { bookId } = req.body;
    const result = await db.collection('cart').insertOne({ bookId });
    res.json({ message: 'Book added to cart', cartId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/cart', async (req, res) => {
  try {
    const cartItems = await db.collection('cart')
      .aggregate([
        {
          $lookup: {
            from: 'books',
            localField: 'bookId',
            foreignField: '_id',
            as: 'bookDetails'
          }
        },
        { $unwind: '$bookDetails' },
        {
          $project: {
            _id: 1,
            title: '$bookDetails.title',
            price: '$bookDetails.price'
          }
        }
      ])
      .toArray();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/cart/:id', async (req, res) => {
  try {
    await db.collection('cart').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/cart', (req, res) => {
  res.sendFile(__dirname + '/public/cart.html');
});

// Start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});

// Handle shutdown
process.on('SIGINT', async () => {
  await client.close();
  process.exit();
});