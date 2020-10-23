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

    helper.validateRequest(req);

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

    helper.performRequest(responseData, req, res);
};

export const updateProduct = (req, res) => {
    responseData.activity = "updating";

    helper.validateRequest(req);

    helper.performRequest(responseData, req, res);
};

export const deleteProduct = (req, res) => {
    responseData.activity = "deleting";

    helper.performRequest(responseData, req, res);
};