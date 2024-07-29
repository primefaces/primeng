import { Component } from '@angular/core';

@Component({
    selector: 'helpneeded-doc',
    template: `
        <app-docsectiontext>
        <p>PrimeNG is a community-driven project backed by the expertise and sponsorship of PrimeTek, and we appreciate any help you can provide. Here are some areas where you can contribute:</p>
        <h3>Issue Triage</h3>
        <p>Help us manage issues by;</p>
        <ul class="line-height-3 px-10 m-0">
            <li>Reproducing reported bugs</li>
            <li>Clarifying issue descriptions</li>
            <li>Tagging issues with appropriate labels</li>
        </ul>

        <h3>Sending Pull Requests</h3>
        <p>We encourage you to send pull requests, especially for issues tagged with the <i>help-needed</i> label.</p>

        <h3>Community Support</h3>
        <p>Assist other users by participating in the issue tracker, GitHub discussions, and the PrimeLand Discord server. Your expertise can help others solve problems and improve their experience with PrimeNG.</p>
        </app-docsectiontext>
    `
})
export class HelpNeededDoc {

}
