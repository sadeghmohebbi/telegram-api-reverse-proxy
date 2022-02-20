const express = require('express')
const morgan = require('morgan')
const basicAuth = require('express-basic-auth')
const { createProxyMiddleware } = require('http-proxy-middleware')

const PORT = process.env.PORT ?? 3000

const app = express()

app.use(morgan('common'))

// handle authorization
app.use(basicAuth({
  users: {
    'admin': 'SalamTelegram'
  }
}))

app.use('*', createProxyMiddleware({ target: 'https://api.telegram.org'}))

// Start the Proxy
app.listen(PORT, '0.0.0.0', () => {
   console.log(`Starting TelegramAPI Proxy at 0.0.0.0:${PORT}`);
})