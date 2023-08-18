import { Component, Input } from '@angular/core';

@Component({
    selector: 'videos-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p><a href="https://angular.io/cli">Angular CLI</a> is the recommended way to build Angular applications with PrimeNG.</p>
        </app-docsectiontext>
        <div class="video-container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/_Zel-Eapb9Y" frameborder="0" allowfullscreen></iframe>
        </div>
    </section>`
})
export class VideosDoc {
    @Input() id: string;

    @Input() title: string;
}
