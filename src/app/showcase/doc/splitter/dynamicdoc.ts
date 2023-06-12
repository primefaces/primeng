import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'dymamic-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>In this example you can add/remove dynamically panels.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3">
            <p-button label="Add Panel" (onClick)="addPanel()"></p-button>  
            <p-button label="Remove Panel" (onClick)="removePanel()" styleClass="p-button-danger"></p-button>
        </div>
        <div class="card">
            <p-splitter [style]="{ height: '300px' }" styleClass="mb-5">
                <ng-container *ngFor="let item of items">
                    <ng-template pTemplate>
                        <div class="col flex align-items-center justify-content-center">{{item}}</div>
                    </ng-template>
                </ng-container>
            </p-splitter>
        </div>
        <app-code [code]="code" selector="splitter-horizontal-demo"></app-code>
    </section>`
})
export class DynamicSplitterDoc {
    @Input() id: string;

    @Input() title: string;

    public items: string[] = ['Panel 1', 'Panel 2'];

    addPanel() {
        this.items.push('Panel ' + (this.items.length + 1));
    }

    removePanel() {
        this.items.pop();
    }

    code: Code = {
        basic: `
<p-splitter [style]="{ height: '300px' }" styleClass="mb-5">
    <ng-container *ngFor="let item of items">
        <ng-template pTemplate>
            <div class="col flex align-items-center justify-content-center">{{item}}</div>
        </ng-template>
    </ng-container>
</p-splitter>`,

        html: `
<div class="card flex flex-wrap gap-3">
    <p-button label="Add Panel" (onClick)="addPanel()"></p-button>  
    <p-button label="Remove Panel" (onClick)="removePanel()" styleClass="p-button-danger"></p-button>
</div>
<div class="card">
    <p-splitter [style]="{ height: '300px' }" styleClass="mb-5">
    <ng-container *ngFor="let item of items">
        <ng-template pTemplate>
            <div class="col flex align-items-center justify-content-center">{{item}}</div>
        </ng-template>
    </ng-container>
    </p-splitter>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'splitter-dynamic-demo',
    templateUrl: './splitter-dynamic-demo.html'
})
export class DynamicSplitterDemo {
    public items: string[] = ['Panel 1', 'Panel 2'];

    addPanel() {
        this.items.push('Panel ' + (this.items.length + 1));
    }
    
    removePanel() {
        this.items.pop();
    }
}`
    };
}
