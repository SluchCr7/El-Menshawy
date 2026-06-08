const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
require("dotenv").config()
const app = express();
const connectDB = require("./Config/db")
const {errorHandler,notFound} = require("./Middelwares/errorHandler");
const cookieParser = require("cookie-parser");
// DB CONNECTION
connectDB()

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "blob:", "res.cloudinary.com"]
        }
    }
}));

// // Rate limiting
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//     message: { success: false, message: "Too many requests, please try again later." }
// });

// Middleware - Enhanced CORS for professional connection
const allowedOrigins = [
    process.env.FRONT_URL,
    'http://localhost:3000',
    'http://localhost:3001',
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1 && process.env.NODE_ENV !== 'development') {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// 4. Data Sanitization & Body Parsing
app.use(express.json({ limit: '50mb' })); // Increased limit for large uploads
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ⬇️ هنا بنضيف الـ Routes الجديدة ⬇️
app.use("/api/users", require("./Routes/userRoute")); // ملف الـ User
app.use('/api/messages', require('./Routes/messageRoute'));
// app.use(errorHandler)
// app.use(notFound)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});