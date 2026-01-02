import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';

@Component({
    selector: 'instance-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>In cases where you need to access the UI Component instance, define a component passthrough type that exposes the component instance or a function that receives a <i>PassThroughContext</i> as parameter.</p>
        </app-docsectiontext>

        <app-code hideToggleCode importCode hideStackBlitz />
    `
})
export class InstanceDoc {}
