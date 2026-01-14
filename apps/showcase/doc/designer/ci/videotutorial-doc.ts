import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'videotutorial-doc',
    standalone: true,
    imports: [CommonModule, AppDocSectionText, RouterModule],
    template: `<app-docsectiontext>
        <p>Before diving into the implementation details, if you would like to understand the final outcome and see how the solution operates, please refer to the video tutorial for a comprehensive walkthrough and demonstration.</p>
        <div class="video-container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/ksNPUrCYcto?si=1DkGOTp46gaziUKy" frameborder="0" allowfullscreen></iframe>
        </div>
    </app-docsectiontext>`
})
export class VideoTutorialDoc {}
