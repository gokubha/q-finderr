const user = require('./userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = 'qfinder0001'


const login = (req, res) => {
    let validation = ''
    if (!req.body.email)
        validation += 'email is required'
    if (!req.body.password)
        validation += 'password is required'
    if (!!validation)
        res.send({ success: false, status: 500, message: validation })
    else {
        user.findOne({ email: req.body.email })
            .then(result => {
                if (result == null)
                    res.send({ success: false, status: 500, message: "No User Found" })
                else {
                    if (bcrypt.compareSync(req.body.password, result.password)) {
                        if (result.status) {
                            let payload = {
                                _id: result._id,
                                name: result.name,
                                email: result.email,
                                userType: result.userType
                            }
                            let token = jwt.sign(payload, secretKey, { expiresIn: '10d' })

                            res.send({ success: true, status: 200, message: "Login Successfull", data: result, token: token })
                        }
                        else
                            res.send({ success: false, status: 500, message: "Account is Blocked" })
                    }
                    else {
                        res.send({ success: false, status: 500, message: "Invalid Credentials" })
                    }
                }
            })
            .catch(err => {
                res.send({ success: false, status: 500, message: err.message })
            })
    }

}


const addUser = async (req, res) => {
    let validation = ''
    if (!req.body.name)
        validation += 'name is required, '
    if (!req.body.email)
        validation += 'email is required, '
    if (!req.body.password)
        validation += 'password is required'
    if (!!validation)
        res.send({ success: false, status: 300, message: validation })
    else {
        let total = await user.countDocuments()
        let newUser = new user({
            userId: total + 1,
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            userType: 2,
            adCount: req.body.adCount,
        })
        let prevUser = await user.findOne({
            email: req.body.email
        })
        if (!!prevUser)
            res.send({
                success: false,
                status: 500,
                message: 'User Already Exists with Same Email'
            })
        else
            newUser.save()
                .then((result) => {
                    res.json({
                        success: true,
                        status: 200,
                        message: "New User Added Successfully",
                        data: result
                    })
                })
                .catch((err) => {
                    res.json({
                        success: false,
                        status: 500,
                        message: err.message
                    })
                })
    }
}


const getUser = async (req, res) => {
    let total = await user.countDocuments()
    user.find(req.body)
        .then(result => {
            res.json({
                success: true,
                status: 200,
                total: result.length,
                message: "Users Loaded Successfully",
                data: result
            })
        })
        .catch(error => {
            res.json({
                success: false,
                status: 500,
                message: error.message
            })
        })
}

const getSingleUser = (req, res) => {
    let validation = ''
    if (!req.body._id)
        validation += '_id is required, '
    if (!!validation)
        res.send({ success: false, status: 300, message: validation })
    else {
        user.findOne({ _id: req.body._id })
            .then(result => {
                if (result == null)
                    res.json({ success: false, status: 500, message: 'No User Found' })
                else
                    res.json({
                        success: true,
                        status: 200,
                        message: "Single User Loaded",
                        data: result
                    })
            })
            .catch(error => {
                res.json({
                    success: false,
                    status: 500,
                    message: error.message
                })
            })
    }
}

const changeStatus = (req, res) => {
    let validation = ''
    if (!req.body._id)
        validation += '_id is required, '
    if (!req.body.status)
        validation += 'status is required'
    if (!!validation)
        res.send({ success: false, status: 500, message: validation })
    else {
        user.findOne({ _id: req.body._id })
            .then(result => {
                if (result == null)
                    res.send({ success: false, status: 500, message: "No User Found" })
                else {
                    if (!!req.body.status)
                        result.status = req.body.status
                    result.save()
                        .then(updatedResult => {
                            res.send({ success: true, status: 200, message: "User Status Updated", data: updatedResult })
                        })
                        .catch(error => {
                            res.send({ success: false, status: 500, message: error.message })
                        })
                }
            })
            .catch(error => {
                res.send({ success: false, status: 500, message: error.message })
            })
    }
}


const updateUser = (req, res) => {
    let validation = ''
    if (!req.body._id)
        validation += '_id is required '
    if (!!validation)
        res.send({
            success: false,
            status: 500,
            message: validation
        })
    else {
        user.findOne({ _id: req.body._id })
            .then(async result => {
                if (result == null)
                    res.send({
                        success: false,
                        status: 500,
                        message: 'No User Found'
                    })
                else {
                    if (!!req.body.name)
                        result.name = req.body.name
                    if (!!req.body.email)
                        result.email = req.body.email
                    if (!!req.body.password)
                        result.password = bcrypt.hashSync(req.body.password, 10)
                    let prevUser = await user.findOne({
                        $and: [{ email: req.body.email }, {
                            _id:
                                { $ne: result._id }
                        }]
                    })
                    if (!!prevUser)
                        res.send({
                            success: false,
                            status: 500,
                            message: 'User Already Exists with Same Email'
                        })
                    else {
                        result.save()
                            .then(updatedRes => {
                                res.send({
                                    success: true,
                                    status: 200,
                                    message: 'User Updated Successfully',
                                    data: updatedRes,
                                })
                            })
                            .catch(error => {
                                res.send({
                                    success: false,
                                    status: 500,
                                    message: error.message
                                })
                            })
                    }
                }
            }

            )
    }
}

module.exports = { addUser, getUser, getSingleUser, login, changeStatus, updateUser, }