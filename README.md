
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/primeng.svg)](https://badge.fury.io/js/primeng)
[![Build Status](https://travis-ci.org/primefaces/primeng.svg?branch=master)](https://travis-ci.org/primefaces/primeng)

[![PrimeNG Hero](https://www.primefaces.org/wp-content/uploads/2020/08/primeng-release-x-fix-2.jpg)](https://www.primefaces.org/primeng)

# PrimeNG
PrimeNG is a rich set of open source native Angular UI components. Visit the [PrimeNG Website](https://www.primefaces.org/primeng/) for general information, demos and documentation.

## Download
PrimeNG is available at npm, if you have an existing application run the following command to download it to your project.
```
npm install primeng --save
npm install primeicons --save
```
## Load Configuration
PrimeNG is distributed in commonjs format, a module manager of your choice is required and this guide provides samples for SystemJS, WebPack and Angular CLI.

## Import
UI components are configured as modules, once PrimeNG is downloaded and configured, modules and apis can be imported from primeng/{module} shorthand in your application code. Documentation of each component states the import path.

```
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                  //api
```
## Styles
The css dependencies are as follows, Prime Icons, theme of your choice and structural css of components.
```
node_modules/primeicons/primeicons.css
node_modules/primeng/resources/themes/saga-blue/theme.css
node_modules/primeng/resources/primeng.min.css
```
Configure required styles at the styles section, example below uses the Saga Blue theme.
```
"styles": [
  "node_modules/primeng/resources/themes/saga-blue/theme.css",
  "node_modules/primeng/resources/primeng.min.css",
  "node_modules/primeicons/primeicons.css",
  //...
],
```
## Dependencies
Majority of PrimeNG components (95%) are native and there are some exceptions having 3rd party dependencies. In addition, components require PrimeIcons for icons.
Add PrimeNG and PrimeIcons as dependencies.
```
"dependencies": {
    //...
    "primeng": "^10.0.0",
    "primeicons": "^4.0.0"
},
```

## Quick Start
That is all, you may now import PrimeNG components, for a working example visit the [PrimeNG CLI QuickStart sample](https://github.com/primefaces/primeng-quickstart-cli) at GitHub.
