import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'size-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AvatarModule],
    template: `
        <app-docsectiontext>
            <p><i>size</i> property defines the size of the Avatar with <i>large</i> and <i>xlarge</i> as possible values.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-2">
            <p-avatar label="P" size="large" />
            <p-avatar label="T" size="xlarge" />
        </div>
        <app-code></app-code>
    `
})
export class SizeDoc {}
