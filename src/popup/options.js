/*
 * This file contains code responsible for the options popup
 */
var domainsChanged = false;
var saveOptions = function() {
  savedOptions.options_locale = document.getElementById('options_locale').value;
  savedOptions.options_replacement_word = document.getElementById('options_replacement_word').value;
  savedOptions.options_matching_words = document.getElementById('options_matching_words').value;
  savedOptions.options_activation_interval_time = document.getElementById('options_activation_interval_time').value;
  savedOptions.options_activation_delay_time = document.getElementById('options_activation_delay_time').value;
  savedOptions.options_activation_on_pageload = document.getElementById('options_activation_on_pageload').checked;
  savedOptions.options_activation_on_interval = document.getElementById('options_activation_on_interval').checked;
  savedOptions.options_activation_on_change = document.getElementById('options_activation_on_change').checked;
  savedOptions.options_activation_delay = document.getElementById('options_activation_delay').checked;
  savedOptions.options_match_custom_word = document.getElementById('options_match_custom_word').checked;  
  
  if(domainsChanged){
    var matching_urls = document.getElementById('options_matching_urls').value.split("\n");
    // clean urls
    matching_urls = matching_urls.map(x => cleanUrl(x.replace(/\s/g, ""), true));
    // remove empty strings from matching array
    matching_urls = matching_urls.filter(function (item) {
      return item !== '';
    });
    savedOptions.matching_urls = matching_urls;
    // update element so user can see any changes before closing the popup
    document.getElementById('options_matching_urls').value = savedOptions.matching_urls.join("\n");
    domainsChanged = false;
  }
  savedOptions.options_enabled = document.getElementById('options_enabled').checked;
  chrome.storage.local.set(savedOptions, function() {
  });
}

var restoreOptions = function() {
  document.getElementById('options_locale').value = savedOptions.options_locale;
  document.getElementById('options_matching_words').value = savedOptions.options_matching_words;
  document.getElementById('options_replacement_word').value = savedOptions.options_replacement_word;
  document.getElementById('options_activation_interval_time').value = savedOptions.options_activation_interval_time;
  document.getElementById('options_activation_delay_time').value = savedOptions.options_activation_delay_time;
  document.getElementById('options_activation_on_pageload').checked = savedOptions.options_activation_on_pageload;
  document.getElementById('options_activation_on_interval').checked = savedOptions.options_activation_on_interval;
  document.getElementById('options_activation_on_change').checked = savedOptions.options_activation_on_change;
  document.getElementById('options_activation_delay').checked = savedOptions.options_activation_delay;
  document.getElementById('options_match_custom_word').checked = savedOptions.options_match_custom_word;
  document.getElementById('options_matching_urls').value = savedOptions.matching_urls.join("\n");
  document.getElementById('options_enabled').checked = savedOptions.options_enabled;
    
  var toggable_elements = document.getElementsByClassName("toggable_elements");
  for (var i = 0; i < toggable_elements.length; i++){
    document.getElementById(toggable_elements[i].dataset.hiddenElement).style.display = toggable_elements[i].checked ? "block" : "none";
  }
}

var resetOptions = function(){
  chrome.storage.local.set(default_options, function() {
    loadOptions().then(function() {
      restoreOptions();
    });
  });
}

document.addEventListener("DOMContentLoaded", function(){
loadOptions().then(function() {
  restoreOptions();
});})

var openDonationContainer = function(e){
  // hide other donation blocks
  var elements = document.getElementsByClassName("donate_address_container");
  for (var i = 0; i < elements.length; i++){
    elements[i].style.display = "none";
  } 
  // display block related to clicked one
  var donation_type = e.currentTarget.dataset.donationType;
  document.getElementById('donate_' + donation_type + '_container').style.display = "block";
};

var donation_buttons = document.getElementsByClassName("donate_button");
for (var i = 0; i < donation_buttons.length; i++) {
    donation_buttons[i].addEventListener('click', openDonationContainer, false);
}

document.getElementById('toggle_donate').addEventListener("click", function(){
  var div = document.getElementById('donate');
  div.style.display = div.style.display == "none" ? "block" : "none";
});

// toggle options
var toggle_radio_options = function(e){
  var hidden_element = e.currentTarget.dataset.hiddenElement;
  document.getElementById(hidden_element).style.display = this.checked ? "block" : "none";
}

var toggable_elements = document.getElementsByClassName("toggable_elements");
for (var i = 0; i < toggable_elements.length; i++){
  toggable_elements[i].addEventListener("change", toggle_radio_options)
}

var selectPanel = function(e){
  // change other panel link status
  var elements = document.getElementsByClassName("panelLink");
  for (var i = 0; i < elements.length; i++){
    elements[i].classList.remove("active");
  } 

  // hide all panels
  var elements = document.getElementsByClassName("panel");
  for (var i = 0; i < elements.length; i++){
    elements[i].style.display = "none";
  }

  // display selected panel block
  var panelTarget = e.currentTarget.dataset.panelTarget;
  document.getElementById(panelTarget).style.display = "block";

  // set panel link active
  e.currentTarget.classList.add("active");
};

var panel_links = document.getElementsByClassName("panelLink");
for (var i = 0; i < panel_links.length; i++) {
  panel_links[i].addEventListener('click', selectPanel, false);
}

// Add eventlisteners
document.getElementById('options_reset').addEventListener("click", resetOptions);
document.getElementById('options_locale').addEventListener("change", saveOptions);
document.getElementById('options_enabled').addEventListener("change", saveOptions);
document.getElementById('options_activation_interval_time').addEventListener("change", saveOptions);
document.getElementById('options_activation_on_pageload').addEventListener("change", saveOptions);
document.getElementById('options_activation_on_interval').addEventListener("change", saveOptions);
document.getElementById('options_replacement_word').addEventListener("change", saveOptions);
document.getElementById('options_matching_words').addEventListener("change", saveOptions);
document.getElementById('options_activation_on_change').addEventListener("change", saveOptions);
document.getElementById('options_activation_delay_time').addEventListener("change", saveOptions);
document.getElementById('options_activation_delay').addEventListener("change", saveOptions);
document.getElementById('options_match_custom_word').addEventListener("change", saveOptions);
document.getElementById('options_matching_urls').addEventListener("change", function(){
  domainsChanged = true;
  saveOptions();
});