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
    files: [
      '../node_modules/moment/moment.js',
      '../node_modules/@fullcalendar/core/main.js',
      '../node_modules/@fullcalendar/daygrid/main.js',
      '../node_modules/@fullcalendar/timegrid/main.js',
      '../node_modules/@fullcalendar/interaction/main.js',
      '../node_modules/@fullcalendar/resource-common/main.js',
      '../node_modules/@fullcalendar/resource-daygrid/main.js',
      '../node_modules/@fullcalendar/resource-timegrid/main.js',
      '../node_modules/@fullcalendar/timeline/main.js',
      '../node_modules/@fullcalendar/timegrid/main.js',
      '../node_modules/chart.js/dist/Chart.js',
      '../node_modules/quill/dist/quill.js'
    ],
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};