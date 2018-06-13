import createHaiku from './haiku/createHaiku'

createHaiku().then((lines) => {
  lines.forEach((line) => console.log(line))
})

export {
  createHaiku
}
