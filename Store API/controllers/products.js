const Product = require('../models/product')
// const checking = require('../models/product')

// const all = async (req,res) =>{
//     const cheking = await checking.find({})
//     res.status(200).json({cheking })
// // res.send('sjdncjs')
// }
const getAllProductsStatic = async (req, res) =>{
    const search = 'ab'
    try {
        const products = await Product.find({}).limit(5)
        res.status(201).json({products, nbit : products.length})
    } catch (error) {
        res.status(500).json({msg:error})

    }
}
const getAllProducts = async (req, res) =>{
    const { featured, company, name, sort, fields} = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true' ? true: false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name,$options: 'i'}
    }
    // console.log(queryObject);
    let result = Product.find(queryObject)
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt')
    }
    if(fields){
        const sortList = fields.split(',').join(' ');
        result = result.select(sortList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) * limit
    // if(limit){
    //     // const sortList = fields.split(',').join(' ');
        result = result.skip(skip).limit(limit)
    // }
    const products = await result
    res.status(200).json({products , nbit: products.length})
}

module.exports = {
    getAllProductsStatic, getAllProducts 
}