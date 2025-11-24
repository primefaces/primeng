import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const inlineStyles = {
    root: () => ({ position: 'absolute', top: '0' })
};

const style = /*css*/ `
.p-overlay-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-overlay-content {
    transform-origin: inherit;
    will-change: transform;
}

/* Github Issue #18560 */
.p-component-overlay.p-component {
    position: relative;
}

.p-overlay-modal > .p-overlay-content {
    z-index: 1;
    width: 90%;
}

/* Position */
/* top */
.p-overlay-top {
    align-items: flex-start;
}
.p-overlay-top-start {
    align-items: flex-start;
    justify-content: flex-start;
}
.p-overlay-top-end {
    align-items: flex-start;
    justify-content: flex-end;
}

/* bottom */
.p-overlay-bottom {
    align-items: flex-end;
}
.p-overlay-bottom-start {
    align-items: flex-end;
    justify-content: flex-start;
}
.p-overlay-bottom-end {
    align-items: flex-end;
    justify-content: flex-end;
}

/* left */
.p-overlay-left {
    justify-content: flex-start;
}
.p-overlay-left-start {
    justify-content: flex-start;
    align-items: flex-start;
}
.p-overlay-left-end {
    justify-content: flex-start;
    align-items: flex-end;
}

/* right */
.p-overlay-right {
    justify-content: flex-end;
}
.p-overlay-right-start {
    justify-content: flex-end;
    align-items: flex-start;
}
.p-overlay-right-end {
    justify-content: flex-end;
    align-items: flex-end;
}

.p-overlay-content ~ .p-overlay-content {
    display: none;
}
`;

const classes = {
    host: 'p-overlay-host',
    root: ({ instance }: { instance: any }) => [
        'p-overlay p-component',
        {
            'p-overlay-modal p-overlay-mask p-overlay-mask-enter': instance.modal,
            'p-overlay-center': instance.modal && instance.overlayResponsiveDirection === 'center',
            'p-overlay-top': instance.modal && instance.overlayResponsiveDirection === 'top',
            'p-overlay-top-start': instance.modal && instance.overlayResponsiveDirection === 'top-start',
            'p-overlay-top-end': instance.modal && instance.overlayResponsiveDirection === 'top-end',
            'p-overlay-bottom': instance.modal && instance.overlayResponsiveDirection === 'bottom',
            'p-overlay-bottom-start': instance.modal && instance.overlayResponsiveDirection === 'bottom-start',
            'p-overlay-bottom-end': instance.modal && instance.overlayResponsiveDirection === 'bottom-end',
            'p-overlay-left': instance.modal && instance.overlayResponsiveDirection === 'left',
            'p-overlay-left-start': instance.modal && instance.overlayResponsiveDirection === 'left-start',
            'p-overlay-left-end': instance.modal && instance.overlayResponsiveDirection === 'left-end',
            'p-overlay-right': instance.modal && instance.overlayResponsiveDirection === 'right',
            'p-overlay-right-start': instance.modal && instance.overlayResponsiveDirection === 'right-start',
            'p-overlay-right-end': instance.modal && instance.overlayResponsiveDirection === 'right-end'
        }
    ],
    content: 'p-overlay-content'
};

@Injectable()
export class OverlayStyle extends BaseStyle {
    name = 'overlay';

    style = style;

    classes = classes;

    inlineStyles = inlineStyles;
}
