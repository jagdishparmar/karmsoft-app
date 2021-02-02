const AccountController = require('./controllers/AccountController')
const AdministractorController = require('./controllers/AdministractorController')


module.exports = (app) => {
    app.post('/login', AccountController.login)
    app.post('/change-password', AccountController.changePassword)
    
    app.get('/company',AdministractorController.getCompanies)
    app.delete('/company/:id',AdministractorController.deleteCompanies)
    
  
}