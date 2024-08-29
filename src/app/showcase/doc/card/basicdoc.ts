import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'card-basic-demo',
    template: `
        <app-docsectiontext>
            <p>A simple Card is created with a <i>header</i> property along with the content as children.</p>
        </app-docsectiontext>
        <div class="mb-4 p-8">
            <p-card header="Simple Card">
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
            </p-card>
        </div>
        <app-code [code]="code" selector="card-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-card header="Simple Card">
    <p class="m-0">
        Lorem ipsum dolor sit amet...
    </p>
</p-card>`,

        html: `<div class="mb-4 p-8">
    <p-card header="Simple Card">
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
        </p>
    </p-card>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'card-basic-demo',
    templateUrl: './card-basic-demo.html',
    standalone: true,
    imports: [CardModule]
})
export class CardBasicDemo {}`
    };
}
