# Angular Chart Component

Chart components are based on Charts.js 3.3.2+, an open source HTML5 based charting library.

## accessibility-doc

Screen Reader Chart components internally use canvas element, refer to the Chart.js accessibility guide for more information.

## basic-doc

A chart is configured with 3 properties; type , data and options . Chart type is defined using the type property that accepts pie , doughtnut , line , bar , radar and polarArea as a value. The data defines datasets represented with the chart and the options provide numerous customization options to customize the presentation.

## chartjs-doc

To begin with, first you must install the charts.js package using npm and then include it in your project. An example with CLI would be;

## combo-doc

Different chart types can be combined in the same graph using the type option of a dataset.

## doughnut-doc

A doughnut chart is a variant of the pie chart, with a blank center allowing for additional information about the data as a whole to be included.

## horizontalbar-doc

A bar chart is rendered horizontally when indexAxis option is set as y .

## line-doc

A line chart or line graph is a type of chart which displays information as a series of data points called 'markers' connected by straight line segments.

## linestyle-doc

Various styles of a line series can be customized to display customizations like an area chart.

## multiaxis-doc

Multiple axes can be added using the scales option.

## pie-doc

A pie chart is a circular statistical graphic which is divided into slices to illustrate numerical proportion.

## polararea-doc

Polar area charts are similar to pie charts, but each segment has the same angle - the radius of the segment differs depending on the value.

## radar-doc

A radar chart is a graphical method of displaying multivariate data in the form of a two-dimensional chart of three or more quantitative variables represented on axes starting from the same point.

## stackedbar-doc

Bars can be stacked on top of each other when stacked option of a scale is enabled.

## verticalbar-doc

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

