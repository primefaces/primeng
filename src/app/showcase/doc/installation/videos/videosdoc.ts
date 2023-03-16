import { Component, Input } from '@angular/core';

@Component({
    selector: 'videos-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Video tutorials to take you through step-by-step.</p>
        </app-docsectiontext>
        <div class="video-container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/pkOx7bSBQsg" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>`
})
export class VideosDoc {
    @Input() id: string;

    @Input() title: string;
}
