import Product from '../models/Products.js';

// Funcion para listar productos
export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products)
  } catch (err) {
    res.status(500).send('Error fetching products');
  }
};

// Funcion para obtener un producto por su ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ message: 'ID de producto con formato inválido' });
    }
    res.status(500).send('Error fetching product');
  }
};

// Funcion para agregar productos
export const addProduct = async (req, res) => {
  try {
    const products = new Product(req.body)
    const savedProduct = await products.save();
    res.json({
      message: 'Producto guardado correctamente',
      product: savedProduct
    });
  } catch (err) {
    res.status(500).send('Error adding product');
  }
};

// Actualizar un producto existente
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, images, description, stock } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      { name, price, stock, description, images },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({
      message: 'Producto actualizado correctamente',
      product: updatedProduct
    });
  } catch (err) {
    console.log(`Error: ${err}`)
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto existente
export const deleteProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const result = await Product.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({
      message: 'Producto eliminado correctamente',
      deletedCount: result.deletedCount
    });

  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
}