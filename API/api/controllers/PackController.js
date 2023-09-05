const database = require('../models')

class PackController {
  static async pegaTodosOsPacks(req, res) {
    try {
      const todosOsPacks = await database.packs.findAll()
      return res.status(200).json(todosOsPacks)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = PackController