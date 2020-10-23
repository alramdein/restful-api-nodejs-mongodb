// these not exported function is created to support easy maintainability

export const productQuery = (req) => {
    return {
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        description: req.body.description,
    }
};

export const emptyErrorMessage = (res) => {
    res.status(400).send({
        message: `Product can't be empty`
    });
}

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

export const handleSuccessProductSearch = (product, activity, req, res) => {
    if(!product) {
        return notFoundErrorMessage( undefined, res, req.params.productId);
    }
    if (activity === 'retrieving')  
        res.json(product);
    else if (activity === 'updating') 
        res.json({"message": `Product with id ${req.params.productId} successfully updated!.`});
    else if (activity === 'deleting')
        res.json({"message": `Product with id ${req.params.productId} successfully deleted!.`});
};
