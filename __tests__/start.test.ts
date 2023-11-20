import { system, filesystem } from 'gluegun'

const src = filesystem.path(__dirname, '..')
const name = 'project'
let output // artefact scope

const terminal = async (cmd) =>
  system.run('node ' + filesystem.path(src, 'bin', 'nucleus-cli') + ` ${cmd}`)

describe('start:ts', () => {
  beforeAll(async () => {
    output = await terminal(`start:ts ${name}`)
  })

  afterAll(() => {
    // remove the artifact
    filesystem.remove(`${name}`)
  })

  test('creates app.tsx file', () => {
    const appTSX = filesystem.read(`${name}/src/app.tsx`)
    expect(appTSX).toBeTruthy()
  })

  test('creates app.sass file', () => {
    const appSASS = filesystem.read(`${name}/src/app.sass`)
    expect(appSASS).toBeTruthy()
  })

  test('creates index.tsx file', () => {
    const indexTSX = filesystem.read(`${name}/src/index.tsx`)
    expect(indexTSX).toBeTruthy()
  })

  test('prints success message', () => {
    expect(output).toContain(`Project ${name} has been created! Have fun.`)
  })

  //expect(foomodel).toContain(`module.exports = {`)
  //expect(foomodel).toContain(`name: 'foo'`)
})