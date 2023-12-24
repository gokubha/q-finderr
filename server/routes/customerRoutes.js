const express = require('express')
const router = express.Router()
const multer = require('multer')
const categoryController = require('../apis/category/categoryController')
const customerController = require('../apis/customer/customerController')
const userController = require('../apis/user/userController')
const subCategoryController = require('../apis/subCategory/subCategoryController')
const purchaseController = require('../apis/purchase/purchaseController')
const contactController = require('../apis/contact/contactController')
const postController = require('../apis/post/postController')
const userInfoController = require('../apis/userInfo/userInfoController')


//USER
router.post('/getSingleUser',userController.getSingleUser)
router.post('/login',userController.login)
router.post('/addUser',userController.addUser)

//CATEGORY
router.post('/getCategory',categoryController.getCategory)
router.post('/getSingleCategory',categoryController.getSingleCategory)

//SUBCATEGORY
router.post('/getSubCategory',subCategoryController.getSubCategory)
router.post('/getSingleSubCategory',subCategoryController.getSingleSubCategory)

//CUSTOMER
router.post('/login',userController.login)
router.post('/getCustomer',customerController.getCustomer)
router.post('/getSingleCustomer',customerController.getSingleCustomer)

//PURCHASE
router.post('/getSinglePurchase',purchaseController.getSinglePurchase)

//CONTACT
router.post('/getSingleContact',contactController.getSingleContact)

//POST
router.post('/getSinglePost',postController.getSinglePost)
router.post('/getPost',postController.getPost)

let postStorage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'server/public/post/')
    },
    filename:(req, file, cb)=>{
        let picname = Date.now() + file.originalname
        req.body.image =  'post/'+picname
        cb(null, picname)
    }
})
const uploadPost = multer({storage:postStorage})

router.post('/addPost',uploadPost.single('image'),postController.addPost)
router.post('/updatePost',uploadPost.single('image'),postController.updatePost)


router.use(require('../middleware/tokenchecker')) //MIDDLEWARE


//CUSTOMER
router.post('/addCustomer',customerController.addCustomer)
router.post('/updateCustomer',customerController.updateCustomer)

//PURCHASE
router.post('/addPurchase',purchaseController.addPurchase)

//CONTACT
router.post('/addContact',contactController.addContact)

//USERINFO
router.post('/addUserInfo',userInfoController.addUserInfo)
router.post('/updateUserInfo',userInfoController.updateUserInfo)

//USER
router.post('/updateUser',userController.updateUser)


router.all('*',(req,res)=>{
    res.send({success:false, status:404, message:'Invalid Address'})
})

module.exports = router