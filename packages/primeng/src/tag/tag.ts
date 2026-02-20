import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, inject, InjectionToken, input, NgModule, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import type { TagPassThrough, TagSeverity } from 'primeng/types/tag';
import { TagStyle } from './style/tagstyle';

const TAG_INSTANCE = new InjectionToken<Tag>('TAG_INSTANCE');

/**
 * Tag component is used to categorize content.
 * @group Components
 */
@Component({
    selector: 'p-tag',
    standalone: true,
    imports: [NgTemplateOutlet, SharedModule, Bind],
    template: `
        <ng-content></ng-content>
        @if (!iconTemplate()) {
            @if (icon()) {
                <span [class]="cn(cx('icon'), icon())" [pBind]="ptm('icon')"></span>
            }
        } @else {
            <span [class]="cx('icon')" [pBind]="ptm('icon')">
                <ng-container [ngTemplateOutlet]="iconTemplate()!"></ng-container>
            </span>
        }
        <span [class]="cx('label')" [pBind]="ptm('label')">{{ value() }}</span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TagStyle, { provide: TAG_INSTANCE, useExisting: Tag }, { provide: PARENT_INSTANCE, useExisting: Tag }],
    host: {
        '[class]': "cx('root')",
        '[attr.data-p]': 'dataP()'
    },
    hostDirectives: [Bind]
})
export class Tag extends BaseComponent<TagPassThrough> {
    componentName = 'Tag';

    $pcTag: Tag | undefined = inject(TAG_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Severity type of the tag.
     * @group Props
     */
    severity = input<TagSeverity | null>();

    /**
     * Value to display inside the tag.
     * @group Props
     */
    value = input<string>();

    /**
     * Icon of the tag to display next to the value.
     * @group Props
     */
    icon = input<string>();

    /**
     * Whether the corners of the tag are rounded.
     * @group Props
     */
    rounded = input(false, { transform: booleanAttribute });

    /**
     * Custom icon template.
     * @group Templates
     */
    iconTemplate = contentChild<TemplateRef<void>>('icon', { descendants: false });

    _componentStyle = inject(TagStyle);

    dataP = computed(() => {
        const severity = this.severity();
        const rounded = this.rounded();
        return this.cn({
            rounded,
            [severity as string]: severity
        });
    });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}

@NgModule({
    imports: [Tag, SharedModule],
    exports: [Tag, SharedModule]
})
export class TagModule {}
