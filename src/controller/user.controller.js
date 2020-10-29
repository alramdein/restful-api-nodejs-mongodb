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
    
    helper.validateRequest(req, res, responseData);

    const user = new User(
        helper.insertUserQuery(req)
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

export const getUserByUsername = (req, res) => {
    responseData.activity = "retrieving";

    helper.performRequest(responseData, req, res);
};

export const updateUser = (req, res) => {
    responseData.activity = "updating";

    helper.validateRequest(req, res, responseData);

    helper.performRequest(responseData, req, res);
};

export const deleteUser = (req, res) => {
    responseData.activity = "deleting";

    helper.performRequest(responseData, req, res);
};