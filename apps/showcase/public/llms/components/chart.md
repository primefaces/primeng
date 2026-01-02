# Angular Chart Component

Chart components are based on Charts.js 3.3.2+, an open source HTML5 based charting library.

## Accessibility

Screen Reader Chart components internally use canvas element, refer to the Chart.js accessibility guide for more information.

## Basic

A chart is configured with 3 properties; type , data and options . Chart type is defined using the type property that accepts pie , doughtnut , line , bar , radar and polarArea as a value. The data defines datasets represented with the chart and the options provide numerous customization options to customize the presentation.

```html
<p-chart type="bar" [data]="basicData" [options]="basicOptions" />
```

## Chart.js

To begin with, first you must install the charts.js package using npm and then include it in your project. An example with CLI would be;

## Combo

Different chart types can be combined in the same graph using the type option of a dataset.

```html
<p-chart type="line" [data]="data" [options]="options" class="h-[30rem]" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
    template: `
        <div class="card">
            <p-chart type="line" [data]="data" [options]="options" class="h-[30rem]" />
        </div>
    `,
    standalone: true,
    imports: [ChartModule]
})
export class ChartComboDemo implements OnInit {
    data: any;
    options: any;

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
        
            this.data = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        type: 'line',
                        label: 'Dataset 1',
                        borderColor: documentStyle.getPropertyValue('--p-orange-500'),
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        data: [50, 25, 12, 48, 56, 76, 42]
                    },
                    {
                        type: 'bar',
                        label: 'Dataset 2',
                        backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
                        data: [21, 84, 24, 75, 37, 65, 34],
                        borderColor: 'white',
                        borderWidth: 2
                    },
                    {
                        type: 'bar',
                        label: 'Dataset 3',
                        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        data: [41, 52, 24, 74, 23, 21, 32]
                    }
                ]
            };
        
            this.options = {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    }
                }
            };
            this.cd.markForCheck();
        }
    }
}
```
</details>

## Doughnut

A doughnut chart is a variant of the pie chart, with a blank center allowing for additional information about the data as a whole to be included.

```html
<p-chart type="doughnut" [data]="data" [options]="options" class="w-full md:w-[30rem]" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-chart type="doughnut" [data]="data" [options]="options" class="w-full md:w-[30rem]" />
        </div>
    `,
    standalone: true,
    imports: [ChartModule]
})
export class ChartDoughnutDemo implements OnInit {
    data: any;
    options: any;

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
        
            this.data = {
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
                    }
                ]
            };
        
            this.options = {
                cutout: '60%',
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                }
            };
            this.cd.markForCheck();
        }
    }
}
```
</details>

## Horizontal Bar

A bar chart is rendered horizontally when indexAxis option is set as y .

## Line

A line chart or line graph is a type of chart which displays information as a series of data points called 'markers' connected by straight line segments.

```html
<p-chart type="line" [data]="data" [options]="options" class="h-[30rem]" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
    template: `
        <div class="card">
            <p-chart type="line" [data]="data" [options]="options" class="h-[30rem]" />
        </div>
    `,
    standalone: true,
    imports: [ChartModule]
})
export class ChartLineDemo implements OnInit {
    data: any;
    options: any;

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
        
            this.data = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        tension: 0.4
                    },
                    {
                        label: 'Second Dataset',
                        data: [28, 48, 40, 19, 86, 27, 90],
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                        tension: 0.4
                    }
                ]
            };
        
            this.options = {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };
            this.cd.markForCheck();
        }
    }
}
```
</details>

## linestyledoc

Various styles of a line series can be customized to display customizations like an area chart.

## MultiAxis

Multiple axes can be added using the scales option.

## Pie

A pie chart is a circular statistical graphic which is divided into slices to illustrate numerical proportion.

```html
<p-chart type="pie" [data]="data" [options]="options" class="w-full md:w-[30rem]" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-chart type="pie" [data]="data" [options]="options" class="w-full md:w-[30rem]" />
        </div>
    `,
    standalone: true,
    imports: [ChartModule]
})
export class ChartPieDemo implements OnInit {
    data: any;
    options: any;

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
        
            this.data = {
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                        data: [540, 325, 702],
                        backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
                    }
                ]
            };
        
            this.options = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor
                        }
                    }
                }
            };
            this.cd.markForCheck();
        }
    }
}
```
</details>

## Polar Area

Polar area charts are similar to pie charts, but each segment has the same angle - the radius of the segment differs depending on the value.

## radardoc

A radar chart is a graphical method of displaying multivariate data in the form of a two-dimensional chart of three or more quantitative variables represented on axes starting from the same point.

```html
<p-chart type="radar" [data]="data" [options]="options" class="w-full md:w-[30rem]" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-chart type="radar" [data]="data" [options]="options" class="w-full md:w-[30rem]" />
        </div>
    `,
    standalone: true,
    imports: [ChartModule]
})
export class ChartRadarDemo implements OnInit {
    data: any;
    options: any;

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        
            this.data = {
                labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
                datasets: [
                    {
                        label: 'My First dataset',
                        borderColor: documentStyle.getPropertyValue('--p-gray-400'),
                        pointBackgroundColor: documentStyle.getPropertyValue('--p-gray-400'),
                        pointBorderColor: documentStyle.getPropertyValue('--p-gray-400'),
                        pointHoverBackgroundColor: textColor,
                        pointHoverBorderColor: documentStyle.getPropertyValue('--p-gray-400'),
                        data: [65, 59, 90, 81, 56, 55, 40]
                    },
                    {
                        label: 'My Second dataset',
                        borderColor: documentStyle.getPropertyValue('--p-cyan-400'),
                        pointBackgroundColor: documentStyle.getPropertyValue('--p-cyan-400'),
                        pointBorderColor: documentStyle.getPropertyValue('--p-cyan-400'),
                        pointHoverBackgroundColor: textColor,
                        pointHoverBorderColor: documentStyle.getPropertyValue('--p-cyan-400'),
                        data: [28, 48, 40, 19, 96, 27, 100]
                    }
                ]
            };
        
            this.options = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    r: {
                        grid: {
                            color: textColorSecondary
                        }
                    }
                }
            };
        }
        this.cd.markForCheck();
    }
}
```
</details>

## Stacked Bar

Bars can be stacked on top of each other when stacked option of a scale is enabled.

## Vertical Bar

A bar chart or bar graph is a chart that presents grouped data with rectangular bars with lengths proportional to the values that they represent.

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |
| canvas | PassThroughOption<HTMLCanvasElement, I> | Used to pass attributes to the canvas DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-chart | Class name of the root element |

