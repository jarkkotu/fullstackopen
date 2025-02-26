import blogReducer, { set, append, update, initialState } from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('blog reducer', () => {
  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = blogReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('returns new state with set', () => {
    const action1 = set([
      {
        id: 1,
        title: 'foo title',
        author: 'foo author',
        url: 'foo url',
        likes: 0
      },
      {
        id: 2,
        title: 'bar title',
        author: 'bar author',
        url: 'bar url',
        likes: 0
      }
    ])

    deepFreeze(initialState)
    const newState1 = blogReducer(initialState, action1)

    expect(newState1).toHaveLength(2)
    expect(newState1[0].title).toEqual('foo title')
    expect(newState1[1].title).toEqual('bar title')

    const action2 = set([
      {
        id: 42,
        title: 'baz title',
        author: 'baz author',
        url: 'baz url',
        likes: 0
      }
    ])

    deepFreeze(newState1)
    const newState2 = blogReducer(newState1, action2)

    expect(newState2).toHaveLength(1)
    expect(newState2[0].title).toEqual('baz title')
  })

  test('returns new state with append', () => {
    const action = append({
      id: 1,
      title: 'foo title',
      author: 'foo author',
      url: 'foo url',
      likes: 0
    })

    deepFreeze(initialState)
    const newState = blogReducer(initialState, action)

    expect(newState).toHaveLength(initialState.length + 1)
    expect(newState[newState.length - 1].title).toEqual('foo title')
  })

  test('returns new state with update', () => {
    const action1 = set([
      {
        id: 1,
        title: 'foo title',
        author: 'foo author',
        url: 'foo url',
        likes: 0
      }
    ])

    deepFreeze(initialState)
    const newState1 = blogReducer(initialState, action1)
    expect(newState1).toHaveLength(1)

    const updatedBlog = { ...newState1[0], likes: newState1[0].likes + 1 }
    const action2 = update(updatedBlog)
    deepFreeze(newState1)
    const newState2 = blogReducer(newState1, action2)

    expect(newState2).toHaveLength(1)
    expect(newState2[0].likes).toEqual(1)
  })
})
