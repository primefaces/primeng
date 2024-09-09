import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>
                For custom content support define a ng-template with <i>pTemplate</i> where the local ng-template variable refers to an
                option in the options collection.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-select-button [options]="justifyOptions" [(ngModel)]="value" optionLabel="justify">
                <ng-template pTemplate="item" let-item>
                    <i [class]="item.icon"></i>
                    <span>{{ item.justify }}</span>
                </ng-template>
            </p-select-button>
        </div>
        <app-code [code]="code" selector="select-button-template-demo"></app-code>
    `,
})
export class TemplateDoc {
    value: any;

    justifyOptions: any[] = [
        { icon: 'pi pi-align-left', justify: 'Left' },
        { icon: 'pi pi-align-right', justify: 'Right' },
        { icon: 'pi pi-align-center', justify: 'Center' },
        { icon: 'pi pi-align-justify', justify: 'Justify' },
    ];

    code: Code = {
        basic: `<p-select-button 
    [options]="justifyOptions" 
    [(ngModel)]="value" 
    optionLabel="justify">
        <ng-template pTemplate="item" let-item>
            <i [class]="item.icon"></i>
        </ng-template>
</p-select-button>`,

        html: `<div class="card flex justify-center">
    <p-select-button 
        [options]="justifyOptions" 
        [(ngModel)]="value" 
        optionLabel="justify">
            <ng-template pTemplate="item" let-item>
                <i [class]="item.icon"></i>
            </ng-template>
    </p-select-button>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
    selector: 'select-button-template-demo',
    templateUrl: './select-button-template-demo.html',
    standalone: true,
    imports: [FormsModule, SelectButtonModule]
})
export class SelectButtonTemplateDemo {
    value: any;

    justifyOptions: any[] = [
        { icon: 'pi pi-align-left', justify: 'Left' },
        { icon: 'pi pi-align-right', justify: 'Right' },
        { icon: 'pi pi-align-center', justify: 'Center' },
        { icon: 'pi pi-align-justify', justify: 'Justify' }
    ];

}`,
    };
}
