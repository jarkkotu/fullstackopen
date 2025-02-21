import { filter, initialState } from './anecdoteFilterReducer'
import anecdoteFilterReducer from './anecdoteFilterReducer'
import deepFreeze from 'deep-freeze'

describe('anecdote filter reducer', () => {

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = anecdoteFilterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('returns new state with filter', () => {
    const action = filter('lorem ipsum')

    deepFreeze(initialState)
    const newState = anecdoteFilterReducer(initialState, action)

    expect(newState).toEqual('lorem ipsum')
  })
})
