import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'roadmap-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `<app-docsectiontext>
        <ul class="leading-normal px-10 mb-2 list-disc">
            <li>
                <div class="font-bold">Are there plans to add a Tailwind theme to the UI Kit?</div>
                <p>At this time, we do not plan to include Tailwind theme support in the Figma UI Kit.</p>
            </li>
        </ul>
    </app-docsectiontext>`
})
export class RoadmapDoc {}
