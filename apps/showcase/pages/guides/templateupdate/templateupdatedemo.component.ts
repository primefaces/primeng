import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    selector: 'template-update',
    standalone: true,
    imports: [AppDoc],
    templateUrl: './templateupdatedemo.component.html'
})
export class TemplateUpdateDemoComponent {
    docs = [];
}
