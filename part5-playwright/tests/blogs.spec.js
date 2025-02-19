const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, addBlog, waitForNotificationsToDisappear } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('api/testing/reset')
    await request.post('api/users', {
      data: {
        name: 'Test User',
        username: 'test',
        password: 'test'
      }
    })
    await page.goto('/')
    await page.waitForLoadState();
    await expect(page).toHaveTitle('Bloglist');
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()

    await expect(page.getByText('blogs')).not.toBeVisible()
    await expect(page.getByRole('button', { name: 'new blog' })).not.toBeVisible()
    await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()
  })

  describe('Login', async () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'test', 'test')
      const success = await page.locator('.success')
      await expect(success).toBeVisible()
      await expect(success).toContainText('Login successful')
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'vaarakayttaja', 'vaarankayttajanvaarasalasana')
      const error = page.locator('.error')
      await expect(error).toBeVisible()
      await expect(error).toContainText('Login failed: invalid username or password')
    })
  })

  describe('When logged in', async () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', 'test')
      await expect(page.getByText('blogs')).toBeVisible()
    })

    test('Logout', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
      await page.getByRole('button', { name: 'logout' }).click()

      await expect(page.getByTestId('username')).toBeVisible()
      await expect(page.getByTestId('password')).toBeVisible()
      await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    test('a new blog can be added', async ({ page }) => {
      await waitForNotificationsToDisappear(page)
      await addBlog(page, 'test-title', 'test-author', 'test-url')
      const success = await page.locator('.success')
      await expect(success).toBeVisible()
      await expect(success).toContainText('Created new blog')
    })

    test('blog can be liked', async ({ page }) => {
      await addBlog(page, 'test-title', 'test-author', 'test-url')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('likes 0')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('blog can be removed by user who created it', async ({ page }) => {
      await addBlog(page, 'test-title', 'test-author', 'test-url')
      
      await page.getByRole('button', { name: 'view' }).click()
      
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'remove' }).click()
      const success = await page.locator('.success')
      await expect(success).toBeVisible()
      await expect(success).toContainText('Removed blog')
      await waitForNotificationsToDisappear(page)
      await expect(page.getByText('test-title')).not.toBeVisible()
    })

    test('blog can not be removed by user who has not created it', async ({ page, request }) => {
      await addBlog(page, 'test-title', 'test-author', 'test-url')
      await page.getByRole('button', { name: 'logout' }).click()

      await request.post('api/users', {
        data: {
          name: 'Lorem ipsum',
          username: 'dolor',
          password: 'sit'
        }
      })

      await loginWith(page, 'dolor', 'sit')

      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', dialog => dialog.accept());
      const removeButton = await page.getByRole('button', { name: 'remove' })
      await expect(removeButton).not.toBeVisible()
    })

    test('blogs are orderd in descending order of the likes', async ({ page, request }) => {
      await addBlog(page, 'title-1', 'author-1', 'url-1')
      await addBlog(page, 'title-2', 'author-2', 'url-2')

      await expect(page.getByText('create new')).not.toBeVisible()

      const viewButtons = await page.getByRole('button', { name: 'view' }).all()
      await viewButtons[1].click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
      await page.getByRole('button', { name: 'hide' }).click()
      await expect(page.getByRole('button', { name: 'like' })).not.toBeVisible()

      const titles = await page.getByTestId('title').all()
      await expect(titles[0]).toContainText('title-2');
      await expect(titles[1]).toContainText('title-1');
    })
  })
})