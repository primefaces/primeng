import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';

@Component({
    selector: 'lifecycle-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>
                Lifecycle hooks of components are exposed as pass through using the <i>hooks</i> property so that callback functions can be registered. Available callbacks are <i>onBeforeInit</i>, <i>onInit</i>, <i>onChanges</i>, <i>onDoCheck</i>,
                <i>onAfterContentInit</i>, <i>onAfterContentChecked</i>, <i>onAfterViewInit</i>, <i>onAfterViewChecked</i> and <i>onDestroy</i>. Refer to the Angular documentation for detailed information about lifecycle hooks.
            </p>
        </app-docsectiontext>

        <app-code hideToggleCode importCode hideStackBlitz />
    `
})
export class LifeCycleDoc {}
