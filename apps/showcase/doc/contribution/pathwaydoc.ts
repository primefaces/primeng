import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'pathway-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>PrimeTek offers an organization structure involving contributors and the core team:</p>
            <h3>Contributor Role</h3>
            <p>After a certain period of frequent contributions, a community member is offered the Contributor role. On average, it may take about three months, but the exact duration can vary depending on the individual commitment.</p>

            <h3>Committer Role</h3>
            <p>If a contributor actively participates in the codebase and PRs, their role may be upgraded to a Committer level, providing direct commit access to the PrimeNG codebase.</p>

            <h3>Employment</h3>
            <p>PrimeTek prefers to hire team members from open source committers, so you may be offered a full-time position when a position becomes available.</p>
        </app-docsectiontext>
    `
})
export class PathwayDoc {}
