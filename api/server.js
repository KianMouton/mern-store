const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Schema, model } = mongoose; 
const dotenv = require('dotenv'); 
const axios = require('axios');

dotenv.config(); 

const Port = 3001;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Define schema
const productSchema = new Schema({
    type: {
        type: String,
        required: true
    },
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

//schema for cart
const cartSchema = new Schema({
    items: [
        {
            productId: {
                type: [String],
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
});

const Cart = model('Cart', cartSchema);

// endpoint to add items to the cart
app.post('/cart/:id', (req, res) => {
    const productId = req.params.id;
    
})

//test / endpoint
app.get('/', (req, res) => {
    res.json({'message': "hello"});
})

//uploading products endpoint
app.post('/upload', async (req, res) => {
    // Save product to MongoDB
    try {
        const product = new Product(req.body);
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

//payment endpoint
app.post('/payment', async (req, res) => {
    console.log("Payment request received:", req.body); // Log the request body

    const { amount, currency } = req.body;

    try {
        const response = await axios.post('https://payments.yoco.com/api/checkouts', {
            amount: amount,
            currency: currency,
            // Add any other required fields here
        }, {
            headers: {
            'Authorization': `Bearer ${process.env.TEST_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Log Yoco's response for debugging
        console.log("Yoco response:", response.data);

        // Check if the response contains the checkout URL
        if (response.data && response.data.redirectUrl) {
            res.json({ redirectUrl: response.data.redirectUrl });
        } else {
            console.error('Yoco did not return a checkout URL:', response.data);
            res.status(500).json({ error: 'Failed to create checkout session' });
        }
    } catch (error) {
        console.error('Error creating checkout session:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error processing payment' });
    }
});

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