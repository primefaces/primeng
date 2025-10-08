import { Component } from '@angular/core';
import { PTViewer } from './PTViewer';

@Component({
    selector: 'drawer-pt-component',
    standalone: true,
    imports: [PTViewer],
    template: `<drawer-pt-viewer />`
})
export class PTComponent {}
