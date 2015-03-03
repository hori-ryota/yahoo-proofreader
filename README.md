yahoo-proofreader
================================

Proofreading using yahoo api.

## Warning

JSONP Unsupported

## Usage

```javascript
var YahooProofreader = require('yahoo-proofreader');
var yahooProofreader = new YahooProofreader('YOUR_YAHOO_APP_ID');
yahooProofreader
  .proofread('Target text to proofread')
  .then(function (result) {
    console.dir(result); // [ProofreadItem]
  });
```

## Install

```sh
npm install --save yahoo-proofreader
```

## Resources

* [テキスト解析:校正支援 - Yahoo!デベロッパーネットワーク](http://developer.yahoo.co.jp/webapi/jlp/kousei/v1/kousei.html)
