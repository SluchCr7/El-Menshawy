const express = require("express")
const helmet = require("helmet")
require("dotenv").config()
const app = express();
const { errorHandler, notFound } = require("./Middelwares/errorHandler");
const cookieParser = require("cookie-parser");

// 1. Dynamic CORS Middleware (MUST run first, before DB connection or other routes)
app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowedOrigins = [
        "https://el-menshawy.vercel.app", 
        "http://localhost:3000", 
        "http://localhost:3001"
    ];
    
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
        // Default to production domain
        res.setHeader("Access-Control-Allow-Origin", "https://el-menshawy.vercel.app");
    }
    
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin");
    
    // Immediately handle preflight OPTIONS requests without proceeding to DB or routers
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

// DB CONNECTION (Asynchronous, doesn't block preflight)
const connectDB = require("./Config/db");
connectDB();

// Security middleware
// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             defaultSrc: ["'self'"],
//             imgSrc: ["'self'", "data:", "blob:", "res.cloudinary.com"]
//         }
//     }
// }));

// Data Sanitization & Body Parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({ message: "Hello from the backend!" })
});

// Routes
app.use("/api/users", require("./Routes/userRoute"));
app.use('/api/messages', require('./Routes/messageRoute'));

// Error handler middlewares (after routes)
app.use(notFound);
app.use(errorHandler);

// Vercel serverless environment compatibility
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;