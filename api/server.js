const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Schema, model } = mongoose; 
const dotenv = require('dotenv'); 

dotenv.config(); 

const Port = 3001;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Define schema
const productSchema = new Schema({
    imageUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// model from schema
const Product = model('Product', productSchema);

//test / endpoint
app.get('/', (req, res) => {
    res.json({'message': "hello"});
})

//uploading products endpoint
app.post('/upload', async (req, res) => {
    // Save product to MongoDB
    try {
        const product =new Product(req.body);
        const newProduct = await product.save();
        res.send(newProduct);
    }
    catch(err) {
        console.error(err);
        res.status(500).send('Error saving product to MongoDB');
    }
    
})

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

//endpoint for product page
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Product not found');
        res.json(product);
    } catch (error) {
        res.status(500).send(error);
    }
})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Start the server
app.listen(Port, () => {
    console.log(`Server is running on port http://localhost:${Port}`);
});