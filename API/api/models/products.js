const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('products', {
    code: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      defaultValue: '',
      allowNull: false
    },
    cost_price: {
      type: DataTypes.DECIMAL(9, 2),
      defaultValue: 0,
      allowNull: false
    },
    sales_price: {
      type: DataTypes.DECIMAL(9, 2),
      defaultValue: 0,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
    ]
  });
};
