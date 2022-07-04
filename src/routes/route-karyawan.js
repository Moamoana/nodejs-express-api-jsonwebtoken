require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { inventorytb } = require('../controllers');

function AuthenticateAccessToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[2];
    console.log(process.env.ACCESS_TOKEN_SECRET);
    console.log(token);
    
    if(token == null){
        res.json({ message: 'Invalid access token'});
    }
    else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
            if(err){
                res.json({ message: err });
            }
            else{
                
                next();
            }
        });
    }
}

// GET localhost:8080/karyawan => Ambil data semua karyawan
router.get('/inventorytb', AuthenticateAccessToken, inventorytb.getDataKaryawan);

// GET localhost:8080/karyawan/2 => Ambil data semua karyawan berdasarkan id = 2
router.get('/inventorytb/:id', inventorytb.getDataKaryawanByID);

// POST localhost:8080/karyawan/add => Tambah data karyawan ke database
router.post('/inventorytb/add', inventorytb.addDataKaryawan);

// POST localhost:8080/karyawan/2 => Edit data karyawan
router.post('/inventorytb/edit', inventorytb.editDataKaryawan);

// POST localhost:8080/karyawan/delete => Delete data karyawan
router.post('/inventorytb/delete/', inventorytb.deleteDataKaryawan);

module.exports = router;