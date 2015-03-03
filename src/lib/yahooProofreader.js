/**
 * Parse response xml of yahoo proofread api.
 * @param {Object} responseXml target xml fetched from yahoo proofread api
 * @return {Array} Array of parsedItems
 */

let parseResult = (responseXML) => {
  let results = responseXML.getElementsByTagName('Result');
  let parsedArray = [];
  for (let i = 0; i < results.length; i++) {
    let parsedItem = {};
    for (let node of results[i].childNodes) {
      parsedItem[node.nodeName] = node.textContent;
    }
    parsedArray.push(parsedItem);
  }
  return parsedArray;
};


/**
 * Fetch proofreadind xml of target sentence
 * @param {String} appId appId for yahoo api
 * @param {String} sentence target text
 * @return {Promise} return [ProofreadItem] 
 *
 * @see {@link http://developer.yahoo.co.jp/webapi/jlp/kousei/v1/kousei.html}
 */
let fetchProofread = (() => {
  const API_BASE_URL = 'https://jlp.yahooapis.jp/KouseiService/V1/kousei';
  return (appId, sentence) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', API_BASE_URL);
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }
        if (xhr.status === 0) {
          let error = new Error('XMLHttpRequest connection error');
          return reject(error);
        }
        if ((xhr.status < 200 || 300 <= xhr.status) && xhr.status !== 304) {
          let error = new Error('RequestError: ' + xhr.status);
          return reject(error);
        }
        // request success
        try {
          return resolve(parseResult(xhr.responseXML));
        } catch (error) {
          return reject(error);
        }
      };
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(
        'appId=' + appId + '&sentence=' + encodeURIComponent(sentence)
      );
    });
  };
}());

/**
 * For proofreading using yahoo api.
 * @class
 */
class YahooProofreader {

  /**
   * @constructor
   * @param {String} appId appId for yahoo api
   */
  constructor(appId) {
    if (!appId) {
      throw new Error('appId is required');
    }
    this.appId = appId;
  }

  /**
   * proofread fire
   * @param {String} sentence target text
   */
  proofread(sentence) {
    if (!sentence) {
      throw new Error('sentence is required');
    }
    return fetchProofread(sentence);
  }
}

module.exports = YahooProofreader;
