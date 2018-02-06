/*
* This file contains commonly used code in the extension
*/

var savedOptions = {};

const default_options = {"options_enabled":true,"matching_urls": ["coinbase.com",
"gdax.com","bittrex.com","binance.com",
"kraken.com", "gemini.com", "bitstamp.net",
"bitflyer.jp"], "options_replacement_word":"Hodl","options_matching_words":"sell","options_match_custom_word":false,"options_locale":"en", "options_activation_on_pageload": true, "options_activation_on_interval":true, "options_activation_interval_time": 5, "options_activation_on_change": false,"options_activation_delay":false, "options_activation_delay_time": 1};

function loadOptions(){
    return new Promise(function(resolve, reject) {
        chrome.storage.local.get(default_options, function(result) {
            savedOptions = result;
            resolve("Options loaded");
        });
    });
}

function cleanUrl(url, preserve_path) {
    var hostname = url;

    // working from left to right, we want to extract hostname but leave path intact
    // remove protocol
    if (url.indexOf("://") > -1) {
        hostname = url.split('//')[1];
    }

    // remove subdomain if www only, leave it alone if something else
    if (hostname.indexOf("www.") > -1){
        hostname = hostname.substr(hostname.indexOf("www") + 4);
    }

    
    if(!preserve_path){
        if(hostname.indexOf("/") > -1){
            hostname = hostname.split('/')[0];
        }
        if(hostname.indexOf("?") > -1){
            hostname = hostname.split('?')[0];
        }
    }

    // remove trailing slash
    if(hostname.substr(-1) === '/') {
        hostname = hostname.substr(0, hostname.length - 1);
    }

    return hostname;
}

function hasPath(url){
    return (url.indexOf("/") > -1 || url.indexOf("?") > -1);
}

function hasUrlMatch(url){
    var preserved = cleanUrl(url, true), cleaned = cleanUrl(url, false);
    for (var x = 0; x < savedOptions.matching_urls.length; x++){
        if ((hasPath(savedOptions.matching_urls[x]) ? preserved : cleaned).indexOf(savedOptions.matching_urls[x]) > -1){
            return true;
        }
    }
    return false;
}

