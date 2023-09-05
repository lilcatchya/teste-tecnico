const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('packs', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    pack_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'products',
        key: 'code'
      }
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'products',
        key: 'code'
      }
    },
    qty: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'packs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "pack_id",
        using: "BTREE",
        fields: [
          { name: "pack_id" },
        ]
      },
      {
        name: "product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
};
