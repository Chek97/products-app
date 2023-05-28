import { products } from '../../../DB/products.json';

export default function handler(req, res) {  
  const { id } = req.query;

  const productNew = products.filter(product => product.id === +id);
  
    res.status(200).json({
        ok: true,
        product: productNew
  });
}