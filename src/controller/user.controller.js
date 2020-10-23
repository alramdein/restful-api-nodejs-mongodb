import User from '../models/user.model';
import * as helper from '../helper/helper';

// Object used to store basic data that will be
// used on response body
let responseData = {
    item: "User", // default item processed in user controller
    itemId: "",
    activity: "",
    data: ""
};

export const addUser = (req, res) => {
    responseData.activity = "adding";

    // Validation request
    if(!req.body.username || !req.body.password) {
        return helper.emptyErrorMessage(responseData, res);
    }

    const user = new User(
        helper.userQuery(req)
    );

    // Save new user to database
    user.save()
            .then( _ => {
                res.json({"message": "User successfully added!."});
            }).catch(err => {
                helper.serverErrorMessage(responseData, err, res);
            });
};

export const getAllUser = (req, res) => {
    responseData.activity = "retrieving";

    User.find()
        .then( product => {
            res.json(product);
        }).catch(err => {
            helper.serverErrorMessage(responseData, err, res);
        });
};

export const getUserByUsername = async (req, res) => {
    responseData.activity = "retrieving";

    try {
        let retrievedUser = await User.findOne({username: req.params.username})
        responseData.data = retrievedUser;
        helper.handleSuccessSearch(responseData, req, res);
    } catch(err) {
        helper.handleError(responseData, err, res);
    }
};

export const updateUser = async (req, res) => {
    responseData.activity = "updating";

    // Validation request
    if(!req.body.username || !req.body.password) {
        return helper.emptyErrorMessage(responseData, res);
    }

    try {
        let updatedUser = await User.findOneAndUpdate({username: req.params.username},
                                                helper.userQuery(req), {new: true})
        responseData.data = updatedUser;
        helper.handleSuccessSearch(responseData, req, res);
    } catch(err) {
        helper.handleError(responseData, err, res);
    }
};

export const deleteUser = async (req, res) => {
    responseData.activity = "deleting";

    try {
        let deletedUser = await User.findOneAndRemove({username: req.params.username})
        responseData.data = deletedUser;
        helper.handleSuccessSearch(responseData, req, res);
    } catch(err) {
        helper.handleError(responseData, err, res);
    }
};