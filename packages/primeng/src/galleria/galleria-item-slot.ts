import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import type { GalleriaPassThrough } from 'primeng/types/galleria';
import type { Galleria } from './galleria';
import { GALLERIA_INSTANCE } from './galleria-token';

@Component({
    selector: 'div[pGalleriaItemSlot]',
    standalone: true,
    imports: [NgTemplateOutlet],
    template: `
        @if (shouldRender()) {
            <ng-container [ngTemplateOutlet]="contentTemplate()" [ngTemplateOutletContext]="context()"></ng-container>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleriaItemSlot extends BaseComponent<GalleriaPassThrough> {
    hostName: string = 'Galleria';

    index = input<number>();

    item = input<any>();

    type = input<string>();

    galleria = inject<Galleria>(GALLERIA_INSTANCE);

    $pcGalleria: Galleria | undefined = inject(GALLERIA_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    contentTemplate = computed(() => {
        const type = this.type();
        switch (type) {
            case 'item':
                return this.galleria.itemTemplate();
            case 'caption':
                return this.galleria.captionTemplate();
            case 'thumbnail':
                return this.galleria.thumbnailTemplate();
            case 'indicator':
                return this.galleria.indicatorTemplate();
            case 'footer':
                return this.galleria.footerTemplate();
            case 'header':
                return this.galleria.headerTemplate();
            default:
                return this.galleria.itemTemplate();
        }
    });

    context = computed(() => {
        const type = this.type();
        if (type === 'indicator') {
            return { $implicit: this.index() };
        }
        return { $implicit: this.item() };
    });

    shouldRender() {
        return !!this.contentTemplate();
    }
}
