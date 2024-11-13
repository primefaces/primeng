import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'animations-doc',
    template: `
        <app-docsectiontext>
            <p>
                Various components utilize Angular animations to enhance the user experience. To enable animations in your application, you must import the <i>BrowserAnimationsModule</i>. If you prefer to disable animations globally, you can import
                <i>NoopAnimationsModule</i> instead.
            </p>
            <p>Starting from Angular 17, you can also use the <i>provideAnimationsAsync</i> function for configuring animations in a more efficient way, especially in larger applications where optimizing load times is crucial.</p>
        </app-docsectiontext>
        <div class="mb-4">
            <app-code [code]="code" [hideToggleCode]="true"></app-code>
        </div>
        <app-code [code]="code2" [hideToggleCode]="true"></app-code>
    `
})
export class AnimationsDoc {
    code: Code = {
        typescript: `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
    providers: [
        // Other providers...
        provideAnimationsAsync(),
    ],
};`
    };

    code2: Code = {
        typescript: `// main.ts
import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
`
    };
}
