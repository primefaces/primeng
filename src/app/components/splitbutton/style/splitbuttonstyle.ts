import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-splitbutton {
    display: inline-flex;
    position: relative;
    border-radius: ${dt('splitbutton.border.radius')};
}

.p-splitbutton-button.p-button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0 none;
}

.p-splitbutton-button.p-button:focus-visible,
.p-splitbutton-dropdown.p-button:focus-visible {
    z-index: 1;
}

.p-splitbutton-button.p-button:not(:disabled):hover,
.p-splitbutton-button.p-button:not(:disabled):active {
    border-right: 0 none;
}

.p-splitbutton-dropdown.p-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.p-splitbutton .p-menu {
    min-width: 100%;
}

.p-splitbutton-fluid {
    display: flex;
}

.p-splitbutton-rounded .p-splitbutton-dropdown {
    border-top-right-radius: ${dt('splitbutton.rounded.border.radius')};
    border-bottom-right-radius: ${dt('splitbutton.rounded.border.radius')};
}

.p-splitbutton-rounded > .p-splitbutton-button {
    border-top-left-radius: ${dt('splitbutton.rounded.border.radius')};
    border-bottom-left-radius: ${dt('splitbutton.rounded.border.radius')};
}

.p-splitbutton-raised {
    box-shadow: ${dt('splitbutton.raised.shadow')};
}
`;

const classes = {
    root: ({ props }) => [
        'p-splitbutton p-component',
        {
            'p-splitbutton-raised': props.raised,
            'p-splitbutton-rounded': props.rounded,
            'p-splitbutton-fluid': props.fluid
        }
    ],
    pcButton: 'p-splitbutton-button',
    pcDropdown: 'p-splitbutton-dropdown'
};

@Injectable()
export class SplitButtonStyle extends BaseStyle {
    name = 'splitbutton';

    theme = theme;

    classes = classes;
}
