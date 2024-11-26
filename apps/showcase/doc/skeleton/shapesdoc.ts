import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'shapes-doc',
    template: `
        <app-docsectiontext>
            <p>Various shapes and sizes can be created using styling properties like <i>shape</i>, <i>width</i>, <i>height</i>, <i>borderRadius</i> and <i>styleClass</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap">
                <div class="w-full xl:w-6/12 p-4">
                    <h5>Rectangle</h5>
                    <p-skeleton styleClass="mb-2" />
                    <p-skeleton width="10rem" styleClass="mb-2" />
                    <p-skeleton width="5rem" styleClass="mb-2" />
                    <p-skeleton height="2rem" styleClass="mb-2" />
                    <p-skeleton width="10rem" height="4rem" />
                </div>
                <div class="w-full xl:w-6/12 p-4">
                    <h5>Rounded</h5>
                    <p-skeleton styleClass="mb-2" borderRadius="16px" />
                    <p-skeleton width="10rem" styleClass="mb-2" borderRadius="16px" />
                    <p-skeleton width="5rem" styleClass="mb-2" borderRadius="16px" />
                    <p-skeleton height="2rem" styleClass="mb-2" borderRadius="16px" />
                    <p-skeleton width="10rem" height="4rem" borderRadius="16px" />
                </div>
                <div class="w-full xl:w-6/12 p-4">
                    <h5 class="mt-4">Square</h5>
                    <div class="flex items-end">
                        <p-skeleton size="2rem" styleClass="mr-2" />
                        <p-skeleton size="3rem" styleClass="mr-2" />
                        <p-skeleton size="4rem" styleClass="mr-2" />
                        <p-skeleton size="5rem" />
                    </div>
                </div>
                <div class="field w-full xl:w-6/12 p-4">
                    <h5 class="mt-4">Circle</h5>
                    <div class="flex items-end">
                        <p-skeleton shape="circle" size="2rem" styleClass="mr-2" />
                        <p-skeleton shape="circle" size="3rem" styleClass="mr-2" />
                        <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                        <p-skeleton shape="circle" size="5rem" />
                    </div>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="skeleton-shapes-demo"></app-code>
    `
})
export class ShapesDoc {
    code: Code = {
        basic: `<h5>Rectangle</h5>
<p-skeleton styleClass="mb-2" />
<p-skeleton width="10rem" styleClass="mb-2" />
<p-skeleton width="5rem" styleClass="mb-2" />
<p-skeleton height="2rem" styleClass="mb-2" />
<p-skeleton width="10rem" height="4rem" />

<h5>Rounded</h5>
<p-skeleton styleClass="mb-2" borderRadius="16px" />
<p-skeleton width="10rem" styleClass="mb-2" borderRadius="16px" />
<p-skeleton width="5rem" styleClass="mb-2" borderRadius="16px" />
<p-skeleton height="2rem" styleClass="mb-2" borderRadius="16px" />
<p-skeleton width="10rem" height="4rem" borderRadius="16px" />

<h5 class="mt-4">Square</h5>
<p-skeleton size="2rem" styleClass="mr-2" />
<p-skeleton size="3rem" styleClass="mr-2" />
<p-skeleton size="4rem" styleClass="mr-2" />
<p-skeleton size="5rem" />

<h5 class="mt-4">Circle</h5>
<p-skeleton shape="circle" size="2rem" styleClass="mr-2" />
<p-skeleton shape="circle" size="3rem" styleClass="mr-2" />
<p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
<p-skeleton shape="circle" size="5rem" />`,
        html: `<div class="card">
    <div class="flex flex-wrap">
        <div class="w-full xl:w-6/12 p-4">
            <h5>Rectangle</h5>
            <p-skeleton styleClass="mb-2" />
            <p-skeleton width="10rem" styleClass="mb-2" />
            <p-skeleton width="5rem" styleClass="mb-2" />
            <p-skeleton height="2rem" styleClass="mb-2" />
            <p-skeleton width="10rem" height="4rem" />
        </div>
        <div class="w-full xl:w-6/12 p-4">
            <h5>Rounded</h5>
            <p-skeleton styleClass="mb-2" borderRadius="16px" />
            <p-skeleton width="10rem" styleClass="mb-2" borderRadius="16px" />
            <p-skeleton width="5rem" styleClass="mb-2" borderRadius="16px" />
            <p-skeleton height="2rem" styleClass="mb-2" borderRadius="16px" />
            <p-skeleton width="10rem" height="4rem" borderRadius="16px" />
        </div>
        <div class="w-full xl:w-6/12 p-4">
            <h5 class="mt-4">Square</h5>
            <div class="flex items-end">
                <p-skeleton size="2rem" styleClass="mr-2" />
                <p-skeleton size="3rem" styleClass="mr-2" />
                <p-skeleton size="4rem" styleClass="mr-2" />
                <p-skeleton size="5rem" />
            </div>
        </div>
        <div class="field w-full xl:w-6/12 p-4">
            <h5 class="mt-4">Circle</h5>
            <div class="flex items-end">
                <p-skeleton shape="circle" size="2rem" styleClass="mr-2" />
                <p-skeleton shape="circle" size="3rem" styleClass="mr-2" />
                <p-skeleton shape="circle" size="4rem" styleClass="mr-2" />
                <p-skeleton shape="circle" size="5rem" />
            </div>
        </div>
    </div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
    selector: 'skeleton-shapes-demo',
    templateUrl: './skeleton-shapes-demo.html',
    standalone: true,
    imports: [Skeleton]
})
export class SkeletonShapesDemo {}`
    };
}
