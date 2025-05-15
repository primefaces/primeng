import { Code, ExtFile, RouteFile } from '@/domain/code';
import { services } from './services';

export interface Props {
    code?: Code;
    title?: string;
    description?: string;
    service?: string[];
    extFiles?: ExtFile[];
    routeFiles?: RouteFile[];
    selector?: string;
}
const version = require('package.json').version;

const dependencies = {
    '@angular/animations': '^19.0.1',
    '@angular/cdk': '~19.0.1',
    '@angular/cli': '^19.2.1',
    '@angular/common': '^19.0.1',
    '@angular/compiler': '^19.0.1',
    '@angular/core': '^19.0.1',
    '@angular/forms': '^19.0.1',
    '@angular/platform-browser': '^19.0.1',
    '@angular/platform-browser-dynamic': '^19.0.1',
    '@angular/router': '^19.0.1',
    '@primeng/themes': `${version}`,
    '@types/jasmine': '4.3.1',
    '@types/node': '12.20.55',
    'chart.js': '^3.3.2',
    primeicons: '7.0.0',
    primeng: `${version}`,
    quill: '1.3.7',
    rxjs: '~7.8.1',
    tslib: '^2.5.0',
    'tailwindcss-primeui': '^0.5.1',
    'zone.js': '~0.15.0'
};

const devDependencies = {
    '@angular-devkit/build-angular': '^19.0.2',
    '@angular/cli': '^19.0.1',
    '@angular/compiler-cli': '^19.0.1',
    '@angular/language-service': '~16.2.0',
    '@types/jasmine': '~4.3.1',
    '@types/node': '^16.18.67',
    codelyzer: '^0.0.28',
    'jasmine-core': '~4.6.0',
    karma: '~6.4.2',
    'karma-chrome-launcher': '~3.2.0',
    'karma-coverage': '~2.2.0',
    'karma-jasmine': '~5.1.0',
    'karma-jasmine-html-reporter': '~2.0.0',
    'ts-node': '~8.3.0',
    typescript: '~5.5.4',
    tailwindcss: '^3.4.17',
    autoprefixer: '^10.4.20',
    postcss: '^8.4.49'
};

const getServiceImports = (service: string[]) => {
    return service.map((s) => `import { ${s} } from '@/service/${s.toLowerCase()}';`).join('');
};

const getComponentName = (selector: string) => {
    return selector
        .split('-')
        .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
        .join('');
};

const getExternalFiles = (files: ExtFile[]) => {
    const extFiles = {};
    if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            extFiles[file.path] = { content: file.content };
        }
    }

    return extFiles;
};

const getRouteImports = (files: RouteFile[], selector?: string) => {
    let routeFiles = '';
    files.forEach((file) => {
        routeFiles += `import { ${file.name} } from 'src/app/demo/${file.name.toLowerCase()}';\n`;
    });

    return selector ? routeFiles + `import { ${getComponentName(selector)} } from 'src/app/demo/${selector}';` : routeFiles;
};

const staticStyles = {
    global: `@tailwind base;
@tailwind components;
@tailwind utilities;
@import "primeicons/primeicons.css";

:root {
  --body-bg: var(--p-surface-50);
  --body-text-color: var(--p-surface-900);
  --card-border: 1px solid var(--border-color);
  --card-bg: var(--p-surface-0);
  --border-color: var(--p-surface-200);
  --text-color: var(--p-surface-700);
  --overlay-background: #ffffff;
}

:root[class='p-dark'] {
  --body-bg: var(--p-surface-950);
  --body-text-color: var(--p-surface-50);
  --card-border: 1px solid transparent;
  --card-bg: var(--p-surface-900);
  --border-color: rgba(255, 255, 255, 0.1);
  --text-color: var(--p-surface-0);
  --overlay-background: var(--p-surface-900);
}

html {
  font-size: 14px;
}

body {
  margin: 0px;
  min-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--body-bg);
  font-weight: normal;
  color: var(--body-text-color);
  padding: 1rem;
}

.card {
  background: var(--card-bg);
  border: var(--card-border);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
    `,
    flags: `span.flag{width:44px;height:30px;display:inline-block;}img.flag{width:30px}.flag{background:url(https://primefaces.org/cdn/primeng/images/flag/flags_responsive.png) no-repeat;background-size:100%;vertical-align: middle;}.flag-ad{background-position:0 .413223%}.flag-ae{background-position:0 .826446%}.flag-af{background-position:0 1.239669%}.flag-ag{background-position:0 1.652893%}.flag-ai{background-position:0 2.066116%}.flag-al{background-position:0 2.479339%}.flag-am{background-position:0 2.892562%}.flag-an{background-position:0 3.305785%}.flag-ao{background-position:0 3.719008%}.flag-aq{background-position:0 4.132231%}.flag-ar{background-position:0 4.545455%}.flag-as{background-position:0 4.958678%}.flag-at{background-position:0 5.371901%}.flag-au{background-position:0 5.785124%}.flag-aw{background-position:0 6.198347%}.flag-az{background-position:0 6.61157%}.flag-ba{background-position:0 7.024793%}.flag-bb{background-position:0 7.438017%}.flag-bd{background-position:0 7.85124%}.flag-be{background-position:0 8.264463%}.flag-bf{background-position:0 8.677686%}.flag-bg{background-position:0 9.090909%}.flag-bh{background-position:0 9.504132%}.flag-bi{background-position:0 9.917355%}.flag-bj{background-position:0 10.330579%}.flag-bm{background-position:0 10.743802%}.flag-bn{background-position:0 11.157025%}.flag-bo{background-position:0 11.570248%}.flag-br{background-position:0 11.983471%}.flag-bs{background-position:0 12.396694%}.flag-bt{background-position:0 12.809917%}.flag-bv{background-position:0 13.22314%}.flag-bw{background-position:0 13.636364%}.flag-by{background-position:0 14.049587%}.flag-bz{background-position:0 14.46281%}.flag-ca{background-position:0 14.876033%}.flag-cc{background-position:0 15.289256%}.flag-cd{background-position:0 15.702479%}.flag-cf{background-position:0 16.115702%}.flag-cg{background-position:0 16.528926%}.flag-ch{background-position:0 16.942149%}.flag-ci{background-position:0 17.355372%}.flag-ck{background-position:0 17.768595%}.flag-cl{background-position:0 18.181818%}.flag-cm{background-position:0 18.595041%}.flag-cn{background-position:0 19.008264%}.flag-co{background-position:0 19.421488%}.flag-cr{background-position:0 19.834711%}.flag-cu{background-position:0 20.247934%}.flag-cv{background-position:0 20.661157%}.flag-cx{background-position:0 21.07438%}.flag-cy{background-position:0 21.487603%}.flag-cz{background-position:0 21.900826%}.flag-de{background-position:0 22.31405%}.flag-dj{background-position:0 22.727273%}.flag-dk{background-position:0 23.140496%}.flag-dm{background-position:0 23.553719%}.flag-do{background-position:0 23.966942%}.flag-dz{background-position:0 24.380165%}.flag-ec{background-position:0 24.793388%}.flag-ee{background-position:0 25.206612%}.flag-eg{background-position:0 25.619835%}.flag-eh{background-position:0 26.033058%}.flag-er{background-position:0 26.446281%}.flag-es{background-position:0 26.859504%}.flag-et{background-position:0 27.272727%}.flag-fi{background-position:0 27.68595%}.flag-fj{background-position:0 28.099174%}.flag-fk{background-position:0 28.512397%}.flag-fm{background-position:0 28.92562%}.flag-fo{background-position:0 29.338843%}.flag-fr{background-position:0 29.752066%}.flag-ga{background-position:0 30.165289%}.flag-gd{background-position:0 30.578512%}.flag-ge{background-position:0 30.991736%}.flag-gf{background-position:0 31.404959%}.flag-gh{background-position:0 31.818182%}.flag-gi{background-position:0 32.231405%}.flag-gl{background-position:0 32.644628%}.flag-gm{background-position:0 33.057851%}.flag-gn{background-position:0 33.471074%}.flag-gp{background-position:0 33.884298%}.flag-gq{background-position:0 34.297521%}.flag-gr{background-position:0 34.710744%}.flag-gs{background-position:0 35.123967%}.flag-gt{background-position:0 35.53719%}.flag-gu{background-position:0 35.950413%}.flag-gw{background-position:0 36.363636%}.flag-gy{background-position:0 36.77686%}.flag-hk{background-position:0 37.190083%}.flag-hm{background-position:0 37.603306%}.flag-hn{background-position:0 38.016529%}.flag-hr{background-position:0 38.429752%}.flag-ht{background-position:0 38.842975%}.flag-hu{background-position:0 39.256198%}.flag-id{background-position:0 39.669421%}.flag-ie{background-position:0 40.082645%}.flag-il{background-position:0 40.495868%}.flag-in{background-position:0 40.909091%}.flag-io{background-position:0 41.322314%}.flag-iq{background-position:0 41.735537%}.flag-ir{background-position:0 42.14876%}.flag-is{background-position:0 42.561983%}.flag-it{background-position:0 42.975207%}.flag-jm{background-position:0 43.38843%}.flag-jo{background-position:0 43.801653%}.flag-jp{background-position:0 44.214876%}.flag-ke{background-position:0 44.628099%}.flag-kg{background-position:0 45.041322%}.flag-kh{background-position:0 45.454545%}.flag-ki{background-position:0 45.867769%}.flag-km{background-position:0 46.280992%}.flag-kn{background-position:0 46.694215%}.flag-kp{background-position:0 47.107438%}.flag-kr{background-position:0 47.520661%}.flag-kw{background-position:0 47.933884%}.flag-ky{background-position:0 48.347107%}.flag-kz{background-position:0 48.760331%}.flag-la{background-position:0 49.173554%}.flag-lb{background-position:0 49.586777%}.flag-lc{background-position:0 50%}.flag-li{background-position:0 50.413223%}.flag-lk{background-position:0 50.826446%}.flag-lr{background-position:0 51.239669%}.flag-ls{background-position:0 51.652893%}.flag-lt{background-position:0 52.066116%}.flag-lu{background-position:0 52.479339%}.flag-lv{background-position:0 52.892562%}.flag-ly{background-position:0 53.305785%}.flag-ma{background-position:0 53.719008%}.flag-mc{background-position:0 54.132231%}.flag-md{background-position:0 54.545455%}.flag-me{background-position:0 54.958678%}.flag-mg{background-position:0 55.371901%}.flag-mh{background-position:0 55.785124%}.flag-mk{background-position:0 56.198347%}.flag-ml{background-position:0 56.61157%}.flag-mm{background-position:0 57.024793%}.flag-mn{background-position:0 57.438017%}.flag-mo{background-position:0 57.85124%}.flag-mp{background-position:0 58.264463%}.flag-mq{background-position:0 58.677686%}.flag-mr{background-position:0 59.090909%}.flag-ms{background-position:0 59.504132%}.flag-mt{background-position:0 59.917355%}.flag-mu{background-position:0 60.330579%}.flag-mv{background-position:0 60.743802%}.flag-mw{background-position:0 61.157025%}.flag-mx{background-position:0 61.570248%}.flag-my{background-position:0 61.983471%}.flag-mz{background-position:0 62.396694%}.flag-na{background-position:0 62.809917%}.flag-nc{background-position:0 63.22314%}.flag-ne{background-position:0 63.636364%}.flag-nf{background-position:0 64.049587%}.flag-ng{background-position:0 64.46281%}.flag-ni{background-position:0 64.876033%}.flag-nl{background-position:0 65.289256%}.flag-no{background-position:0 65.702479%}.flag-np{background-position:0 66.115702%}.flag-nr{background-position:0 66.528926%}.flag-nu{background-position:0 66.942149%}.flag-nz{background-position:0 67.355372%}.flag-om{background-position:0 67.768595%}.flag-pa{background-position:0 68.181818%}.flag-pe{background-position:0 68.595041%}.flag-pf{background-position:0 69.008264%}.flag-pg{background-position:0 69.421488%}.flag-ph{background-position:0 69.834711%}.flag-pk{background-position:0 70.247934%}.flag-pl{background-position:0 70.661157%}.flag-pm{background-position:0 71.07438%}.flag-pn{background-position:0 71.487603%}.flag-pr{background-position:0 71.900826%}.flag-pt{background-position:0 72.31405%}.flag-pw{background-position:0 72.727273%}.flag-py{background-position:0 73.140496%}.flag-qa{background-position:0 73.553719%}.flag-re{background-position:0 73.966942%}.flag-ro{background-position:0 74.380165%}.flag-rs{background-position:0 74.793388%}.flag-ru{background-position:0 75.206612%}.flag-rw{background-position:0 75.619835%}.flag-sa{background-position:0 76.033058%}.flag-sb{background-position:0 76.446281%}.flag-sc{background-position:0 76.859504%}.flag-sd{background-position:0 77.272727%}.flag-se{background-position:0 77.68595%}.flag-sg{background-position:0 78.099174%}.flag-sh{background-position:0 78.512397%}.flag-si{background-position:0 78.92562%}.flag-sj{background-position:0 79.338843%}.flag-sk{background-position:0 79.752066%}.flag-sl{background-position:0 80.165289%}.flag-sm{background-position:0 80.578512%}.flag-sn{background-position:0 80.991736%}.flag-so{background-position:0 81.404959%}.flag-sr{background-position:0 81.818182%}.flag-ss{background-position:0 82.231405%}.flag-st{background-position:0 82.644628%}.flag-sv{background-position:0 83.057851%}.flag-sy{background-position:0 83.471074%}.flag-sz{background-position:0 83.884298%}.flag-tc{background-position:0 84.297521%}.flag-td{background-position:0 84.710744%}.flag-tf{background-position:0 85.123967%}.flag-tg{background-position:0 85.53719%}.flag-th{background-position:0 85.950413%}.flag-tj{background-position:0 86.363636%}.flag-tk{background-position:0 86.77686%}.flag-tl{background-position:0 87.190083%}.flag-tm{background-position:0 87.603306%}.flag-tn{background-position:0 88.016529%}.flag-to{background-position:0 88.429752%}.flag-tp{background-position:0 88.842975%}.flag-tr{background-position:0 89.256198%}.flag-tt{background-position:0 89.669421%}.flag-tv{background-position:0 90.082645%}.flag-tw{background-position:0 90.495868%}.flag-ty{background-position:0 90.909091%}.flag-tz{background-position:0 91.322314%}.flag-ua{background-position:0 91.735537%}.flag-ug{background-position:0 92.14876%}.flag-gb,.flag-uk{background-position:0 92.561983%}.flag-um{background-position:0 92.975207%}.flag-us{background-position:0 93.38843%}.flag-uy{background-position:0 93.801653%}.flag-uz{background-position:0 94.214876%}.flag-va{background-position:0 94.628099%}.flag-vc{background-position:0 95.041322%}.flag-ve{background-position:0 95.454545%}.flag-vg{background-position:0 95.867769%}.flag-vi{background-position:0 96.280992%}.flag-vn{background-position:0 96.694215%}.flag-vu{background-position:0 97.107438%}.flag-wf{background-position:0 97.520661%}.flag-ws{background-position:0 97.933884%}.flag-ye{background-position:0 98.347107%}.flag-za{background-position:0 98.760331%}.flag-zm{background-position:0 99.173554%}.flag-zr{background-position:0 99.586777%}.flag-zw{background-position:0 100%}`
};

const karma_conf_js = `
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};`;

const test_ts = `
// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);`;

const editorconfig = `
# Editor configuration, see http://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
max_line_length = off
trim_trailing_whitespace = false
`;

const angular_json = `{
    "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
    "version": 1,
    "cli": {
      "analytics": false
    },
    "newProjectRoot": "projects",
    "projects": {
      "example-app": {
        "projectType": "application",
        "schematics": {
          "@schematics/angular:component": {
            "style": "scss"
          },
          "@schematics/angular:application": {
            "strict": true
          }
        },
        "root": "",
        "sourceRoot": "src",
        "prefix": "app",
        "architect": {
          "build": {
            "builder": "@angular-devkit/build-angular:browser",
            "options": {
              "outputPath": "dist/example-app",
              "index": "src/index.html",
              "main": "src/main.ts",
              "polyfills": ["zone.js"],
              "tsConfig": "tsconfig.app.json",
              "inlineStyleLanguage": "scss",
              "assets": ["src/assets"],
              "styles": [
                "src/styles.scss"
              ],
              "stylePreprocessorOptions": {
                "includePaths": ["node_modules/"]
              },
              "scripts": []
            },
            "configurations": {
              "production": {
                "budgets": [
                  {
                    "type": "initial",
                    "maximumWarning": "500kb",
                    "maximumError": "1mb"
                  },
                  {
                    "type": "anyComponentStyle",
                    "maximumWarning": "2kb",
                    "maximumError": "4kb"
                  }
                ],
                "outputHashing": "all"
              },
              "development": {
                "buildOptimizer": false,
                "optimization": false,
                "vendorChunk": true,
                "extractLicenses": false,
                "sourceMap": true,
                "namedChunks": true
              }
            },
            "defaultConfiguration": "production"
          },
          "serve": {
            "builder": "@angular-devkit/build-angular:dev-server",
            "configurations": {
              "production": {
                "buildTarget": "example-app:build:production"
              },
              "development": {
                "buildTarget": "example-app:build:development"
              }
            },
            "defaultConfiguration": "development"
          },
          "extract-i18n": {
            "builder": "@angular-devkit/build-angular:extract-i18n",
            "options": {
              "browserTarget": "example-app:build"
            }
          },
          "test": {
            "builder": "@angular-devkit/build-angular:karma",
            "options": {
              "main": "src/test.ts",
              "polyfills": ["zone.js"],
              "tsConfig": "tsconfig.spec.json",
              "karmaConfig": "karma.conf.js",
              "inlineStyleLanguage": "scss",
              "assets": ["src/assets"],
              "stylePreprocessorOptions": {
                "includePaths": ["node_modules/"]
              },
              "styles": [
                "src/styles.scss"
              ],
              "scripts": [],
              "allowedCommonJsDependencies": [
                "chart.js",
                "jspdf-autotable",
                "file-saver",
                "jspdf",
                "quill"
              ]
            }
          }
        }
      }
    }
  }`;

const tsconfig_app_json = `{
    "extends": "./tsconfig.json",
    "compilerOptions": {
      "outDir": "./out-tsc/app",
      "types": []
    },
    "files": [
      "src/main.ts"
    ],
    "include": [
      "src/**/*.d.ts"
    ]
}`;

const tsconfig_json = `{
    "compileOnSave": false,
    "compilerOptions": {
      "baseUrl": "./",
      "outDir": "./dist/out-tsc",
      "sourceMap": true,
      "declaration": false,
      "module": "es2022",
      "moduleResolution": "node",
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "target": "es2022",
      "typeRoots": [
        "node_modules/@types"
      ],
      "lib": [
        "es2022",
        "dom"
      ],
      "paths": {
        "@/domain/*": ["src/domain/*"],
        "@/service/*" :["src/service/*"]
      }
    }
}`;

const tsconfig_spec_json = `{
    "extends": "../tsconfig.json",
    "compilerOptions": {
      "outDir": "../out-tsc/spec",
      "types": [
        "jasmine",
        "node"
      ]
    },
    "files": [
      "test.ts"
    ],
    "include": [
      "**/*.spec.ts",
      "**/*.d.ts"
    ]
}`;

const tailwind_config = `
/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

export default {
    darkMode: ['selector', '[class="p-dark"]'],
    content: ['./src/**/*.{html,ts}'],
    plugins: [PrimeUI],
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        }
    }
};

`;

const theme_switcher = `
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, computed, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { $t, updatePreset, updateSurfacePalette } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Material from '@primeng/themes/material';
import Nora from '@primeng/themes/nora';
import { PrimeNG } from 'primeng/config';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StyleClassModule } from 'primeng/styleclass';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

const presets = {
    Aura,
    Material,
    Lara,
    Nora
};

export interface ThemeState {
    preset?: string;
    primary?: string;
    surface?: string;
    darkTheme?: boolean;
}

@Component({
    selector: 'theme-switcher',
    standalone: true,
    imports: [CommonModule, FormsModule, StyleClassModule, SelectButtonModule, ToggleSwitchModule],
    template: \` <div class="card flex justify-end p-2 mb-4">
        <ul class="flex list-none m-0 p-0 gap-2 items-center">
            <li>
                <button type="button" class="inline-flex w-8 h-8 p-0 items-center justify-center surface-0 dark:surface-800 border border-surface-200 dark:border-surface-600 rounded" (click)="onThemeToggler()">
                    <i [ngClass]="'pi ' + iconClass()" class="dark:text-white"></i>
                </button>
            </li>
            <li class="relative">
                <button
                    pStyleClass="@next"
                    enterFromClass="hidden"
                    enterActiveClass="animate-scalein"
                    leaveToClass="hidden"
                    leaveActiveClass="animate-fadeout"
                    [hideOnOutsideClick]="true"
                    type="button"
                    class="inline-flex w-8 h-8 p-0 items-center justify-center surface-0 dark:surface-800 border border-surface-200 dark:border-surface-600 rounded"
                >
                    <i class="pi pi-palette dark:text-white"></i>
                </button>
                <div class="absolute top-[2.5rem] right-0 hidden w-[18rem] p-3 bg-white dark:bg-surface-800 rounded-md shadow border border-surface-200 dark:border-surface-700 flex-col justify-start items-start gap-3.5 inline-flex origin-top z-10">
                    <div class="flex-col justify-start items-start gap-2 inline-flex pr-4">
                        <span class="text-sm font-medium">Primary Colors</span>
                        <div class="self-stretch justify-start items-start gap-2 inline-flex flex-wrap">
                            @for (primaryColor of primaryColors(); track primaryColor.name) {
                                <button
                                    type="button"
                                    [title]="primaryColor.name"
                                    (click)="updateColors($event, 'primary', primaryColor)"
                                    class="outline outline-2 outline-offset-1 outline-transparent cursor-pointer p-0 rounded-[50%] w-5 h-5"
                                    [ngStyle]="{
                                        'background-color': primaryColor.name === 'noir' ? 'var(--text-color)' : primaryColor.palette['500'],
                                        'outline-color': selectedPrimaryColor() === primaryColor.name ? 'var(--p-primary-color)' : ''
                                    }"
                                ></button>
                            }
                        </div>
                    </div>
                    <div class="flex-col justify-start items-start gap-2 inline-flex pr-2">
                        <span class="text-sm font-medium">Surface Colors</span>
                        <div class="self-stretch justify-start items-start gap-2 inline-flex">
                            @for (surface of surfaces; track surface.name) {
                                <button
                                    type="button"
                                    [title]="surface.name"
                                    (click)="updateColors($event, 'surface', surface)"
                                    class="outline outline-2 outline-offset-1 outline-transparent cursor-pointer p-0 rounded-[50%] w-5 h-5"
                                    [ngStyle]="{
                                        'background-color': surface.palette['500'],
                                        'outline-color': selectedSurfaceColor() === surface.name ? 'var(--p-primary-color)' : ''
                                    }"
                                ></button>
                            }
                        </div>
                    </div>
                    <div class="flex-col justify-start items-start gap-2 inline-flex w-full">
                        <span class="text-sm font-medium">Preset</span>
                        <div class="inline-flex p-[0.28rem] items-start gap-[0.28rem] rounded-[0.71rem] border border-[#00000003] w-full">
                            <p-selectbutton [options]="presets" [ngModel]="selectedPreset()" (ngModelChange)="onPresetChange($event)" [unselectable]="false" size="small" />
                        </div>
                    </div>
                    <div class="inline-flex flex-col justify-start items-start gap-2 w-full pt-4 pb-2">
                        <span class="text-sm font-medium m-0">Ripple Effect</span>
                        <p-toggleswitch [(ngModel)]="ripple" />
                    </div>
                </div>
            </li>
        </ul>
    </div>\`
})
export class ThemeSwitcher {
  private readonly STORAGE_KEY = 'themeSwitcherState';

  document = inject(DOCUMENT);

  iconClass = computed(() =>
    this.themeState().darkTheme ? 'pi-sun' : 'pi-moon'
  );

  presets = Object.keys(presets);

  platformId = inject(PLATFORM_ID);

  config: PrimeNG = inject(PrimeNG);

  themeState = signal<ThemeState>(null);

  theme = computed(() => (this.themeState()?.darkTheme ? 'dark' : 'light'));

  selectedPreset = computed(() => this.themeState().preset);

  selectedSurfaceColor = computed(() => this.themeState().surface);

  selectedPrimaryColor = computed(() => {
    return this.themeState().primary;
  });

  constructor() {
    this.themeState.set({ ...this.loadthemeState() });

    effect(() => {
      const state = this.themeState();

      this.savethemeState(state);
      this.handleDarkModeTransition(state);
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.onPresetChange(this.themeState().preset);
    }
  }

  get ripple() {
    return this.config.ripple();
  }

  set ripple(value: boolean) {
    this.config.ripple.set(value);
  }

  transitionComplete = signal<boolean>(false);

  primaryColors = computed(() => {
    const presetPalette = presets[this.themeState().preset].primitive;
    const colors = [
      'emerald',
      'green',
      'lime',
      'orange',
      'amber',
      'yellow',
      'teal',
      'cyan',
      'sky',
      'blue',
      'indigo',
      'violet',
      'purple',
      'fuchsia',
      'pink',
      'rose',
    ];
    const palettes = [{ name: 'noir', palette: {} }];

    colors.forEach((color) => {
      palettes.push({
        name: color,
        palette: presetPalette[color],
      });
    });

    return palettes;
  });

  surfaces = [
    {
      name: 'slate',
      palette: {
        0: '#ffffff',
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617',
      },
    },
    {
      name: 'gray',
      palette: {
        0: '#ffffff',
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712',
      },
    },
    {
      name: 'zinc',
      palette: {
        0: '#ffffff',
        50: '#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        700: '#3f3f46',
        800: '#27272a',
        900: '#18181b',
        950: '#09090b',
      },
    },
    {
      name: 'neutral',
      palette: {
        0: '#ffffff',
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0a0a0a',
      },
    },
    {
      name: 'stone',
      palette: {
        0: '#ffffff',
        50: '#fafaf9',
        100: '#f5f5f4',
        200: '#e7e5e4',
        300: '#d6d3d1',
        400: '#a8a29e',
        500: '#78716c',
        600: '#57534e',
        700: '#44403c',
        800: '#292524',
        900: '#1c1917',
        950: '#0c0a09',
      },
    },
    {
      name: 'soho',
      palette: {
        0: '#ffffff',
        50: '#ececec',
        100: '#dedfdf',
        200: '#c4c4c6',
        300: '#adaeb0',
        400: '#97979b',
        500: '#7f8084',
        600: '#6a6b70',
        700: '#55565b',
        800: '#3f4046',
        900: '#2c2c34',
        950: '#16161d',
      },
    },
    {
      name: 'viva',
      palette: {
        0: '#ffffff',
        50: '#f3f3f3',
        100: '#e7e7e8',
        200: '#cfd0d0',
        300: '#b7b8b9',
        400: '#9fa1a1',
        500: '#87898a',
        600: '#6e7173',
        700: '#565a5b',
        800: '#3e4244',
        900: '#262b2c',
        950: '#0e1315',
      },
    },
    {
      name: 'ocean',
      palette: {
        0: '#ffffff',
        50: '#fbfcfc',
        100: '#F7F9F8',
        200: '#EFF3F2',
        300: '#DADEDD',
        400: '#B1B7B6',
        500: '#828787',
        600: '#5F7274',
        700: '#415B61',
        800: '#29444E',
        900: '#183240',
        950: '#0c1920',
      },
    },
  ];

  onThemeToggler() {
    this.themeState.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }

  getPresetExt() {
    const color = this.primaryColors().find(
      (c) => c.name === this.selectedPrimaryColor()
    );

    if (color.name === 'noir') {
      return {
        semantic: {
          primary: {
            50: '{surface.50}',
            100: '{surface.100}',
            200: '{surface.200}',
            300: '{surface.300}',
            400: '{surface.400}',
            500: '{surface.500}',
            600: '{surface.600}',
            700: '{surface.700}',
            800: '{surface.800}',
            900: '{surface.900}',
            950: '{surface.950}',
          },
          colorScheme: {
            light: {
              primary: {
                color: '{primary.950}',
                contrastColor: '#ffffff',
                hoverColor: '{primary.800}',
                activeColor: '{primary.700}',
              },
              highlight: {
                background: '{primary.950}',
                focusBackground: '{primary.700}',
                color: '#ffffff',
                focusColor: '#ffffff',
              },
            },
            dark: {
              primary: {
                color: '{primary.50}',
                contrastColor: '{primary.950}',
                hoverColor: '{primary.200}',
                activeColor: '{primary.300}',
              },
              highlight: {
                background: '{primary.50}',
                focusBackground: '{primary.300}',
                color: '{primary.950}',
                focusColor: '{primary.950}',
              },
            },
          },
        },
      };
    } else {
      if (this.themeState().preset === 'Nora') {
        return {
          semantic: {
            primary: color.palette,
            colorScheme: {
              light: {
                primary: {
                  color: '{primary.600}',
                  contrastColor: '#ffffff',
                  hoverColor: '{primary.700}',
                  activeColor: '{primary.800}',
                },
                highlight: {
                  background: '{primary.600}',
                  focusBackground: '{primary.700}',
                  color: '#ffffff',
                  focusColor: '#ffffff',
                },
              },
              dark: {
                primary: {
                  color: '{primary.500}',
                  contrastColor: '{surface.900}',
                  hoverColor: '{primary.400}',
                  activeColor: '{primary.300}',
                },
                highlight: {
                  background: '{primary.500}',
                  focusBackground: '{primary.400}',
                  color: '{surface.900}',
                  focusColor: '{surface.900}',
                },
              },
            },
          },
        };
      } else if (this.themeState().preset === 'Material') {
        return {
          semantic: {
            primary: color.palette,
            colorScheme: {
              light: {
                primary: {
                  color: '{primary.500}',
                  contrastColor: '#ffffff',
                  hoverColor: '{primary.400}',
                  activeColor: '{primary.300}',
                },
                highlight: {
                  background:
                    'color-mix(in srgb, {primary.color}, transparent 88%)',
                  focusBackground:
                    'color-mix(in srgb, {primary.color}, transparent 76%)',
                  color: '{primary.700}',
                  focusColor: '{primary.800}',
                },
              },
              dark: {
                primary: {
                  color: '{primary.400}',
                  contrastColor: '{surface.900}',
                  hoverColor: '{primary.300}',
                  activeColor: '{primary.200}',
                },
                highlight: {
                  background:
                    'color-mix(in srgb, {primary.400}, transparent 84%)',
                  focusBackground:
                    'color-mix(in srgb, {primary.400}, transparent 76%)',
                  color: 'rgba(255,255,255,.87)',
                  focusColor: 'rgba(255,255,255,.87)',
                },
              },
            },
          },
        };
      } else {
        return {
          semantic: {
            primary: color.palette,
            colorScheme: {
              light: {
                primary: {
                  color: '{primary.500}',
                  contrastColor: '#ffffff',
                  hoverColor: '{primary.600}',
                  activeColor: '{primary.700}',
                },
                highlight: {
                  background: '{primary.50}',
                  focusBackground: '{primary.100}',
                  color: '{primary.700}',
                  focusColor: '{primary.800}',
                },
              },
              dark: {
                primary: {
                  color: '{primary.400}',
                  contrastColor: '{surface.900}',
                  hoverColor: '{primary.300}',
                  activeColor: '{primary.200}',
                },
                highlight: {
                  background:
                    'color-mix(in srgb, {primary.400}, transparent 84%)',
                  focusBackground:
                    'color-mix(in srgb, {primary.400}, transparent 76%)',
                  color: 'rgba(255,255,255,.87)',
                  focusColor: 'rgba(255,255,255,.87)',
                },
              },
            },
          },
        };
      }
    }
  }

  startViewTransition(state: ThemeState): void {
    const transition = (document as any).startViewTransition(() => {
      this.toggleDarkMode(state);
    });

    transition.ready.then(() => this.onTransitionEnd());
  }

  toggleDarkMode(state: ThemeState): void {
    if (state.darkTheme) {
      this.document.documentElement.classList.add('p-dark');
    } else {
      this.document.documentElement.classList.remove('p-dark');
    }
  }

  onTransitionEnd() {
    this.transitionComplete.set(true);
    setTimeout(() => {
      this.transitionComplete.set(false);
    });
  }

  handleDarkModeTransition(state: ThemeState): void {
    if (isPlatformBrowser(this.platformId)) {
      if ((document as any).startViewTransition) {
        this.startViewTransition(state);
      } else {
        this.toggleDarkMode(state);
        this.onTransitionEnd();
      }
    }
  }

  updateColors(event: any, type: string, color: any) {
    if (type === 'primary') {
      this.themeState.update((state) => ({ ...state, primary: color.name }));
    } else if (type === 'surface') {
      this.themeState.update((state) => ({ ...state, surface: color.name }));
    }
    this.applyTheme(type, color);

    event.stopPropagation();
  }

  applyTheme(type: string, color: any) {
    if (type === 'primary') {
      updatePreset(this.getPresetExt());
    } else if (type === 'surface') {
      updateSurfacePalette(color.palette);
    }
  }

  onPresetChange(event: any) {
    this.themeState.update((state) => ({ ...state, preset: event }));
    const preset = presets[event];
    const surfacePalette = this.surfaces.find(
      (s) => s.name === this.selectedSurfaceColor()
    )?.palette;
    if (this.themeState().preset === 'Material') {
      document.body.classList.add('material');
      this.config.ripple.set(true);
    } else {
      document.body.classList.remove('material');
      this.config.ripple.set(false);
    }
    $t()
      .preset(preset)
      .preset(this.getPresetExt())
      .surfacePalette(surfacePalette)
      .use({ useDefaultOptions: true });
  }

  loadthemeState(): any {
    if (isPlatformBrowser(this.platformId)) {
      const storedState = localStorage.getItem(this.STORAGE_KEY);
      if (storedState) {
        return JSON.parse(storedState);
      }
    }
    return {
      preset: 'Aura',
      primary: 'noir',
      surface: null,
      darkTheme: false,
    };
  }

  savethemeState(state: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    }
  }
}
`;

const getAngularApp = (props: Props = {}) => {
    const { code, extFiles, routeFiles, selector } = props;
    const componentName = getComponentName(selector);
    const externalFiles = getExternalFiles(extFiles);
    const _routeFiles = getExternalFiles(routeFiles);
    const routeImports = getRouteImports(routeFiles, selector);
    const serviceImports = code.service ? getServiceImports(code.service) : '';
    const routerModule = code.routerModule ? code.routerModule : `RouterModule.forRoot([{ path: '', component: ${componentName} }])`;
    const declarations = routeFiles && routeFiles.length ? (componentName ? routeFiles.map((r) => r.name).join(', ') + ',' + componentName : routeFiles.map((r) => r.name).join(', ')) : `${componentName}`;
    const providers = code.service && code.service.length ? code.service.map((s) => s).join(', ') : '';

    const imports_ts = `// Import PrimeNG modules
    import { AutoFocusModule } from 'primeng/autofocus';
    import { FormsModule, ReactiveFormsModule } from '@angular/forms';
    import { HttpClientModule } from '@angular/common/http';
    import { NgModule } from '@angular/core';
    import { OverlayBadgeModule } from 'primeng/overlaybadge';
    import { TabsModule } from 'primeng/tabs';
    import { AvatarModule } from 'primeng/avatar';
    import { AvatarGroupModule } from 'primeng/avatargroup';
    import { AnimateOnScrollModule } from 'primeng/animateonscroll';
    import { AccordionModule } from 'primeng/accordion';
    import { AutoCompleteModule } from 'primeng/autocomplete';
    import { BadgeModule } from 'primeng/badge';
    import { BreadcrumbModule } from 'primeng/breadcrumb';
    import { BlockUIModule } from 'primeng/blockui';
    import { ButtonModule } from 'primeng/button';
    import { CalendarModule } from 'primeng/calendar';
    import { DatePickerModule } from 'primeng/datepicker';
    import { CarouselModule } from 'primeng/carousel';
    import { CascadeSelectModule } from 'primeng/cascadeselect';
    import { ChartModule } from 'primeng/chart';
    import { CheckboxModule } from 'primeng/checkbox';
    import { ChipModule } from 'primeng/chip';
    import { ColorPickerModule } from 'primeng/colorpicker';
    import { ConfirmDialogModule } from 'primeng/confirmdialog';
    import { ConfirmPopupModule } from 'primeng/confirmpopup';
    import { ContextMenuModule } from 'primeng/contextmenu';
    import { DataViewModule } from 'primeng/dataview';
    import { DialogModule } from 'primeng/dialog';
    import { DividerModule } from 'primeng/divider';
    import { DeferModule } from 'primeng/defer';
    import { DockModule } from 'primeng/dock';
    import { DragDropModule } from 'primeng/dragdrop';
    import { SelectModule } from 'primeng/select';
    import { DynamicDialogModule } from 'primeng/dynamicdialog';
    import { EditorModule } from 'primeng/editor';
    import { FieldsetModule } from 'primeng/fieldset';
    import { FileUploadModule } from 'primeng/fileupload';
    import { FocusTrapModule } from 'primeng/focustrap';
    import { GalleriaModule } from 'primeng/galleria';
    import { IftaLabelModule } from 'primeng/iftalabel';
    import { InplaceModule } from 'primeng/inplace';
    import { InputMaskModule } from 'primeng/inputmask';
    import { InputSwitchModule } from 'primeng/inputswitch';
    import { InputTextModule } from 'primeng/inputtext';
    import { TextareaModule } from 'primeng/textarea';
    import { InputNumberModule } from 'primeng/inputnumber';
    import { InputGroupModule } from 'primeng/inputgroup';
    import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
    import { InputOtpModule } from 'primeng/inputotp';
    import { ImageModule } from 'primeng/image';
    import { ImageCompareModule } from 'primeng/imagecompare';
    import { KnobModule } from 'primeng/knob';
    import { ListboxModule } from 'primeng/listbox';
    import { MegaMenuModule } from 'primeng/megamenu';
    import { MenuModule } from 'primeng/menu';
    import { MenubarModule } from 'primeng/menubar';
    import { MessageModule } from 'primeng/message';
    import { MessagesModule } from 'primeng/messages';
    import { MultiSelectModule } from 'primeng/multiselect';
    import { MeterGroupModule } from 'primeng/metergroup';
    import { OrganizationChartModule } from 'primeng/organizationchart';
    import { OrderListModule } from 'primeng/orderlist';
    import { OverlayPanelModule } from 'primeng/overlaypanel';
    import { PaginatorModule } from 'primeng/paginator';
    import { PanelModule } from 'primeng/panel';
    import { PanelMenuModule } from 'primeng/panelmenu';
    import { PasswordModule } from 'primeng/password';
    import { PickListModule } from 'primeng/picklist';
    import { ProgressSpinnerModule } from 'primeng/progressspinner';
    import { ProgressBarModule } from 'primeng/progressbar';
    import { RadioButtonModule } from 'primeng/radiobutton';
    import { RatingModule } from 'primeng/rating';
    import { SelectButtonModule } from 'primeng/selectbutton';
    import { SidebarModule } from 'primeng/sidebar';
    import { ScrollerModule } from 'primeng/scroller';
    import { ScrollPanelModule } from 'primeng/scrollpanel';
    import { ScrollTopModule } from 'primeng/scrolltop';
    import { SkeletonModule } from 'primeng/skeleton';
    import { SliderModule } from 'primeng/slider';
    import { SpeedDialModule } from 'primeng/speeddial';
    import { SplitterModule } from 'primeng/splitter';
    import { StepperModule } from 'primeng/stepper';
    import { SplitButtonModule } from 'primeng/splitbutton';
    import { StepsModule } from 'primeng/steps';
    import { TableModule } from 'primeng/table';
    import { TabMenuModule } from 'primeng/tabmenu';
    import { TagModule } from 'primeng/tag';
    import { TerminalModule } from 'primeng/terminal';
    import { TieredMenuModule } from 'primeng/tieredmenu';
    import { TimelineModule } from 'primeng/timeline';
    import { ToastModule } from 'primeng/toast';
    import { ToggleButtonModule } from 'primeng/togglebutton';
    import { ToggleSwitchModule } from 'primeng/toggleswitch';
    import { ToolbarModule } from 'primeng/toolbar';
    import { TooltipModule } from 'primeng/tooltip';
    import { TreeModule } from 'primeng/tree';
    import { TreeSelectModule } from 'primeng/treeselect';
    import { TreeTableModule } from 'primeng/treetable';
    import { CardModule } from 'primeng/card';
    import { RippleModule } from 'primeng/ripple';
    import { StyleClassModule } from 'primeng/styleclass';
    import { FloatLabelModule } from 'primeng/floatlabel';
    import { IconFieldModule } from 'primeng/iconfield';
    import { InputIconModule } from 'primeng/inputicon';
    import { DrawerModule } from 'primeng/drawer';
    import { ThemeSwitcher } from './themeswitcher';

    ${serviceImports}

    @NgModule({
        imports: [
            ThemeSwitcher,
            AvatarModule,
            AvatarGroupModule,
            AnimateOnScrollModule,
            TabsModule,
            FormsModule,
            HttpClientModule,
            ReactiveFormsModule,
            AccordionModule,
            AutoCompleteModule,
            BadgeModule,
            BreadcrumbModule,
            BlockUIModule,
            ButtonModule,
            CalendarModule,
            DatePickerModule,
            CarouselModule,
            CascadeSelectModule,
            ChartModule,
            CheckboxModule,
            ChipModule,
            ColorPickerModule,
            ConfirmDialogModule,
            ConfirmPopupModule,
            ContextMenuModule,
            DataViewModule,
            DialogModule,
            DividerModule,
            DrawerModule,
            DeferModule,
            DockModule,
            DragDropModule,
            SelectModule,
            DynamicDialogModule,
            EditorModule,
            FieldsetModule,
            FileUploadModule,
            FocusTrapModule,
            GalleriaModule,
            IftaLabelModule,
            InplaceModule,
            InputMaskModule,
            InputSwitchModule,
            InputTextModule,
            TextareaModule,
            InputNumberModule,
            InputGroupModule,
            InputGroupAddonModule,
            InputOtpModule,
            ImageModule,
            ImageCompareModule,
            KnobModule,
            ListboxModule,
            MegaMenuModule,
            MenuModule,
            MenubarModule,
            MessageModule,
            MessagesModule,
            MultiSelectModule,
            MeterGroupModule,
            OrganizationChartModule,
            OrderListModule,
            OverlayPanelModule,
            PaginatorModule,
            PanelModule,
            PanelMenuModule,
            PasswordModule,
            PickListModule,
            ProgressSpinnerModule,
            ProgressBarModule,
            RadioButtonModule,
            RatingModule,
            SelectButtonModule,
            SidebarModule,
            ScrollerModule,
            ScrollPanelModule,
            ScrollTopModule,
            SkeletonModule,
            SliderModule,
            SpeedDialModule,
            SplitterModule,
            StepperModule,
            SplitButtonModule,
            StepsModule,
            TableModule,
            TabMenuModule,
            TagModule,
            TerminalModule,
            TieredMenuModule,
            TimelineModule,
            ToastModule,
            ToggleButtonModule,
            ToggleSwitchModule,
            ToolbarModule,
            TooltipModule,
            TreeModule,
            TreeSelectModule,
            TreeTableModule,
            CardModule,
            RippleModule,
            StyleClassModule,
            FloatLabelModule,
            IconFieldModule,
            InputIconModule,
            AutoFocusModule,
            OverlayBadgeModule,
        ],
          exports: [
            ThemeSwitcher,
            TabsModule,
            AvatarModule,
            AvatarGroupModule,
            AnimateOnScrollModule,
            FormsModule,
            HttpClientModule,
            ReactiveFormsModule,
            AccordionModule,
            AutoCompleteModule,
            BadgeModule,
            BreadcrumbModule,
            BlockUIModule,
            ButtonModule,
            CalendarModule,
            DatePickerModule,
            CarouselModule,
            CascadeSelectModule,
            ChartModule,
            CheckboxModule,
            ChipModule,
            ColorPickerModule,
            ConfirmDialogModule,
            ConfirmPopupModule,
            ContextMenuModule,
            DataViewModule,
            DialogModule,
            DividerModule,
            DrawerModule,
            DeferModule,
            DockModule,
            DragDropModule,
            SelectModule,
            DynamicDialogModule,
            EditorModule,
            FieldsetModule,
            FileUploadModule,
            FocusTrapModule,
            GalleriaModule,
            IftaLabelModule,
            InplaceModule,
            InputMaskModule,
            InputSwitchModule,
            InputTextModule,
            TextareaModule,
            InputNumberModule,
            InputGroupModule,
            InputGroupAddonModule,
            InputOtpModule,
            ImageModule,
            ImageCompareModule,
            KnobModule,
            ListboxModule,
            MegaMenuModule,
            MenuModule,
            MenubarModule,
            MessageModule,
            MessagesModule,
            MultiSelectModule,
            MeterGroupModule,
            OrganizationChartModule,
            OrderListModule,
            OverlayPanelModule,
            PaginatorModule,
            PanelModule,
            PanelMenuModule,
            PasswordModule,
            PickListModule,
            ProgressSpinnerModule,
            ProgressBarModule,
            RadioButtonModule,
            RatingModule,
            SelectButtonModule,
            SidebarModule,
            ScrollerModule,
            ScrollPanelModule,
            ScrollTopModule,
            SkeletonModule,
            SliderModule,
            SpeedDialModule,
            SplitterModule,
            StepperModule,
            SplitButtonModule,
            StepsModule,
            TableModule,
            TabMenuModule,
            TagModule,
            TerminalModule,
            TieredMenuModule,
            TimelineModule,
            ToastModule,
            ToggleButtonModule,
            ToggleSwitchModule,
            ToolbarModule,
            TooltipModule,
            TreeModule,
            TreeSelectModule,
            TreeTableModule,
            CardModule,
            RippleModule,
            StyleClassModule,
            FloatLabelModule,
            IconFieldModule,
            InputIconModule,
            AutoFocusModule,
            OverlayBadgeModule,
          ],
      providers: [ ${providers} ]
    })
    export class ImportsModule {}
    `;

    const index_html = `
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>PrimeNG ${componentName}</title>
        <base href="/">

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://unpkg.com/primeicons/primeicons.css" rel="stylesheet" />
        <link href="https://unpkg.com/quill@1.3.7/dist/quill.snow.css" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="https://primefaces.org/cdn/primeng/images/favicon.png">
    </head>
    <body>
        <${selector}></${selector}>
    </body>
</html>`;

    const main_ts = `import { bootstrapApplication } from '@angular/platform-browser';
import { ${componentName} } from './app/${selector}';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

  export const appConfig: ApplicationConfig = {
      providers: [
      provideHttpClient(withFetch()),
      provideAnimationsAsync(),
      providePrimeNG({
          theme: { preset: Aura, options: { darkModeSelector: '.p-dark' } },
      }),
    ],
  };

    bootstrapApplication(${componentName}, appConfig).catch((err) =>
    console.error(err)
);`;

    const defaultFiles = {
        'src/main.ts': { content: main_ts },
        'src/test.ts': { content: test_ts },
        'tsconfig.json': { content: tsconfig_json },
        'tsconfig.app.json': { content: tsconfig_app_json },
        'tsconfig.spec.json': { content: tsconfig_spec_json },
        '.editorconfig': { content: editorconfig },
        'angular.json': { content: angular_json },
        'src/app/imports.ts': { content: imports_ts },
        'src/index.html': { content: index_html },
        'src/karma.conf.js': { content: karma_conf_js },
        'src/styles.scss': { content: staticStyles.global },
        'src/flags.css': { content: staticStyles.flags },
        'src/app/themeswitcher.ts': { content: theme_switcher },
        'tailwind.config.js': { content: tailwind_config }
    };

    const files = {
        'package.json': {
            content: {
                name: `primeng-${selector}`,
                description: `PrimeNG ${componentName}`,
                license: 'MIT',
                keywords: [],
                scripts: {
                    ng: 'ng',
                    start: 'ng serve',
                    build: 'ng build',
                    test: 'ng test'
                },
                dependencies: {
                    ...dependencies
                },
                devDependencies: {
                    ...devDependencies
                }
            }
        },

        [`src/app/${selector}.ts`]: { content: code.typescript.trim() },
        [`src/app/${selector}.html`]: { content: `<theme-switcher />\n` + code.html.trim() },
        ...defaultFiles,
        ...externalFiles,
        ..._routeFiles
    };

    if (code.service) {
        code.service.forEach((name) => {
            files[`src/service/${name.toLowerCase()}.ts`] = {
                content: services[name]
            };
        });
    }

    return { files, title: `PrimeNG ${componentName}` };
};

export { getAngularApp };
