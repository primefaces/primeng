import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'usage-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `<app-docsectiontext>
        <ul class="leading-normal px-10 mb-2 list-disc">
            <li>
                <div class="font-bold">What should we do after purchasing? I can't publish the Preview file?</div>
                <p>
                    The Preview file is <b>view-only</b>, so it can't be published. To use the library, download the .fig file from PrimeStore and import it into your Figma workspace. Once imported, you'll be able to open the file and publish it as a
                    library for use in your projects.
                </p>
            </li>
            <li>
                <div class="font-bold">How to change theme?</div>
                <p>
                    To enable theme switching in PrimeOne, you need to set up the Variable modes. Select the layers you want to switch between Light or Dark. Then, under Appearance, use the Apply variable modes icon to assign both the Semantic and
                    Component modes to the target theme.
                </p>
            </li>
        </ul>
    </app-docsectiontext>`
})
export class UsageDoc {}
