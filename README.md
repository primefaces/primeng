# PrimeNG
UI Components for AngularJS 2

See  [PrimeNG homepage](http://www.primefaces.org/primeng) for live showcase and documentation.

![alt text](http://www.primefaces.org/images/primeng.png "PrimeNG")

Execute the following commands to run the showcase in your local environment. A browser window pops up with http:\\\\localhost:3000 address.

```
npm install
```

Add the missing options LineChartOptions in chart.d.ts files under typings folder until [this issue](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/8188) is fixed.
```
interface LineChartOptions extends ChartOptions {
    scaleShowVerticalLines?: boolean;
    scaleShowHorizontalLines?: boolean;
    ...
```

```
npm start
```

For project plan, visit [roadmap](https://github.com/primefaces/primeng/wiki/Roadmap).
