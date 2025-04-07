import { DesignerService } from '@/service/designerservice';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
    selector: 'design-settings',
    standalone: true,
    imports: [CommonModule, FormsModule, ConfirmPopupModule],
    template: ` <section>
            <div class="text-lg font-semibold mb-2">Font</div>
            <div class="flex gap-4">
                <div>
                    <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Base</div>
                    <select [(ngModel)]="designerService.designer().theme.config.font_size" (change)="changeBaseFontSize()" class="appearance-none px-3 py-2 rounded-md border border-surface-300 dark:border-surface-700 w-20">
                        <option *ngFor="let fontSize of fontSizes" [value]="fontSize">{{ fontSize }}</option>
                    </select>
                </div>

                <div>
                    <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Family</div>
                    <select [(ngModel)]="designerService.designer().theme.config.font_family" (change)="changeFont()" class="appearance-none px-3 py-2 rounded-md border border-surface-300 dark:border-surface-700 w-48">
                        <option *ngFor="let font of fonts" [value]="font">{{ font }}</option>
                    </select>
                </div>
            </div>
        </section>
        <section class="mt-6">
            <div class="block text-lg font-semibold mb-2">Migration Assistant</div>
            <span class="block text-muted-color leading-6 mb-4"
                >Automatically update your themes to the latest version. This tool does not override the values of existing tokens, and only adds missing tokens if necessary. Still, it is recommended to duplicate your theme as a backup and run a
                preview before the migration.
            </span>
            <div class="flex justify-start gap-2">
                <button type="button" (click)="preview()" class="btn-design-outlined">Check for Updates</button>
                <button *ngIf="status() === 'preview' && missingTokens().length > 0" type="button" (click)="confirmMigration($event)" class="btn-design">Migrate</button>
            </div>
            @if (status() === 'preview') {
                <div>
                    @if (missingTokens().length > 0) {
                        <div class="p-3 bg-yellow-100 text-yellow-950 dark:bg-yellow-500/30 dark:text-yellow-100 font-medium mt-4 rounded-md leading-normal">
                            There are missing tokens, you may add them automatically using the migrate option with placeholder values. After migration, visit the corresponding section to define the actual values for your theme.
                        </div>
                    } @else {
                        <div class="p-3 bg-green-100 text-green-950 dark:bg-green-500/30 dark:text-white font-medium mt-4 rounded-md leading-normal">Your theme is up to date.</div>
                    }
                </div>
            } @else if (status() === 'updated' && missingTokens().length == 0) {
                <div>
                    <div class="p-3 bg-green-100 text-green-950 dark:bg-green-500/30 dark:text-white font-medium mt-4 rounded-md leading-normal">Your theme is successfully updated.</div>
                </div>
            }
            @if (missingTokens().length) {
                <div class="max-h-60 overflow-auto mt-4 px-3 py-2 rounded-md border border-surface-300 dark:border-surface-700 w-full">
                    <ul class="flex flex-col gap-1">
                        <li *ngFor="let token of missingTokens()" class="flex justify-between">
                            <span class="bg-red-50 text-red-950 dark:bg-red-500/30 dark:text-red-100 text-sm font-medium px-2 py-1 rounded-lg">{{ token.value }}</span>
                            <span class="bg-zinc-950 text-white dark:bg-white dark:text-black rounded-full px-2 text-xs inline-flex items-center font-medium">{{ token.type }}</span>
                        </li>
                    </ul>
                </div>
            }
        </section>
        <p-confirm-popup />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignSettings {
    designerService: DesignerService = inject(DesignerService);

    confirmationService: ConfirmationService = inject(ConfirmationService);

    missingTokens = computed(() => this.designerService.missingTokens());

    status = computed(() => this.designerService.status());

    fontSizes: string[] = ['12px', '13px', '14px', '15px', '16px'];

    fonts: string[] = [
        'DM Sans',
        'Dosis',
        'Figtree',
        'IBM Plex Sans',
        'Inter var',
        'Lato',
        'Lexend',
        'Merriweather Sans',
        'Montserrat',
        'Noto Sans Display',
        'Nunito',
        'Nunito Sans',
        'Onest',
        'Open Sans',
        'Outfit',
        'Poppins',
        'PT Sans',
        'Public Sans',
        'Quicksand',
        'Raleway',
        'Roboto',
        'Source Sans Pro',
        'Space Grotesk',
        'Spline Sans',
        'Titillium Web',
        'Ubuntu Sans'
    ];

    async changeFont() {
        await this.designerService.applyFont(this.designerService.designer().theme.config.font_family);
        await this.designerService.saveTheme(this.designerService.designer().theme);
    }

    async changeBaseFontSize() {
        document.documentElement.style.setProperty('font-size', this.designerService.designer().theme.config.font_size);
        await this.designerService.saveTheme(this.designerService.designer().theme);
    }

    confirmMigration(event: any) {
        this.confirmationService.confirm({
            key: 'designer',
            target: event.target as EventTarget,
            message: 'Are you sure you want to migrate?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonProps: {
                severity: 'contrast'
            },
            rejectButtonProps: {
                severity: 'secondary'
            },
            accept: () => this.migrate()
        });
    }

    async preview() {
        await this.designerService.preview();
    }

    async migrate() {
        await this.designerService.migrate();
    }
}
