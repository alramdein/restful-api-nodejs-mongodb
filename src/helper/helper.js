// these function was created to support easy maintainability

export const productQuery = (req) => {
    return {
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        description: req.body.description,
    }
};

export const userQuery = (req) => {
    return {
        username: req.body.username,
        password: req.body.password,
    }
};

export const emptyErrorMessage = (responseData, res) => {
    res.status(400).send({
        message: `${responseData.item} can't be empty`
    });
}

export const serverErrorMessage = (responseData, err, res) => {
    res.status(500).send({
        message: `Some error occured while ${responseData.activity} the ${responseData.item}.`,
        detail: err.message
    });
};

export const notFoundErrorMessage = (responseData, err, res) => {
    let _id = '';
    if (responseData.item === "User") 
        _id = `username ${responseData.itemId}`;
    else if (responseData.item === "Product") 
        _id = `id ${responseData.itemId}`;

    res.status(404).send({
        message: `${responseData.item} not found with ${_id}`, 
        detail: err.message
    });
};

export const handleError = (responseData, err, res) => {
    if(err.kind === "ObjectId") {
        responseData.itemId = req.params.username;
        notFoundErrorMessage(responseData, err, res);
    }
    serverErrorMessage(responseData, err, res);
}

export const handleSuccessSearch = (responseData, req, res) => {
    let _id = '';
    if (responseData.item === "User") 
        _id = `username ${responseData.itemId}`;
    else if (responseData.item === "Product")  
        _id = `id ${responseData.itemId}`;
    
    if(!responseData.data) {
        return notFoundErrorMessage(responseData, undefined, res);
    }
    if (responseData.activity === 'retrieving')  
        res.json(responseData.data);
    else if (responseData.activity === 'updating') 
        res.json({"message": `${responseData.item} with ${_id} successfully updated!.`});
    else if (responseData.activity === 'deleting')
        res.json({"message": `${responseData.item} with ${_id} successfully deleted!.`});
};
