var config = require('../config/config');
var sql = require('mssql');
var jwt = require('jsonwebtoken');
if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

function checkToken(req, res, next) {
    var myToken = localStorage.getItem('myToken');
    try {
        jwt.verify(myToken, 'loginToken');
        next();
    }
    catch
    {
        res.send("You must login first");
    }
}

module.exports = {
    async getEmployee() {
        try {
            let pool = await sql.connect(config);
            let products = await pool.request().query("select * from Employees"); // request.query('select * from Employees');
            return products.recordset;
        }
        catch (error) {
            console.log(error);
        }
    },

    async login(req, res) {
        try {
            const { Email, Password } = req.body;
            let pool = await sql.connect(config);
            let products = await pool.request()
                .input('Email', sql.NVarChar, Email)
                .input('Password', sql.NVarChar, Password)
                .execute('uspEmployeeLoginSearch')
                //.query("select * from Employees where Email = @Email AND Password = @Password ");
                console.log(products.recordset);
               
            if (products.recordset != '') 
            {
                debugger;
                res.send(products.recordset)
                console.log("Login SuccessFully");
               // res.send("Login SuccessFully")
            }
            else {
                res.status(403).send({
                    error: 'Email address and/or password is incorrect.'
                })
            }
        }
        catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to log in'
            })
        }
    },

    async changePassword(req, res) {
        try {
            //console.log(req);
            const { OldPassword, NewPassword, Id } = req.body;
            let pool = await sql.connect(config);
            let products = await pool.request()
                .input('paramx', sql.NVarChar, OldPassword)
                .input('id', sql.BigInt, Id)
                .query("select * from Employees where Password = @paramx AND Id = @id ");

            if (products.recordset != '') {
                let poolc = await sql.connect(config);
                let emp = await poolc.request()
                  .input('id', sql.BigInt, Id)
                  .input('paramy', sql.NVarChar, NewPassword)
                  .query("UPDATE Employees SET Password = @paramy WHERE Id = @id ");
                 //res.status(200).send(products.recordset)
            }
            else {
                res.status(403).send({
                    error: 'Old password does not match'
                })
            }
            let updateUser = await pool.request()
                .input('id', sql.BigInt, Id)
                .query("select * from Employees WHERE Id = @id ");
            if (updateUser != '') {
                res.send(updateUser.recordset)
                console.log(updateUser.recordset);
            }
        }
        catch (err) {
            res.status(500).send({
                error: 'Record not found.'
            })
        }
    }

    
}

// module.exports = {
//     getEmployee: getEmployee,
//     login: login,
//     getCourse: getCourse
// }