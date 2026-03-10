import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'size-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, AvatarModule],
    template: `
        <app-docsectiontext>
            <p><i>size</i> property defines the size of the Avatar with <i>large</i> and <i>xlarge</i> as possible values.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center gap-2">
                <p-avatar label="P" size="large" />
                <p-avatar label="T" size="xlarge" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class SizeDoc {}
