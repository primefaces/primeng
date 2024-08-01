import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-orderlist {
    display: flex;
    gap: ${dt('orderlist.gap')};
}

.p-orderlist-controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${dt('orderlist.controls.gap')};
}
`;

const classes = {
    root: 'p-orderlist p-component',
    controls: 'p-orderlist-controls'
};

@Injectable()
export class OrderListStyle extends BaseStyle {
    name = 'orderlist';

    theme = theme;

    classes = classes;
}
