import { combineReducers } from 'redux'

import query from './query'
import stock from './stock'
const todoApp = combineReducers({
  query,
  stock
})

export default todoApp
