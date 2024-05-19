
const DoctorNurse = require("../../models/doctor-nurse.model.js");
const userCollection = require("../../models/account.js");
const bcrypt = require('bcrypt');
const listAccount = require("../../models/account.js");

const crypto = require('crypto');

const sendEmail = require("../../helpers/email.js");

//[GET] 
module.exports.index = (req, res) => {
    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang Chu"
    });
}


// [GET] /management-customer
module.exports.managementCustomer = (req, res) => {
    res.render("client/pages/customer/management-customer.pug");
}

// [GET] /doctor-nurse
// module.exports.doctorNurse = async (req, res) => {

//     const records = await DoctorNurse.find();
  
//     res.render("client/pages/doctor-nurse/index.pug", {
//         records: records
//     });
// }

// [GET] /doctor-nurse/create
module.exports.doctorNurseCreate = (req, res) => {
    res.render("client/pages/doctor-nurse/nhap-nurse.pug");
}

module.exports.doctorNurseUnlogin =  async (req, res) => {

    const records = await DoctorNurse.find();
    res.render("client/pages/doctor-nurse/index-unlogin.pug", {
        records: records
    });

}

// [POST] /doctor-nurse/create
module.exports.doctorNurseCreatePost = async (req, res) => {

    const newRecord = new DoctorNurse(req.body);
    await newRecord.save();

    res.redirect("back")
}


module.exports.doctorNurseDelete = async (req, res) => {

    const id = req.params.id;

    console.log(id);

    await DoctorNurse.deleteOne({
        _id: id
    })

    res.redirect("/doctor-nurse")
}
// [GET] /doctor-nurse/edit/:id
module.exports.doctorNurseEdit = async (req, res) => {
    const id = req.params.id;
    const yta = await DoctorNurse.findOne({
        _id: id,
    })


    res.render("client/pages/doctor-nurse/edit-nurse.pug", {
        yta: yta
    });
}

// [PATCH] /doctor-nurse/edit/:id
module.exports.doctorNurseEditPatch = async (req, res) => {

    const id = req.params.id;
    
    console.log(id);

    await DoctorNurse.updateOne({
        _id: id
    }, req.body)

    res.redirect("back")
    
}


// [GET] /accounts admin

module.exports.accountAdminAccounts = async (req, res) => {
 
    let find = {
        deleted: false,
    };
    const records = await listAccount.find(find);

    res.render("client/pages/account/index.pug", {
        records: records
    });

}

// [GET] /login admin

module.exports.accountLoginAdmin= (req, res) => {
    res.render("client/pages/register-login/admin-login.pug");
}
// [GET] /login
module.exports.accountLogin= (req, res) => {
        res.render("client/pages/register-login/login.pug", {messages:req.flash()});
}
// [POST] /register

module.exports.userAccountPost = async (req, res) => {
    // salt Rounds
    const saltRounds = 10;
    const existingUser = await userCollection.findOne({username: req.body.username});
    if (existingUser) {
        req.flash("error", `Tài khoản đã tồn tại`);
        res.redirect("back");
    }
    else {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        req.body.password = hashedPassword;
        const newRecord = new userCollection(req.body);
        await newRecord.save();
        req.flash("success", `Đăng ký thành công`);
        res.redirect("back");
    }
}

// [POST] /login

module.exports.userAccountLoginPost = async (req, res) => {
    // salt Rounds
    const findUsername = await userCollection.findOne({username: req.body.username});
    if (!findUsername) {
        req.flash("error", "Tài khoản hoặc mật khẩu không đúng");
        res.redirect("back");

    }
    else {
        const isPasswordMatch = await bcrypt.compare(req.body.password, findUsername.password);
        if (isPasswordMatch) {
            const records = await DoctorNurse.find();
  
            res.render("client/pages/doctor-nurse/index.pug", {
                records1: records,
                records2: findUsername
            });
        }
        else {
            req.flash("error", "Tài khoản hoặc mật khẩu không đúng");
            res.redirect("back");
        }
    }

}

// [GET] /register
module.exports.accountRegister= (req, res) => {
    res.render("client/pages/register-login/register.pug")
}
//[GET] FORGET PASSWORD


module.exports.forgotPasswordRender= (req, res) => {
    res.render("client/pages/register-login/forgotPassword.pug");
}

module.exports.forgotPassword = async (req, res, next) => {
    const user = await userCollection.findOne({email: req.body.email});
    if (!user) {

    }
    const resetToken = user.createPasswordToken();
    await user.save({validateBeforeSave: false});


    const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
    const message = `Bạn đã yêu cầu thay đổi MK. Bấm link ở dưới để đổi MK\n\n${resetURL}`;

    try {
        await sendEmail( {
            email: user.email,
            subject: 'Password change request received',
            message: message
        });

        res.status(200).json({
            status: 'success',
            message: 'password reset link send to the user email'
        })
    }catch(err) {
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        user.save({validateBeforeSave: false});
    }



}

module.exports.resetPassword= async (req, res, next) => {
    res.render("client/pages/register-login/resetPassword.pug");
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user =  await userCollection.findOne({passwordResetToken: token, passwordResetTokenExpires: {$gt: Date.now()}})

    if (!user) {

    }
    else {
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
    
        user.save();
    }

}



