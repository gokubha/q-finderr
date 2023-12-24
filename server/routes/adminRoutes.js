const express= require('express')
const multer= require('multer')
const categoryController = require('../apis/category/categoryController')
const userController = require('../apis/user/userController')
const postController = require('../apis/post/postController')
const subCategoryController = require('../apis/subCategory/subCategoryController')
const userInfoController = require('../apis/userInfo/userInfoController')
const purchaseController = require('../apis/purchase/purchaseController')
const contactController = require('../apis/contact/contactController')
const dashboardController = require('../apis/dashboard/dashboardController')
const router= express.Router()


//CATEGORY
router.post('/getCategory',categoryController.getCategory)
router.post('/getSingleCategory',categoryController.getSingleCategory)

//USER
router.post('/getUser',userController.getUser)
router.post('/getSingleUser',userController.getSingleUser)
router.post('/login',userController.login)

//POST
router.post('/getPost',postController.getPost)
router.post('/getSinglePost',postController.getSinglePost)

//SUBCATEGORY
router.post('/getSubCategory', subCategoryController.getSubCategory)
router.post('/getSingleSubCategory', subCategoryController.getSingleSubCategory)

//USERINFO
router.post('/getUserInfo',userInfoController.getUserInfo)
router.post('/getSingleUserInfo',userInfoController.getSingleUserInfo)

//PURCHASE
router.post('/getPurchase',purchaseController.getPurchase)
router.post('/getSinglePurchase',purchaseController.getSinglePurchase)

//CONTACT
router.post('/getContact',contactController.getContact)
router.post('/getSingleContact',contactController.getSingleContact)


router.use(require('../middleware/tokenchecker')) //MIDDLEWARE


//ADMIN DASHBOARD
router.get('/dashboard', dashboardController.dashboard)

//CATEGORY
let categoryStorage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'server/public/category/')
    },
    filename:(req, file, cb)=>{
        let picname = Date.now() + file.originalname
        req.body.image =  'category/'+picname
        cb(null, picname)
    }
})
const uploadCategory = multer({storage:categoryStorage})

router.post('/addCategory',uploadCategory.single('image'),categoryController.addCategory)
router.post('/updateCategory',uploadCategory.single('image'),categoryController.updateCategory)
router.delete('/category/delete',categoryController.deleteCategory)
router.post('/category/changeStatus', categoryController.changeStatus)

//USER
router.post('/user/changeStatus',userController.changeStatus)

//POST
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

//SUBCATEGORY
let subCategoryStorage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'server/public/subCategory/')
    },
    filename:(req, file, cb)=>{
        let picname = Date.now() + file.originalname
        req.body.image =  'subCategory/'+picname
        cb(null, picname)
    }
})
const uploadSubCategory = multer({storage:subCategoryStorage})

router.post('/addSubCategory',uploadSubCategory.single('image'), subCategoryController.addSubCategory)
router.post('/updateSubCategory',uploadSubCategory.single('image'),subCategoryController.updateSubCategory)
router.delete('/subCategory/delete', subCategoryController.deleteSubCategory)



router.all('*',(req,res)=>{
    res.send({
        success: false,
        status: 404,
        message: 'Invalid Address'

    })
})

module.exports= router