import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'global-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>
                A global configuration can be created at application level to avoid repetition via the global <i>pt</i> option so that the styles can be shared from a single location. A particular component can still override a global configuration
                with its own <i>pt</i> property.
            </p>
            <app-code hideToggleCode importCode hideStackBlitz />
        </app-docsectiontext>
    `
})
export class GlobalDoc {}
