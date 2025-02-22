import { set, append, update, initialState } from './anecdoteReducer'
import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdote reducer', () => {

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = anecdoteReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('returns new state with set', () => {
    const action1 = set([
      {
        id: 1,
        content: 'lorem ipsum',
        votes: 0
      },
      {
        id: 2,
        content: 'dolor sit',
        votes: 0
      }
    ])

    deepFreeze(initialState)
    const newState1 = anecdoteReducer(initialState, action1)

    expect(newState1).toHaveLength(2)
    expect(newState1[0].content).toEqual('lorem ipsum')
    expect(newState1[1].content).toEqual('dolor sit')

    const action2 = set([
      {
        id: 42,
        content: 'foo',
        votes: 0
      },
    ])

    deepFreeze(newState1)
    const newState2 = anecdoteReducer(newState1, action2)

    expect(newState2).toHaveLength(1)
    expect(newState2[0].content).toEqual('foo')
  })

  test('returns new state with append', () => {
    const action = append({
      id: 1,
      content: 'lorem ipsum',
      votes: 0
    })

    deepFreeze(initialState)
    const newState = anecdoteReducer(initialState, action)

    expect(newState).toHaveLength(initialState.length + 1)
    expect(newState[newState.length - 1].content).toEqual('lorem ipsum')
  })

  test('returns new state with update', () => {
    const action1 = set([
      {
        id: 42,
        content: 'foo',
        votes: 0
      },
    ])

    deepFreeze(initialState)
    const newState1 = anecdoteReducer(initialState, action1)
    expect(newState1).toHaveLength(1)

    const updatedAnecdote = { ...newState1[0], votes: newState1[0].votes + 1 }
    const action2 = update(updatedAnecdote)
    deepFreeze(newState1)
    const newState2 = anecdoteReducer(newState1, action2)

    expect(newState2).toHaveLength(1)
    expect(newState2[0].votes).toEqual(1)
  })
})