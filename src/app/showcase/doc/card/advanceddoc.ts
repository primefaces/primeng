import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'card-advanced-demo',
    template: `
        <app-docsectiontext>
            <p>
                Card content can be customized further with <i>subHeader</i>, <i>header</i> and
                <i>footer</i> properties.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-card header="Advanced Card" subheader="Card Subheader" [style]="{ width: '25rem', overflow: 'hidden' }">
                <ng-template pTemplate="header">
                    <img alt="Card" class="w-full" src="https://primefaces.org/cdn/primeng/images/card-ng.jpg" />
                </ng-template>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
                    repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam
                    perferendis esse, cupiditate neque quas!
                </p>
                <ng-template pTemplate="footer">
                    <div class="flex gap-4 mt-1">
                        <p-button label="Cancel" severity="secondary" class="w-full" styleClass="w-full" />
                        <p-button label="Save" class="w-full" styleClass="w-full" />
                    </div>
                </ng-template>
            </p-card>
        </div>
        <app-code [code]="code" selector="card-advanced-demo"></app-code>
    `,
})
export class AdvancedDoc {
    code: Code = {
        basic: `<p-card header="Advanced Card" subheader="Card Subheader" [style]="{ width: '25rem', overflow: 'hidden' }">
    <ng-template pTemplate="header">
        <img alt="Card" class="w-full" src="https://primefaces.org/cdn/primeng/images/card-ng.jpg" />
    </ng-template>
    <p>
        Lorem ipsum dolor sit amet...
    </p>
    <ng-template pTemplate="footer">
        <div class="flex gap-4 mt-1">
            <p-button label="Cancel" severity="secondary" class="w-full" styleClass="w-full" />
            <p-button label="Save" class="w-full" styleClass="w-full" />
        </div>
    </ng-template>
</p-card>`,

        html: `<div class="card flex justify-center">
    <p-card header="Advanced Card" subheader="Card Subheader" [style]="{ width: '25rem', overflow: 'hidden' }">
        <ng-template pTemplate="header">
            <img alt="Card" class="w-full" src="https://primefaces.org/cdn/primeng/images/card-ng.jpg" />
        </ng-template>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
        </p>
        <ng-template pTemplate="footer">
            <div class="flex gap-4 mt-1">
                <p-button label="Cancel" severity="secondary" class="w-full" styleClass="w-full" />
                <p-button label="Save" class="w-full" styleClass="w-full" />
            </div>
        </ng-template>
    </p-card>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
        
@Component({
    selector: 'card-advanced-demo',
    templateUrl: './card-advanced-demo.html',
    standalone: true,
    imports: [CardModule, ButtonModule]
})
export class CardAdvancedDemo {}`,
    };
}
