import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, test, expect, vi, afterEach } from 'vitest'
import Blog from './Blog'
import { Provider } from 'react-redux'
import store from '../store'

describe('<Blog />', () => {
  const userObj = { username: 'malmikko', name: 'Mikko Mallikas' }

  const blogObj = {
    title: 'lorem',
    author: 'ipsum',
    url: 'dolor',
    likes: 7,
    user: userObj
  }

  let container

  const onUpdateBlogMock = vi.fn()
  const onRemoveBlogMock = vi.fn()

  beforeEach(() => {
    container = render(
      <Provider store={store}>
        <Blog
          user={userObj}
          blog={blogObj}
          onUpdateBlog={onUpdateBlogMock}
          onRemoveBlog={onRemoveBlogMock}
        />
      </Provider>
    ).container
  })

  test('displays title and author by default, but not url and likes', () => {
    const titleElement = container.querySelector('#title')
    expect(titleElement).toHaveTextContent(blogObj.title)
    expect(titleElement).toBeDefined().toBeVisible()

    const authorElement = container.querySelector('#author')
    expect(authorElement).toHaveTextContent(blogObj.author)
    expect(authorElement).toBeDefined().toBeVisible()

    const visibilityButton = container.querySelector('#visibility-button')
    expect(visibilityButton).toHaveTextContent('view')
    expect(visibilityButton).toBeDefined().toBeVisible()

    const innerDiv = container.querySelector('#inner-div')
    expect(innerDiv).toBeDefined().not.toBeVisible()

    const urlElement = container.querySelector('#url')
    expect(urlElement).toHaveTextContent(blogObj.url)
    expect(urlElement).toBeDefined().not.toBeVisible()

    const likesElement = container.querySelector('#likes')
    expect(likesElement).toHaveTextContent(blogObj.likes)
    expect(likesElement).toBeDefined().not.toBeVisible()

    const likeButton = container.querySelector('#like-button')
    expect(likeButton).toHaveTextContent('like')
    expect(likeButton).toBeDefined().not.toBeVisible()

    const userNameElement = container.querySelector('#user-name')
    expect(userNameElement).toHaveTextContent(blogObj.user.name)
    expect(userNameElement).toBeDefined().not.toBeVisible()

    const removeButton = container.querySelector('#remove-button')
    expect(removeButton).toHaveTextContent('remove')
    expect(removeButton).toBeDefined().not.toBeVisible()
  })

  test('url and likes are shown when view/hide-button is pressed', async () => {
    const user = userEvent.setup()
    const visibilityButton = container.querySelector('#visibility-button')
    expect(visibilityButton).toHaveTextContent('view')
    await user.click(visibilityButton)
    expect(visibilityButton).toHaveTextContent('hide')

    const innerDiv = container.querySelector('#inner-div')
    expect(innerDiv).toBeDefined().toBeVisible()

    const urlElement = container.querySelector('#url')
    expect(urlElement).toBeDefined().toBeVisible()

    const likesElement = container.querySelector('#likes')
    expect(likesElement).toBeDefined().toBeVisible()

    const likeButton = container.querySelector('#like-button')
    expect(likesElement).toBeDefined().toBeVisible()

    const userName = container.querySelector('#user-name')
    expect(userName).toBeDefined().toBeVisible()

    const removeButton = container.querySelector('#remove-button')
    expect(removeButton).toBeDefined().toBeVisible()
  })

  test('like-handler is called twice if like button is pressed twice', async () => {
    const user = userEvent.setup()

    const visibilityButton = container.querySelector('#visibility-button')
    await user.click(visibilityButton)

    const likeButton = container.querySelector('#like-button')
    expect(likeButton).toBeDefined().toBeVisible()
    await user.click(likeButton)
    await user.click(likeButton)
    expect(onUpdateBlogMock.mock.calls).toHaveLength(2)
  })
})
