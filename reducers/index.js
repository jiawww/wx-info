const Redux = require('../libs/redux.js')
const combineReducers = Redux.combineReducers
const todos = require('./todos.js')
const todoApp = combineReducers({
  todos
})

module.exports = todoApp