import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'v21-breaking-doc',
    standalone: true,
    imports: [AppDocSectionText, RouterModule],
    template: `
        <app-docsectiontext>
            <p>
                Beginning with PrimeNG v20, PrimeTek adopted a no-breaking-change policy for incremental major version updates. PrimeNG v21 maintains this policy with one exception: due to the deprecation of Angular's animations package in Angular
                v20.2, we have migrated to native CSS-based animations. Consequently, the <i>showTransitionOptions</i> and <i>hideTransitionOptions</i> properties that belong to the animations api are deprecated in v21 and no longer functional. v21
                will not cause an error as the properties still exist, however your customizations will be ignored. If you currently use these properties for animation customization, please refer to the new
                <a routerLink="/guides/animations" class="text-primary font-medium hover:underline">animations documentation</a> for the updated approach.
            </p>
            <p>Other than this case, v21 should be a drop-in replacement. If you face with any issues during upgrade, please report an issue using at GitHub.</p>
        </app-docsectiontext>
    `
})
export class BreakingDoc {}
