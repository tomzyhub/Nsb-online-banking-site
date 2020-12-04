const mongoose = require('mongoose');

const AdminUserSchema = new mongoose.Schema({

    AdminUser:{
        type:String,
        required:true
    },

    AdminPassword:{
        type:string,
        required:true
    }
});


const adminUser = mongoose.model('User', AdminUserSchema);

module.exports = adminUser;