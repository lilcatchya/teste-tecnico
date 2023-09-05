var DataTypes = require("sequelize").DataTypes;
var _packs = require("./packs");
var _products = require("./products");

function initModels(sequelize) {
  var packs = _packs(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);

  packs.belongsTo(products, { as: "pack", foreignKey: "pack_id"});
  products.hasMany(packs, { as: "packs", foreignKey: "pack_id"});
  packs.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(packs, { as: "product_packs", foreignKey: "product_id"});

  return {
    packs,
    products,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
