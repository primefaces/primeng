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
                Unstyled components require styling using your preferred approach. We recommend using Tailwind CSS with PassThrough attributes, a combination that works seamlessly together. The <i>tailwindcss-primeui</i> even provides special
                variants such as <i>p-outlined:</i>, <i>p-vertical</i> for the PrimeNG components.
            </p>
            <p>
                The example below demonstrates how to style a button component with Tailwind CSS using PassThrough attributes. Before you begin, refer to the
                <a routerLink="/passthrough" class="text-primary font-medium hover:underline">pass through</a> section in the button documentation to familiarize yourself with the component's internal structure and PassThrough attributes. In this
                example, we'll target the <i>root</i>, <i>label</i> and <i>icon</i> elements to apply custom styles.
            </p>

            <div class="card flex justify-center">
                <p-button
                    label="Search"
                    icon="pi pi-search"
                    [unstyled]="true"
                    [pt]="{
                        root: 'bg-teal-500 hover:bg-teal-700 active:bg-teal-900 cursor-pointer py-2 px-4 rounded-full border-0 flex gap-2',
                        label: 'text-white font-bold text-lg',
                        icon: 'text-white !text-xl'
                    }"
                />
            </div>
            <app-code [code]="code" hideToggleCode hideStackBlitz />
        </app-docsectiontext>
    `
})
export class ExampleDoc {
    code: Code = {
        typescript: `<p-button
    label="Search"
    icon="pi pi-search"
    [unstyled]="true"
    [pt]="{ 
        root: 'bg-teal-500 hover:bg-teal-700 active:bg-teal-900 cursor-pointer py-2 px-4 rounded-full border-0 flex gap-2', 
        label: 'text-white font-bold text-lg', 
        icon: 'text-white !text-xl' 
    }"
/>`
    };
}
