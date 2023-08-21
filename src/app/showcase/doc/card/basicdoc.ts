import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'card-basic-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>A simple Card is created with a <i>header</i> property along with the content as children.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-card header="Title">
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
            </p-card>
        </div>
        <app-code [code]="code" selector="card-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-card header="Title">
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
        quas!
    </p>
</p-card>`,

        html: `
<div class="card flex justify-content-center">
    <p-card header="Title">
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
        </p>
    </p-card>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'card-basic-demo',
    templateUrl: './card-basic-demo.html'
})
export class CardBasicDemo {}`
    };
}
