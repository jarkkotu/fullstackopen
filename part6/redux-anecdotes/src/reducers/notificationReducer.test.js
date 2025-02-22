import { error, success, remove, initialState, defaultTimeout } from './notificationReducer'
import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notification reducer', () => {

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = notificationReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('returns new state with error', () => {
    const action = error('foo')

    deepFreeze(initialState)
    const newState = notificationReducer(initialState, action)

    expect(newState).toHaveLength(1)

    expect(newState[0].id).not.toEqual(null)
    expect(newState[0].type).toEqual('ERROR')
    expect(newState[0].content).toEqual('foo')
    expect(newState[0].timeout).toEqual(defaultTimeout)
  })

  test('returns new state with success', () => {
    const action = success('bar')

    deepFreeze(initialState)
    const newState = notificationReducer(initialState, action)

    expect(newState).toHaveLength(1)

    expect(newState[0].id).not.toEqual(null)
    expect(newState[0].type).toEqual('SUCCESS')
    expect(newState[0].content).toEqual('bar')
    expect(newState[0].timeout).toEqual(defaultTimeout)
  })

  test('returns new state with remove', () => {
    deepFreeze(initialState)
    const action1 = success('bar')
    const newState1 = notificationReducer(initialState, action1)

    expect(newState1).toHaveLength(1)
    deepFreeze(newState1)
    const action2 = remove(newState1[0].id)
    const newState2 = notificationReducer(newState1, action2)

    expect(newState2).toHaveLength(0)
  })
})