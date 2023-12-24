const category = require('../category/categoryModel')
const subCategory = require('../subCategory/subCategoryModel')
const post = require('../post/postModel')
const user = require('../user/userModel')
const customer = require('../customer/customerModel')
const purchase = require('../purchase/purchaseModel')

const dashboard = async (req,res)=>{
    let totalCategories= await category.countDocuments()
    let totalSubCategories= await subCategory.countDocuments()
    let totalPosts= await post.countDocuments()
    let totalUsers= await user.countDocuments()
    let totalCustomers= await customer.countDocuments()
    let totalPurchases= await purchase.countDocuments()

    res.send({
        success:true,
        status:200,
        totalCategories:totalCategories,
        totalSubCategories:totalSubCategories,
        totalPosts:totalPosts,
        totalUsers:totalUsers,
        totalCustomers:totalCustomers,
        totalPurchases:totalPurchases,
    })
} 

module.exports={dashboard}
