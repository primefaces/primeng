import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
/* For PrimeNG */
.p-ripple {
    overflow: hidden;
    position: relative;
}

.p-ink {
    display: block;
    position: absolute;
    background: ${dt('ripple.background')};
    border-radius: 100%;
    transform: scale(0);
}

.p-ink-active {
    animation: ripple 0.4s linear;
}

.p-ripple-disabled .p-ink {
    display: none !important;
}

@keyframes ripple {
100% {
    opacity: 0;
    transform: scale(2.5);
}
}

`;

const classes = {
    root: 'p-ink',
};

@Injectable()
export class RippleStyle extends BaseStyle {
    name = 'ripple';

    theme = theme;

    classes = classes;
}
