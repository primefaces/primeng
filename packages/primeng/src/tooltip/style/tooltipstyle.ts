import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';
import { style } from '@primeuix/styles/tooltip';
import { css } from '@primeuix/styled';

const theme = css`
    ${style}
    /* For PrimeNG */

    .p-tooltip-arrow {
        scale: 2;
    }

    .p-tooltip-right .p-tooltip-arrow {
        top: 50%;
        left: 0;
    }

    .p-tooltip-left .p-tooltip-arrow {
        top: 50%;
        right: 0;
    }

    .p-tooltip-top .p-tooltip-arrow {
        bottom: 0;
        left: 50%;
    }

    .p-tooltip-bottom .p-tooltip-arrow {
        top: 0;
        left: 50%;
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
