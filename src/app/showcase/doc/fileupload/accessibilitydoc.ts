import { Component } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: `
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>FileUpload uses a hidden native <i>input</i> element with <i>type="file"</i> for screen readers.</p>
            <h3>Keyboard Support</h3>
            <p>Interactive elements of the uploader are buttons, visit the <a routerLink="/button#accessibility">Button</a> accessibility section for more information.</p>
        </app-docsectiontext>
    `
})
export class AccessibilityDoc {

}
