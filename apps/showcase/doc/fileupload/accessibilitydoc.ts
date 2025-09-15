import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'file-upload-accessibility-doc',
    standalone: true,
    imports: [AppDocSectionText, RouterModule],
    template: `
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>FileUpload uses a hidden native <i>input</i> element with <i>type="file"</i> for screen readers.</p>
            <h3>Keyboard Support</h3>
            <p>Interactive elements of the uploader are buttons, visit the <a routerLink="/button#accessibility">Button</a> accessibility section for more information.</p>
        </app-docsectiontext>
    `
})
export class AccessibilityDoc {}
