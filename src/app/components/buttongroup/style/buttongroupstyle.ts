import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-buttongroup .p-button {
    margin: 0;
}

.p-buttongroup .p-button:not(:last-child),
.p-buttongroup .p-button:not(:last-child):hover {
    border-right: 0 none;
}

.p-buttongroup .p-button:not(:first-of-type):not(:last-of-type) {
    border-radius: 0;
}

.p-buttongroup .p-button:first-of-type:not(:only-of-type) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.p-buttongroup .p-button:last-of-type:not(:only-of-type) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.p-buttongroup .p-button:focus {
    position: relative;
    z-index: 1;
}

.p-buttongroup {
    display:flex;
}

.p-buttongroup > .p-button {
    flex: 1;
}

/* For PrimeNG */

.p-buttongroup .p-button:focus,
.p-buttongroup p-button:focus .p-button,
.p-buttonset .p-button:focus,
.p-buttonset .p-button:focus,
.p-buttonset p-button:focus .p-button,
.p-buttonset .p-button:focus {
    position: relative;
    z-index: 1;
}

.p-buttongroup .p-button:not(:last-child),
.p-buttongroup .p-button:not(:last-child):hover,
.p-buttongroup p-button:not(:last-child) .p-button,
.p-buttongroup p-button:not(:last-child) .p-button:hover,
.p-buttonset .p-button:not(:last-child),
.p-buttonset .p-button:not(:last-child):hover,
.p-buttonset p-button:not(:last-child) .p-button,
.p-buttonset p-button:not(:last-child) .p-button:hover {
    border-right: 0 none;
}

.p-buttongroup .p-button:not(:first-of-type):not(:last-of-type),
.p-buttongroup p-button:not(:first-of-type):not(:last-of-type) .p-button,
.p-buttonset .p-button:not(:first-of-type):not(:last-of-type),
.p-buttonset p-button:not(:first-of-type):not(:last-of-type) .p-button {
    border-radius: 0;
}

.p-buttongroup .p-button:first-of-type:not(:only-of-type),
.p-buttongroup p-button:first-of-type:not(:only-of-type) .p-button,
.p-buttonset .p-button:first-of-type:not(:only-of-type),
.p-buttonset p-button:first-of-type:not(:only-of-type) .p-button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.p-buttongroup .p-button:last-of-type:not(:only-of-type),
.p-buttongroup p-button:last-of-type:not(:only-of-type) .p-button,
.p-buttonset .p-button:last-of-type:not(:only-of-type),
.p-buttonset p-button:last-of-type:not(:only-of-type) .p-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

p-button[iconpos='right'] spinnericon {
    order: 1;
}
`;

const classes = {
    root: 'p-buttongroup p-component'
};

@Injectable()
export class ButtonGroupStyle extends BaseStyle {
    name = 'buttongroup';

    theme = theme;

    classes = classes;
}
