import { Exchange } from './base/Exchange.js';
export default class ascendex extends Exchange {
    describe(): any;
    getAccount(params?: {}): string;
    fetchCurrencies(params?: {}): Promise<{}>;
    fetchMarkets(params?: {}): Promise<any[]>;
    fetchTime(params?: {}): Promise<number>;
    fetchAccounts(params?: {}): Promise<{
        id: string;
        type: any;
        currency: any;
        info: any;
    }[]>;
    parseBalance(response: any): import("./base/types.js").Balances;
    parseMarginBalance(response: any): import("./base/types.js").Balances;
    parseSwapBalance(response: any): import("./base/types.js").Balances;
    fetchBalance(params?: {}): Promise<import("./base/types.js").Balances>;
    fetchOrderBook(symbol: any, limit?: any, params?: {}): Promise<import("./base/types.js").OrderBook>;
    parseTicker(ticker: any, market?: any): import("./base/types.js").Ticker;
    fetchTicker(symbol: any, params?: {}): Promise<import("./base/types.js").Ticker>;
    fetchTickers(symbols?: any, params?: {}): Promise<any>;
    parseOHLCV(ohlcv: any, market?: any): number[];
    fetchOHLCV(symbol: any, timeframe?: string, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").OHLCV[]>;
    parseTrade(trade: any, market?: any): import("./base/types.js").Trade;
    fetchTrades(symbol: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    parseOrderStatus(status: any): string;
    parseOrder(order: any, market?: any): any;
    fetchTradingFees(params?: {}): Promise<{}>;
    createOrder(symbol: any, type: any, side: any, amount: any, price?: any, params?: {}): Promise<any>;
    fetchOrder(id: any, symbol?: any, params?: {}): Promise<any>;
    fetchOpenOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<any>;
    fetchClosedOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Order[]>;
    cancelOrder(id: any, symbol?: any, params?: {}): Promise<any>;
    cancelAllOrders(symbol?: any, params?: {}): Promise<any>;
    parseDepositAddress(depositAddress: any, currency?: any): {
        currency: any;
        address: string;
        tag: string;
        network: string;
        info: any;
    };
    safeNetwork(networkId: any): string;
    fetchDepositAddress(code: any, params?: {}): Promise<any>;
    fetchDeposits(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchWithdrawals(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchTransactions(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    parseTransactionStatus(status: any): string;
    parseTransaction(transaction: any, currency?: any): {
        info: any;
        id: string;
        txid: string;
        type: string;
        currency: any;
        network: any;
        amount: number;
        status: string;
        timestamp: number;
        datetime: string;
        address: string;
        addressFrom: any;
        addressTo: string;
        tag: string;
        tagFrom: any;
        tagTo: string;
        updated: any;
        comment: any;
        fee: {
            currency: any;
            cost: number;
            rate: any;
        };
    };
    fetchPositions(symbols?: any, params?: {}): Promise<any>;
    parsePosition(position: any, market?: any): {
        info: any;
        id: any;
        symbol: any;
        notional: number;
        marginMode: string;
        liquidationPrice: any;
        entryPrice: number;
        unrealizedPnl: number;
        percentage: any;
        contracts: number;
        contractSize: number;
        markPrice: number;
        side: string;
        hedged: any;
        timestamp: any;
        datetime: any;
        maintenanceMargin: any;
        maintenanceMarginPercentage: any;
        collateral: any;
        initialMargin: any;
        initialMarginPercentage: any;
        leverage: number;
        marginRatio: any;
    };
    parseFundingRate(contract: any, market?: any): {
        info: any;
        symbol: any;
        markPrice: number;
        indexPrice: number;
        interestRate: number;
        estimatedSettlePrice: any;
        timestamp: number;
        datetime: string;
        previousFundingRate: any;
        nextFundingRate: any;
        previousFundingTimestamp: any;
        nextFundingTimestamp: any;
        previousFundingDatetime: any;
        nextFundingDatetime: any;
        fundingRate: number;
        fundingTimestamp: number;
        fundingDatetime: string;
    };
    fetchFundingRates(symbols?: any, params?: {}): Promise<any>;
    modifyMarginHelper(symbol: any, amount: any, type: any, params?: {}): Promise<any>;
    parseMarginModification(data: any, market?: any): {
        info: any;
        type: any;
        amount: any;
        code: any;
        symbol: any;
        status: string;
    };
    reduceMargin(symbol: any, amount: any, params?: {}): Promise<any>;
    addMargin(symbol: any, amount: any, params?: {}): Promise<any>;
    setLeverage(leverage: any, symbol?: any, params?: {}): Promise<any>;
    setMarginMode(marginMode: any, symbol?: any, params?: {}): Promise<any>;
    fetchLeverageTiers(symbols?: any, params?: {}): Promise<{}>;
    parseMarketLeverageTiers(info: any, market?: any): any[];
    transfer(code: any, amount: any, fromAccount: any, toAccount: any, params?: {}): Promise<{
        info: any;
        id: any;
        timestamp: number;
        datetime: string;
        currency: any;
        amount: any;
        fromAccount: any;
        toAccount: any;
        status: string;
    }>;
    parseTransfer(transfer: any, currency?: any): {
        info: any;
        id: any;
        timestamp: number;
        datetime: string;
        currency: any;
        amount: any;
        fromAccount: any;
        toAccount: any;
        status: string;
    };
    parseTransferStatus(status: any): "ok" | "failed";
    sign(path: any, api?: string, method?: string, params?: {}, headers?: any, body?: any): {
        url: string;
        method: string;
        body: any;
        headers: any;
    };
    handleErrors(httpCode: any, reason: any, url: any, method: any, headers: any, body: any, response: any, requestHeaders: any, requestBody: any): void;
}
