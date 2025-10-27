import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'life-cycle-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>
                Lifecycle hooks of components are exposed as pass through using the <i>hooks</i> property so that callback functions can be registered. Available callbacks are <i>onBeforeInit</i>, <i>onInit</i>, <i>onChanges</i>, <i>onDoCheck</i>,
                <i>onAfterContentInit</i>, <i>onAfterContentChecked</i>, <i>onAfterViewInit</i>, <i>onAfterViewChecked</i> and <i>onDestroy</i>. Refer to the Angular documentation for detailed information about lifecycle hooks.
            </p>
        </app-docsectiontext>

        <app-code [code]="code" hideToggleCode importCode hideStackBlitz />
    `
})
export class LifeCycleDoc {
    code: Code = {
        typescript: `import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
    template: \`
        <p-panel header="Header" [pt]="pt">
            Content
        </p-panel>
    \`,
    standalone: true,
    imports: [PanelModule]
})
export class PanelPtDemo {
   pt = {
        hooks: {
            onInit: () => {
                //panel ngOnInit
            },
            onDestroy: () => {
                //panel ngOnDestroy
            }
        }
    };
}`
    };
}
