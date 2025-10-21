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
            <p>An existing pass through configuration is customized with the <i>usePassThrough</i> utility. The first parameter is the object to customize, the second parameter is the customizations and the final parameter is the merge strategy.</p>
            <app-code [code]="code1" hideToggleCode importCode hideStackBlitz />
            <p class="mt-4">
                The <i>mergeSections</i> defines whether the sections from the main configuration gets added and the <i>mergeProps</i> controls whether to override or merge the defined props. Defaults are <i>true</i> for <i>mergeSections</i> and
                <i>false</i> for <i>mergeProps</i>.
            </p>
            <app-code class="block mb-4" [code]="code2" hideToggleCode importCode hideStackBlitz />
            <app-code class="block mb-4" [code]="code3" hideToggleCode importCode hideStackBlitz />
            <app-code class="block mb-4" [code]="code4" hideToggleCode importCode hideStackBlitz />
            <app-code [code]="code5" hideToggleCode importCode hideStackBlitz />
        </app-docsectiontext>
    `
})
export class UsePassThroughDoc {
    code1: Code = {
        typescript: `import { providePrimeNG } from 'primeng/config';
import { usePassThrough } from 'primeng/passthrough'
import BasePreset from "./basepreset";

const CustomPreset = usePassThrough(
    BasePreset,
    {
        panel: {
            title: {
                class: ['leading-none font-light text-2xl']
            }
        }
    },
    {
        mergeSections: true,
        mergeProps: false
    }
);

export const appConfig: ApplicationConfig = {
    providers: [
        ...
        providePrimeNG({
            theme: Noir,
            ripple: false,
            pt: CustomPreset
        }),
        ...
    ]
};`
    };

    code2: Code = {
        typescript: `const CustomPreset = usePassThrough(
    BasePreset,
    {
        panel: {
            header: 'my_panel_header'
        }
    },
    { mergeSections: true, mergeProps: false }
);

// Output:
// panel.header.class => 'my_panel_header'
// panel.title.class => Tailwind.panel.title.class
`
    };

    code3: Code = {
        typescript: `const CustomPreset = usePassThrough(
    BasePreset,
    {
        panel: {
            header: 'my_panel_header'
        }
    },
    { mergeSections: true, mergeProps: true }
);

// Output:
// panel.header.class => [Tailwind.panel.header.class, 'my_panel_header']
// panel.title.class => Tailwind.panel.title.class
`
    };

    code4: Code = {
        typescript: `const CustomPreset = usePassThrough(
    BasePreset,
    {
        panel: {
            header: 'my_panel_header'
        }
    },
    { mergeSections: false, mergeProps: true }
);

// Output:
// panel.header.class => [Tailwind.panel.header.class, 'my_panel_header']
// panel.title.class => undefined
`
    };

    code5: Code = {
        typescript: `const CustomPreset = usePassThrough(
    BasePreset,
    {
        panel: {
            header: 'my_panel_header'
        }
    },
    { mergeSections: false, mergeProps: false }
);

// Output:
// panel.header.class => 'my_panel_header'
// panel.title.class => undefined
`
    };
}
