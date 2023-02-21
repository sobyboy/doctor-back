const DrUser = require('./../../modules/models/drUser');

module.exports = class Controller {
    constructor() {
        this.model = { DrUser }
    }

    showValidationErrors(req , res , callback) {
        let errors = req.validationErrors();
        if(errors) {
            res.status(422).json ({
                message : errors.map(error => {
                return {
                    'field' : error.param,
                    'message' : error.msg,
                }
            }),
            succcess : false,
        });
        return true;
        }
        return false;
    }
}