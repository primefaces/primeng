import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: ${dt('toolbar.padding')};
    background: ${dt('toolbar.background')};
    border: 1px solid ${dt('toolbar.border.color')};
    color: ${dt('toolbar.color')};
    border-radius: ${dt('toolbar.border.radius')};
    gap: ${dt('toolbar.gap')};
}

.p-toolbar-start,
.p-toolbar-center,
.p-toolbar-end {
    display: flex;
    align-items: center;
}
`;

const classes = {
    root: 'p-toolbar p-component',
    start: 'p-toolbar-start',
    center: 'p-toolbar-center',
    end: 'p-toolbar-end'
};

@Injectable()
export class ToolbarStyle extends BaseStyle {
    name = 'toolbar';

    theme = theme;

    classes = classes;
}
