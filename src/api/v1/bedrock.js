const dgram = require('dgram');

// https://wiki.vg/Raknet_Protocol
async function fetch(host, port) {
  return new Promise((resolve, reject) => {
    let client = dgram.createSocket('udp4');
    client.connect(port, host)
    client.on('error', (data) => {
      return reject(data)
    })
    client.on('message', function (data) {
      resolve(data.slice(35).toString())

      client.close()
    });

    client.on('connect', () => {
      client.send(Buffer.concat([
        Buffer.from('\x01\x01\x00\x00\x00\x00\x00\x00\x00'), // type id and timestamp
        Buffer.from("00ffff00fefefefefdfdfdfd12345678", "hex"), // magic
        Buffer.from('\xa1\xb6\xac\x63\xb8\x1c\xa9\xd3') // client guid
      ]))
    })
  });
}

module.exports = { fetch }