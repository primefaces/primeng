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

## Doughnut

A doughnut chart is a variant of the pie chart, with a blank center allowing for additional information about the data as a whole to be included.

```html
<p-chart type="doughnut" [data]="data" [options]="options" class="w-full md:w-[30rem]" />
```

## Horizontal Bar

A bar chart is rendered horizontally when indexAxis option is set as y .

```html
<p-chart type="bar" [data]="data" [options]="options" class="h-[30rem]" />
```

## Line

A line chart or line graph is a type of chart which displays information as a series of data points called 'markers' connected by straight line segments.

```html
<p-chart type="line" [data]="data" [options]="options" class="h-[30rem]" />
```

## linestyledoc

Various styles of a line series can be customized to display customizations like an area chart.

```html
<p-chart type="line" [data]="data" [options]="options" class="h-[30rem]" />
```

## MultiAxis

Multiple axes can be added using the scales option.

```html
<p-chart type="line" [data]="data" [options]="options" class="h-[30rem]" />
```

## Pie

A pie chart is a circular statistical graphic which is divided into slices to illustrate numerical proportion.

```html
<p-chart type="pie" [data]="data" [options]="options" class="w-full md:w-[30rem]" />
```

## Polar Area

Polar area charts are similar to pie charts, but each segment has the same angle - the radius of the segment differs depending on the value.

```html
<p-chart type="polarArea" [data]="data" [options]="options" class="w-full md:w-[30rem]" />
```

## radardoc

A radar chart is a graphical method of displaying multivariate data in the form of a two-dimensional chart of three or more quantitative variables represented on axes starting from the same point.

```html
<p-chart type="radar" [data]="data" [options]="options" class="w-full md:w-[30rem]" />
```

## Stacked Bar

Bars can be stacked on top of each other when stacked option of a scale is enabled.

```html
<p-chart type="bar" [data]="data" [options]="options" class="h-[30rem]" />
```

## Vertical Bar

A bar chart or bar graph is a chart that presents grouped data with rectangular bars with lengths proportional to the values that they represent.

```html
<p-chart type="bar" [data]="data" [options]="options" class="h-[30rem]" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit, PLATFORM_ID, ChangeDetectorRef, inject, effect } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { AppConfigService } from '@/service/appconfigservice';

@Component({
    selector: 'chart-vertical-bar-demo',
    templateUrl: './chart-vertical-bar-demo.html',
    standalone: true,
    imports: [ChartModule]
})
export class ChartVerticalBarDemo implements OnInit {
    data: any;

    options: any;

    platformId = inject(PLATFORM_ID);

    configService = inject(AppConfigService);

    designerService = inject(DesignerService);

    constructor(private cd: ChangeDetectorRef) {}

    themeEffect = effect(() => {
        if (this.configService.transitionComplete()) {
            if (this.designerService.preset()) {
                this.initChart();
            }
        }
    });

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
                        label: 'My First dataset',
                        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: 'My Second dataset',
                        backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
                        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            };

            this.options = {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
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
                            color: textColorSecondary,
                            font: {
                                weight: 500
                            }
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
            this.cd.markForCheck()
        }
    }
}
```
</details>

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

