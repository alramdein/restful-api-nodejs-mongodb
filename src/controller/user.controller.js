import User from '../models/user.model';

export const addUser = (req, res) => {
    // Validation request
    if(!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Username or password can't be empty"
        })
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password,
    })

    // Save new user to database
    user.save()
            .then( _ => {
                res.json({"message": "User successfully added!."});
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while adding the user."
                })
            })
};

export const getAllUser = (req, res) => {
    User.find()
        .then( product => {
            res.json(product);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving users."
            })
        })
}

export const getUserByUsername = (req, res) => {
    User.findOne({username: req.params.username})
            .then( user => {
                if(!user) {
                    res.status(404).send({
                        message: err.message || `Username ${req.params.username} not found`
                    })
                }
                res.json(user);
            }).catch(err => {
                if(err.kind === "ObjectId") {
                    res.status(404).send({
                        message: err.message || `Username ${req.params.username} not found`
                    })
                }
                res.status(500).send({
                    message: err.message || `Error retrieving user with username ${req.params.username}`
                })
            })
};