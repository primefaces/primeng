import { Component, inject } from '@angular/core';
import Aura from '@primeng/themes/aura';
import Nora from '@primeng/themes/nora';
import Lara from '@primeng/themes/lara';
import { DesignerService } from '@/service/designerservice';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { usePreset } from '@primeuix/styled';

const presets = {
    Aura,
    Lara,
    Nora
};

@Component({
    selector: 'design-create-theme',
    standalone: true,
    imports: [CommonModule, FormsModule, DividerModule, FileUploadModule],
    template: `<section class="mb-6">
            <span class="block text-lg font-semibold mb-2">Theme Name</span>
            <input [(ngModel)]="themeName" type="text" autocomplete="off" class="px-3 py-2 rounded-md border border-surface-300 dark:border-surface-700 flex-1" maxlength="25" />
        </section>
        <section class="mb-6">
            <div class="text-lg font-semibold mb-2">Foundation</div>
            <span class="block text-muted-color leading-6 mb-4">Start by choosing a built-in theme as a foundation, or import your own design by uploading a tokens.json file created with the Prime UI Kit and Tokens Studio.</span>
            <div class="flex flex-col">
                <div class="flex flex-col gap-4 border border-surface-200 dark:border-surface-700 rounded-md p-4">
                    <div class="flex items-center gap-2">
                        <i class="pi pi-prime" style="font-size: 20px"></i>
                        <span class="font-semibold">Base Theme</span>
                    </div>
                    <span class="text-muted-color">Variety of built-in themes with distinct characteristics.</span>
                    <div class="flex justify-between">
                        <div class="flex">
                            <button
                                *ngFor="let presetOption of presetOptions"
                                type="button"
                                (click)="updateBasePreset(presetOption.value)"
                                class="border border-surface-200 dark:border-surface-700 px-3 py-2 border-r-0 last:border-r first:rounded-l-md last:rounded-r-md transition-colors duration-200"
                                [ngClass]="{
                                    'bg-zinc-950 text-white dark:bg-white dark:text-black': presetOption.value === basePreset,
                                    'hover:bg-gray-100 dark:hover:bg-surface-800': presetOption.value !== basePreset
                                }"
                            >
                                {{ presetOption.label }}
                            </button>
                        </div>
                        <button type="button" (click)="createThemeFromPreset()" class="btn-design">Create</button>
                    </div>
                </div>

                <p-divider>OR</p-divider>

                <div class="flex flex-col gap-4 border border-surface-200 dark:border-surface-700 rounded-md p-4">
                    <div class="flex items-center gap-1">
                        <svg width="20px" height="20px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7.00005 2.04999H5.52505C4.71043 2.04999 4.05005 2.71037 4.05005 3.52499C4.05005 4.33961 4.71043 4.99999 5.52505 4.99999H7.00005V2.04999ZM7.00005 1.04999H8.00005H9.47505C10.842 1.04999 11.95 2.15808 11.95 3.52499C11.95 4.33163 11.5642 5.04815 10.9669 5.49999C11.5642 5.95184 11.95 6.66836 11.95 7.475C11.95 8.8419 10.842 9.95 9.47505 9.95C8.92236 9.95 8.41198 9.76884 8.00005 9.46266V9.95L8.00005 11.425C8.00005 12.7919 6.89195 13.9 5.52505 13.9C4.15814 13.9 3.05005 12.7919 3.05005 11.425C3.05005 10.6183 3.43593 9.90184 4.03317 9.44999C3.43593 8.99814 3.05005 8.28163 3.05005 7.475C3.05005 6.66836 3.43594 5.95184 4.03319 5.5C3.43594 5.04815 3.05005 4.33163 3.05005 3.52499C3.05005 2.15808 4.15814 1.04999 5.52505 1.04999H7.00005ZM8.00005 2.04999V4.99999H9.47505C10.2897 4.99999 10.95 4.33961 10.95 3.52499C10.95 2.71037 10.2897 2.04999 9.47505 2.04999H8.00005ZM5.52505 8.94998H7.00005L7.00005 7.4788L7.00005 7.475L7.00005 7.4712V6H5.52505C4.71043 6 4.05005 6.66038 4.05005 7.475C4.05005 8.28767 4.70727 8.94684 5.5192 8.94999L5.52505 8.94998ZM4.05005 11.425C4.05005 10.6123 4.70727 9.95315 5.5192 9.94999L5.52505 9.95H7.00005L7.00005 11.425C7.00005 12.2396 6.33967 12.9 5.52505 12.9C4.71043 12.9 4.05005 12.2396 4.05005 11.425ZM8.00005 7.47206C8.00164 6.65879 8.66141 6 9.47505 6C10.2897 6 10.95 6.66038 10.95 7.475C10.95 8.28962 10.2897 8.95 9.47505 8.95C8.66141 8.95 8.00164 8.29121 8.00005 7.47794V7.47206Z"
                            />
                        </svg>
                        <span class="font-semibold"> Import Figma Tokens </span>
                    </div>
                    <span class="text-muted-color leading-6">Export the token.json file from Figma Token Studio and import to the Visual Editor.</span>
                    <div class="flex justify-between">
                        <p-fileUpload mode="basic"></p-fileUpload>
                        <button type="button" (click)="createThemeFromFigma()" class="btn-design">Create</button>
                    </div>
                </div>
            </div>
        </section> `
})
export class DesignCreateTheme {
    designerService: DesignerService = inject(DesignerService);

    themeName: string;

    basePreset: string = 'Aura';

    figmaData: null;

    presetOptions = [
        { label: 'Aura', value: 'Aura' },
        { label: 'Lara', value: 'Lara' },
        { label: 'Nora', value: 'Nora' }
    ];

    baseUrl = 'http://localhost:4000';

    http: HttpClient = inject(HttpClient);

    async createThemeFromPreset() {
        if (!this.themeName || this.themeName.trim().length === 0) {
            // add error message
        } else {
            const newPreset = structuredClone(presets[this.basePreset]);

            if (this.designerService.designer().verified) {
                const url = `${this.baseUrl}/theme/create`;
                const body = {
                    name: this.themeName,
                    preset: newPreset,
                    project: 'primeng',
                    base: this.basePreset,
                    config: {
                        font_size: '14px',
                        font_family: 'Inter var'
                    }
                };

                this.http.post(`${url}`, body, { withCredentials: true, headers: { 'X-CSRF-Token': this.designerService.designer().csrfToken } }).subscribe({
                    next: (res: any) => {
                        this.loadThemeEditor(res.data.t_key, newPreset);
                    },
                    error: (err: any) => {
                        // add toast message
                    }
                });
            } else {
                this.loadThemeEditor('trial', newPreset);
            }
        }
    }

    async createThemeFromFigma() {}

    onFileSelect(event: any) {}

    loadThemeEditor(t_key: string, preset: any) {
        this.designerService.designer.update((prev) => ({
            ...prev,
            theme: {
                name: this.themeName,
                key: t_key,
                preset: preset,
                config: {
                    font_size: '14px',
                    font_family: 'Inter var'
                }
            }
        }));

        this.designerService.applyFont('Inter var');
        document.documentElement.style.fontSize = '14px';
        usePreset(preset);
        this.designerService.refreshACTokens();
        this.designerService.designer.update((prev) => ({ ...prev, activeTab: '0', activeView: 'editor' }));
    }

    updateBasePreset(preset: any) {
        this.basePreset = preset.value;
    }
}
