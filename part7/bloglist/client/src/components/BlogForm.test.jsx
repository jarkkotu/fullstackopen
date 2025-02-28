import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, test, expect, vi, afterEach } from 'vitest'
import BlogForm from './BlogForm'
import { Provider } from 'react-redux'
import store from '../store'

describe('<BlogForm />', () => {
  let container

  const onAfterCreateMock = vi.fn()

  beforeEach(() => {
    container = render(
      <Provider store={store}>
        <BlogForm onAfterCreate={onAfterCreateMock} />
      </Provider>
    ).container
  })

  test('createBlog is called with right details', async () => {
    const user = userEvent.setup()

    const titleElement = container.querySelector('#newTitle')
    expect(titleElement).toBeDefined().toBeVisible()
    const authorElement = container.querySelector('#newAuthor')
    expect(authorElement).toBeDefined().toBeVisible()
    const urlElement = container.querySelector('#newUrl')
    expect(urlElement).toBeDefined().toBeVisible()
    const submitButton = container.querySelector('#submit-button')
    expect(submitButton).toBeDefined().toBeVisible()

    const title = 'lorem ipsum'
    const author = 'dolor sit amet'
    const url = 'consectetur adipiscing elit'

    await user.type(titleElement, title)
    await user.type(authorElement, author)
    await user.type(urlElement, url)

    onAfterCreateMock.mockResolvedValue({
      title: title,
      author: author,
      url: url
    })

    await user.click(submitButton)

    expect(onAfterCreateMock.mock.calls).toHaveLength(1)
    expect(onAfterCreateMock.mock.calls[0][0].title, title)
    expect(onAfterCreateMock.mock.calls[0][0].author, author)
    expect(onAfterCreateMock.mock.calls[0][0].url, url)
  })
})
