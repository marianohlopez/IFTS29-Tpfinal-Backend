import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { listProducts, addProduct, updateProduct, deleteProduct } from '../controllers/ProductController.js';

const router = Router();

// 📂 Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const productName = req.body.name?.replace(/\s+/g, '-').toLowerCase();
    const dir = `uploads/productos/${productName}`;

    // Crear carpeta del producto si no existe
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, `${baseName}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

// Listar productos
router.get('/', listProducts);

// Agregar producto
router.post('/add', upload.array('images', 5), addProduct);

// Actualizar producto
router.put('/:id', upload.array('images', 5), updateProduct);

// Eliminar producto
router.delete('/:id', deleteProduct);

export const productRouter = router;
