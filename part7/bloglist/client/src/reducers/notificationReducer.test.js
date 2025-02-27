import { add, remove, initialState } from './notificationReducer'
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

  test('returns new state with add', () => {
    deepFreeze(initialState)
    const action = add({
      id: 1,
      type: 'SUCCESS',
      content: 'FOO',
      timeout: 5
    })
    const newState = notificationReducer(initialState, action)

    expect(newState).toHaveLength(1)
    expect(newState[0].type).toEqual('SUCCESS')
    expect(newState[0].content).toEqual('FOO')
  })

  test('returns new state with remove', () => {
    const action1 = add({
      id: 1,
      type: 'SUCCESS',
      content: 'FOO',
      timeout: 5
    })
    const newState1 = notificationReducer(initialState, action1)

    deepFreeze(newState1)
    const action2 = remove(newState1[0])
    const newState2 = notificationReducer(newState1, action2)

    expect(newState2).toHaveLength(0)
  })
})
