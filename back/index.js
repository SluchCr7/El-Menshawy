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

// تنظيف رابط الفرونت إيند وإزالة أي شرطة مائلة (/) في الآخر لو وُجدت
// تأكد إن الرابط مكتوب كدة بالظبط في الـ Environment Variables على Vercel:
// FRONT_URL=https://el-menshawy.vercel.app

app.use(cors({
    origin: "https://el-menshawy.vercel.app", // حطينا الدومين صراحة ومباشرة عشان المتصفح يقرأه صح بنسبة 100%
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    optionsSuccessStatus: 200
}));

// التريكة السحرية لـ Vercel: الرد المباشر على طلبات الـ OPTIONS قبل أي شيء
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', frontUrl);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    return res.status(200).json({});
});

// 4. Data Sanitization & Body Parsing
app.use(express.json({ limit: '50mb' })); // Increased limit for large uploads
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());


app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.json({message : "Hello from the backend!"})
});

// ⬇️ هنا بنضيف الـ Routes الجديدة ⬇️
app.use("/api/users", require("./Routes/userRoute")); // ملف الـ User
app.use('/api/messages', require('./Routes/messageRoute'));
// app.use(errorHandler)
// app.use(notFound)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});