var config = require('../config/config');
var sql = require('mssql');

module.exports = {
    async getCompanies(req, res) {
        try {
            let pool = await sql.connect(config);
            let products = await pool.request().query("select * from Companies"); // request.query('select * from Employees');
            if (products.recordset != '') {
                console.log(res);
                res.send(products.recordset)
            }
        }
        catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to get companies'
            })
        }
    },
    async deleteCompanies(req, res) {
        try {
            const { Id } = req.body;
            let pool = await sql.connect(config);
            let products = await pool.request()
            .input('id', sql.BigInt, Id)
            .query("Delete from Companies where Id =@id");
             res.status(200).send("Company deleted succesfully ..!!")
        }
        catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to get companies'
            })
        }
    },
}
