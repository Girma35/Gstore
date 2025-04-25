const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const qs = require('qs');
const { getProducts, setProducts } = require('./routes/product/index');
const authRouter =require("./routes/index");
const checkoutRouter  =require("./routes/payment");
const app = express();
const path = require('path');

mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-03-31.basil",
  });



async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        //sessions 

        const store = new MongoDBStore({
            uri: process.env.MONGODB_URI,
            collection: 'sessions',
            ssl: true,
    
        });

        store.on('error', (error) => {
            console.error('Session store error:', error);
        });

        app.use(session({
            secret: process.env.SESSION_SECRET,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7,
            },
            store: store,
            resave: false,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            saveUninitialized: false,
        }));

        app.use(flash());

        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, '../client/.next/static')));
            app.use(express.static(path.join(__dirname, '../client/out')));
            }
        


           



        app.get('/health', (req, res) => {
          res.json({ 
            status: 'OK',
            db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
          });
        });

        app.get('/product', getProducts);
        app.post('/products', setProducts );
        app.use('/api', authRouter );
        app.use("/checkout", checkoutRouter);

        
    //     const __dirname = path.resolve();

    // if (process.env.NODE_ENV === "production"){
    //     app.use(express.static(path.join(__dirname, '../client/out')));

    //     app.get('*', (req, res) => {
    //         res.sendFile(path.join(__dirname, '../client/out/index.html'));
    //       });
    // }



        app.listen(PORT, () => {
            console.log('Connected to MongoDB!');
            console.log('The server is running on port ' + PORT);
        });

} catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToDatabase();