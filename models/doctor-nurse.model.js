const mongoose = require("mongoose");

const DoctorNurseSchema = new mongoose.Schema({
    hoten: String,
    gioitinh: String,
    cccd: String,
    ngaycap: String,
    ngaysinh: String,
    diachi: String,
    anhcccd: String,
    anhchandung: String,
    bangcap: String,
    ngaycapbang: String,
    khoa: String,
    chuyenmon: String,
    chucvu: String,
    capbac: String,
    anhnhanvien: String,
});

const DoctorNurse = mongoose.model('DoctorNurse', DoctorNurseSchema, "doctor-nurse");

module.exports = DoctorNurse;