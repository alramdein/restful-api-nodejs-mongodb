import Product from '../models/product.model';
import * as helper from '../helper/helper';

// Object used to store basic data that will be
// used on response body
let responseData = {
    item: "Product", // default item processed in product controller
    itemId: "",
    activity: "",
    data: ""
};

export const addProduct = (req, res) => {
    responseData.activity = "adding";

    // Validation request
    if(!req.body) {
        return helper.emptyErrorMessage(responseData, res);
    }

    const product = new Product(
        helper.productQuery(req)
    );

    // Save new product to database
    product.save()
            .then( _ => {
                res.json({"message": `Product successfully added!.`});
            }).catch(err => {
                helper.serverErrorMessage(responseData, err, res);
            });
};

export const getAllProduct = (req, res) => {
    responseData.activity = "retrieving";

    Product.find()
            .then( product => {
                res.json(product);
            }).catch(err => {
                helper.serverErrorMessage(responseData, err, res);
            });
};

export const getProductById = (req, res) => {
    responseData.activity = "retrieving";

    Product.findById(req.params.productId)
            .then( product => {
                responseData.data = product;
                helper.handleSuccessProductSearch(responseData, req, res);
            }).catch(err => {
                if(err.kind === "ObjectId") {
                    responseData.itemId = req.params.productId;
                    helper.notFoundErrorMessage(responseData, err, res);
                }
                helper.serverErrorMessage(responseData, err, res);
            });
};

export const updateProduct = (req, res) => {
    responseData.activity = "updating";

    // Validation request
    if(!req.body) {
        return helper.emptyErrorMessage(responseData, res);
    }

    Product.findByIdAndUpdate(req.params.productId, productQuery(req)
    , {new: true})
        .then(product => {
            responseData.data = product;
            helper.handleSuccessProductSearch(responseData, req, res);
        }).catch(err => {
            if(err.kind === "ObjectId") {
                responseData.itemId = req.params.productId;
                helper.notFoundErrorMessage(responseData, err, res);
            }
            helper.serverErrorMessage(responseData, err, res);
        });
};

export const deleteProduct = (req, res) => {
    responseData.activity = "deleting";

    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            helper.handleSuccessProductSearch(item, product, activity, req, res);
        }).catch(err => {
            if(err.kind === "ObjectId" || err.name === "NotFound") {
                responseData.itemId = req.params.productId;
                helper.notFoundErrorMessage(responseData, err, res);
            }
            helper.serverErrorMessage(responseData, err, res);
        });
};