import express, { json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

// Conexión a base de datos Mongo
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión a MongoDB:', err));

