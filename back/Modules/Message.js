const {mongoose } = require("mongoose");
const joi = require("joi")
const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    message: {
        type: String,
        required: true
    },
    link: {
        type: String, // هنا بنخليه String
        required: false // أو true على حسب رغبتك
    },
    email : {
        type: String,
        required: true
    }
},{
  timestamps: true,  
})

const Message = mongoose.model("message", MessageSchema);

const addNewMessageValidate =  (obj) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        message: joi.string().min(20).required(),
        name: joi.string().required(),
        link: joi.string(),
    });
    return schema.validate(obj);
};

module.exports = {Message , addNewMessageValidate}