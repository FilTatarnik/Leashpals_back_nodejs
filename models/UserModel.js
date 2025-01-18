const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: { // Changed from 'name' to 'username'
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value){
      const hash = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hash);
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [[ 'admin', 'owner', 'walker']],
    },
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users', // a the table name
  freezeTableName: true, // This ensures that the table name is not pluralized
  timestamps: false, // This ensures that timestamps are not created
});

module.exports = User;