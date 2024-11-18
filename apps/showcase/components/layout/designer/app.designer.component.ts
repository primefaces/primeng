import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { AppConfigService } from '@/service/appconfigservice';

@Component({
    selector: 'app-designer',
    standalone: true,
    imports: [CommonModule, DrawerModule],
    template: `<p-drawer [visible]="visible()" (visibleChange)="hide($event)" header="Drawer">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </p-drawer>`
})
export class AppDesignerComponent {
    private configService = inject(AppConfigService);

    visible = computed(() => {
        return this.configService.designerActive();
    });

    hide(event) {
        !event && this.configService.hideDesigner();
    }
}
