require('dotenv').config();
const express=require('express');
const corsOptions=require('./config/corsOptions');
const app=express();
const path=require('path');
const verifyJWT=require('./middleware/verifyJWT');

const mongoose=require('mongoose');
const cors=require('cors');
const connectDB=require('./config/dbconn');
const credentials=require('./middleware/credentials');
const cookieParser=require('cookie-parser');
const PORT=process.env.PORT||6006;
app.use((req, res, next) => {
    console.log(`🌐 Request: ${req.method} ${req.url}`);
    next();
});
connectDB();
app.use(credentials);
app.use(cors(corsOptions));
app.options('*', (req, res) => {
    console.log(`🔵 OPTIONS Preflight Caught: ${req.method} ${req.url}`);
    res.sendStatus(204); // No Content
});
app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(cookieParser());
app.use('/',express.static(path.join(__dirname,'public')));
app.get('/reset-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'reset-password.html'));
});
app.use('/',require('./routes/root'));
app.use('/',require('./routes/api/googleauth'));
app.use('/register',require('./routes/api/register'));
app.use('/auth',require('./routes/api/auth'));
app.use('/refresh',require('./routes/api/refresh'));
app.use('/logout',require('./routes/api/logout'));
app.use('/seller',require('./routes/api/brands'));
app.use('/seller/products', require('./routes/api/products'));
app.use('/password',require('./routes/api/password'));

app.use('/public',require('./routes/public/brands'));
app.use('/buyer',require('./routes/api/buyerRoutes'));
app.use('/public', require('./routes/public/products'));
app.use('/vehicles', require('./routes/api/products')); // 👈 make sure this line exists

app.use('/buyer',require('./routes/api/favouriteroute'));
app.use('/cart',require('./routes/api/cart'));
app.use('/orders',require('./routes/api/order'));
app.use('/orders',require('./routes/api/getSeller'));
app.use('/payments',require('./routes/api/razorpay'));
app.use('/',require('./routes/api/searchvehicle'));

mongoose.connection.once('open',()=>{
    console.log('connected to mongodb');
    app.listen(PORT,()=>console.log(`server running on ${PORT}`));
})
