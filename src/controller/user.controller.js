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

export const getUserByUsername = (req, res) => {
    responseData.activity = "retrieving";

    User.findOne({username: req.params.username})
            .then( user => {
                responseData.data = user;
                helper.handleSuccessProductSearch(responseData, req, res);
            }).catch(err => {
                if(err.kind === "ObjectId") {
                    responseData.itemId = req.params.username;
                    helper.notFoundErrorMessage(responseData, err, res);
                }
                helper.serverErrorMessage(responseData, err, res);
            });
};

export const updateUser = (req, res) => {
    responseData.activity = "updating";

    // Validation request
    if(!req.body.username || !req.body.password) {
        return helper.emptyErrorMessage(responseData, res);
    }

    User.findOneAndUpdate({username: req.params.username},
        helper.userQuery(req)
    , {new: true})
        .then(user => {
            responseData.data = user;
            helper.handleSuccessProductSearch(responseData, req, res);
        }).catch(err => {
            if(err.kind === "ObjectId") {
                responseData.itemId = req.params.username;
                helper.notFoundErrorMessage(responseData, err, res);
            }
            helper.serverErrorMessage(responseData, err, res);
        });
};

export const deleteUser = (req, res) => {
    responseData.activity = "deleting";

    User.findOneAndRemove({username: req.params.username})
        .then(user => {
            responseData.data = user;
            helper.handleSuccessProductSearch(responseData, req, res);
        }).catch(err => {
            if(err.kind === "ObjectId") {
                responseData.itemId = req.params.username;
                helper.notFoundErrorMessage(responseData, err, res);
            }
            helper.serverErrorMessage(responseData, err, res);
        });
};