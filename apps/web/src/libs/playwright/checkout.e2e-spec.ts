import { expect, test } from '@playwright/test'

test('has storage name', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await expect(page.getByText('Cody’s Cookie Store')).toBeVisible()
  await expect(page.getByTestId('personalDetailsTitle')).not.toBeVisible()
  await expect(page.getByTestId('paymentInformationTitle')).not.toBeVisible()
})

test('0 or negative number of bags are not allowed', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await expect(page.getByTestId('inputCountValue')).toHaveValue('1')
  await expect(page.getByTestId('decrementCount')).toBeDisabled()
  await expect(page.getByTestId('incrementCount')).toBeEnabled()
})

test('3 or more number of bags are not allowed', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await expect(page.getByTestId('inputCountValue')).toHaveValue('1')
  await page.getByTestId('incrementCount').click()
  await expect(page.getByTestId('inputCountValue')).toHaveValue('2')
  await expect(page.getByTestId('incrementCount')).toBeDisabled()
  await expect(page.getByTestId('decrementCount')).toBeEnabled()
})

test('number of bags changes reflects in the total price', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await expect(page.getByTestId('inputCountValue')).toHaveValue('1')
  await expect(page.getByTestId('checkoutNumberOfBags')).toHaveText('1 bag')
  await expect(page.getByTestId('checkoutPrice')).toHaveText('$5.90')
  await page.getByTestId('incrementCount').click()
  await expect(page.getByTestId('checkoutNumberOfBags')).toHaveText('2 bags')
  await expect(page.getByTestId('checkoutPrice')).toHaveText('$11.80')
})

test('clicking on the next button on order details step takes to the personal details step', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByTestId('checkoutActionButton').click()
  await expect(page.getByTestId('personalDetailsTitle')).toBeVisible()
  await expect(page.getByTestId('paymentInformationTitle')).not.toBeVisible()
  await expect(page.getByTestId('checkoutActionButton')).toBeDisabled()
})

test('button next on personal details is disabled if the form is not valid', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByTestId('checkoutActionButton').click()
  await expect(page.getByTestId('checkoutActionButton')).toBeDisabled()
  await page.getByTestId('inputName').fill('name')
  await expect(page.getByTestId('checkoutActionButton')).toBeDisabled()
  await page.getByTestId('inputEmail').fill('email@email.com')
  await expect(page.getByTestId('checkoutActionButton')).toBeEnabled()
  await page.getByTestId('inputName').fill('')
  await expect(page.getByTestId('checkoutActionButton')).toBeDisabled()
})

test('button next on personal details is enabled if the form is valid', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByTestId('checkoutActionButton').click()
  await page.getByTestId('inputName').fill('name')
  await page.getByTestId('inputEmail').fill('email@email.com')
  await expect(page.getByTestId('checkoutActionButton')).toBeEnabled()
})

test('clicking on the next button on personal details step takes to the payment information step', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByTestId('checkoutActionButton').click()
  await page.getByTestId('inputName').fill('name')
  await page.getByTestId('inputEmail').fill('email@email.com')
  await expect(page.getByTestId('checkoutActionButton')).toHaveText('Next')
  await page.getByTestId('checkoutActionButton').click()
  await expect(page.getByTestId('paymentInformationTitle')).toBeVisible()
  await expect(page.getByTestId('checkoutActionButton')).toBeDisabled()
  await expect(page.getByTestId('checkoutActionButton')).toHaveText('Book')
})

test('clicking on change personal details on payment information step takes to the personal details step', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByTestId('checkoutActionButton').click()
  await expect(
    page.getByTestId('changePersonalDetailsButton'),
  ).not.toBeVisible()
  await page.getByTestId('inputName').fill('name')
  await page.getByTestId('inputEmail').fill('email@email.com')
  await page.getByTestId('checkoutActionButton').click()
  await expect(page.getByTestId('paymentInformationTitle')).toBeVisible()
  await expect(page.getByTestId('changePersonalDetailsButton')).toBeVisible()
  await expect(page.getByTestId('personalDetailsTitle')).not.toBeVisible()
  await expect(page.getByTestId('checkoutActionButton')).toBeDisabled()
  await expect(page.getByTestId('checkoutActionButton')).toHaveText('Book')
  await page.getByTestId('changePersonalDetailsButton').click()
  await expect(page.getByTestId('personalDetailsTitle')).toBeVisible()
  await expect(page.getByTestId('checkoutActionButton')).toHaveText('Book')
  await expect(
    page.getByTestId('changePersonalDetailsButton'),
  ).not.toBeVisible()
})

test('button book on payment information is disabled if the form is not valid', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByTestId('checkoutActionButton').click()
  await page.getByTestId('inputName').fill('name')
  await page.getByTestId('inputEmail').fill('email@email.com')
  await page.getByTestId('checkoutActionButton').click()
  await expect(page.getByTestId('paymentInformationTitle')).toBeVisible()
  await expect(page.getByTestId('checkoutActionButton')).toBeDisabled()
  await page.getByTestId('inputCardDetails').fill('4242424242424242')
  await expect(page.getByTestId('checkoutActionButton')).toBeEnabled()
  await page.getByTestId('changePersonalDetailsButton').click()
  await page.getByTestId('inputName').fill('')
  await expect(page.getByTestId('checkoutActionButton')).toBeDisabled()
})

test('clicking on book on payment information send data to server', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByTestId('checkoutActionButton').click()
  await page.getByTestId('inputName').fill('name')
  await page.getByTestId('inputEmail').fill('email@email.com')
  await page.getByTestId('checkoutActionButton').click()
  await page.getByTestId('inputCardDetails').fill('4242424242424242')
  await page.getByTestId('checkoutActionButton').click()
  await expect(page.getByTestId('loadingSplashScreen')).toBeVisible()
  const response = await page.waitForResponse('**/api/place-a-booking')
  expect(response.status()).toBe(201)
  await expect(page.getByTestId('successSplashScreen')).toBeVisible()
})

test('form resets after successfully sending data to server', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByTestId('checkoutActionButton').click()
  await page.getByTestId('inputName').fill('name')
  await page.getByTestId('inputEmail').fill('email@email.com')
  await page.getByTestId('checkoutActionButton').click()
  await page.getByTestId('inputCardDetails').fill('4242424242424242')
  await page.getByTestId('checkoutActionButton').click()
  const response = await page.waitForResponse('**/api/place-a-booking')
  expect(response.status()).toBe(201)
  await expect(page.getByTestId('successSplashScreen')).toBeVisible()
  await expect(page.getByTestId('successSplashScreen')).not.toBeVisible()
  await expect(page.getByTestId('personalDetailsTitle')).not.toBeVisible()
  await expect(page.getByTestId('paymentInformationTitle')).not.toBeVisible()
  await page.getByTestId('checkoutActionButton').click()
  await expect(page.getByTestId('personalDetailsTitle')).toBeVisible()
  await expect(page.getByTestId('inputEmail')).toHaveValue('')
})

test('retry button is shown on server error', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByTestId('checkoutActionButton').click()
  await page.getByTestId('inputName').fill('name')
  await page.getByTestId('inputEmail').fill('wrong-email@test.com')
  await page.getByTestId('checkoutActionButton').click()
  await page.getByTestId('inputCardDetails').fill('4242424242424242')
  await page.getByTestId('checkoutActionButton').click()
  await expect(page.getByTestId('loadingSplashScreen')).toBeVisible()
  const response = await page.waitForResponse('**/api/place-a-booking')
  expect(response.status()).toBe(422)
  await expect(page.getByTestId('checkoutActionButton')).toHaveText('Retry')
  await expect(page.getByTestId('checkoutActionButton')).toHaveCSS(
    'background-color',
    'rgba(239, 68, 68, 0.9)',
  )
})

test('clicking on retry button sends data to server again', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByTestId('checkoutActionButton').click()
  await page.getByTestId('inputName').fill('name')
  await page.getByTestId('inputEmail').fill('wrong-email@test.com')
  await page.getByTestId('checkoutActionButton').click()
  await page.getByTestId('inputCardDetails').fill('4242424242424242')
  await page.getByTestId('checkoutActionButton').click()
  await expect(page.getByTestId('loadingSplashScreen')).toBeVisible()
  const responseOne = await page.waitForResponse('**/api/place-a-booking')
  expect(responseOne.status()).toBe(422)
  await expect(page.getByTestId('checkoutActionButton')).toHaveText('Retry')
  await page.getByTestId('checkoutActionButton').click()
  const responseTwo = await page.waitForResponse('**/api/place-a-booking')
  expect(responseTwo.status()).toBe(422)
  await page.getByTestId('changePersonalDetailsButton').click()
  await page.getByTestId('inputEmail').fill('anyother-email@test.com')
  await page.getByTestId('checkoutActionButton').click()
  const responseThree = await page.waitForResponse('**/api/place-a-booking')
  expect(responseThree.status()).toBe(201)
  await expect(page.getByTestId('checkoutActionButton')).not.toHaveText('Retry')
  await expect(page.getByTestId('successSplashScreen')).toBeVisible()
})
