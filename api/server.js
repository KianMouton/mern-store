const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Schema, model } = mongoose; 
const dotenv = require('dotenv'); 
const axios = require('axios');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

dotenv.config(); 

const Port = 3001;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ verify: (req, res, buf) => { req.rawBody = buf.toString(); } }));

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

const checkoutSessions = {};

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

            const checkoutId = response.data.metadata.checkoutId;
            // add the checkout to the storage to verify with webhook
            checkoutSessions[checkoutId] = { amount, currency };
        } else {
            console.error('Yoco did not return a checkout URL:', response.data);
            res.status(500).json({ error: 'Failed to create checkout session' });
        }
    } catch (error) {
        console.error('Error creating checkout session:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error processing payment' });
    }
});

//nodemailer configuration
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
});

//webhook endpoint for payment
//using ngrok for tunneling on port 3001
//npx ngrok http 3001 (cmd command)
app.post("/webhook", async (req, res) => {
    const requestBody = req.body;
    const checkoutId = requestBody.payload.metadata.checkoutId;
    
    // Verify and process the received data
    console.log("webhook response: ", requestBody);
    console.log("checkout Id: ", checkoutId);

    //verify the payment
    if (checkoutSessions[checkoutId]) {
        console.log("payment verified:");

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            subject: 'Payment Successful',
            text: `Payment of ${checkoutSessions[checkoutId].amount} ${checkoutSessions[checkoutId].currency} was successful.`
        };

        try {
            await transport.sendMail(mailOptions);
            console.log("Email sent successfully");
        } catch (err) {
            console.error('error sending mail', err)
        }

        delete checkoutSessions[checkoutId];

        res.sendStatus(200);
    } else {
        console.error("Payment not found in storage:", checkoutId);
        return res.status(404).json({ error: 'Payment not found' });
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