import express, { json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from "mongoose";
import dotenv from "dotenv";
import { isLoggedIn } from "./middlewares/auth.js";
import { productRouter } from "./routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

// Conexión a base de datos Mongo
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión a MongoDB:', err));

// Redireccionamiento a las url con sus correspondientes rutas
//app.use('/', loginRouter);
app.use('/products', /* isLoggedIn */ productRouter);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

