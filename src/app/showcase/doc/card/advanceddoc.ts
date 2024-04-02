import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'card-advanced-demo',
    template: `
        <app-docsectiontext>
            <p>Card content can be customized further with <i>subHeader</i>, <i>header</i> and <i>footer</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-card header="Advanced Card" subheader="Card Subheader" [style]="{ width: '360px' }">
                <ng-template pTemplate="header">
                    <img alt="Card" src="https://primefaces.org/cdn/primeng/images/usercard.png" />
                </ng-template>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
                <ng-template pTemplate="footer">
                    <p-button label="Save" icon="pi pi-check"></p-button>
                    <p-button label="Cancel" icon="pi pi-times" styleClass="p-button-secondary" [style]="{ 'margin-left': '.5em' }"></p-button>
                </ng-template>
            </p-card>
        </div>
        <app-code [code]="code" selector="card-advanced-demo"></app-code>
    `
})
export class AdvancedDoc {
    code: Code = {
        basic: `<p-card header="Advanced Card" subheader="Card Subheader" [style]="{ width: '360px' }">
    <ng-template pTemplate="header">
        <img alt="Card" src="https://primefaces.org/cdn/primeng/images/usercard.png" />
    </ng-template>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
        quas!
    </p>
    <ng-template pTemplate="footer">
        <p-button label="Save" icon="pi pi-check"></p-button>
        <p-button label="Cancel" icon="pi pi-times" styleClass="p-button-secondary" [style]="{ 'margin-left': '.5em' }"></p-button>
    </ng-template>
</p-card>`,

        html: `
<div class="card flex justify-content-center">
    <p-card header="Advanced Card" subheader="Card Subheader" [style]="{ width: '360px' }">
        <ng-template pTemplate="header">
            <img alt="Card" src="https://primefaces.org/cdn/primeng/images/usercard.png" />
        </ng-template>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
        </p>
        <ng-template pTemplate="footer">
            <p-button label="Save" icon="pi pi-check"></p-button>
            <p-button label="Cancel" icon="pi pi-times" styleClass="p-button-secondary" [style]="{ 'margin-left': '.5em' }"></p-button>
        </ng-template>
    </p-card>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'card-advanced-demo',
    templateUrl: './card-advanced-demo.html'
})
export class CardAdvancedDemo {}`
    };
}
