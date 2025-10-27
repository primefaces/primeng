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
            <p>In cases where you need to access the UI Component instance, define a function that receives a <i>PassThroughContext</i> as parameter.</p>
        </app-docsectiontext>

        <app-code [code]="code" hideToggleCode importCode hideStackBlitz />
    `
})
export class InstanceDoc {
    code: Code = {
        typescript: `import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'panel-pt-demo',
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
        header: (context: PassThroughContext<Panel>) => {
            const instance = context.instance;
            const element = instance.el;

            return {
                id: 'myPanelHeader',
                'data-custom': 'prime',
                style: {
                    'user-select': 'none'
                },
                class: [{ 'overflow-hidden': instance.toggleable }, '!text-white font-bold !p-0 !bg-transparent !border-none']
            };
        }
    };
}`
    };
}
