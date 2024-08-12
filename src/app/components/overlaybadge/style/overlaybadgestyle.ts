import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-overlaybadge {
    position: relative;
}

.p-overlaybadge .p-badge {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
    margin: 0;
    outline-width: ${dt('overlaybadge.outline.width')};
    outline-style: solid;
    outline-color: ${dt('overlaybadge.outline.color')};
}
`;

const classes = {
     root: 'p-overlaybadge'
};

@Injectable()
export class OverlayBadgeStyle extends BaseStyle {
    name = 'overlaybadge';

    theme = theme;

    classes = classes;
}
