import { ChangeDetectionStrategy, Component, computed, inject, model, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppConfigService } from '@/service/appconfigservice';
import { DesignerService } from '@/service/designerservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
    selector: 'design-dashboard',
    standalone: true,
    imports: [RouterModule, CommonModule, FormsModule, ToastModule, MenuModule, ConfirmPopupModule],
    template: `<div style="border-radius: 50px" class="overflow-hidden mb-8">
            <a routerLink="/designer">
                <img src="https://primefaces.org/cdn/designer/{{ isDarkTheme() ? 'editor-intro-dark.png' : 'editor-intro.png' }}" />
            </a>
        </div>
        <div class="text-lg font-semibold mb-2">Authenticate</div>
        <div *ngIf="!verified()">
            <span class="block leading-6 mb-4"
                >Theme Designer is the ultimate tool to customize and design your own themes featuring a visual editor, figma to code, cloud storage, and migration assistant. <a routerLink="/designer" class="doc-link">Discover</a> more about the
                Theme Designer by visiting the detailed <a routerLink="/designer/guide" class="doc-link">documentation</a>.</span
            >
            <span class="block leading-6 mb-4"
                >A license can be purchased from <a href="https://primefaces.org/store/designer.xhtml" class="doc-link" rel="noopener noreferrer">PrimeStore</a>, if you do not have a license key, you are still able to experience the Designer in trial
                mode. Note that in trial mode, downloads, figma to code, migration assistant and cloud storage are not available.</span
            >
            <span class="block leading-6 mb-4">Sign-in at <a href="https://primefaces.org/store/designer.xhtml" class="doc-link" rel="noopener noreferrer">PrimeStore</a> to retrieve your license key along with the pass key.</span>
        </div>
        <div *ngIf="!verified()" class="flex gap-4">
            <input [(ngModel)]="licenseKey" type="password" [attr.autocomplete]="'off'" class="px-3 py-2 rounded-md border border-surface-300 dark:border-surface-700 flex-1" placeholder="License Key" />
            <input [(ngModel)]="otp" autocomplete="off" class="px-3 py-2 rounded-md border border-surface-300 dark:border-surface-700" placeholder="Pass Key" />
            <button type="button" (click)="activate()" class="btn-design">Activate</button>
        </div>

        <div *ngIf="verified()" class="flex gap-4">
            <input value="***********************************************************" type="password" autocomplete="off" class="px-3 py-2 rounded-md border border-surface-300 dark:border-surface-700 flex-1" placeholder="License Key" disabled />
            <button type="button" (click)="signOut()" class="btn-design">Sign Out</button>
        </div>
        <div class="flex justify-between items-center mb-2 mt-6">
            <span class="text-lg font-semibold">My Themes</span>
            <div *ngIf="themeLimit()" class="flex items-center gap-2">
                <span class="text-muted-color text-xs">{{ designerService.designer()?.themes?.length }} / {{ themeLimit() }}</span>
                <div class="h-2 border rounded-md w-32 overflow-hidden">
                    <div class="bg-zinc-950 dark:bg-white h-full" [style]="{ width: themeUsageRatio() + '%' }"></div>
                </div>
            </div>
        </div>
        <span class="block text-muted-color leading-6 mb-4">Continue editing your existing themes or build a new one.</span>
        <div class="flex flex-wrap gap-4">
            <button
                type="button"
                class="rounded-xl h-32 w-32 bg-transparent border border-surface-200 dark:border-surface-700 text-black dark:text-white"
                [ngClass]="{ 'opacity-50 cursor-auto': themeLimitReached(), 'hover:border-surface-400 dark:hover:border-surface-500': !themeLimitReached() }"
                (click)="openNewTheme()"
            >
                <i class="pi pi-plus"></i>
            </button>
            <div *ngFor="let theme of designerService.designer().themes" class="flex flex-col gap-2 relative">
                <button
                    type="button"
                    class="rounded-xl h-32 w-32 px-4 overflow-hidden text-ellipsis bg-transparent border border-surface-200 dark:border-surface-700 hover:border-surface-400 dark:hover:border-surface-500 text-black dark:text-white"
                    (click)="loadTheme(theme)"
                >
                    <span class="text-2xl uppercase font-bold">{{ abbrThemeName(theme) }}</span>
                </button>
                <div class="flex flex-col items-center gap-1">
                    <div class="group flex items-center gap-2 relative">
                        <input
                            [(ngModel)]="theme.t_name"
                            type="text"
                            class="w-24 text-sm px-2 text-center pr-4t bg-transparent"
                            [ngClass]="{ 'bg-red-50 dark:bg-red-500/30': !theme.t_name, 'bg-transparent': theme.t_name }"
                            maxlength="100"
                            (blur)="renameTheme(theme)"
                            (keydown.enter)="onThemeNameEnterKey($event)"
                            (keydown.escape)="onThemeNameEscape($event)"
                        />
                        <i class="!hidden group-hover:!block pi pi-pencil !text-xs absolute top-50 text-muted-color" style="right: 2px"></i>
                    </div>
                    <span class="text-muted-color text-xs">{{ formatTimestamp(theme.t_last_updated) }}</span>
                </div>
                <button type="button" (click)="toggleMenuOptions($event, theme)" class="hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 dark:text-surface-400 flex absolute top-1 right-1 w-8 h-8 rounded-lg items-center justify-center">
                    <i class="pi pi-ellipsis-h !text-xs"></i>
                </button>
            </div>
        </div>
        <p-menu #menu [model]="themeOptions" [popup]="true" appendTo="body" (onShow)="onMenuShow()" (onHide)="onMenuHide()" />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignDashboard implements OnInit {
    @ViewChild('menu') menu!: Menu;

    configService = inject(AppConfigService);

    designerService = inject(DesignerService);

    renderer: Renderer2 = inject(Renderer2);

    confirmationService: ConfirmationService = inject(ConfirmationService);

    verified = computed(() => this.designerService.designer().verified);

    themeLimit = computed(() => this.designerService.designer().themeLimit);

    isDarkTheme = computed(() => this.configService.appState().darkTheme);

    themeUsageRatio = computed(() => (this.designerService.designer().themeLimit ? 100 * (this.designerService.designer().themes.length / this.designerService.designer().themeLimit) : 0));

    themeLimitReached = computed(() => (this.designerService.designer().themeLimit ? this.designerService.designer().themeLimit === this.designerService.designer().themes.length : false));

    licenseKey = model(this.designerService.licenseKey());

    otp = model(this.designerService.otp());

    currentTheme = computed(() => this.designerService.currentTheme());

    scrollListener!: any;

    loading = computed(() => this.designerService.loading());

    themeOptions = [
        {
            label: 'Delete',
            icon: 'pi pi-times',
            command: (event: any) => {
                this.confirmationService.confirm({
                    key: 'designer',
                    target: event.originalEvent.target as EventTarget,
                    message: 'Are you sure you want to delete this theme?',
                    header: 'Confirmation',
                    icon: 'pi pi-exclamation-triangle',
                    acceptButtonProps: {
                        severity: 'contrast'
                    },
                    rejectButtonProps: {
                        severity: 'secondary'
                    },
                    accept: () => this.deleteTheme(this.currentTheme())
                });
            }
        },
        {
            label: 'Duplicate',
            icon: 'pi pi-copy',
            command: () => this.duplicateTheme(this.currentTheme())
        },
        {
            label: 'Download',
            icon: 'pi pi-download',
            command: () => this.downloadTheme(this.currentTheme())
        }
    ];

    async ngOnInit() {
        if (this.designerService.designer().verified) {
            await this.loadThemes();
        }
    }

    async activate() {
        this.designerService.licenseKey.set(this.licenseKey());
        this.designerService.otp.set(this.otp());
        await this.designerService.signIn();
    }

    async loadThemes() {
        await this.designerService.loadThemes();
    }

    async signOut() {
        await this.designerService.signOut();
    }

    openNewTheme() {
        if (!this.themeLimitReached()) {
            this.designerService.designer.update((prev) => ({ ...prev, activeView: 'create_theme' }));
        }
    }

    async loadTheme(theme: any) {
        await this.designerService.loadTheme(theme);
    }

    abbrThemeName(theme: any) {
        return theme.t_name ? theme.t_name.substring(0, 2) : 'UT';
    }

    async renameTheme(theme: any) {
        await this.designerService.renameTheme(theme);
    }

    onThemeNameEnterKey(event: any) {
        event.target.blur();
    }

    onThemeNameEscape(event: any) {
        event.target.blur();
        event.stopPropagation();
    }

    formatTimestamp(timestamp: any) {
        const date = new Date(timestamp);

        const options = {
            year: 'numeric' as 'numeric' | '2-digit',
            month: 'short' as 'numeric' | '2-digit' | 'narrow' | 'short' | 'long',
            day: 'numeric' as 'numeric' | '2-digit',
            hour: '2-digit' as 'numeric' | '2-digit',
            minute: '2-digit' as 'numeric' | '2-digit',
            hour12: false
        };

        return date.toLocaleString('en-US', options);
    }

    async deleteTheme(theme: any) {
        await this.designerService.deleteTheme(theme);
    }

    async duplicateTheme(theme: any) {
        await this.designerService.duplicateTheme(theme);
    }

    async downloadTheme(theme: any) {
        await this.designerService.downloadTheme(theme);
    }

    toggleMenuOptions(event: any, theme: any) {
        event.stopPropagation();
        this.designerService.currentTheme.set(theme);
        this.menu.toggle(event);
    }

    onMenuShow() {
        this.bindScrollListener();
    }

    onMenuHide() {
        this.unbindScrollListener();
    }

    bindScrollListener() {
        this.scrollListener = this.renderer.listen(window, 'scroll', () => {
            this.menu.hide();
        });
    }

    unbindScrollListener() {
        if (this.scrollListener) {
            this.scrollListener();
            this.scrollListener = null;
        }
    }
}
