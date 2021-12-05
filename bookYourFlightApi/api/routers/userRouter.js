import express, { response } from 'express';
import User from '../models/userModel.js';
const router = express.Router();


router.get('/', (req, res, next) => {
    User.find({}).then(response => {
        res.send(response)
    });
})

router.post('/', (req, res, next) => {
    if (req.body.email) {
        User.find({
            email: req.body.email
        }).then(result => {
            if (result.length > 0) {
                res.statusCode = 200;
                res.statusMessage = "User already exist";
                res.send({
                    message: "User already exists",
                    code: 0
                });
            } else {
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    password: req.body.password
                });
                user.save().then(result => {
                    res.statusCode = 200;
                    res.send({
                        message: "Success",
                        code: 1
                    });
                }).catch(err => {
                    res.statusCode = 500;
                    res.send({
                        message: err,
                        code: 0
                    })
                });
            }
        })
    }
});

router.post('/signIn', (req, res, next) => {
    User.find({
        email: req.body.email,
        password: req.body.password
    }).then(response => {
        res.statusCode = 200;
        if (response.length > 0) {
            res.send({
                data: response[0].name,
                code: 1
            });
        } else {
            res.send({
                data: "Not Found",
                code: 0
            });
        }

    }).catch(err => {
        res.statusCode = 500;
        res.send({
            message: err,
            code: 0
        })
    });
})

export default router;