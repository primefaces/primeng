import { Component, Input } from '@angular/core';

@Component({
    selector: 'switch-themes-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Themes can be switched on-the-fly so that users of your app can choose their own theme. We have created a video tutorial that goes through the steps.</p>
        </app-docsectiontext>
        <div class="video-container">

        </div>
    </section>`
})
export class SwitchThemesDoc {
    @Input() id: string;

    @Input() title: string;
}
