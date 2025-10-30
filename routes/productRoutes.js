import { Router } from 'express';
import { listProducts, getProductById, addProduct, updateProduct, deleteProduct } from '../controllers/ProductController.js';

const router = Router();

// Genero las rutas para los productos utilizando funciones
// predefinidas en el archivo ProductController.js

// Rutas Publicas
// Listar los productos
router.get('/', listProducts);
// Obtener un producto por ID
router.get('/:id', getProductById);

// Rutas Privadas (con isLoggedIn)
// Agregar un producto
router.post('/add', addProduct);
// Actualizar un producto 
router.put('/:id', updateProduct);
// Eliminar un producto 
router.delete('/:id', deleteProduct);

export const productRouter = router;
