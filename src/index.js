import createSonnet from './sonnet/createSonnet'

createSonnet().then((lines) => {
  lines.forEach((line) => console.log(line))
})

export {
  createSonnet
}
