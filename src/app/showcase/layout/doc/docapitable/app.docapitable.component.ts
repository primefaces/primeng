import { Component, Input } from '@angular/core';

interface Props {
    id?: string;
    label?: string;
    data?: any[];
    description?: string;
    relatedProp?: string;
    level?: number;
}

@Component({
    selector: 'app-docapitable',
    templateUrl: './app.docapitable.component.html'
})
export class AppDocApiTable {
    @Input() props: Props;
}
