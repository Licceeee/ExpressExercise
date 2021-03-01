const {check} = require('express-validator') 
module.exports = {
    validateName: check('name')
        .not()
        .isEmpty()
        .withMessage('Cant be empty')
        .trim()
        .isAlpha()
        .withMessage('alphabet chars only'),
    validatealpha2Code: check('alpha2Code')
        .isLength({ min: 2, max: 2 })
        .withMessage('needs exactly 2 characters')
        .isAlpha()
        .withMessage('alphabet chars only')
        .toUpperCase().withMessage("must be uppercase"),
    validatealpha3Code: check('alpha3Code')
        .isLength({ min: 3, max: 3 })
        .withMessage('needs exactly 3 characters')
        .isAlpha()
        .withMessage('alphabet chars only')
        .toUpperCase().withMessage("must be uppercase"),
    validateVisited: check('visited')
        .isBoolean()
        .withMessage("accepted values:  true or false"),
}
