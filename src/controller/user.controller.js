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
