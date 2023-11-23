import { Component } from '@angular/core';

@Component({
    selector: 'switch-themes-doc',
    template: ` 
        <app-docsectiontext>
            <p>Themes can be switched on-the-fly so that users of your app can choose their own theme. We have created a video tutorial that goes through the steps.</p>
        </app-docsectiontext>
        <div class="video-container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/5VOuUdDXRsE" frameborder="0" allowfullscreen></iframe>
        </div>
    `
})
export class SwitchThemesDoc {
  
}
