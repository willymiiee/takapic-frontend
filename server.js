const express = require('express');
const path = require('path');
const fs = require('fs');
const ip = require('ip');
const geoip = require('geoip-lite');

const app = express();
const port = 8686;
const dir = path.resolve('build');

app.use(express.static(dir));

app.get('*', function (req, resp) {
  let currency = 'IDR';
  const ipAddr = requestIpAddr(req);
  const isPrivateIpAddr = ip.isPrivate(ipAddr);

  if (ipAddr !== '::1' && ipAddr !== '127.0.0.1' && isPrivateIpAddr === false) {
    const geo = geoip.lookup(ipAddr);
    console.log(geo);
    if (geo.country !== 'ID') {
      currency = 'USD';
    }
  }

  fs.writeFile(dir + '/js/currency.js', "window.TAKAPIC_USE_CURRENCY = \"" + currency + "\";\n", function (error) {
    if (error) throw error;
    resp.sendFile(dir + '/index.html');
  });
});

app.listen(port, function () {
  console.log('Server started at port: ', port);
  console.log('Server is serving from: ', dir);
});

function requestIpAddr(req) {
  return (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || req.client.remoteAddress);
}
