import Product from '../models/product.model';

export const serverErrorMessage = (err, res, activity) => {
    res.status(500).send({
        message: err.message || `Some error occured while ${activity} the product.`
    });
};

export const notFoundErrorMessage = (err, res, id) => {
    res.status(404).send({
        message: err.message || `Product not found with id ${id}`
    });
};

export const addProduct = (req, res) => {
    const activity = "adding";

    // Validation request
    if(!req.body) {
        return res.status(400).send({
            message: `Product can't be empty`
        });
    }

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        description: req.body.description,
    });

    // Save new product to database
    product.save()
            .then( _ => {
                res.json({"message": `Product successfully added!.`});
            }).catch(err => {
                serverErrorMessage(err, res, activity);
            });
};

export const getAllProduct = (req, res) => {
    const activity = "retrieving";

    Product.find()
            .then( product => {
                res.json(product);
            }).catch(err => {
                serverErrorMessage(err, res, activity);
            });
};

export const getProductById = (req, res) => {
    const activity = "retrieving";

    Product.findById(req.params.productId)
            .then( product => {
                if(!product) {
                    notFoundErrorMessage( undefined, res, req.params.productId);
                }
                res.json(product);
            }).catch(err => {
                if(err.kind === "ObjectId") {
                    notFoundErrorMessage(err, res, req.params.productId);
                }
                serverErrorMessage(err, res, activity);
            });
};

export const updateProduct = (req, res) => {
    const activity = "updating";

    // Validation request
    if(!req.body) {
        return res.status(400).send({
            message: `Product can't be empty`
        });
    }

    Product.findByIdAndUpdate(req.params.productId, {
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        description: req.body.description,
    }, {new: true})
        .then(product => {
            if(!product) {
                notFoundErrorMessage(undefined, res, req.params.productId);
            }
            res.json({"message": `Product with id ${req.params.productId} successfully updated!.`});
        }).catch(err => {
            if(err.kind === "ObjectId") {
                notFoundErrorMessage(err, res, req.params.productId);
            }
            serverErrorMessage(err, res, activity);
        });
};

export const deleteProduct = (req, res) => {
    const activity = "deleting";

    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if(!product) {
                notFoundErrorMessage(undefined, res, req.params.productId);
            }
            res.json({"message": `Product with id ${req.params.productId} successfully deleted!.`});
        }).catch(err => {
            if(err.kind === "ObjectId" || err.name === "NotFound") {
                notFoundErrorMessage(err, res, req.params.productId);
            }
            serverErrorMessage(err, res, activity);
        });
};