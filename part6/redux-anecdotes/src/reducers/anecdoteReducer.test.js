import { vote, create, initialState } from './anecdoteReducer'
import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdote reducer', () => {

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = anecdoteReducer(undefined, action)
    expect(newState).toEqual(initialState)
    expect(newState).toHaveLength(6)
  })

  test('returns new state with vote', () => {
    const id = initialState[2].id
    initialState.forEach((x, i, a) => {
      expect(x.votes).toEqual(0)
    })

    const action = vote(id)

    deepFreeze(initialState)
    const newState = anecdoteReducer(initialState, action)

    newState.forEach((x, i, a) => {
      if (x.id === id)
        expect(x.votes).toEqual(1)
      else 
        expect(x.votes).toEqual(0)
    })
  })

  test('returns new state with create', () => {
    const action = create('lorem ipsum')

    deepFreeze(initialState)
    const newState = anecdoteReducer(initialState, action)

    expect(newState).toHaveLength(initialState.length + 1)
    expect(newState[newState.length - 1].content).toEqual('lorem ipsum')
  })
})