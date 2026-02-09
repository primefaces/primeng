import type { ChartData, ChartOptions, Plugin } from 'chart.js';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Defines the type of chart.
 * @group Types
 */
export type ChartType = 'bar' | 'line' | 'scatter' | 'bubble' | 'pie' | 'doughnut' | 'polarArea' | 'radar';

/**
 * Re-export chart.js types for convenience.
 * @group Types
 */
export type { ChartData, ChartOptions, Plugin as ChartPlugin };

/**
 * Event emitted when chart data is selected.
 * @group Events
 */
export interface ChartDataSelectEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Selected element.
     */
    element: unknown;
    /**
     * Selected dataset.
     */
    dataset: unknown[];
}

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link UIChart.pt}
 * @group Interface
 */
export interface ChartPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the canvas DOM element.
     */
    canvas?: PassThroughOption<HTMLCanvasElement, I>;
}

/**
 * Defines valid pass-through options in Chart.
 * @see {@link ChartPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ChartPassThrough<I = unknown> = PassThrough<I, ChartPassThroughOptions<I>>;
