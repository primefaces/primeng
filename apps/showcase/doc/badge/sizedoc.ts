import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'badge-size-demo',
    standalone: true,
    imports: [BadgeModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Badge sizes are adjusted with the <i>badgeSize</i> property that accepts <i>small</i>, <i>large</i> and <i>xlarge</i> as the possible alternatives to the default size. Currently sizes only apply to component mode.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-1 items-end">
            <p-badge value="8" badgeSize="xlarge" severity="success" />
            <p-badge value="6" badgeSize="large" severity="warn" />
            <p-badge value="4" severity="info" />
            <p-badge value="2" badgeSize="small" />
        </div>
        <app-code selector="badge-size-demo"></app-code>
    `
})
export class SizeDoc {}
