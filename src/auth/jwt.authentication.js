import njwt from 'njwt';
import User from '../models/user.model';

const {
    APP_SECRET = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9', // random string for generate jwt token
} = process.env;

export const encodeToken = (tokenData) => {
    return njwt.create(tokenData, APP_SECRET).compact();
}

export const decodeToken = (token) => {
    return njwt.verify(token, APP_SECRET).body;
}

// This express middleware attaches `username` to the `req` object if a user is
// authenticated. This middleware expects a JWT token to be stored in the
// `Access-Token` header.
export const jwtAuthenticationMiddleware = async (req, res, next) => {
    const token = req.header('Access-Token');
    if (!token) {
        return next();
    }
    
    try {
        const decoded = decodeToken(token);
        const { username } = decoded;

        await User.findOne({username: username})
                    .then( _ => {
                        req.username = username
                    }).catch ( err => {
                        return next();
        });
    } catch(err) {
        return next();
    }

  next();
};

// This middleware stops the request if a user is not authenticated.
export const isAuthenticatedMiddleware = async (req, res, next) => {
    if (req.username) {
        return next();
    }

    res.status(401);
    res.json({ error: 'User not authenticated' });
}

// This endpoints generates and returns a JWT access token given authentication
// data.
export const jwtLogin = (req, res) => {
    const { username, password } = req.body;

    // Validation request
    if(!username || !password) {
        return res.status(400).send({
            message: "Username or password can't be empty"
        })
    }
    
    User.findOne({username: username})
      .then( user => {
        if (!user) {
            res.status(401).send({ error: 'Invalid email or password' });
        }
        const accessToken = encodeToken({ username: username });
        res.status(200).send({ accessToken });
      }).catch ( err => {
        res.status(500).send({
            message: err.message || `Error login authentication.`
        })
    });
  }