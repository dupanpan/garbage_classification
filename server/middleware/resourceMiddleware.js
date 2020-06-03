module.exports = options => {
    return async(req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource) //eg:categories --- Category（字符串）
        req.Model = require(`../models/${modelName}`) //eg:category model
        next()
    }
}