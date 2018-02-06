# HODL
Firefox and Chrome webextension to remind you to HODL your crypto assets.
The extension searches for and replaces text elements in pages of your choice.

There is an initial list of domains included, but you can remove them by changing the settings in the action popup.

You can also customize the search array as well as the replacement word.

# Download
The extension can be directly installed for Firefox and Chrome.

Firefox
https://addons.mozilla.org/en-US/firefox/addon/cryptohodl/

Chrome
https://chrome.google.com/webstore/detail/hodl/ebaheanlhpmofjcjomhagadpagdnidoj

Or you can load the extension unpacked.

# Permissions
 We only require permissions to access the tabs, local storage for preferences, and urls. There might be some crossover, and I will potentially remove some uneeded permissions in the future.

# Dependencies
    uglifyjs-folder
	clean-css-cli

### Building
A very simple npm script is used to build the extension for Firefox and Chrome. The script copies the appropriate files, appends the common scripts to popup, background, and content scripts, and lastly minifies.

```sh
$ npm run package:chrome
$ npm run package:firefox
```

Running the scripts will spit out two folders (dist_chrome, dist_firefox) that can be installed unpacked.

### Development
Want to help? Please do. This was built in a rush so I expect bugs.


### Todos
 - Add tests
 - Add schedule mode
 - Advanced domain matching (subdomain/directory matching)