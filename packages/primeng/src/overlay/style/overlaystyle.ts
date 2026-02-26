import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const inlineStyles = {
    root: ({ instance }: { instance: any }) => {
        const modal = instance.modal();
        const responsiveStyle = modal ? instance.$overlayResponsiveOptions()?.style : instance.$overlayOptions()?.style;
        return {
            position: 'absolute',
            top: '0',
            ...responsiveStyle,
            ...instance.style()
        };
    },
    content: ({ instance }: { instance: any }) => {
        const modal = instance.modal();
        const responsiveContentStyle = modal ? instance.$overlayResponsiveOptions()?.contentStyle : instance.$overlayOptions()?.contentStyle;
        return {
            ...responsiveContentStyle,
            ...instance.contentStyle()
        };
    }
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
    root: ({ instance }: { instance: any }) => {
        const modal = instance.modal();
        const dir = instance.overlayResponsiveDirection();
        return [
            'p-overlay p-component',
            {
                'p-overlay-modal p-overlay-mask p-overlay-mask-enter-active': modal,
                'p-overlay-center': modal && dir === 'center',
                'p-overlay-top': modal && dir === 'top',
                'p-overlay-top-start': modal && dir === 'top-start',
                'p-overlay-top-end': modal && dir === 'top-end',
                'p-overlay-bottom': modal && dir === 'bottom',
                'p-overlay-bottom-start': modal && dir === 'bottom-start',
                'p-overlay-bottom-end': modal && dir === 'bottom-end',
                'p-overlay-left': modal && dir === 'left',
                'p-overlay-left-start': modal && dir === 'left-start',
                'p-overlay-left-end': modal && dir === 'left-end',
                'p-overlay-right': modal && dir === 'right',
                'p-overlay-right-start': modal && dir === 'right-start',
                'p-overlay-right-end': modal && dir === 'right-end'
            }
        ];
    },
    content: 'p-overlay-content'
};

@Injectable()
export class OverlayStyle extends BaseStyle {
    name = 'overlay';

    style = style;

    classes = classes;

    inlineStyles = inlineStyles;
}
