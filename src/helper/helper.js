import Product from '../models/product.model';
import User from '../models/user.model';

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
        message: `${responseData.item} not found with ${_id}`
    });
};


export const validateRequest = (req) => {
    if(!req.body.username || !req.body.password || !req.body.name || !req.body.price) {
        return emptyErrorMessage(responseData, res);
    }
}

export const identifyRequestType = async (responseData, req) => {
    if(responseData.item == "User") {
        if (responseData.activity === 'retrieving')  
            return await User.findOne({username: req.params.username})

        else if (responseData.activity === 'updating') 
            return await User.findOneAndUpdate({username: req.params.username},
                userQuery(req), {new: true})

        else if (responseData.activity === 'deleting')
            return await User.findOneAndRemove({username: req.params.username})
    } else if(responseData.item == "Product") {
        if (responseData.activity === 'retrieving')  
            return await Product.findById(req.params.productId);

        else if (responseData.activity === 'updating') 
            return await Product.findByIdAndUpdate(req.params.productId,
                productQuery(req), {new: true})

        else if (responseData.activity === 'deleting')
            return await Product.findByIdAndRemove(req.params.productId)
    }
}

export const performRequest = async (responseData, req, res) => {
    try {
        let data = await identifyRequestType(responseData, req);
        console.log(`data: ${data}`);
        if(data.username)
            responseData.itemId = req.params.username;
        else if(data.price)
            responseData.itemId = req.params.productId;

        responseData.data = data;
        handleSuccessSearch(responseData, req, res);
    } catch(err) {
        handleError(responseData, err, res);
    }
}

export const handleError = (responseData, err, res) => {
    if(err.kind === "ObjectId") {
        notFoundErrorMessage(responseData, err, res);
    }
    serverErrorMessage(responseData, err, res);
}

export const handleSuccessSearch = (responseData, req, res) => {
    if(!responseData.data) {
        return notFoundErrorMessage(responseData, undefined, res);
    }
    
    let _id = '';
    if (responseData.item === "User") 
        _id = `username ${responseData.itemId}`;
    else if (responseData.item === "Product")  
        _id = `id ${responseData.itemId}`;
    
    if (responseData.activity === 'retrieving')  
        res.json(responseData.data);
    else if (responseData.activity === 'updating') 
        res.json({"message": `${responseData.item} with ${_id} successfully updated!.`});
    else if (responseData.activity === 'deleting')
        res.json({"message": `${responseData.item} with ${_id} successfully deleted!.`});
};
