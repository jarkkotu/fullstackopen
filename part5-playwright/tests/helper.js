const { expect } = require('@playwright/test')

const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const addBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await expect(page.getByText('create new')).toBeVisible()
  await page.getByTestId('newTitle').fill(title)
  await page.getByTestId('newAuthor').fill(author)
  await page.getByTestId('newUrl').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const waitForNotificationsToDisappear = async (page) => {
  // TODO: Make the notifications disappear faster in test mode
  while (true) {
    try {
      const error = page.locator('.error')
      await expect(error).not.toBeVisible()
      const success = await page.locator('.success')
      await expect(success).not.toBeVisible()
      break;
    }
    catch (exception) {
      await delay(100)
    }
  }
  // await page.locator('.success').waitFor({ state: 'hidden', timeout: 6000 })
  // await page.locator('.error').waitFor({ state: 'hidden', timeout: 6000 })
}

export { loginWith, addBlog, delay, waitForNotificationsToDisappear }