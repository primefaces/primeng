import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
    .p-fluid{
        width:100%
    }
`;

const classes = {
    root: 'p-fluid'
};

@Injectable()
export class FluidStyle extends BaseStyle {
    name = 'fluid';

    classes = classes;

    theme = theme
}
