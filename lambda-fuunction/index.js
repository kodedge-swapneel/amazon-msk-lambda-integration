exports.handler = async (event) => {
    for (let key in event.records) {
      console.log('Key: ', key)

      event.records[key].map((record) => {
        console.log('Record: ', record)
        const msg = Buffer.from(record.value, 'base64').toString()
        console.log('Message:', msg)
      })
    }
}