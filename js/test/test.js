'use strict';

const fs = require ('fs')
    , log = require ('ololog').handleNodeErrors ()
    // eslint-disable-next-line import/no-dynamic-require
    , ccxtpro = require (__dirname + '/../../ccxt.pro.js')

const [processPath, , exchangeId, exchangeSymbol] = process.argv.filter (x => !x.startsWith ('--'))
const verbose = process.argv.includes ('--verbose') || false

// ----------------------------------------------------------------------------

if (!exchangeId) {
    console.log ('Exchange id not specified')
    process.exit ()
}

log.bright ('\nTESTING', { exchange: exchangeId, symbol: exchangeSymbol || 'all' }, '\n')

// ----------------------------------------------------------------------------

const enableRateLimit = true

const { Agent } = require ('https')

const agent = new Agent ({
    ecdhCurve: 'auto',
})

const exchange = new (ccxtpro)[exchangeId] ({
    agent,
    verbose,
    enableRateLimit,
    timeout: 20000,
})

// ----------------------------------------------------------------------------

const tests = {}

const pathToExchangeTests = __dirname + '/Exchange/'
fs.readdirSync (pathToExchangeTests)
    .filter (file => file.match (/test.[a-zA-Z0-9_-]+.js$/))
    .forEach (file => {
        const key = file.slice (5, -3)
        // eslint-disable-next-line import/no-dynamic-require
        tests[key] = require (pathToExchangeTests + file)
    })

//-----------------------------------------------------------------------------

const keysGlobal = 'keys.json'
    , keysLocal = 'keys.local.json'
    , keysFile = fs.existsSync (keysLocal) ? keysLocal : keysGlobal
    // eslint-disable-next-line import/no-dynamic-require
    , settings = require (__dirname + '/../../' + keysFile)[exchangeId]

if (settings) {
    for (const key in settings) {
        if (settings[key]) {
            settings[key] = ccxtpro.deepExtend (exchange[key] || {}, settings[key])
        }
    }
}

Object.assign (exchange, settings)

if (settings && settings.skip) {
    log.error.bright ('[Skipped]', { exchange: exchangeId, symbol: exchangeSymbol || 'all' })
    process.exit ()
}

//-----------------------------------------------------------------------------

async function testPublic (exchange, symbol) {
    await tests['watchOrderBook']   (exchange, symbol)
    // await tests['watchStatus']      (exchange)
    // await tests['watchHeartbeat']   (exchange)
    // await tests['watchTicker']      (exchange, symbol)
    // await tests['watchOHLCV']       (exchange, symbol)
    // await tests['watchTrades']      (exchange, symbol)
    // await tests['watchL2OrderBook'] (exchange, symbol)
    // await tests['watchOrderBooks']  (exchange, symbol)
    // await tests['watchTickers']     (exchange, symbol)
}

async function testPrivate (exchange, symbol, code) {
    if (exchange.checkRequiredCredentials (false)) {
        await tests['watchBalance']      (exchange)
        // await tests['watchOrders']       (exchange, symbol)
        // await tests['watchOpenOrders']   (exchange, symbol)
        // await tests['watchClosedOrders'] (exchange, symbol)
        // await tests['watchMyTrades']     (exchange, symbol)
        // const code = exchange.markets[symbol]['quote']
        // await tests['watchLedger']       (exchange, code)
        // await tests['watchTransactions'] (exchange, code)
        // await tests['watchDeposits']     (exchange, code)
        // await tests['watchWithdrawals']  (exchange, code)
    }
}

//-----------------------------------------------------------------------------

async function testExchange (exchange) {

    const codes = [
        'BTC',
        'ETH',
        'XRP',
        'LTC',
        'BCH',
        'EOS',
        'BNB',
        'BSV',
        'USDT',
        'ATOM',
        'BAT',
        'BTG',
        'DASH',
        'DOGE',
        'ETC',
        'IOTA',
        'LSK',
        'MKR',
        'NEO',
        'PAX',
        'QTUM',
        'TRX',
        'TUSD',
        'USD',
        'USDC',
        'WAVES',
        'XEM',
        'XMR',
        'ZEC',
        'ZRX',
    ]
    let code = codes[0]
    for (let c in codes) {
        if (c in exchange.currencies) {
            code = c
        }
    }

    let symbol = exchange.symbols[0]
    const symbols = [
        'BTC/USD',
        'BTC/USDT',
        'BTC/CNY',
        'BTC/EUR',
        'BTC/ETH',
        'ETH/BTC',
        'BTC/JPY',
        'LTC/BTC',
        'ZRX/WETH',
    ]
    for (let s in symbols) {
        if (exchange.symbols.includes (symbols[s]) &&
            (('active' in exchange.markets[symbols[s]]) ? exchange.markets[symbols[s]]['active'] : true)) {
            symbol = symbols[s]
            break
        }
    }

    log.green ('CODE:', code)
    log.green ('SYMBOL:', symbol)

    if ((symbol.indexOf ('.d') < 0)) {
        await testPublic  (exchange, symbol)
        await testPrivate (exchange, symbol, code)
    }
}

//-----------------------------------------------------------------------------

(async () => {

    await exchange.loadMarkets ()
    await testExchange (exchange, exchangeSymbol)
    console.log (new Date (), 'Done.')
    process.exit ()

}) ()
