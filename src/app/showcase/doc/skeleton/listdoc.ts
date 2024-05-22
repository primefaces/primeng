import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'list-doc',
    template: `
        <app-docsectiontext>
            <p>Sample List implementation using different Skeleton components and PrimeFlex CSS utilities.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="border-round border-1 surface-border p-4 surface-card">
                <ul class="m-0 p-0 list-none">
                    <li class="mb-3">
                        <div class="flex">
                            <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                            <div style="flex: 1">
                                <p-skeleton width="100%" styleClass="mb-2" />
                                <p-skeleton width="75%" />
                            </div>
                        </div>
                    </li>
                    <li class="mb-3">
                        <div class="flex">
                            <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                            <div style="flex: 1">
                                <p-skeleton width="100%" styleClass="mb-2" />
                                <p-skeleton width="75%" />
                            </div>
                        </div>
                    </li>
                    <li class="mb-3">
                        <div class="flex">
                            <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                            <div style="flex: 1">
                                <p-skeleton width="100%" styleClass="mb-2" />
                                <p-skeleton width="75%" />
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="flex">
                            <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                            <div style="flex: 1">
                                <p-skeleton width="100%" styleClass="mb-2" />
                                <p-skeleton width="75%" />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <app-code [code]="code" selector="skeleton-list-demo"></app-code>
    `
})
export class ListDoc {
    code: Code = {
        basic: `<div class="border-round border-1 surface-border p-4 surface-card">
    <ul class="m-0 p-0 list-none">
        <li class="mb-3">
            <div class="flex">
                <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                <div style="flex: 1">
                    <p-skeleton width="100%" styleClass="mb-2" />
                    <p-skeleton width="75%" />
                </div>
            </div>
        </li>
        <li class="mb-3">
            <div class="flex">
                <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                <div style="flex: 1">
                    <p-skeleton width="100%" styleClass="mb-2" />
                    <p-skeleton width="75%" />
                </div>
            </div>
        </li>
        <li class="mb-3">
            <div class="flex">
                <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                <div style="flex: 1">
                    <p-skeleton width="100%" styleClass="mb-2" />
                    <p-skeleton width="75%" />
                </div>
            </div>
        </li>
        <li>
            <div class="flex">
                <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                <div style="flex: 1">
                    <p-skeleton width="100%" styleClass="mb-2" />
                    <p-skeleton width="75%" />
                </div>
            </div>
        </li>
    </ul>
</div>`,
        html: `<div class="card">
    <div class="border-round border-1 surface-border p-4 surface-card">
        <ul class="m-0 p-0 list-none">
            <li class="mb-3">
                <div class="flex">
                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                    <div style="flex: 1">
                        <p-skeleton width="100%" styleClass="mb-2" />
                        <p-skeleton width="75%" />
                    </div>
                </div>
            </li>
            <li class="mb-3">
                <div class="flex">
                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                    <div style="flex: 1">
                        <p-skeleton width="100%" styleClass="mb-2" />
                        <p-skeleton width="75%" />
                    </div>
                </div>
            </li>
            <li class="mb-3">
                <div class="flex">
                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                    <div style="flex: 1">
                        <p-skeleton width="100%" styleClass="mb-2" />
                        <p-skeleton width="75%" />
                    </div>
                </div>
            </li>
            <li>
                <div class="flex">
                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                    <div style="flex: 1">
                        <p-skeleton width="100%" styleClass="mb-2" />
                        <p-skeleton width="75%" />
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'skeleton-list-demo,
    templateUrl: './skeleton-list-demo.html',
    standalone: true,
    imports: [SkeletonModule]
})
export class SkeletonListDemo {}`
    };
}
