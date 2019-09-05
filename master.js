const pino = require('pino')
console.log(process.pid)
const logger = pino()

const delay = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms)
})


const main = async () => {
  while(await delay(500).then(() => true)) {
    logger.debug('master')
  }
}
main()
