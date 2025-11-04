import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectionStrategy, Component, inject, InjectionToken, NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { IftaLabelPassThrough } from 'primeng/types/iftalabel';
import { IftaLabelStyle } from './style/iftalabelstyle';

const IFTALABEL_INSTANCE = new InjectionToken<IftaLabel>('IFTALABEL_INSTANCE');

/**
 * IftaLabel is used to create infield top aligned labels.
 * @group Components
 */
@Component({
    selector: 'p-iftalabel, p-iftaLabel, p-ifta-label',
    standalone: true,
    imports: [BindModule],
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [IftaLabelStyle, { provide: IFTALABEL_INSTANCE, useExisting: IftaLabel }, { provide: PARENT_INSTANCE, useExisting: IftaLabel }],
    hostDirectives: [Bind],
    host: {
        '[class]': "cx('root')"
    }
})
export class IftaLabel extends BaseComponent<IftaLabelPassThrough> implements AfterViewChecked {
    _componentStyle = inject(IftaLabelStyle);

    $pcIftaLabel: IftaLabel | undefined = inject(IFTALABEL_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}

@NgModule({
    imports: [IftaLabel, CommonModule, SharedModule, RouterModule],
    exports: [IftaLabel, SharedModule]
})
export class IftaLabelModule {}
