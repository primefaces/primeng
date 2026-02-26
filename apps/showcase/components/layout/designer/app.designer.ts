import { ChangeDetectionStrategy, Component, computed, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DesignerService } from '@/service/designerservice';
import { AppConfigService } from '@/service/appconfigservice';
import { ToastModule } from 'primeng/toast';
import { PrimeNG } from 'primeng/config';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DesignDashboard } from '@/components/layout/designer/dashboard/designdashboard';
import { DesignCreateTheme } from '@/components/layout/designer/create/designcreatetheme';
import { DesignEditor } from '@/components/layout/designer/editor/designeditor';
import { DesignEditorFooter } from '@/components/layout/designer/editor/designeditorfooter';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
    selector: 'app-designer',
    standalone: true,
    imports: [CommonModule, DrawerModule, ToastModule, ConfirmDialogModule, DesignDashboard, DesignCreateTheme, DesignEditor, DesignEditorFooter, ConfirmPopupModule],
    template: `<p-drawer #drawer [(visible)]="visible" position="right" styleClass="designer !w-screen md:!w-[48rem]" [modal]="false" [dismissible]="false">
            <ng-template #headless>
                <div class="flex items-center justify-between p-5">
                    <div class="flex items-center gap-2">
                        @if (activeView() !== 'dashboard') {
                            <button type="button" (click)="openDashboard()" class="icon-btn">
                                <i class="pi pi-chevron-left"></i>
                            </button>
                        }
                        <span class="font-bold text-xl">{{ viewTitle() }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" (click)="toggleDarkMode()" class="icon-btn">
                            <i class="pi" [ngClass]="{ 'pi-moon': isDarkTheme(), 'pi-sun': !isDarkTheme() }"></i>
                        </button>
                        <button type="button" (click)="hide($event)" class="icon-btn">
                            <i class="pi pi-times"></i>
                        </button>
                    </div>
                </div>

                <div class="flex-auto overflow-auto overflow-x-hidden pb-5 px-5">
                    @if (activeView() === 'dashboard') {
                        <design-dashboard />
                    }
                    @if (activeView() === 'create_theme') {
                        <design-create-theme />
                    }
                    @if (activeView() === 'editor') {
                        <design-editor />
                    }
                </div>

                <div class="p-5">
                    @if (activeView() === 'editor') {
                        <design-editor-footer />
                    }
                </div>
            </ng-template>
        </p-drawer>
        <p-toast key="designer" />
        <p-confirm-dialog key="designer" />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDesigner implements OnInit {
    @ViewChild('drawer') drawer: Drawer;

    public platformId: any = inject(PLATFORM_ID);

    designerService = inject(DesignerService);

    configService = inject(AppConfigService);

    config: PrimeNG = inject(PrimeNG);

    activeView = computed(() => this.designerService.designer().activeView);

    viewTitle = computed(() => {
        switch (this.activeView()) {
            case 'dashboard':
                return 'Theme Designer';
            case 'create_theme':
                return 'Create Theme';
            case 'editor':
                return this.designerService.designer().theme.name;
        }
    });

    isDarkTheme = computed(() => this.configService.appState().darkTheme);

    get visible() {
        return this.configService.designerActive();
    }
    set visible(value: boolean) {
        this.configService.designerActive.set(value);
    }

    hide(event: any) {
        this.drawer.close(event);
    }

    openDashboard() {
        this.designerService.openDashboard();
    }

    toggleDarkMode() {
        this.configService.appState.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    async ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            await this.designerService.restore();
        }
    }
}
