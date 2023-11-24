import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'card-doc',
    template: `
        <app-docsectiontext>
            <p>Sample Card implementation using different Skeleton components and PrimeFlex CSS utilities.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="border-round border-1 surface-border p-4 surface-card">
                <div class="flex mb-3">
                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                    <div>
                        <p-skeleton width="10rem" styleClass="mb-2"></p-skeleton>
                        <p-skeleton width="5rem" styleClass="mb-2"></p-skeleton>
                        <p-skeleton height=".5rem"></p-skeleton>
                    </div>
                </div>
                <p-skeleton width="100%" height="150px"></p-skeleton>
                <div class="flex justify-content-between mt-3">
                    <p-skeleton width="4rem" height="2rem"></p-skeleton>
                    <p-skeleton width="4rem" height="2rem"></p-skeleton>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="skeleton-card-demo"></app-code>
    `
})
export class CardDoc {
    code: Code = {
        basic: `
<div class="border-round border-1 surface-border p-4 surface-card">
    <div class="flex mb-3">
        <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
        <div>
            <p-skeleton width="10rem" styleClass="mb-2"></p-skeleton>
            <p-skeleton width="5rem" styleClass="mb-2"></p-skeleton>
            <p-skeleton height=".5rem"></p-skeleton>
        </div>
    </div>
    <p-skeleton width="100%" height="150px"></p-skeleton>
    <div class="flex justify-content-between mt-3">
        <p-skeleton width="4rem" height="2rem"></p-skeleton>
        <p-skeleton width="4rem" height="2rem"></p-skeleton>
    </div>
</div>`,
        html: `
<div class="card">
    <div class="border-round border-1 surface-border p-4 surface-card">
        <div class="flex mb-3">
            <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
            <div>
                <p-skeleton width="10rem" styleClass="mb-2"></p-skeleton>
                <p-skeleton width="5rem" styleClass="mb-2"></p-skeleton>
                <p-skeleton height=".5rem"></p-skeleton>
            </div>
        </div>
        <p-skeleton width="100%" height="150px"></p-skeleton>
        <div class="flex justify-content-between mt-3">
            <p-skeleton width="4rem" height="2rem"></p-skeleton>
            <p-skeleton width="4rem" height="2rem"></p-skeleton>
        </div>
    </div>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'skeleton-card-demo',
    templateUrl: './skeleton-card-demo.html'
})
export class SkeletonCardDemo {}`
    };
}
