import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'animations-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Various components utilize Angular animations to improve the user experience. Animations have their own module <i>BrowserAnimationsModule</i> is required to be imported in your application. If you prefer to disable animations
                globally, import <i>NoopAnimationsModule</i> instead.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class AnimationsDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        typescript: `import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        //...
    ],
    //...
})
export class AppModule { }`
    };
}
