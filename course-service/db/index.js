'use strict'

const mongoose = require('mongoose')

const courseSchema = require('./models/course')

class Mongo {
  constructor() {
    this.db = {}
    this.url = 'mongodb://localhost:27017/nodeco'
    this.setupDB()
  }

  async setupDB() {
    mongoose.connect(this.url)
    this.db = mongoose.model('course', courseSchema)
  }

  async get(filter) {
    const results = await this.db.find(filter)
    return results
  }

  async findById(id) {
    const result = await this.db.findById(id)
    if (!result) {
      return
    }
    return result
  }

  async create(data) {
    const Model = this.db
    const result = await new Model(data).save()
    return result
  }

  async update(id, data) {
    const result = await this.db.findOneAndUpdate(id, { $set: data }, { new: true })
    return result
  }

  async delete(id) {
    const result = await this.db.findById(id)
    if (!result) {
      return
    }
    await result.remove()
    return result
  }
}

module.exports = new Mongo()