
const hapijoivalidator= require("@hapi/joi")



const validatingCreateUser= (data)=>{
    const validateUser= hapijoivalidator.object({
        name:hapijoivalidator.string(),
        mobile:hapijoivalidator.string(),
        password:hapijoivalidator.string(),
        email:hapijoivalidator.string()
    });
    return validateUser.validate(data)
};

const validateLogin= (data)=>{
    const validating= hapijoivalidator.object({
        email: hapijoivalidator.string(),
        password:hapijoivalidator.string()
    })
    return validating.validate(data)
}

module.exports={validatingCreateUser,validateLogin}