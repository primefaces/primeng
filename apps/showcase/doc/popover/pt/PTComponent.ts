import { Component } from '@angular/core';
import { PTViewer } from './PTViewer';

@Component({
    selector: 'popover-pt-component',
    standalone: true,
    imports: [PTViewer],
    template: `<popover-pt-viewer />`
})
export class PTComponent {}
