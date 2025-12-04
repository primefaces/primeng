import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'v21-breaking-doc',
    standalone: true,
    imports: [TagModule, AppDocSectionText, RouterModule],
    template: `
        <app-docsectiontext>
            <p>This version contains no API removals. For a list of APIs scheduled for removal in v22, refer to the <a routerLink="/theming/unstyled" class="text-primary font-medium hover:underline">v20 deprecations</a> section.</p>
        </app-docsectiontext>
    `
})
export class RemovalsDoc {}
