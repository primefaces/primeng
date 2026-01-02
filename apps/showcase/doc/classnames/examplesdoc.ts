import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ClassNamesModule } from 'primeng/classnames';

@Component({
    selector: 'classnames-basic-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, ClassNamesModule, CommonModule],
    template: `
        <app-docsectiontext>
            <p>
                <i>pClass</i> directive accepts a <i>string</i>, <i>array</i>, <i>object</i> or any combination of these types with support for nesting. Angular's native class directive does not support combining multiple types with a single
                directive, nor white-space separated values in a single string.
            </p>
            <p>
                Note: For Tailwind Users, it is recommended to use the
                <a href="https://github.com/tailwindlabs/tailwindcss-intellisense?tab=readme-ov-file#tailwindcssclassattributes" target="_blank" rel="noopener noreferrer">classAttributes</a> configuration for intellisense support.
            </p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex justify-between gap-4">
                <div class="flex flex-col gap-4">
                    <div class="font-semibold">pClass Directive</div>
                    <div class="flex flex-wrap items-center gap-4">
                        <div pClass="py-4 px-8 border border-surface rounded-lg">String</div>
                        <div [pClass]="['py-4', 'px-8', 'bg-primary text-primary-contrast', 'font-semibold', 'rounded-lg']">Array</div>
                        <div [pClass]="['p-4 rounded-lg', ['cursor-pointer', 'select-none', 'border'], { 'bg-primary text-primary-contrast border-primary': active1() }]" (click)="toggle1()">Combined</div>
                        <div [pClass]="nestedClasses()" (click)="toggle2()">Nested</div>
                    </div>
                </div>
                <div class="flex flex-col gap-4">
                    <div class="font-semibold">Native Class Directive</div>
                    <div class="flex flex-wrap items-center gap-4">
                        <div class="py-4 px-8 border border-surface rounded-lg">String</div>
                        <div [class]="['py-4', 'px-8', 'bg-primary', 'text-primary-contrast', 'font-semibold', 'rounded-lg']">Array</div>
                        <div
                            class="p-4 rounded-lg"
                            [class]="['cursor-pointer', 'select-none', 'border']"
                            [class.bg-primary]="active1()"
                            [class.text-primary-contrast]="active1()"
                            [class.border-surface]="active1()"
                            [class.border-primary]="active1()"
                            (click)="toggle1()"
                        >
                            Combined
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <app-code selector="classnames-basic-demo"></app-code>
    `
})
export class ExamplesDoc {
    active1 = signal<boolean>(false);

    active2 = signal<boolean>(false);

    nestedClasses = computed(() => [
        'p-4',
        'rounded-lg',
        {
            'bg-primary text-primary-contrast': this.active2()
        },
        [
            'cursor-pointer select-none',
            'border',
            {
                'bg-primary-100 text-primary-800': !this.active2()
            },
            ['shadow-sm hover:shadow-lg', 'transition-all']
        ]
    ]);

    toggle1() {
        this.active1.set(!this.active1());
    }

    toggle2() {
        this.active2.set(!this.active2());
    }
}
