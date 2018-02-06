/*
 * This file contains code that drives the text search and replacement.
 */

var searchDictionary = new Map();
searchDictionary.set('en', ['sell']);
searchDictionary.set('de', ['verkaufen']);
searchDictionary.set('es', ['vender']);
searchDictionary.set('fr', ['vendre']);
searchDictionary.set('it', ['vendi']);
searchDictionary.set('pt', ['vender','vende']);
searchDictionary.set('jp', ['売却','販']);
var regexObj, intervalRunning = false;

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        nodeTextReplace(mutation.addedNodes[i]);
      }
    }
  });
});

var nodeTextReplace = function (node) {
  
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode &&
        node.parentNode.nodeName !== 'TEXTAREA') {
          if(node.data.indexOf(savedOptions.options_replacement_word) == -1){
            node.data = node.data.replace(regexObj, savedOptions.options_replacement_word);
          }
    }
  }
  // keep digging
  if (node.nodeType == 1 && node.nodeName != "SCRIPT") {
    for (var i = 0; i < node.childNodes.length; i++) {
      nodeTextReplace(node.childNodes[i]);
    }
  }
}

var initInterval = function(){
  
  if (intervalRunning == false) {
    invokeTimeout();
    intervalRunning = true;
  }
}
var invokeTimeout = function(){
  if(savedOptions.options_activation_on_interval){
    nodeTextReplace(document.body);
    setTimeout(invokeTimeout, savedOptions.options_activation_interval_time * 1000);
  }else{
    intervalRunning = false;
  }
}


var preinit = function(){
  loadOptions().then(function() {
    if(savedOptions.options_activation_delay == true){ 
      setTimeout(init(), savedOptions.options_activation_delay_time * 1000);
    }else{
      init();
    }
  });
}

var init = function(){
  // build regex obj

  // var filterReduce = searchDictionary.get(savedOptions.options_locale).reduce(function(filtered, option) {
  //   if (savedOptions.options_replacement_word.indexOf(option) == -1) {
  //      filtered.push(option);
  //   }
  //   return filtered;
  // }, []);
  // searchDictionary.get(savedOptions.options_locale)
  
  if (savedOptions.options_enabled == false){
    observer.disconnect();
    return;
  }
  regexObj = new RegExp((savedOptions.options_match_custom_word == true ? savedOptions.options_matching_words.split(',') : searchDictionary.get(savedOptions.options_locale)).join('|'),"ig");

  if (savedOptions.options_activation_on_pageload == true){
     nodeTextReplace(document.body);
  } 
  if (savedOptions.options_activation_on_interval == true){
    initInterval();
  }
  
  if (savedOptions.options_activation_on_change == true){
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }else{
    observer.disconnect();
  }
}

  if( document.readyState !== "loading") {
      preinit();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      preinit();
    });
  }

chrome.storage.onChanged.addListener(function(changes, namespace) {
  preinit();
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.message == "marco")
          sendResponse({message: "polo"});
});