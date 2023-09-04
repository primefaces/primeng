import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'list-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Sample List implementation using different Skeleton components and PrimeFlex CSS utilities.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="border-round border-1 surface-border p-4 surface-card">
                <ul class="m-0 p-0 list-none">
                    <li class="mb-3">
                        <div class="flex">
                            <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                            <div style="flex: 1">
                                <p-skeleton width="100%" styleClass="mb-2"></p-skeleton>
                                <p-skeleton width="75%"></p-skeleton>
                            </div>
                        </div>
                    </li>
                    <li class="mb-3">
                        <div class="flex">
                            <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                            <div style="flex: 1">
                                <p-skeleton width="100%" styleClass="mb-2"></p-skeleton>
                                <p-skeleton width="75%"></p-skeleton>
                            </div>
                        </div>
                    </li>
                    <li class="mb-3">
                        <div class="flex">
                            <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                            <div style="flex: 1">
                                <p-skeleton width="100%" styleClass="mb-2"></p-skeleton>
                                <p-skeleton width="75%"></p-skeleton>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="flex">
                            <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                            <div style="flex: 1">
                                <p-skeleton width="100%" styleClass="mb-2"></p-skeleton>
                                <p-skeleton width="75%"></p-skeleton>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <app-code [code]="code" selector="skeleton-list-demo"></app-code>
    </section>`
})
export class ListDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<div class="border-round border-1 surface-border p-4 surface-card">
    <ul class="m-0 p-0 list-none">
        <li class="mb-3">
            <div class="flex">
                <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                <div style="flex: 1">
                    <p-skeleton width="100%" styleClass="mb-2"></p-skeleton>
                    <p-skeleton width="75%"></p-skeleton>
                </div>
            </div>
        </li>
        <li class="mb-3">
            <div class="flex">
                <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                <div style="flex: 1">
                    <p-skeleton width="100%" styleClass="mb-2"></p-skeleton>
                    <p-skeleton width="75%"></p-skeleton>
                </div>
            </div>
        </li>
        <li class="mb-3">
            <div class="flex">
                <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                <div style="flex: 1">
                    <p-skeleton width="100%" styleClass="mb-2"></p-skeleton>
                    <p-skeleton width="75%"></p-skeleton>
                </div>
            </div>
        </li>
        <li>
            <div class="flex">
                <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                <div style="flex: 1">
                    <p-skeleton width="100%" styleClass="mb-2"></p-skeleton>
                    <p-skeleton width="75%"></p-skeleton>
                </div>
            </div>
        </li>
    </ul>
</div>`,
        html: `
<div class="card">
    <div class="border-round border-1 surface-border p-4 surface-card">
        <ul class="m-0 p-0 list-none">
            <li class="mb-3">
                <div class="flex">
                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                    <div style="flex: 1">
                        <p-skeleton width="100%" styleClass="mb-2"></p-skeleton>
                        <p-skeleton width="75%"></p-skeleton>
                    </div>
                </div>
            </li>
            <li class="mb-3">
                <div class="flex">
                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                    <div style="flex: 1">
                        <p-skeleton width="100%" styleClass="mb-2"></p-skeleton>
                        <p-skeleton width="75%"></p-skeleton>
                    </div>
                </div>
            </li>
            <li class="mb-3">
                <div class="flex">
                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                    <div style="flex: 1">
                        <p-skeleton width="100%" styleClass="mb-2"></p-skeleton>
                        <p-skeleton width="75%"></p-skeleton>
                    </div>
                </div>
            </li>
            <li>
                <div class="flex">
                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                    <div style="flex: 1">
                        <p-skeleton width="100%" styleClass="mb-2"></p-skeleton>
                        <p-skeleton width="75%"></p-skeleton>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'skeleton-list-demo,
    templateUrl: './skeleton-list-demo.html'
})
export class SkeletonListDemo {}`
    };
}
