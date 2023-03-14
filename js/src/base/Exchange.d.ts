import * as functions from './functions.js';
import { inflate, inflate64, gunzip } from './ws/functions.js';
import { // eslint-disable-line object-curly-newline
ExchangeError, AuthenticationError, DDoSProtection, RequestTimeout, ExchangeNotAvailable, RateLimitExceeded } from "./errors.js";
import WsClient from './ws/WsClient.js';
import { OrderBook, IndexedOrderBook, CountedOrderBook } from './ws/OrderBook.js';
import { Market, Trade, Ticker, OHLCV, Order } from './types';
export { Market, Trade, Fee, Ticker } from './types';
export default class Exchange {
    options: {};
    fetchOptions: any;
    userAgents: any;
    headers: any;
    httpAgent: any;
    httpsAgent: any;
    agent: any;
    api: any;
    proxy: string;
    origin: string;
    minFundingAddressLength: number;
    substituteCommonCurrencyCodes: boolean;
    quoteJsonNumbers: boolean;
    number: NumberConstructor;
    handleContentTypeApplicationZip: boolean;
    reduceFees: boolean;
    fetchImplementation: any;
    validateServerSsl: boolean;
    validateClientSsl: boolean;
    timeout: number;
    verbose: boolean;
    debug: boolean;
    userAgent: any;
    twofa: any;
    apiKey: any;
    secret: any;
    uid: any;
    login: any;
    password: any;
    privateKey: any;
    walletAddress: any;
    token: any;
    balance: {};
    orderbooks: {};
    tickers: {};
    orders: any;
    trades: any;
    transactions: {};
    ohlcvs: any;
    myTrades: any;
    positions: {};
    urls: {};
    requiresWeb3: boolean;
    requiresEddsa: boolean;
    precision: {};
    enableLastJsonResponse: boolean;
    enableLastHttpResponse: boolean;
    enableLastResponseHeaders: boolean;
    last_http_response: any;
    last_json_response: any;
    last_response_headers: any;
    id: any;
    markets: Market[];
    has: {};
    status: any;
    requiredCredentials: any;
    rateLimit: any;
    tokenBucket: any;
    throttle: any;
    enableRateLimit: any;
    httpExceptions: any;
    limits: any;
    fees: any;
    markets_by_id: any;
    symbols: any;
    ids: any;
    currencies: any;
    baseCurrencies: any;
    quoteCurrencies: any;
    currencies_by_id: any;
    codes: any;
    reloadingMarkets: any;
    marketsLoading: any;
    accounts: any;
    accountsById: any;
    commonCurrencies: any;
    hostname: any;
    precisionMode: any;
    paddingMode: any;
    exceptions: {};
    timeframes: any[];
    version: any;
    marketsByAltname: any;
    name: any;
    lastRestRequestTimestamp: any;
    targetAccount: any;
    stablePairs: {};
    clients: {};
    newUpdates: boolean;
    streaming: {};
    deepExtend: (...xs: any[]) => any;
    isNode: boolean;
    keys: {
        (o: object): string[];
        (o: {}): string[];
    };
    values: (x: any) => any[];
    extend: (...args: any[]) => any;
    clone: (x: any) => any;
    flatten: (x: any, out?: any[]) => any[];
    unique: (x: any) => any[];
    indexBy: (x: any, k: any, out?: {}) => {};
    sortBy: (array: any, key: any, descending?: boolean, direction?: number) => any;
    sortBy2: (array: any, key1: any, key2: any, descending?: boolean, direction?: number) => any;
    groupBy: (x: any, k: any, out?: {}) => {};
    aggregate: typeof functions.aggregate;
    uuid: (a?: any) => string;
    unCamelCase: (s: string) => string;
    precisionFromString: typeof functions.precisionFromString;
    capitalize: (s: string) => string;
    now: () => number;
    buildOHLCVC: (trades: any, timeframe?: string, since?: number, limit?: number) => any[];
    decimalToPrecision: (x: any, roundingMode: any, numPrecisionDigits: any, countingMode?: number, paddingMode?: number) => any;
    safeValue: (o: object, k: string | number, $default?: any) => any;
    safeValue2: (o: object, k1: string | number, k2: string | number, $default?: any) => any;
    safeString: (o: object, k: string | number, $default?: string) => string;
    safeString2: (o: object, k1: string | number, k2: string | number, $default?: string) => string;
    safeFloat: (o: object, k: string | number, $default?: number) => number;
    safeFloat2: (o: object, k1: string | number, k2: string | number, $default?: number) => number;
    seconds: () => number;
    milliseconds: () => number;
    binaryToBase16: (binary: any) => any;
    numberToBE: (n: any, padding?: any) => any;
    base16ToBinary: (string: any) => any;
    stringToBinary: (string: any) => any;
    iso8601: (timestamp: any) => string;
    omit: (x: any, ...args: any[]) => any;
    isJsonEncodedObject: (object: any) => boolean;
    safeInteger: (o: object, k: string | number, $default?: number) => number;
    sum: (...xs: any[]) => any;
    omitZero: typeof functions.omitZero;
    implodeParams: (string: any, params: any) => any;
    extractParams: (string: any) => any[];
    json: (data: any, params?: any) => string;
    vwap: typeof functions.vwap;
    merge: (target: any, ...args: any[]) => any;
    binaryConcat: (...args: any[]) => any;
    hash: (request: any, hash?: string, digest?: string) => any;
    ecdsa: typeof functions.ecdsa;
    totp: (secret: any) => string;
    arrayConcat: (a: any, b: any) => any;
    encode: (x: any) => any;
    urlencode: (object: any) => string;
    hmac: (request: any, secret: any, hash?: string, digest?: string) => any;
    numberToString: typeof functions.numberToString;
    parseTimeframe: (timeframe: any) => number;
    safeInteger2: (o: object, k1: string | number, k2: string | number, $default?: number) => number;
    safeStringLower: (o: object, k: string | number, $default?: string) => string;
    parse8601: (x: any) => number;
    yyyymmdd: (timestamp: any, infix?: string) => string;
    safeStringUpper: (o: object, k: string | number, $default?: string) => string;
    safeTimestamp: (o: object, k: string | number, $default?: number) => number;
    binaryConcatArray: (arr: any) => any;
    uuidv1: () => string;
    numberToLE: (n: any, padding: any) => any;
    ymdhms: (timestamp: any, infix?: string) => string;
    yymmdd: (timestamp: any, infix?: string) => string;
    stringToBase64: (string: any) => any;
    decode: (x: any) => any;
    uuid22: (a?: any) => string;
    safeIntegerProduct2: (o: object, k1: string | number, k2: string | number, $factor: number, $default?: number) => number;
    safeIntegerProduct: (o: object, k: string | number, $factor: number, $default?: number) => number;
    base58ToBinary: (string: any) => any;
    base64ToBinary: (string: any) => any;
    eddsa: typeof functions.eddsa;
    safeTimestamp2: (o: object, k1: string | number, k2: string | number, $default?: any) => number;
    rawencode: (object: any) => string;
    keysort: (x: any, out?: {}) => {};
    inArray: (needle: any, haystack: any) => any;
    safeStringLower2: (o: object, k1: string | number, k2: string | number, $default?: string) => string;
    safeStringUpper2: (o: object, k1: string | number, k2: string | number, $default?: string) => string;
    isEmpty: (object: any) => boolean;
    ordered: (x: any) => any;
    jwt: typeof functions.jwt;
    filterBy: (x: any, k: any, value?: any, out?: any[]) => any[];
    uuid16: (a?: any) => string;
    urlencodeWithArrayRepeat: (object: any) => string;
    microseconds: () => number;
    binaryToBase64: (binary: any) => any;
    rsa: typeof functions.rsa;
    strip: (s: string) => string;
    toArray: (object: any) => unknown[];
    safeFloatN: (o: object, k: (string | number)[], $default?: number) => number;
    safeIntegerN: (o: object, k: (string | number)[], $default?: number) => number;
    safeIntegerProductN: (o: object, k: (string | number)[], $factor: number, $default?: number) => number;
    safeTimestampN: (o: object, k: (string | number)[], $default?: number) => number;
    safeValueN: (o: object, k: (string | number)[], $default?: any) => any;
    safeStringN: (o: object, k: (string | number)[], $default?: string) => string;
    safeStringLowerN: (o: object, k: (string | number)[], $default?: string) => string;
    safeStringUpperN: (o: object, k: (string | number)[], $default?: string) => string;
    urlencodeNested: (object: any) => string;
    parseDate: (x: any) => number;
    ymd: (timestamp: any, infix: any, fullYear?: boolean) => string;
    isArray: (arg: any) => arg is any[];
    base64ToString: (string: any) => any;
    crc32: typeof functions.crc32;
    inflate: typeof inflate;
    inflate64: typeof inflate64;
    gunzip: typeof gunzip;
    describe(): {
        id: any;
        name: any;
        countries: any;
        enableRateLimit: boolean;
        rateLimit: number;
        certified: boolean;
        pro: boolean;
        alias: boolean;
        has: {
            publicAPI: boolean;
            privateAPI: boolean;
            CORS: any;
            spot: any;
            margin: any;
            swap: any;
            future: any;
            option: any;
            addMargin: any;
            cancelAllOrders: any;
            cancelOrder: boolean;
            cancelOrders: any;
            createDepositAddress: any;
            createLimitOrder: boolean;
            createMarketOrder: boolean;
            createOrder: boolean;
            createPostOnlyOrder: any;
            createReduceOnlyOrder: any;
            createStopOrder: any;
            createStopLimitOrder: any;
            createStopMarketOrder: any;
            editOrder: string;
            fetchAccounts: any;
            fetchBalance: boolean;
            fetchBidsAsks: any;
            fetchBorrowInterest: any;
            fetchBorrowRate: any;
            fetchBorrowRateHistory: any;
            fetchBorrowRatesPerSymbol: any;
            fetchBorrowRates: any;
            fetchCanceledOrders: any;
            fetchClosedOrder: any;
            fetchClosedOrders: any;
            fetchCurrencies: string;
            fetchDeposit: any;
            fetchDepositAddress: any;
            fetchDepositAddresses: any;
            fetchDepositAddressesByNetwork: any;
            fetchDeposits: any;
            fetchTransactionFee: any;
            fetchTransactionFees: any;
            fetchFundingHistory: any;
            fetchFundingRate: any;
            fetchFundingRateHistory: any;
            fetchFundingRates: any;
            fetchIndexOHLCV: any;
            fetchL2OrderBook: boolean;
            fetchLastPrices: any;
            fetchLedger: any;
            fetchLedgerEntry: any;
            fetchLeverageTiers: any;
            fetchMarketLeverageTiers: any;
            fetchMarkets: boolean;
            fetchMarkOHLCV: any;
            fetchMyTrades: any;
            fetchOHLCV: string;
            fetchOpenInterest: any;
            fetchOpenInterestHistory: any;
            fetchOpenOrder: any;
            fetchOpenOrders: any;
            fetchOrder: any;
            fetchOrderBook: boolean;
            fetchOrderBooks: any;
            fetchOrders: any;
            fetchOrderTrades: any;
            fetchPermissions: any;
            fetchPosition: any;
            fetchPositions: any;
            fetchPositionsRisk: any;
            fetchPremiumIndexOHLCV: any;
            fetchStatus: string;
            fetchTicker: boolean;
            fetchTickers: any;
            fetchTime: any;
            fetchTrades: boolean;
            fetchTradingFee: any;
            fetchTradingFees: any;
            fetchTradingLimits: any;
            fetchTransactions: any;
            fetchTransfers: any;
            fetchWithdrawAddresses: any;
            fetchWithdrawal: any;
            fetchWithdrawals: any;
            reduceMargin: any;
            setLeverage: any;
            setMargin: any;
            setMarginMode: any;
            setPositionMode: any;
            signIn: any;
            transfer: any;
            withdraw: any;
        };
        urls: {
            logo: any;
            api: any;
            www: any;
            doc: any;
            fees: any;
        };
        api: any;
        requiredCredentials: {
            apiKey: boolean;
            secret: boolean;
            uid: boolean;
            login: boolean;
            password: boolean;
            twofa: boolean;
            privateKey: boolean;
            walletAddress: boolean;
            token: boolean;
        };
        markets: any;
        currencies: {};
        timeframes: any;
        fees: {
            trading: {
                tierBased: any;
                percentage: any;
                taker: any;
                maker: any;
            };
            funding: {
                tierBased: any;
                percentage: any;
                withdraw: {};
                deposit: {};
            };
        };
        status: {
            status: string;
            updated: any;
            eta: any;
            url: any;
        };
        exceptions: any;
        httpExceptions: {
            '422': typeof ExchangeError;
            '418': typeof DDoSProtection;
            '429': typeof RateLimitExceeded;
            '404': typeof ExchangeNotAvailable;
            '409': typeof ExchangeNotAvailable;
            '410': typeof ExchangeNotAvailable;
            '451': typeof ExchangeNotAvailable;
            '500': typeof ExchangeNotAvailable;
            '501': typeof ExchangeNotAvailable;
            '502': typeof ExchangeNotAvailable;
            '520': typeof ExchangeNotAvailable;
            '521': typeof ExchangeNotAvailable;
            '522': typeof ExchangeNotAvailable;
            '525': typeof ExchangeNotAvailable;
            '526': typeof ExchangeNotAvailable;
            '400': typeof ExchangeNotAvailable;
            '403': typeof ExchangeNotAvailable;
            '405': typeof ExchangeNotAvailable;
            '503': typeof ExchangeNotAvailable;
            '530': typeof ExchangeNotAvailable;
            '408': typeof RequestTimeout;
            '504': typeof RequestTimeout;
            '401': typeof AuthenticationError;
            '407': typeof AuthenticationError;
            '511': typeof AuthenticationError;
        };
        commonCurrencies: {
            XBT: string;
            BCC: string;
            BCHABC: string;
            BCHSV: string;
        };
        precisionMode: number;
        paddingMode: number;
        limits: {
            leverage: {
                min: any;
                max: any;
            };
            amount: {
                min: any;
                max: any;
            };
            price: {
                min: any;
                max: any;
            };
            cost: {
                min: any;
                max: any;
            };
        };
    };
    constructor(userConfig?: {});
    encodeURIComponent(...args: any[]): string;
    checkRequiredVersion(requiredVersion: any, error?: boolean): boolean;
    checkAddress(address: any): any;
    initRestRateLimiter(): void;
    setSandboxMode(enabled: any): void;
    defineRestApiEndpoint(methodName: any, uppercaseMethod: any, lowercaseMethod: any, camelcaseMethod: any, path: any, paths: any, config?: {}): void;
    defineRestApi(api: any, methodName: any, paths?: any[]): void;
    log(...args: any[]): void;
    fetch(url: any, method?: string, headers?: any, body?: any): Promise<any>;
    parseJson(jsonString: any): any;
    getResponseHeaders(response: any): {};
    handleRestResponse(response: any, url: any, method?: string, requestHeaders?: any, requestBody?: any): any;
    onRestResponse(statusCode: any, statusText: any, url: any, method: any, responseHeaders: any, responseBody: any, requestHeaders: any, requestBody: any): any;
    onJsonResponse(responseBody: any): any;
    loadMarketsHelper(reload?: boolean, params?: {}): Promise<Market[]>;
    loadMarkets(reload?: boolean, params?: {}): any;
    fetchCurrencies(params?: {}): Promise<unknown>;
    fetchMarkets(params?: {}): Promise<Market[]>;
    filterBySinceLimit(array: object[], since?: number, limit?: number, key?: string | number, tail?: boolean): object[];
    filterByValueSinceLimit(array: object[], field: string | number, value?: string | number, since?: number, limit?: number, key?: string, tail?: boolean): object[];
    checkRequiredDependencies(): void;
    remove0xPrefix(hexData: string): string;
    hashMessage(message: string): string;
    signHash(hash: string, privateKey: string): {
        r: string;
        s: string;
        v: any;
    };
    signMessage(message: string, privateKey: string): {
        r: string;
        s: string;
        v: any;
    };
    signMessageString(message: string, privateKey: string): string;
    parseNumber(value: string | number, d?: number): number;
    checkOrderArguments(market: any, type: any, side: any, amount: any, price: any, params: any): void;
    handleHttpStatusCode(code: any, reason: any, url: any, method: any, body: any): void;
    sign(path: any, api: string | object, method?: string, params?: {}, headers?: any, body?: any): {};
    fetchAccounts(params?: {}): Promise<any>;
    fetchTrades(symbol: string, since?: number, limit?: number, params?: {}): Promise<Trade[]>;
    fetchDepositAddresses(codes?: any, params?: {}): Promise<any>;
    fetchOrderBook(symbol: any, limit?: number, params?: {}): Promise<OrderBook>;
    fetchTime(params?: {}): Promise<any>;
    fetchTradingLimits(symbols?: any, params?: {}): Promise<any>;
    parseTicker(ticker: object, market?: any): Ticker;
    parseDepositAddress(depositAddress: any, currency?: any): any;
    parseTrade(trade: object, market?: any): Trade;
    parseTransaction(transaction: any, currency?: any): any;
    parseTransfer(transfer: any, currency?: any): any;
    parseAccount(account: any): any;
    parseLedgerEntry(item: any, currency?: any): any;
    parseOrder(order: any, market?: any): Order;
    fetchBorrowRates(params?: {}): Promise<any>;
    parseMarketLeverageTiers(info: any, market: any): any;
    fetchLeverageTiers(symbols?: any, params?: {}): Promise<any>;
    parsePosition(position: any, market?: any): any;
    parseFundingRateHistory(info: any, market?: any): any;
    parseBorrowInterest(info: any, market?: any): any;
    fetchFundingRates(symbols?: any, params?: {}): Promise<any>;
    findTimeframe(timeframe: any, timeframes?: any): string;
    formatScientificNotationFTX(n: any): any;
    spawn(method: any, ...args: any[]): Promise<unknown>;
    delay(timeout: any, method: any, ...args: any[]): void;
    orderBook(snapshot?: {}, depth?: number): OrderBook;
    indexedOrderBook(snapshot?: {}, depth?: number): IndexedOrderBook;
    countedOrderBook(snapshot?: {}, depth?: number): CountedOrderBook;
    handleMessage(client: any, message: any): void;
    client(url: any): WsClient;
    watch(url: any, messageHash: any, message?: any, subscribeHash?: any, subscription?: any): any;
    onConnected(client: any, message?: any): void;
    onError(client: any, error: any): void;
    onClose(client: any, error: any): void;
    close(): Promise<void>;
    handleDelta(bookside: any, delta: any, nonce?: any): void;
    loadOrderBook(client: any, messageHash: any, symbol: any, limit?: any, params?: {}): Promise<void>;
    handleDeltas(orderbook: any, deltas: any, nonce?: any): void;
    getCacheIndex(orderbook: any, deltas: any): number;
    parseToInt(number: string | number): number;
    getDefaultOptions(): {
        defaultNetworkCodeReplacements: {
            ETH: {
                ERC20: string;
            };
            TRX: {
                TRC20: string;
            };
            CRO: {
                CRC20: string;
            };
        };
    };
    safeLedgerEntry(entry: object, currency?: string): {
        id: string;
        timestamp: number;
        datetime: string;
        direction: string;
        account: string;
        referenceId: string;
        referenceAccount: string;
        type: string;
        currency: any;
        amount: number;
        before: number;
        after: number;
        status: string;
        fee: any;
        info: object;
    };
    setMarkets(markets: any, currencies?: any): Market[];
    safeBalance(balance: object): object;
    safeOrder(order: object, market?: object): any;
    parseOrders(orders: object, market?: object, since?: number, limit?: number, params?: {}): Order[];
    calculateFee(symbol: string, type: string, side: string, amount: number, price: number, takerOrMaker?: string, params?: {}): {
        type: string;
        currency: any;
        rate: number;
        cost: number;
    };
    safeTrade(trade: object, market?: object): Trade;
    reduceFeesByCurrency(fees: any): any[];
    safeTicker(ticker: object, market?: any): Ticker;
    fetchOHLCV(symbol: string, timeframe?: string, since?: number, limit?: number, params?: {}): Promise<OHLCV[]>;
    convertTradingViewToOHLCV(ohlcvs: any, timestamp?: string, open?: string, high?: string, low?: string, close?: string, volume?: string, ms?: boolean): any[];
    convertOHLCVToTradingView(ohlcvs: any, timestamp?: string, open?: string, high?: string, low?: string, close?: string, volume?: string, ms?: boolean): {};
    marketIds(symbols: any): any;
    marketSymbols(symbols: any): any;
    marketCodes(codes: any): any;
    parseBidsAsks(bidasks: any, priceKey?: number | string, amountKey?: number | string): any[];
    fetchL2OrderBook(symbol: string, limit?: number, params?: {}): Promise<any>;
    filterBySymbol(objects: any, symbol?: string): any;
    parseOHLCV(ohlcv: any, market?: any): any;
    getNetwork(network: string, code: string): string;
    networkCodeToId(networkCode: any, currencyCode?: any): string;
    networkIdToCode(networkId: any, currencyCode?: any): string;
    networkCodesToIds(networkCodes?: any): any[];
    handleNetworkCodeAndParams(params: any): any[];
    defaultNetworkCode(currencyCode: any): any;
    selectNetworkCodeFromUnifiedNetworks(currencyCode: any, networkCode: any, indexedNetworkEntries: any): any;
    selectNetworkIdFromRawNetworks(currencyCode: any, networkCode: any, indexedNetworkEntries: any): any;
    selectNetworkKeyFromNetworks(currencyCode: any, networkCode: any, indexedNetworkEntries: any, isIndexedByUnifiedNetworkCode?: boolean): any;
    safeNumber2(dictionary: any, key1: any, key2: any, d?: any): number;
    parseOrderBook(orderbook: object, symbol: string, timestamp?: number, bidsKey?: string, asksKey?: string, priceKey?: number | string, amountKey?: number | string): OrderBook;
    parseOHLCVs(ohlcvs: object[], market?: string, timeframe?: string, since?: number, limit?: number): OHLCV[];
    parseLeverageTiers(response: any, symbols?: any, marketIdKey?: any): {};
    loadTradingLimits(symbols?: any, reload?: boolean, params?: {}): Promise<Market[]>;
    parsePositions(positions: any, symbols?: any, params?: {}): any;
    parseAccounts(accounts: any, params?: {}): any[];
    parseTrades(trades: any, market?: object, since?: number, limit?: number, params?: {}): Trade[];
    parseTransactions(transactions: any, currency?: string, since?: number, limit?: number, params?: {}): object[];
    parseTransfers(transfers: any, currency?: string, since?: number, limit?: number, params?: {}): object[];
    parseLedger(data: any, currency?: string, since?: number, limit?: number, params?: {}): object[];
    nonce(): number;
    setHeaders(headers: any): any;
    marketId(symbol: string): string;
    symbol(symbol: string): string;
    resolvePath(path: any, params: any): any[];
    filterByArray(objects: any, key: string | number, values?: any, indexed?: boolean): any;
    fetch2(path: any, api?: string, method?: string, params?: {}, headers?: any, body?: any, config?: {}, context?: {}): Promise<any>;
    request(path: any, api?: string, method?: string, params?: {}, headers?: any, body?: any, config?: {}, context?: {}): Promise<any>;
    loadAccounts(reload?: boolean, params?: {}): Promise<any>;
    fetchOHLCVC(symbol: any, timeframe?: string, since?: any, limit?: any, params?: {}): Promise<any[]>;
    parseTradingViewOHLCV(ohlcvs: any, market?: any, timeframe?: string, since?: number, limit?: number): OHLCV[];
    editLimitBuyOrder(id: any, symbol: any, amount: any, price?: any, params?: {}): Promise<Order>;
    editLimitSellOrder(id: any, symbol: any, amount: any, price?: any, params?: {}): Promise<Order>;
    editLimitOrder(id: any, symbol: any, side: any, amount: any, price?: any, params?: {}): Promise<Order>;
    editOrder(id: any, symbol: any, type: any, side: any, amount: any, price?: any, params?: {}): Promise<Order>;
    fetchPermissions(params?: {}): Promise<void>;
    fetchPosition(symbol: any, params?: {}): Promise<any>;
    fetchPositions(symbols?: any, params?: {}): Promise<any>;
    fetchPositionsRisk(symbols?: any, params?: {}): Promise<void>;
    fetchBidsAsks(symbols?: any, params?: {}): Promise<void>;
    parseBidAsk(bidask: any, priceKey?: string | number, amountKey?: number | string): number[];
    safeCurrency(currencyId: string, currency?: string): any;
    safeMarket(marketId?: any, market?: any, delimiter?: any, marketType?: any): any;
    checkRequiredCredentials(error?: boolean): boolean;
    oath(): string;
    fetchBalance(params?: {}): Promise<any>;
    fetchPartialBalance(part: any, params?: {}): Promise<any>;
    fetchFreeBalance(params?: {}): Promise<any>;
    fetchUsedBalance(params?: {}): Promise<any>;
    fetchTotalBalance(params?: {}): Promise<any>;
    fetchStatus(params?: {}): Promise<any>;
    fetchFundingFee(code: string, params?: {}): Promise<any>;
    fetchFundingFees(codes?: any, params?: {}): Promise<any>;
    fetchTransactionFee(code: any, params?: {}): Promise<any>;
    fetchTransactionFees(codes?: any, params?: {}): Promise<any>;
    fetchDepositWithdrawFee(code: any, params?: {}): Promise<any>;
    getSupportedMapping(key: any, mapping?: {}): any;
    fetchBorrowRate(code: string, params?: {}): Promise<any>;
    handleOptionAndParams(params: any, methodName: any, optionName: any, defaultValue?: any): any[];
    handleOption(methodName: any, optionName: any, defaultValue?: any): any;
    handleMarketTypeAndParams(methodName: any, market?: any, params?: {}): any;
    handleSubTypeAndParams(methodName: any, market?: any, params?: {}, defaultValue?: any): any[];
    handleMarginModeAndParams(methodName: any, params?: {}, defaultValue?: any): any[];
    throwExactlyMatchedException(exact: any, string: any, message: any): void;
    throwBroadlyMatchedException(broad: any, string: any, message: any): void;
    findBroadlyMatchedKey(broad: any, string: any): string;
    handleErrors(statusCode: any, statusText: any, url: any, method: any, responseHeaders: any, responseBody: any, response: any, requestHeaders: any, requestBody: any): any;
    calculateRateLimiterCost(api: any, method: any, path: any, params: any, config?: {}, context?: {}): any;
    fetchTicker(symbol: string, params?: {}): Promise<Ticker>;
    fetchTickers(symbols?: any, params?: {}): Promise<any>;
    fetchOrder(id: string, symbol?: string, params?: {}): Promise<Order>;
    fetchOrderStatus(id: string, symbol?: any, params?: {}): Promise<any>;
    fetchUnifiedOrder(order: any, params?: {}): Promise<Order>;
    createOrder(symbol: any, type: any, side: any, amount: any, price?: any, params?: {}): Promise<Order>;
    cancelOrder(id: any, symbol?: any, params?: {}): Promise<any>;
    cancelUnifiedOrder(order: any, params?: {}): Promise<any>;
    fetchOrders(symbol?: any, since?: number, limit?: number, params?: {}): Promise<Order[]>;
    fetchOpenOrders(symbol?: any, since?: number, limit?: number, params?: {}): Promise<Order[]>;
    fetchClosedOrders(symbol?: any, since?: number, limit?: number, params?: {}): Promise<Order[]>;
    fetchMyTrades(symbol?: any, since?: number, limit?: number, params?: {}): Promise<Trade[]>;
    fetchTransactions(symbol?: any, since?: number, limit?: number, params?: {}): Promise<any>;
    fetchDeposits(symbol?: any, since?: number, limit?: number, params?: {}): Promise<any>;
    fetchWithdrawals(symbol?: any, since?: number, limit?: number, params?: {}): Promise<any>;
    parseLastPrice(price: any, market?: any): void;
    fetchDepositAddress(code: string, params?: {}): Promise<any>;
    account(): {
        free: any;
        used: any;
        total: any;
    };
    commonCurrencyCode(currency: string): string;
    currency(code: any): any;
    market(symbol: string): any;
    handleWithdrawTagAndParams(tag: any, params: any): any[];
    createLimitOrder(symbol: string, side: string, amount: any, price: any, params?: {}): Promise<Order>;
    createMarketOrder(symbol: string, side: string, amount: any, price?: any, params?: {}): Promise<Order>;
    createLimitBuyOrder(symbol: string, amount: any, price: any, params?: {}): Promise<Order>;
    createLimitSellOrder(symbol: string, amount: any, price: any, params?: {}): Promise<Order>;
    createMarketBuyOrder(symbol: string, amount: any, params?: {}): Promise<Order>;
    createMarketSellOrder(symbol: string, amount: any, params?: {}): Promise<Order>;
    costToPrecision(symbol: string, cost: any): any;
    priceToPrecision(symbol: string, price: number | string): string;
    amountToPrecision(symbol: string, amount: string | number): any;
    feeToPrecision(symbol: string, fee: string | number): any;
    currencyToPrecision(code: string, fee: string | number, networkCode?: any): any;
    safeNumber(obj: object, key: string | number, defaultNumber?: number): number;
    safeNumberN(object: object, arr: (string | number)[], defaultNumber?: number): number;
    parsePrecision(precision: string): string;
    loadTimeDifference(params?: {}): Promise<any>;
    implodeHostname(url: string): any;
    fetchMarketLeverageTiers(symbol: string, params?: {}): Promise<any>;
    createPostOnlyOrder(symbol: string, type: string, side: string, amount: any, price: any, params?: {}): Promise<Order>;
    createReduceOnlyOrder(symbol: string, type: string, side: string, amount: any, price: any, params?: {}): Promise<Order>;
    createStopOrder(symbol: string, type: string, side: string, amount: any, price?: any, stopPrice?: any, params?: {}): Promise<Order>;
    createStopLimitOrder(symbol: string, side: string, amount: any, price: any, stopPrice: any, params?: {}): Promise<Order>;
    createStopMarketOrder(symbol: string, side: string, amount: any, stopPrice: any, params?: {}): Promise<Order>;
    safeCurrencyCode(currencyId: string, currency?: string): any;
    filterBySymbolSinceLimit(array: any, symbol?: any, since?: number, limit?: number, tail?: boolean): object[];
    filterByCurrencySinceLimit(array: any, code?: any, since?: number, limit?: number, tail?: boolean): object[];
    parseLastPrices(pricesData: any, symbols?: any, params?: {}): any;
    parseTickers(tickers: any, symbols?: any, params?: {}): any;
    parseDepositAddresses(addresses: any, codes?: any, indexed?: boolean, params?: {}): any;
    parseBorrowInterests(response: any, market?: any): any[];
    parseFundingRateHistories(response: any, market?: any, since?: number, limit?: number): object[];
    safeSymbol(marketId: any, market?: any, delimiter?: any, marketType?: any): any;
    parseFundingRate(contract: string, market?: any): void;
    parseFundingRates(response: any, market?: any): {};
    isTriggerOrder(params: any): any[];
    isPostOnly(isMarketOrder: boolean, exchangeSpecificParam: any, params?: {}): boolean;
    fetchLastPrices(params?: {}): Promise<void>;
    fetchTradingFees(params?: {}): Promise<any>;
    fetchTradingFee(symbol: any, params?: {}): Promise<any>;
    parseOpenInterest(interest: any, market?: any): any;
    parseOpenInterests(response: any, market?: any, since?: number, limit?: number): object[];
    fetchFundingRate(symbol: any, params?: {}): Promise<any>;
    fetchMarkOHLCV(symbol: any, timeframe?: string, since?: number, limit?: number, params?: {}): Promise<OHLCV[]>;
    fetchIndexOHLCV(symbol: string, timeframe?: string, since?: number, limit?: number, params?: {}): Promise<OHLCV[]>;
    fetchPremiumIndexOHLCV(symbol: string, timeframe?: string, since?: number, limit?: number, params?: {}): Promise<OHLCV[]>;
    handleTimeInForce(params?: {}): string;
    convertTypeToAccount(account: any): any;
    checkRequiredArgument(methodName: any, argument: any, argumentName: any, options?: any[]): void;
    checkRequiredMarginArgument(methodName: string, symbol: string, marginMode: string): void;
    checkRequiredSymbol(methodName: string, symbol: string): void;
    parseDepositWithdrawFees(response: any, codes?: any, currencyIdKey?: any): {};
    depositWithdrawFee(info: any): {
        info: any;
        withdraw: {
            fee: any;
            percentage: any;
        };
        deposit: {
            fee: any;
            percentage: any;
        };
        networks: {};
    };
    assignDefaultDepositWithdrawFees(fee: any, currency?: any): any;
    parseIncome(info: any, market?: any): void;
    parseIncomes(incomes: any, market?: any, since?: any, limit?: any): object[];
    getMarketFromSymbols(symbols?: any): any;
}
export { Exchange, };
