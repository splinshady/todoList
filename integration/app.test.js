describe('addItemForm', () => {
  it('base example, visually looks correct', async () => {
    await page.goto('http://localhost:9009/iframe.html?id=additemform--add-item-form-example&viewMode=story')
    const image = await page.screenshot()
    expect(image).toMatchImageSnapshot()
  })
})

describe('Mutable span', () => {
  it('base example, visually looks correct', async () => {
    await page.goto('http://localhost:9009/iframe.html?id=mutablespan--span&viewMode=story')
    const image = await page.screenshot()
    expect(image).toMatchImageSnapshot()
  })
})

describe('Task component', () => {
  it('base example, visually looks correct', async () => {
    await page.goto('http://localhost:9009/iframe.html?id=task--task-done-example&viewMode=story')
    const image = await page.screenshot()
    expect(image).toMatchImageSnapshot()
  })
  it('base example, visually looks correct', async () => {
    await page.goto('http://localhost:9009/iframe.html?id=task--task-example&viewMode=story')
    const image = await page.screenshot()
    expect(image).toMatchImageSnapshot()
  })
})
describe('App with redux', () => {
  it('base example, visually looks correct', async () => {
    await page.goto('http://localhost:9009/iframe.html?id=app--app-with-redux&viewMode=story')
    const image = await page.screenshot()
    expect(image).toMatchImageSnapshot()
  })
})