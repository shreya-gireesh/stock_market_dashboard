import yfinance as yf
import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view


def fetch_market_data(indices):
    data = {}
    for name, ticker in indices.items():
        try:
            ticker_data = yf.Ticker(ticker)
            hist = ticker_data.history(period="5d")
            if not hist.empty:
                close_price = hist['Close'].values[-1]
                open_price = hist['Open'].values[0]
                change = close_price - open_price
                percent_change = (change / open_price) * 100
                data[name] = {
                    "close_price": close_price,
                    "change": change,
                    "percent_change": percent_change
                }
        except Exception as e:
            print(f"Error fetching data for {ticker}: {e}")
            data[name] = {
                "close_price": None,
                "change": None,
                "percent_change": None
            }

    return data


@api_view(['GET'])
def global_market_data(request):
    indices = {
        "GIFT_NIFTY": "^NSEI",
        "SP500": "^GSPC",
        "DOW_JONES": "^DJI",
        "NASDAQ": "^IXIC",
        "NIKKEI_225": "^N225",
        "HANG_SENG": "^HSI"
    }
    data = fetch_market_data(indices)
    return Response(data)


@api_view(['GET'])
def indian_market_data(request):
    indices = {
        "NIFTY50": "^NSEI",
        "NIFTYBANK": "^NSEBANK",
        "SENSEX": "^BSESN",
        "BANKEX": "BSE-BANK.BO",
        "FINNIFTY": "NIFTY_FIN_SERVICE.NS",
        "INDIAVIX": "^INDIAVIX",
        "SENSEX50": "SNSX50.BO",
        "NIFTY MID SELECT ":"NIFTY_MID_SELECT.NS",
        "NIFTY SMLCAP 50 ":"NIFTYSMLCAP50.NS",
        "NIFTY 100": "^CNX100",
        "NIFTY 500": "^CRSLDX",
        "NIFTY METAL": "^CNXMETAL"
    }
    data = fetch_market_data(indices)
    return Response(data)


@api_view(['GET'])
def top_indian_companies_data(request):
    companies = {
        "RELIANCE": "RELIANCE.NS",
        "TCS": "TCS.NS",
        "HDFCBANK": "HDFCBANK.NS",
        "INFY": "INFY.NS",
        "HINDUNILVR": "HINDUNILVR.NS",
        "ICICIBANK": "ICICIBANK.NS",
        "SBI": "SBIN.NS",
        "KOTAKBANK": "KOTAKBANK.NS",
        "BHARTIARTL": "BHARTIARTL.NS",
        "BAJAJFINANCE": "BAJFINANCE.NS"
    }
    data = fetch_market_data(companies)
    return Response(data)




