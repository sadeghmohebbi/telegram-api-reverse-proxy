const express = require('express')
const morgan = require('morgan')
const { createProxyMiddleware } = require('http-proxy-middleware')

const PORT = process.env.PORT ?? 3000

const app = express()

app.use(morgan('common'))

app.get("/ping", (req, res, next) => {
  return res.send('PONG!')
})

app.use('*', createProxyMiddleware('/', {
  target: 'https://api.telegram.org',
  changeOrigin: true,
  logLevel: 'debug',
  secure: true,
  onProxyReq: function (proxyReq, req, res) {
    console.log("proxyReq >",JSON.stringify(proxyReq))
  },
  onProxyRes: function (proxyRes, req, res) {
    console.log("proxyRes >", JSON.stringify(proxyRes))
  }
}))

// Start the Proxy
app.listen(PORT, '0.0.0.0', () => {
   console.log(`Starting TelegramAPI Proxy at 0.0.0.0:${PORT}`);
})
