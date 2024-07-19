import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-inputotp {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.p-inputotp-input {
    text-align: center;
    width: 2.5rem;
}
`;

const classes = {
    root: 'p-inputotp p-component',
    pcInput: 'p-inputotp-input'
};

@Injectable()
export class InputOtpStyle extends BaseStyle {
    name = 'inputotp';

    theme = theme;

    classes = classes;
}
