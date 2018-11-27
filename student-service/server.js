'use strict'

const { send, json }  = require('micro')
const { router, get, post, patch, del }  = require('microrouter')

const db = require('./db')

const findAll = async (req, res) => {
  try {
    const results = await db.get({})
    send(res, 200, results)
  } catch (err) {
    console.error(err)
    send(res, 500, err)
  }
}

const findById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await db.findById(id)
    if (!result) {
      send(res, 404, new Error('Student not fount'))
    }
    send(res, 200, result)
  } catch (err) {
    console.error(err)
    send(res, 500, err)
  }
}

const create = async (req, res) => {
  try {
    const body = await json(req)
    const result = await db.create(body)
    send(res, 200, result)
  } catch (err) {
    console.error(err)
    send(res, 500, err)
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const body = await json(req)
    const result = await db.update(id, body)
    send(res, 200, result)
  } catch (err) {
    console.error(err)
    send(res, 500, err)
  }
}

const remove = async (req, res) => {
  try {
    const { id } = req.params
    const result = await db.delete(id)
    if (!result) {
      send(res, 404, new Error('Student not fount'))
    }
    send(res, 200, result)
  } catch (err) {
    console.error(err)
    send(res, 500, err)
  }
}

module.exports = router(
  get('/', findAll),
  post('/', create),
  get('/:id', findById),
  patch('/:id', update),
  del('/:id', remove)
)
