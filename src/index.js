import createHaiku from './haiku/createHaiku'

createHaiku().then((lines) => {
  lines.forEach(console.log)
})

export {
  createHaiku
}
