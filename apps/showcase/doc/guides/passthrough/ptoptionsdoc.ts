import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'use-pt-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>The <i>⁠ptOptions</i> property determines how a component's local PassThrough configuration merges with the global PT configuration, as demonstrated in the following examples using both global and component-level settings.</p>
            <p class="mt-4">
                The <i>mergeSections</i> defines whether the sections from the main configuration gets added and the <i>mergeProps</i> controls whether to override or merge the defined props. Defaults are <i>true</i> for <i>mergeSections</i> and
                <i>false</i> for <i>mergeProps</i>.
            </p>
            <h3>Global Configuration</h3>
            <app-code [code]="codeGlobal" hideToggleCode importCode hideStackBlitz />

            <h3>mergeSections: true, mergeProps: false (default)</h3>
            <app-code [code]="codeComponent" hideToggleCode importCode hideStackBlitz />

            <h3>mergeSections: true, mergeProps: true</h3>
            <app-code [code]="codeComponentTrueTrue" hideToggleCode importCode hideStackBlitz />

            <h3>mergeSections: false, mergeProps: true</h3>
            <app-code [code]="codeComponentFalseTrue" hideToggleCode importCode hideStackBlitz />

            <h3>mergeSections: false, mergeProps: false</h3>
            <app-code [code]="codeComponentFalseFalse" hideToggleCode importCode hideStackBlitz />
        </app-docsectiontext>
    `
})
export class PTOptionsDoc {
    codeGlobal: Code = {
        typescript: `import { ApplicationConfig } from '@angular/core';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
    providers: [
        providePrimeNG({
            pt: {
                panel: {
                    header: {
                        'data-custom': 'acme-panel',
                        class: 'bg-primary text-primary-contrast'
                    },
                    content: 'font-medium'
                }
            }
        })
    ]
};`
    };

    codeComponent: Code = {
        typescript: `import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'panel-pt-demo',
    template: \`
        <p-panel [pt]="pt">
            Content
        </p-panel>
    \`,
    standalone: true,
    imports: [PanelModule]
})
export class PanelPtDemo {
    pt = {
         header: {
            class: 'border border-primary'
        }
    };
}
    
// Output:
// panel.header.data-custom => 'acme-panel'
// panel.header.class => 'border border-primary'
// panel.content.class => 'font-medium'`
    };

    codeComponentTrueTrue: Code = {
        typescript: `import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'panel-pt-demo',
    template: \`
        <p-panel [pt]="pt" [ptOptions]="{mergeSections: true, mergeProps: true}">
            Content
        </p-panel>
    \`,
    standalone: true,
    imports: [PanelModule]
})
export class PanelPtDemo {
    pt = {
         header: {
            class: 'bg-primary text-primary-contrast'
        }
    };
}
    
// Output:
// panel.header.data-custom => 'acme-panel'
// panel.header.class => 'bg-primary text-primary-contrast border border-primary'
// panel.content.class => 'font-medium'`
    };

    codeComponentFalseTrue: Code = {
        typescript: `import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'panel-pt-demo',
    template: \`
        <p-panel [pt]="pt" [ptOptions]="{mergeSections: false, mergeProps: true}">
            Content
        </p-panel>
    \`,
    standalone: true,
    imports: [PanelModule]
})
export class PanelPtDemo {
    pt = {
         header: {
            class: 'bg-primary text-primary-contrast'
        }
    };
}
    
// Output:
// panel.header.class => 'bg-primary text-primary-contrast border border-primary'`
    };

    codeComponentFalseFalse: Code = {
        typescript: `import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'panel-pt-demo',
    template: \`
        <p-panel [pt]="pt" [ptOptions]="{mergeSections: false, mergeProps: false}">
            Content
        </p-panel>
    \`,
    standalone: true,
    imports: [PanelModule]
})
export class PanelPtDemo {
    pt = {
         header: {
            class: 'bg-primary text-primary-contrast'
        }
    };
}
    
// Output:
// panel.header.class => 'border border-primary'`
    };
}
