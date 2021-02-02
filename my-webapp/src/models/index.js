const fs = require('fs')
const path = require('path')
const Mssql = require('mssql')
const config = require('../config/config')
const db = {}

const mssql = new Mssql(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })



db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
