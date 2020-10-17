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
            .then( product => {
                res.json(product);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while retrieving the product."
                })
            })
};

export const getProductById = (req, res) => {
    Product.findById(req.params.productId)
            .then( product => {
                if(!product) {
                    res.status(404).send({
                        message: err.message || `Product not found with id ${req.params.productId}`
                    })
                }
                res.json(product);
            }).catch(err => {
                if(err.kind === "ObjectId") {
                    res.status(404).send({
                        message: err.message || `Product not found with id ${req.params.productId}`
                    })
                }
                res.status(500).send({
                    message: err.message || `Error retrieving product with id ${req.params.productId}`
                })
            })
};

export const updateProduct = (req, res) => {
    // Validation request
    if(!req.body) {
        return res.status(400).send({
            message: "Product can't be empty"
        })
    }

    Product.findByIdAndUpdate(req.params.productId, {
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        description: req.body.description,
    }, {new: true})
        .then(product => {
            if(!product) {
                res.status(404).send({
                    message: err.message || `Product not found with id ${req.params.productId}`
                })
            }
            res.json({"message": `Product with id ${req.params.productId} successfully updated!.`});
        }).catch(err => {
            if(err.kind === "ObjectId") {
                res.status(404).send({
                    message: err.message || `Product not found with id ${req.params.productId}`
                })
            }
            res.status(500).send({
                message: err.message || `Error deleting product with id ${req.params.productId}`
            })
        })
};

export const deleteProduct = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if(!product) {
                res.status(404).send({
                    message: err.message || `Product not found with id ${req.params.productId}`
                })
            }
            res.json({"message": `Product with id ${req.params.productId} successfully deleted!.`});
        }).catch(err => {
            if(err.kind === "ObjectId" || err.name === "NotFound") {
                res.status(404).send({
                    message: err.message || `Product not found with id ${req.params.productId}`
                })
            }
            res.status(500).send({
                message: err.message || `Error deleting product with id ${req.params.productId}`
            })
        })
};