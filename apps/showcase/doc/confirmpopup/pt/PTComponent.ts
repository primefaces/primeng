import { Component } from '@angular/core';
import { PTViewer } from './PTViewer';

@Component({
    selector: 'confirmpopup-pt-component',
    standalone: true,
    imports: [PTViewer],
    template: `<confirmpopup-pt-viewer />`
})
export class PTComponent {}
