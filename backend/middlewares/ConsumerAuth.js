const User = require("../model/Consumer")
const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
    // we send jwt token in headers 
    // which is of form Bearer aofafefafa82ae72a blachblah
    const { authorization } = req.headers
    if (!authorization)
        return res.status(402).json({ error: "Authorization token required" })
    const token = authorization.split(' ')[1]

    // try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
        // we're setting a custom property for req 
        // so that 'user' details can be accessed from req 
        //itself to the next routes
        req.user = await User.findOne({ _id }).select('_id')
        //just to make sure _id is in DB
        next()

//     } catch (error) {
//         console.log(error)
//         res.status(401).json({ error: 'Request is not authorized' })
//     }
}
module.exports = { requireAuth }