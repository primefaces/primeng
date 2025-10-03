import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, inject, InjectionToken, Input, NgModule, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BlockableUI, PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ToolbarStyle } from './style/toolbarstyle';

const TOOLBAR_INSTANCE = new InjectionToken<Toolbar>('TOOLBAR_INSTANCE');

/**
 * Toolbar is a grouping component for buttons and other content.
 * @group Components
 */
@Component({
    selector: 'p-toolbar',
    standalone: true,
    imports: [CommonModule, SharedModule, BindModule],
    template: `
        <ng-content></ng-content>
        <div [class]="cx('start')" *ngIf="startTemplate || _startTemplate" [pBind]="ptm('start')">
            <ng-container *ngTemplateOutlet="startTemplate || _startTemplate"></ng-container>
        </div>
        <div [class]="cx('center')" *ngIf="centerTemplate || _centerTemplate" [pBind]="ptm('center')">
            <ng-container *ngTemplateOutlet="centerTemplate || _centerTemplate"></ng-container>
        </div>
        <div [class]="cx('end')" *ngIf="endTemplate || _endTemplate" [pBind]="ptm('end')">
            <ng-container *ngTemplateOutlet="endTemplate || _endTemplate"></ng-container>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarStyle, { provide: TOOLBAR_INSTANCE, useExisting: Toolbar }, { provide: PARENT_INSTANCE, useExisting: Toolbar }],
    host: {
        '[class]': 'cn(cx("root"), styleClass)',
        role: 'toolbar',
        '[attr.aria-labelledby]': 'ariaLabelledBy'
    },
    hostDirectives: [Bind]
})
export class Toolbar extends BaseComponent implements BlockableUI {
    $pcToolbar: Toolbar | undefined = inject(TOOLBAR_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
    /**
     * Style class of the component.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Defines a string value that labels an interactive element.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;

    _componentStyle = inject(ToolbarStyle);

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }
    /**
     * Defines template option for start.
     * @group Templates
     */
    @ContentChild('start', { descendants: false }) startTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for end.
     * @group Templates
     */
    @ContentChild('end', { descendants: false }) endTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for center.
     * @group Templates
     */
    @ContentChild('center', { descendants: false }) centerTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _startTemplate: TemplateRef<any> | undefined;

    _endTemplate: TemplateRef<any> | undefined;

    _centerTemplate: TemplateRef<any> | undefined;

    onAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'start':
                case 'left':
                    this._startTemplate = item.template;
                    break;

                case 'end':
                case 'right':
                    this._endTemplate = item.template;
                    break;

                case 'center':
                    this._centerTemplate = item.template;
                    break;
            }
        });
    }
}

@NgModule({
    imports: [Toolbar, SharedModule, BindModule],
    exports: [Toolbar, SharedModule, BindModule]
})
export class ToolbarModule {}
