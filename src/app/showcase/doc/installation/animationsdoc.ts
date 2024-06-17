import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'animations-doc',
    template: `
        <app-docsectiontext>
            <p>
                Various components utilize Angular animations to improve the user experience. Animations have their own module <i>BrowserAnimationsModule</i> is required to be imported in your application. If you prefer to disable animations
                globally, import <i>NoopAnimationsModule</i> instead.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class AnimationsDoc {
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
