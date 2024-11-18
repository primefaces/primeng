import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'list-doc',
    template: `
        <app-docsectiontext>
            <p>Sample List implementation using different Skeleton components and PrimeFlex CSS utilities.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900">
                <ul class="m-0 p-0 list-none">
                    <li class="mb-4">
                        <div class="flex">
                            <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                            <div class="self-center" style="flex: 1">
                                <p-skeleton width="100%" styleClass="mb-2" />
                                <p-skeleton width="75%" />
                            </div>
                        </div>
                    </li>
                    <li class="mb-4">
                        <div class="flex">
                            <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                            <div class="self-center" style="flex: 1">
                                <p-skeleton width="100%" styleClass="mb-2" />
                                <p-skeleton width="75%" />
                            </div>
                        </div>
                    </li>
                    <li class="mb-4">
                        <div class="flex">
                            <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                            <div class="self-center" style="flex: 1">
                                <p-skeleton width="100%" styleClass="mb-2" />
                                <p-skeleton width="75%" />
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="flex">
                            <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                            <div class="self-center" style="flex: 1">
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
        basic: `<div class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900">
    <ul class="m-0 p-0 list-none">
        <li class="mb-4">
            <div class="flex">
                <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                <div class="self-center" style="flex: 1">
                    <p-skeleton width="100%" styleClass="mb-2" />
                    <p-skeleton width="75%" />
                </div>
            </div>
        </li>
        <li class="mb-4">
            <div class="flex">
                <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                <div class="self-center" style="flex: 1">
                    <p-skeleton width="100%" styleClass="mb-2" />
                    <p-skeleton width="75%" />
                </div>
            </div>
        </li>
        <li class="mb-4">
            <div class="flex">
                <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                <div class="self-center" style="flex: 1">
                    <p-skeleton width="100%" styleClass="mb-2" />
                    <p-skeleton width="75%" />
                </div>
            </div>
        </li>
        <li>
            <div class="flex">
                <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                <div class="self-center" style="flex: 1">
                    <p-skeleton width="100%" styleClass="mb-2" />
                    <p-skeleton width="75%" />
                </div>
            </div>
        </li>
    </ul>
</div>`,
        html: `<div class="card">
    <div class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900">
        <ul class="m-0 p-0 list-none">
            <li class="mb-4">
                <div class="flex">
                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                    <div class="self-center" style="flex: 1">
                        <p-skeleton width="100%" styleClass="mb-2" />
                        <p-skeleton width="75%" />
                    </div>
                </div>
            </li>
            <li class="mb-4">
                <div class="flex">
                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                    <div class="self-center" style="flex: 1">
                        <p-skeleton width="100%" styleClass="mb-2" />
                        <p-skeleton width="75%" />
                    </div>
                </div>
            </li>
            <li class="mb-4">
                <div class="flex">
                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                    <div class="self-center" style="flex: 1">
                        <p-skeleton width="100%" styleClass="mb-2" />
                        <p-skeleton width="75%" />
                    </div>
                </div>
            </li>
            <li>
                <div class="flex">
                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                    <div class="self-center" style="flex: 1">
                        <p-skeleton width="100%" styleClass="mb-2" />
                        <p-skeleton width="75%" />
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
    selector: 'skeleton-list-demo,
    templateUrl: './skeleton-list-demo.html',
    standalone: true,
    imports: [Skeleton]
})
export class SkeletonListDemo {}`
    };
}
