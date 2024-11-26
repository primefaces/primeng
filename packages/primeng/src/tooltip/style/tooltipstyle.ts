import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-tooltip {
    position: absolute;
    display: none;
    max-width: ${dt('tooltip.max.width')};
}

.p-tooltip-right,
.p-tooltip-left {
    padding: 0 ${dt('tooltip.gutter')};
}

.p-tooltip-top,
.p-tooltip-bottom {
    padding: ${dt('tooltip.gutter')} 0;
}

.p-tooltip-text {
    white-space: pre-line;
    word-break: break-word;
    background: ${dt('tooltip.background')};
    color: ${dt('tooltip.color')};
    padding: ${dt('tooltip.padding')};
    box-shadow: ${dt('tooltip.shadow')};
    border-radius: ${dt('tooltip.border.radius')};
}

.p-tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    scale: 2;
}

.p-tooltip-right .p-tooltip-arrow {
    top: 50%;
    left: 0;
    margin-top: calc(-1 * ${dt('tooltip.gutter')});
    border-width: ${dt('tooltip.gutter')} ${dt('tooltip.gutter')} ${dt('tooltip.gutter')} 0;
    border-right-color: ${dt('tooltip.background')};
}

.p-tooltip-left .p-tooltip-arrow {
    top: 50%;
    right: 0;
    margin-top: calc(-1 * ${dt('tooltip.gutter')});
    border-width: ${dt('tooltip.gutter')} 0 ${dt('tooltip.gutter')} ${dt('tooltip.gutter')};
    border-left-color: ${dt('tooltip.background')};
}

.p-tooltip-top .p-tooltip-arrow {
    bottom: 0;
    left: 50%;
    margin-left: calc(-1 * ${dt('tooltip.gutter')});
    border-width: ${dt('tooltip.gutter')} ${dt('tooltip.gutter')} 0 ${dt('tooltip.gutter')};
    border-top-color: ${dt('tooltip.background')};
    border-bottom-color: ${dt('tooltip.background')};
}

.p-tooltip-bottom .p-tooltip-arrow {
    top: 0;
    left: 50%;
    margin-left: calc(-1 * ${dt('tooltip.gutter')});
    border-width: 0 ${dt('tooltip.gutter')} ${dt('tooltip.gutter')} ${dt('tooltip.gutter')};
    border-top-color: ${dt('tooltip.background')};
    border-bottom-color: ${dt('tooltip.background')};
}
`;

const classes = {
    root: 'p-tooltip p-component',
    arrow: 'p-tooltip-arrow',
    text: 'p-tooltip-text'
};

@Injectable()
export class TooltipStyle extends BaseStyle {
    name = 'tooltip';

    theme = theme;

    classes = classes;
}

/**
 *
 * Tooltip directive provides advisory information for a component.
 *
 * [Live Demo](https://www.primeng.org/tooltip)
 *
 * @module tooltipstyle
 *
 */
export enum TooltipClasses {
    /**
     * Class name of the root element
     */
    root = 'p-tooltip',
    /**
     * Class name of the arrow element
     */
    arrow = 'p-tooltip-arrow',
    /**
     * Class name of the text element
     */
    text = 'p-tooltip-text'
}

export interface TooltipStyle extends BaseStyle {}
