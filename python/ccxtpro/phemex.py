# -*- coding: utf-8 -*-

# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

from ccxtpro.base.exchange import Exchange
import ccxt.async_support as ccxt
from ccxtpro.base.cache import ArrayCache, ArrayCacheByTimestamp
import math
from ccxt.base.errors import NotSupported
from ccxt.base.decimal_to_precision import ROUND


class phemex(Exchange, ccxt.phemex):

    def describe(self):
        return self.deep_extend(super(phemex, self).describe(), {
            'has': {
                'ws': True,
                'watchTicker': True,
                'watchTickers': False,  # for now
                'watchTrades': True,
                'watchOrderBook': True,
                'watchOHLCV': True,
            },
            'urls': {
                'test': {
                    'ws': 'wss://testnet.phemex.com/ws',
                },
                'api': {
                    'ws': 'wss://phemex.com/ws',
                },
            },
            'options': {
                'tradesLimit': 1000,
                'OHLCVLimit': 1000,
            },
            'streaming': {
                'keepAlive': 20000,
            },
        })

    def request_id(self):
        requestId = self.sum(self.safe_integer(self.options, 'requestId', 0), 1)
        self.options['requestId'] = requestId
        return requestId

    def parse_swap_ticker(self, ticker, market=None):
        #
        #     {
        #         close: 442800,
        #         fundingRate: 10000,
        #         high: 445400,
        #         indexPrice: 442621,
        #         low: 428400,
        #         markPrice: 442659,
        #         open: 432200,
        #         openInterest: 744183,
        #         predFundingRate: 10000,
        #         symbol: 'LTCUSD',
        #         turnover: 8133238294,
        #         volume: 934292
        #     }
        #
        marketId = self.safe_string(ticker, 'symbol')
        symbol = self.safe_symbol(marketId)
        timestamp = self.safe_integer_product(ticker, 'timestamp', 0.000001)
        last = self.from_ep(self.safe_float(ticker, 'close'), market)
        quoteVolume = self.from_ev(self.safe_float(ticker, 'turnover'), market)
        baseVolume = self.from_ev(self.safe_float(ticker, 'volume'), market)
        change = None
        percentage = None
        average = None
        open = self.from_ep(self.safe_float(ticker, 'open'), market)
        if (open is not None) and (last is not None):
            change = last - open
            if open > 0:
                percentage = change / open * 100
            average = self.sum(open, last) / 2
        result = {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': self.iso8601(timestamp),
            'high': self.from_ep(self.safe_float(ticker, 'high'), market),
            'low': self.from_ep(self.safe_float(ticker, 'low'), market),
            'bid': None,
            'bidVolume': None,
            'ask': None,
            'askVolume': None,
            'vwap': None,
            'open': open,
            'close': last,
            'last': last,
            'previousClose': None,  # previous day close
            'change': change,
            'percentage': percentage,
            'average': average,
            'baseVolume': baseVolume,
            'quoteVolume': quoteVolume,
            'info': ticker,
        }
        return result

    def handle_ticker(self, client, message):
        #
        #     {
        #         spot_market24h: {
        #             askEp: 958148000000,
        #             bidEp: 957884000000,
        #             highEp: 962000000000,
        #             lastEp: 958220000000,
        #             lowEp: 928049000000,
        #             openEp: 935597000000,
        #             symbol: 'sBTCUSDT',
        #             turnoverEv: 146074214388978,
        #             volumeEv: 15492228900
        #         },
        #         timestamp: 1592847265888272100
        #     }
        #
        # swap
        #
        #     {
        #         market24h: {
        #             close: 442800,
        #             fundingRate: 10000,
        #             high: 445400,
        #             indexPrice: 442621,
        #             low: 428400,
        #             markPrice: 442659,
        #             open: 432200,
        #             openInterest: 744183,
        #             predFundingRate: 10000,
        #             symbol: 'LTCUSD',
        #             turnover: 8133238294,
        #             volume: 934292
        #         },
        #         timestamp: 1592845585373374500
        #     }
        #
        name = 'market24h'
        ticker = self.safe_value(message, name)
        result = None
        if ticker is None:
            name = 'spot_market24h'
            ticker = self.safe_value(message, name)
            result = self.parse_ticker(ticker)
        else:
            result = self.parse_swap_ticker(ticker)
        symbol = result['symbol']
        messageHash = name + ':' + symbol
        timestamp = self.safe_integer_product(message, 'timestamp', 0.000001)
        result['timestamp'] = timestamp
        result['datetime'] = self.iso8601(timestamp)
        self.tickers[symbol] = result
        client.resolve(result, messageHash)

    async def watch_balance(self, params={}):
        await self.load_markets()
        raise NotSupported(self.id + ' watchBalance() not implemented yet')

    def handle_trades(self, client, message):
        #
        #     {
        #         sequence: 1795484727,
        #         symbol: 'sBTCUSDT',
        #         trades: [
        #             [1592891002064516600, 'Buy', 964020000000, 1431000],
        #             [1592890978987934500, 'Sell', 963704000000, 1401800],
        #             [1592890972918701800, 'Buy', 963938000000, 2018600],
        #         ],
        #         type: 'snapshot'
        #     }
        #
        name = 'trade'
        marketId = self.safe_string(message, 'symbol')
        market = self.safe_market(marketId)
        symbol = market['symbol']
        messageHash = name + ':' + symbol
        stored = self.safe_value(self.trades, symbol)
        if stored is None:
            limit = self.safe_integer(self.options, 'tradesLimit', 1000)
            stored = ArrayCache(limit)
            self.trades[symbol] = stored
        trades = self.safe_value(message, 'trades', [])
        parsed = self.parse_trades(trades, market)
        for i in range(0, len(parsed)):
            stored.append(parsed[i])
        client.resolve(stored, messageHash)

    def handle_ohlcv(self, client, message):
        #
        #     {
        #         kline: [
        #             [1592905200, 60, 960688000000, 960709000000, 960709000000, 960400000000, 960400000000, 848100, 8146756046],
        #             [1592905140, 60, 960718000000, 960716000000, 960717000000, 960560000000, 960688000000, 4284900, 41163743512],
        #             [1592905080, 60, 960513000000, 960684000000, 960718000000, 960684000000, 960718000000, 4880500, 46887494349],
        #         ],
        #         sequence: 1804401474,
        #         symbol: 'sBTCUSDT',
        #         type: 'snapshot'
        #     }
        #
        name = 'kline'
        marketId = self.safe_string(message, 'symbol')
        market = self.safe_market(marketId)
        symbol = market['symbol']
        candles = self.safe_value(message, name, [])
        first = self.safe_value(candles, 0, [])
        interval = self.safe_string(first, 1)
        timeframe = self.find_timeframe(interval)
        if timeframe is not None:
            messageHash = name + ':' + timeframe + ':' + symbol
            ohlcvs = self.parse_ohlcvs(candles, market)
            self.ohlcvs[symbol] = self.safe_value(self.ohlcvs, symbol, {})
            stored = self.safe_value(self.ohlcvs[symbol], timeframe)
            if stored is None:
                limit = self.safe_integer(self.options, 'OHLCVLimit', 1000)
                stored = ArrayCacheByTimestamp(limit)
                self.ohlcvs[symbol][timeframe] = stored
            for i in range(0, len(ohlcvs)):
                candle = ohlcvs[i]
                stored.append(candle)
            client.resolve(stored, messageHash)

    async def watch_ticker(self, symbol, params={}):
        await self.load_markets()
        market = self.market(symbol)
        name = 'spot_market24h' if market['spot'] else 'market24h'
        url = self.urls['api']['ws']
        requestId = self.request_id()
        subscriptionHash = name + '.subscribe'
        messageHash = name + ':' + symbol
        subscribe = {
            'method': subscriptionHash,
            'id': requestId,
            'params': [],
        }
        request = self.deep_extend(subscribe, params)
        return await self.watch(url, messageHash, request, subscriptionHash)

    async def watch_trades(self, symbol, since=None, limit=None, params={}):
        await self.load_markets()
        market = self.market(symbol)
        url = self.urls['api']['ws']
        requestId = self.request_id()
        name = 'trade'
        messageHash = name + ':' + symbol
        method = name + '.subscribe'
        subscribe = {
            'method': method,
            'id': requestId,
            'params': [
                market['id'],
            ],
        }
        request = self.deep_extend(subscribe, params)
        trades = await self.watch(url, messageHash, request, messageHash)
        if self.newUpdates:
            limit = trades.getLimit(limit)
        return self.filter_by_since_limit(trades, since, limit, 'timestamp', True)

    async def watch_order_book(self, symbol, limit=None, params={}):
        await self.load_markets()
        market = self.market(symbol)
        url = self.urls['api']['ws']
        requestId = self.request_id()
        name = 'orderbook'
        messageHash = name + ':' + symbol
        method = name + '.subscribe'
        subscribe = {
            'method': method,
            'id': requestId,
            'params': [
                market['id'],
            ],
        }
        request = self.deep_extend(subscribe, params)
        orderbook = await self.watch(url, messageHash, request, messageHash)
        return orderbook.limit(limit)

    async def watch_ohlcv(self, symbol, timeframe='1m', since=None, limit=None, params={}):
        await self.load_markets()
        market = self.market(symbol)
        url = self.urls['api']['ws']
        requestId = self.request_id()
        name = 'kline'
        messageHash = name + ':' + timeframe + ':' + symbol
        method = name + '.subscribe'
        subscribe = {
            'method': method,
            'id': requestId,
            'params': [
                market['id'],
                self.safe_integer(self.timeframes, timeframe),
            ],
        }
        request = self.deep_extend(subscribe, params)
        ohlcv = await self.watch(url, messageHash, request, messageHash)
        return self.filter_by_since_limit(ohlcv, since, limit, 0, True)

    def handle_delta(self, bookside, delta, market=None):
        if market is not None:
            price = self.from_ep(self.safe_float(delta, 0), market)
            amount = self.from_ev(self.safe_float(delta, 1), market)
            bookside.store(price, amount)

    def handle_deltas(self, bookside, deltas, market=None):
        for i in range(0, len(deltas)):
            self.handle_delta(bookside, deltas[i], market)

    def handle_order_book(self, client, message):
        #
        #     {
        #         book: {
        #             asks: [
        #                 [960316000000, 6993800],
        #                 [960318000000, 13183000],
        #                 [960319000000, 9170200],
        #             ],
        #             bids: [
        #                 [959941000000, 8385300],
        #                 [959939000000, 10296600],
        #                 [959930000000, 3672400],
        #             ]
        #         },
        #         depth: 30,
        #         sequence: 1805784701,
        #         symbol: 'sBTCUSDT',
        #         timestamp: 1592908460404461600,
        #         type: 'snapshot'
        #     }
        #
        marketId = self.safe_string(message, 'symbol')
        market = self.safe_market(marketId)
        symbol = market['symbol']
        type = self.safe_string(message, 'type')
        depth = self.safe_integer(message, 'depth')
        name = 'orderbook'
        messageHash = name + ':' + symbol
        nonce = self.safe_integer(message, 'sequence')
        timestamp = self.safe_integer_product(message, 'timestamp', 0.000001)
        if type == 'snapshot':
            book = self.safe_value(message, 'book', {})
            snapshot = self.parse_order_book(book, timestamp, 'bids', 'asks', 0, 1, market)
            snapshot['nonce'] = nonce
            orderbook = self.order_book(snapshot, depth)
            self.orderbooks[symbol] = orderbook
            client.resolve(orderbook, messageHash)
        else:
            orderbook = self.safe_value(self.orderbooks, symbol)
            if orderbook is not None:
                changes = self.safe_value(message, 'book', {})
                asks = self.safe_value(changes, 'asks', [])
                bids = self.safe_value(changes, 'bids', [])
                self.handle_deltas(orderbook['asks'], asks, market)
                self.handle_deltas(orderbook['bids'], bids, market)
                orderbook['nonce'] = nonce
                orderbook['timestamp'] = timestamp
                orderbook['datetime'] = self.iso8601(timestamp)
                self.orderbooks[symbol] = orderbook
                client.resolve(orderbook, messageHash)

    def from_en(self, en, scale, precision, precisionMode=None):
        precisionMode = self.precisionMode if (precisionMode is None) else precisionMode
        return float(self.decimal_to_precision(en * math.pow(10, -scale), ROUND, precision, precisionMode))

    def from_ep(self, ep, market=None):
        if (ep is None) or (market is None):
            return ep
        return self.from_en(ep, market['priceScale'], market['precision']['price'])

    def from_ev(self, ev, market=None):
        if (ev is None) or (market is None):
            return ev
        if market['spot']:
            return self.from_en(ev, market['valueScale'], market['precision']['amount'])
        else:
            return self.from_en(ev, market['valueScale'], 1 / math.pow(10, market['valueScale']))

    def handle_message(self, client, message):
        if ('market24h' in message) or ('spot_market24h' in message):
            return self.handle_ticker(client, message)
        elif 'trades' in message:
            return self.handle_trades(client, message)
        elif 'kline' in message:
            return self.handle_ohlcv(client, message)
        elif 'book' in message:
            return self.handle_order_book(client, message)
        else:
            #
            #     {error: null, id: 1, result: {status: 'success'}}
            #
            return message
