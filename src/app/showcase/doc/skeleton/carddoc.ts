import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'card-doc',
    template: `
        <app-docsectiontext>
            <p>Sample Card implementation using different Skeleton components and PrimeFlex CSS utilities.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="border-round border-1 surface-border p-4 surface-card">
                <div class="flex mb-3">
                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                    <div>
                        <p-skeleton width="10rem" styleClass="mb-2" />
                        <p-skeleton width="5rem" styleClass="mb-2" />
                        <p-skeleton height=".5rem" />
                    </div>
                </div>
                <p-skeleton width="100%" height="150px" />
                <div class="flex justify-content-between mt-3">
                    <p-skeleton width="4rem" height="2rem" />
                    <p-skeleton width="4rem" height="2rem" />
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="skeleton-card-demo"></app-code>
    `
})
export class CardDoc {
    code: Code = {
        basic: `<div class="border-round border-1 surface-border p-4 surface-card">
    <div class="flex mb-3">
        <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
        <div>
            <p-skeleton width="10rem" styleClass="mb-2" />
            <p-skeleton width="5rem" styleClass="mb-2" />
            <p-skeleton height=".5rem" />
        </div>
    </div>
    <p-skeleton width="100%" height="150px" />
    <div class="flex justify-content-between mt-3">
        <p-skeleton width="4rem" height="2rem" />
        <p-skeleton width="4rem" height="2rem" />
    </div>
</div>`,
        html: `<div class="card">
    <div class="border-round border-1 surface-border p-4 surface-card">
        <div class="flex mb-3">
            <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
            <div>
                <p-skeleton width="10rem" styleClass="mb-2" />
                <p-skeleton width="5rem" styleClass="mb-2" />
                <p-skeleton height=".5rem" />
            </div>
        </div>
        <p-skeleton width="100%" height="150px" />
        <div class="flex justify-content-between mt-3">
            <p-skeleton width="4rem" height="2rem" />
            <p-skeleton width="4rem" height="2rem" />
        </div>
    </div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'skeleton-card-demo',
    templateUrl: './skeleton-card-demo.html',
    standalone: true,
    imports: [SkeletonModule]
})
export class SkeletonCardDemo {}`
    };
}
