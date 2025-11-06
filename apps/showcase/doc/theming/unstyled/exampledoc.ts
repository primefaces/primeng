import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'example-doc',
    standalone: true,
    imports: [AppDocSectionText, FormsModule, RouterModule, AppCode, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>
                Here is a sample that styles a button component with Tailwind CSS using <a routerLink="/passthrough">pass through</a> attributes. Before beginning, head over to the the pass through section at
                <a routerLink="/button">button</a> documentation to learn more about the components internals section. We'll be using the <i>root</i>, <i>label</i> and <i>icon</i> elements to add a custom style.
            </p>
            <div class="card flex justify-center">
                <p-button label="Search" icon="pi pi-search" [unstyled]="true" [pt]="pt" />
            </div>
            <app-code [code]="code" hideToggleCode hideStackBlitz />
        </app-docsectiontext>
    `
})
export class ExampleDoc {
    pt = {
        root: 'bg-teal-500 hover:bg-teal-700 active:bg-teal-900 cursor-pointer py-2 px-4 rounded-full border-0 flex gap-2',

        label: 'text-white font-bold text-lg',

        icon: 'text-white text-xl'
    };

    code: Code = {
        typescript: `import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
    providers: [
        providePrimeNG({
            unstyled: true
        })
    ]
};`
    };
}
