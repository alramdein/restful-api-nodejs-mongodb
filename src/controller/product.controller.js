import Product from '../models/product.model';
import * as helper from '../helper/product.helper';

export const addProduct = (req, res) => {
    const activity = "adding";

    // Validation request
    if(!req.body) {
        return helper.emptyErrorMessage(res);
    }

    const product = new Product(
        helper.productQuery(req)
    );

    // Save new product to database
    product.save()
            .then( _ => {
                res.json({"message": `Product successfully added!.`});
            }).catch(err => {
                helper.serverErrorMessage(err, res, activity);
            });
};

export const getAllProduct = (req, res) => {
    const activity = "retrieving";

    Product.find()
            .then( product => {
                res.json(product);
            }).catch(err => {
                helper.serverErrorMessage(err, res, activity);
            });
};

export const getProductById = (req, res) => {
    const activity = "retrieving";

    Product.findById(req.params.productId)
            .then( product => {
                helper.handleSuccessProductSearch(product, activity, req, res);
            }).catch(err => {
                if(err.kind === "ObjectId") {
                    helper.notFoundErrorMessage(err, res, req.params.productId);
                }
                helper.serverErrorMessage(err, res, activity);
            });
};

export const updateProduct = (req, res) => {
    const activity = "updating";

    // Validation request
    if(!req.body) {
        return helper.emptyErrorMessage(res);
    }

    Product.findByIdAndUpdate(req.params.productId, productQuery(req)
    , {new: true})
        .then(product => {
            helper.handleSuccessProductSearch(product, activity, req, res);
        }).catch(err => {
            if(err.kind === "ObjectId") {
                helper.notFoundErrorMessage(err, res, req.params.productId);
            }
            helper.serverErrorMessage(err, res, activity);
        });
};

export const deleteProduct = (req, res) => {
    const activity = "deleting";

    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            helper.handleSuccessProductSearch(product, activity, req, res);
        }).catch(err => {
            if(err.kind === "ObjectId" || err.name === "NotFound") {
                helper.notFoundErrorMessage(err, res, req.params.productId);
            }
            helper.serverErrorMessage(err, res, activity);
        });
};