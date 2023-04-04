import { NgModule, Component, Input, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ContentChildren, QueryList, TemplateRef, Inject, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { PrimeNGConfig, PrimeTemplate } from 'primeng/api';
import { ObjectUtils, ZIndexUtils } from 'primeng/utils';
import { DomHandler } from 'primeng/dom';

@Component({
    template: `
        <ng-content></ng-content>
    `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./baseicon.css'],
    host: {
        class: 'p-element'
    }
})
export class BaseIcon {
    @Input() label: string;

    @Input() spin: boolean = false;

    pti() {
        const isLabelEmpty = ObjectUtils.isEmpty(this.label);

        return {
            class: [
                'p-icon',
                {
                    'p-icon-spin': this.spin
                }
            ],
            role: !isLabelEmpty ? 'img' : undefined,
            'aria-label': !isLabelEmpty ? this.label : undefined,
            'aria-hidden': isLabelEmpty
        };
    }

}
