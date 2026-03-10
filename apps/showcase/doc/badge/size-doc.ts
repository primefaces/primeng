import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'size-doc',
    standalone: true,
    imports: [BadgeModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Badge sizes are adjusted with the <i>badgeSize</i> property that accepts <i>small</i>, <i>large</i> and <i>xlarge</i> as the possible alternatives to the default size. Currently sizes only apply to component mode.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center gap-1 items-end">
                <p-badge value="8" badgeSize="xlarge" severity="success" />
                <p-badge value="6" badgeSize="large" severity="warn" />
                <p-badge value="4" severity="info" />
                <p-badge value="2" badgeSize="small" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class SizeDoc {}
