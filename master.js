const delay = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms)
})

const main = async () => {
  while(await delay(500).then(() => true)) {
    console.log('master')
  }
}
main()
