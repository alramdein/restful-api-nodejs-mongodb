import Product from '../models/product.model';

export const addProduct = (req, res) => {
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

    product.save()
            .then(data => {
                res.send(data);
                // res.json({"message": "Product successfully added!."});
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while adding the product."
                })
            })
};

export const getAllProduct = (req, res) => {
    res.json({"message": "Products."});
};

export const getProductById = (req, res) => {
    res.json({"message": "Products."});
};

export const updateProduct = (req, res) => {
    res.json({"message": "Product successfully updated!."});
};

export const deleteProduct = (req, res) => {
    res.json({"message": "Product successfully deleted!."});
};