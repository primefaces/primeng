import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'template-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>For custom content support define a ng-template where the local ng-template variable refers to an option in the options collection.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-selectbutton [options]="justifyOptions" [(ngModel)]="value" optionLabel="justify">
                <ng-template #item let-item>
                    <i [class]="item.icon"></i>
                </ng-template>
            </p-selectbutton>
        </div>
        <app-code [code]="code" selector="select-button-template-demo"></app-code>

        <app-docsectiontext>
            <p class="mt-4">
                If you prefer using the PTemplate directive, use a ng-content with the structural directive
                <i>pTemplate</i> where the name of the <i>pTemplate</i> is the string 'item' and the <i>$implicit</i>
                variable refers to an option in the options collection
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-selectbutton [options]="justifyOptions" [(ngModel)]="value" optionLabel="justify">
                <ng-content *pTemplate="'item'; let item">
                    <i [class]="item.icon"></i>
                </ng-content>
            </p-selectbutton>
        </div>
        <app-code [code]="codePtemplate" />
    `
})
export class TemplateDoc {
    value: any;

    justifyOptions: any[] = [
        { icon: 'pi pi-align-left', justify: 'Left' },
        { icon: 'pi pi-align-right', justify: 'Right' },
        { icon: 'pi pi-align-center', justify: 'Center' },
        { icon: 'pi pi-align-justify', justify: 'Justify' }
    ];

    code: Code = {
        basic: `<p-selectbutton [options]="justifyOptions" [(ngModel)]="value" optionLabel="justify">
    <ng-template #item let-item>
        <i [class]="item.icon"></i>
    </ng-template>
</p-selectbutton>`,
        html: `<div class="card flex justify-center">
    <p-selectbutton [options]="justifyOptions" [(ngModel)]="value" optionLabel="justify">
            <ng-template #item let-item>
                <i [class]="item.icon"></i>
            </ng-template>
    </p-selectbutton>
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

}`
    };

    codePtemplate: Code = {
        basic: `<p-selectbutton [options]="justifyOptions" [(ngModel)]="value" optionLabel="justify">
      <ng-content *pTemplate="'item'; let item">
         <i [class]="item.icon"></i>
      </ng-content>
</p-selectbutton>`,
        html: `<div class="card flex justify-center">
    <p-selectbutton [options]="justifyOptions" [(ngModel)]="value" optionLabel="justify">
       <ng-content *pTemplate="'item'; let item">
         <i [class]="item.icon"></i>
      </ng-content>
    </p-selectbutton>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PrimeTemplate } from 'primeng/api';

@Component({
    selector: 'select-button-template-demo',
    templateUrl: './select-button-template-demo.html',
    standalone: true,
    imports: [FormsModule, SelectButtonModule, PrimeTemplate]
})
export class SelectButtonTemplateDemo {
    value: any;

    justifyOptions: any[] = [
        { icon: 'pi pi-align-left', justify: 'Left' },
        { icon: 'pi pi-align-right', justify: 'Right' },
        { icon: 'pi pi-align-center', justify: 'Center' },
        { icon: 'pi pi-align-justify', justify: 'Justify' }
    ];

}`
    };
}
