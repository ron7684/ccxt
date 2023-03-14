import { Exchange } from './base/Exchange.js';
export default class kucoin extends Exchange {
    describe(): any;
    nonce(): number;
    fetchTime(params?: {}): Promise<number>;
    fetchStatus(params?: {}): Promise<{
        status: string;
        updated: any;
        eta: any;
        url: any;
        info: any;
    }>;
    fetchMarkets(params?: {}): Promise<any[]>;
    fetchCurrencies(params?: {}): Promise<{}>;
    fetchAccounts(params?: {}): Promise<any[]>;
    fetchTransactionFee(code: any, params?: {}): Promise<{
        info: any;
        withdraw: {};
        deposit: {};
    }>;
    fetchDepositWithdrawFee(code: any, params?: {}): Promise<any>;
    parseDepositWithdrawFee(fee: any, currency?: any): any;
    isFuturesMethod(methodName: any, params: any): boolean;
    parseTicker(ticker: any, market?: any): import("./base/types.js").Ticker;
    fetchTickers(symbols?: any, params?: {}): Promise<any>;
    fetchTicker(symbol: any, params?: {}): Promise<import("./base/types.js").Ticker>;
    parseOHLCV(ohlcv: any, market?: any): number[];
    fetchOHLCV(symbol: any, timeframe?: string, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").OHLCV[]>;
    createDepositAddress(code: any, params?: {}): Promise<{
        info: any;
        currency: any;
        network: string;
        address: string;
        tag: string;
    }>;
    fetchDepositAddress(code: any, params?: {}): Promise<{
        info: any;
        currency: any;
        address: string;
        tag: string;
        network: string;
    }>;
    parseDepositAddress(depositAddress: any, currency?: any): {
        info: any;
        currency: any;
        address: string;
        tag: string;
        network: string;
    };
    fetchDepositAddressesByNetwork(code: any, params?: {}): Promise<any[]>;
    parseDepositAddressesByNetwork(depositAddresses: any, currency?: any): any[];
    fetchOrderBook(symbol: any, limit?: any, params?: {}): Promise<import("./base/ws/OrderBook.js").OrderBook>;
    createOrder(symbol: any, type: any, side: any, amount: any, price?: any, params?: {}): Promise<any>;
    cancelOrder(id: any, symbol?: any, params?: {}): Promise<any>;
    cancelAllOrders(symbol?: any, params?: {}): Promise<any>;
    fetchOrdersByStatus(status: any, symbol?: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Order[]>;
    fetchClosedOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Order[]>;
    fetchOpenOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Order[]>;
    fetchOrder(id: any, symbol?: any, params?: {}): Promise<any>;
    parseOrder(order: any, market?: any): any;
    fetchOrderTrades(id: any, symbol?: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchMyTrades(symbol?: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchTrades(symbol: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    parseTrade(trade: any, market?: any): import("./base/types.js").Trade;
    fetchTradingFee(symbol: any, params?: {}): Promise<{
        info: any;
        symbol: any;
        maker: number;
        taker: number;
        percentage: boolean;
        tierBased: boolean;
    }>;
    withdraw(code: any, amount: any, address: any, tag?: any, params?: {}): Promise<{
        info: any;
        id: string;
        timestamp: number;
        datetime: string;
        network: string;
        address: string;
        addressTo: string;
        addressFrom: any;
        tag: string;
        tagTo: string;
        tagFrom: any;
        currency: any;
        amount: number;
        txid: string;
        type: string;
        status: string;
        comment: string;
        fee: any;
        updated: number;
    }>;
    parseTransactionStatus(status: any): string;
    parseTransaction(transaction: any, currency?: any): {
        info: any;
        id: string;
        timestamp: number;
        datetime: string;
        network: string;
        address: string;
        addressTo: string;
        addressFrom: any;
        tag: string;
        tagTo: string;
        tagFrom: any;
        currency: any;
        amount: number;
        txid: string;
        type: string;
        status: string;
        comment: string;
        fee: any;
        updated: number;
    };
    fetchDeposits(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchWithdrawals(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    parseBalanceHelper(entry: any): {
        free: any;
        used: any;
        total: any;
    };
    fetchBalance(params?: {}): Promise<object>;
    transfer(code: any, amount: any, fromAccount: any, toAccount: any, params?: {}): Promise<{
        id: string;
        currency: any;
        timestamp: number;
        datetime: string;
        amount: number;
        fromAccount: string;
        toAccount: string;
        status: string;
        info: any;
    }>;
    parseTransfer(transfer: any, currency?: any): {
        id: string;
        currency: any;
        timestamp: number;
        datetime: string;
        amount: number;
        fromAccount: string;
        toAccount: string;
        status: string;
        info: any;
    };
    parseTransferStatus(status: any): string;
    parseLedgerEntryType(type: any): string;
    parseLedgerEntry(item: any, currency?: any): {
        id: string;
        direction: string;
        account: string;
        referenceId: any;
        referenceAccount: string;
        type: string;
        currency: any;
        amount: number;
        timestamp: number;
        datetime: string;
        before: any;
        after: any;
        status: any;
        fee: any;
        info: any;
    };
    fetchLedger(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    calculateRateLimiterCost(api: any, method: any, path: any, params: any, config?: {}, context?: {}): any;
    fetchBorrowRateHistory(code: any, since?: any, limit?: any, params?: {}): Promise<any>;
    parseBorrowRateHistory(response: any, code: any, since: any, limit: any): object[];
    parseBorrowRate(info: any, currency?: any): {
        currency: any;
        rate: number;
        period: number;
        timestamp: string;
        datetime: string;
        info: any;
    };
    fetchBorrowInterest(code?: any, symbol?: any, since?: any, limit?: any, params?: {}): Promise<any[]>;
    parseBorrowInterest(info: any, market?: any): {
        symbol: string;
        marginMode: string;
        currency: any;
        interest: any;
        interestRate: number;
        amountBorrowed: any;
        timestamp: number;
        datetime: string;
        info: any;
    };
    borrowMargin(code: any, amount: any, symbol?: any, params?: {}): Promise<{
        id: string;
        currency: any;
        amount: number;
        symbol: any;
        timestamp: number;
        datetime: string;
        info: any;
    }>;
    repayMargin(code: any, amount: any, symbol?: any, params?: {}): Promise<{
        id: string;
        currency: any;
        amount: number;
        symbol: any;
        timestamp: number;
        datetime: string;
        info: any;
    }>;
    parseMarginLoan(info: any, currency?: any): {
        id: string;
        currency: any;
        amount: number;
        symbol: any;
        timestamp: number;
        datetime: string;
        info: any;
    };
    sign(path: any, api?: string, method?: string, params?: {}, headers?: any, body?: any): {
        url: any;
        method: string;
        body: any;
        headers: any;
    };
    handleErrors(code: any, reason: any, url: any, method: any, headers: any, body: any, response: any, requestHeaders: any, requestBody: any): void;
}
