import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'live-preview-doc',
    standalone: true,
    imports: [CommonModule, AppDocSectionText, RouterModule],
    template: `<app-docsectiontext>
        <p>After your CI pipeline completes successfully, your theme also becomes available in the Prime UI Theme Designer.</p>

        <ul class="leading-relaxed list-disc list-inside">
            <li>Navigate to the Prime UI library website.</li>
            <li>Click the ⚙️ icon at topbar to open up Designer Editor.</li>
            <li>Sign in with your license key and pass key credentials.</li>
            <li>Then select your theme from the available options to apply it across all demos and website content.</li>
            <li>
                Note that CI-generated themes are provided in read-only mode for preview purposes only and cannot be edited within the Theme Designer. The Migration Assistant is available to identify any missing tokens in your preset; however, if
                tokens are missing, they must be added manually in Figma as needed.
            </li>
        </ul>
    </app-docsectiontext>`
})
export class LivePreviewDoc {}
