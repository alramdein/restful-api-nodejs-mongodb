import Product from '../models/product.model';

export const addProduct = (req, res) => {
    // Validation request
    if(!req.body) {
        return res.status(400).send({
            message: "Product can't be empty"
        })
    }

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        description: req.body.description,
    })

    // Save new product to database
    product.save()
            .then( _ => {
                res.json({"message": "Product successfully added!."});
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while adding the product."
                })
            })
};

export const getAllProduct = (req, res) => {
    Product.find()
            .then( data => {
                res.json(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while retrieving the product."
                })
            })
};

export const getProductById = (req, res) => {
    Product.findById(req.params.productId)
            .then( data => {
                res.json(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || `Product not found with id ${req.params.productId}`
                })
            })
};

export const updateProduct = (req, res) => {
    res.json({"message": "Product successfully updated!."});
};

export const deleteProduct = (req, res) => {
    res.json({"message": "Product successfully deleted!."});
};