import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'shapes-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Various shapes and sizes can be created using styling properties like <i>shape</i>, <i>width</i>, <i>height</i>, <i>borderRadius</i> and <i>styleClass</i>.</p>
        </app-docsectiontext>
        <div class="card grid grid-nogutter">
            <div class="col-12 md:col-6">
                <h5>Rectangle</h5>
                <p-skeleton styleClass="mb-2"></p-skeleton>
                <p-skeleton width="10rem" styleClass="mb-2"></p-skeleton>
                <p-skeleton width="5rem" styleClass="mb-2"></p-skeleton>
                <p-skeleton height="2rem" styleClass="mb-2"></p-skeleton>
                <p-skeleton width="10rem" height="4rem"></p-skeleton>
            </div>
            <div class="col-12 md:col-6">
                <h5>Rounded</h5>
                <p-skeleton styleClass="mb-2" borderRadius="16px"></p-skeleton>
                <p-skeleton width="10rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                <p-skeleton width="5rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                <p-skeleton height="2rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
                <p-skeleton width="10rem" height="4rem" borderRadius="16px"></p-skeleton>
            </div>
            <div class="col-12 md:col-6">
                <h5 class="mt-3">Square</h5>
                <div class="flex align-items-end">
                    <p-skeleton size="2rem" styleClass="mr-2"></p-skeleton>
                    <p-skeleton size="3rem" styleClass="mr-2"></p-skeleton>
                    <p-skeleton size="4rem" styleClass="mr-2"></p-skeleton>
                    <p-skeleton size="5rem"></p-skeleton>
                </div>
            </div>
            <div class="field col-12 md:col-6">
                <h5 class="mt-3">Circle</h5>
                <div class="flex align-items-end">
                    <p-skeleton shape="circle" size="2rem" styleClass="mr-2"></p-skeleton>
                    <p-skeleton shape="circle" size="3rem" styleClass="mr-2"></p-skeleton>
                    <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
                    <p-skeleton shape="circle" size="5rem"></p-skeleton>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="skeleton-shapes-demo"></app-code>
    </section>`
})
export class ShapesDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<h5>Rectangle</h5>
<p-skeleton styleClass="mb-2"></p-skeleton>
<p-skeleton width="10rem" styleClass="mb-2"></p-skeleton>
<p-skeleton width="5rem" styleClass="mb-2"></p-skeleton>
<p-skeleton height="2rem" styleClass="mb-2"></p-skeleton>
<p-skeleton width="10rem" height="4rem"></p-skeleton>

<h5>Rounded</h5>
<p-skeleton styleClass="mb-2" borderRadius="16px"></p-skeleton>
<p-skeleton width="10rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
<p-skeleton width="5rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
<p-skeleton height="2rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
<p-skeleton width="10rem" height="4rem" borderRadius="16px"></p-skeleton>

<h5 class="mt-3">Square</h5>
<p-skeleton size="2rem" styleClass="mr-2"></p-skeleton>
<p-skeleton size="3rem" styleClass="mr-2"></p-skeleton>
<p-skeleton size="4rem" styleClass="mr-2"></p-skeleton>
<p-skeleton size="5rem"></p-skeleton>

<h5 class="mt-3">Circle</h5>
<p-skeleton shape="circle" size="2rem" styleClass="mr-2"></p-skeleton>
<p-skeleton shape="circle" size="3rem" styleClass="mr-2"></p-skeleton>
<p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
<p-skeleton shape="circle" size="5rem"></p-skeleton>`,
        html: `
<div class="grid grid-nogutter">
    <div class="col-12 md:col-6">
        <h5>Rectangle</h5>
        <p-skeleton styleClass="mb-2"></p-skeleton>
        <p-skeleton width="10rem" styleClass="mb-2"></p-skeleton>
        <p-skeleton width="5rem" styleClass="mb-2"></p-skeleton>
        <p-skeleton height="2rem" styleClass="mb-2"></p-skeleton>
        <p-skeleton width="10rem" height="4rem"></p-skeleton>
    </div>
    <div class="col-12 md:col-6">
        <h5>Rounded</h5>
        <p-skeleton styleClass="mb-2" borderRadius="16px"></p-skeleton>
        <p-skeleton width="10rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
        <p-skeleton width="5rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
        <p-skeleton height="2rem" styleClass="mb-2" borderRadius="16px"></p-skeleton>
        <p-skeleton width="10rem" height="4rem" borderRadius="16px"></p-skeleton>
    </div>
    <div class="col-12 md:col-6">
        <h5 class="mt-3">Square</h5>
        <div class="flex align-items-end">
            <p-skeleton size="2rem" styleClass="mr-2"></p-skeleton>
            <p-skeleton size="3rem" styleClass="mr-2"></p-skeleton>
            <p-skeleton size="4rem" styleClass="mr-2"></p-skeleton>
            <p-skeleton size="5rem"></p-skeleton>
        </div>
    </div>
    <div class="field col-12 md:col-6">
        <h5 class="mt-3">Circle</h5>
        <div class="flex align-items-end">
            <p-skeleton shape="circle" size="2rem" styleClass="mr-2"></p-skeleton>
            <p-skeleton shape="circle" size="3rem" styleClass="mr-2"></p-skeleton>
            <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
            <p-skeleton shape="circle" size="5rem"></p-skeleton>
        </div>
    </div>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'skeleton-shapes-demo',
    templateUrl: './skeleton-shapes-demo.html',
})
export class SkeletonShapesDemo {}`
    };
}
