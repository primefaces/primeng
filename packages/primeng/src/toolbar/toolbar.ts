import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChild, inject, InjectionToken, input, NgModule, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BlockableUI, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ToolbarStyle } from './style/toolbarstyle';
import { ToolbarPassThrough } from 'primeng/types/toolbar';

const TOOLBAR_INSTANCE = new InjectionToken<Toolbar>('TOOLBAR_INSTANCE');

/**
 * Toolbar is a grouping component for buttons and other content.
 * @group Components
 */
@Component({
    selector: 'p-toolbar',
    standalone: true,
    imports: [NgTemplateOutlet, SharedModule, BindModule],
    template: `
        <ng-content></ng-content>
        @if (startTemplate()) {
            <div [class]="cx('start')" [pBind]="ptm('start')">
                <ng-container *ngTemplateOutlet="startTemplate()"></ng-container>
            </div>
        }
        @if (centerTemplate()) {
            <div [class]="cx('center')" [pBind]="ptm('center')">
                <ng-container *ngTemplateOutlet="centerTemplate()"></ng-container>
            </div>
        }
        @if (endTemplate()) {
            <div [class]="cx('end')" [pBind]="ptm('end')">
                <ng-container *ngTemplateOutlet="endTemplate()"></ng-container>
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarStyle, { provide: TOOLBAR_INSTANCE, useExisting: Toolbar }, { provide: PARENT_INSTANCE, useExisting: Toolbar }],
    host: {
        '[class]': 'cx("root")',
        role: 'toolbar',
        '[attr.aria-labelledby]': 'ariaLabelledBy()'
    },
    hostDirectives: [Bind]
})
export class Toolbar extends BaseComponent<ToolbarPassThrough> implements BlockableUI {
    componentName = 'Toolbar';

    $pcToolbar: Toolbar | undefined = inject(TOOLBAR_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
    /**
     * Defines a string value that labels an interactive element.
     * @group Props
     */
    ariaLabelledBy = input<string>();

    _componentStyle = inject(ToolbarStyle);

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }
    /**
     * Custom start template.
     * @group Templates
     */
    startTemplate = contentChild<TemplateRef<void>>('start');

    /**
     * Custom end template.
     * @group Templates
     */
    endTemplate = contentChild<TemplateRef<void>>('end');

    /**
     * Custom center template.
     * @group Templates
     */
    centerTemplate = contentChild<TemplateRef<void>>('center');
}

@NgModule({
    imports: [Toolbar, SharedModule, BindModule],
    exports: [Toolbar, SharedModule, BindModule]
})
export class ToolbarModule {}
