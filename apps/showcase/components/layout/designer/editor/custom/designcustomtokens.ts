import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DesignerService } from '@/service/designerservice';
import { usePreset } from '@primeuix/styled';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'design-custom-tokens',
    standalone: true,
    imports: [CommonModule, FormsModule, ToastModule],
    template: ` <div class="leading-6 text-muted-color mb-4">
            Extend the theming system with your own design tokens e.g. <span class="font-medium">accent.color</span>. Do not use curly braces in the name field, and ensure that the name does not match any built-in tokens.
        </div>
        <ul *ngIf="tokens?.length" class="flex flex-col gap-4 list-none p-0 mx-0 mb-4">
            <li *ngFor="let token of tokens; let idx = $index" class="first:border-t border-b border-surface-200 dark:border-surface-700 py-2">
                <div class="flex items-center gap-4">
                    <label class="flex items-center gap-2 flex-auto">
                        <span class="text-sm">Name</span>
                        <input [(ngModel)]="token['name']" type="text" class="border border-surface-300 dark:border-surface-600 rounded-lg py-2 px-2 w-full" placeholder="custom.token.name" maxlength="100" />
                    </label>
                    <label class="flex items-center gap-2 flex-auto">
                        <span class="text-sm">Value</span>
                        <input [(ngModel)]="token['value']" type="text" class="border border-surface-300 dark:border-surface-600 rounded-lg py-2 px-2 w-full" placeholder="token value" maxlength="100" />
                    </label>
                    <button
                        type="button"
                        (click)="removeToken(idx)"
                        class="cursor-pointer inline-flex items-center justify-center ms-auto w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-400/10 dark:hover:bg-red-400/20 dark:text-red-400 transition-colors duration-200 focus:outline focus:outline-offset-2 focus:outline-red-600 focus:dark:outline-red-400"
                    >
                        <i class="pi pi-times"></i>
                    </button>
                </div>
            </li>
        </ul>
        <div class="flex justify-between">
            <button type="button" (click)="addToken()" class="btn-design-outlined">Add New</button>
            <button type="button" (click)="save()" class="btn-design">Save</button>
        </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignCustomTokens implements OnInit {
    designerService: DesignerService = inject(DesignerService);

    messageService: MessageService = inject(MessageService);

    tokens: any;

    ngOnInit() {
        const extend = this.designerService.designer().theme.preset.extend;
        this.tokens = [];

        if (extend) {
            this.tokens = this.objectToDotNotation(extend);
        }
    }

    addToken() {
        this.tokens = [...this.tokens, ...[{}]];
    }

    removeToken(index) {
        this.tokens.splice(index, 1);
    }

    save() {
        const designer = this.designerService.designer();
        designer.theme.preset.extend = {};

        this.tokens.forEach((token) => {
            const { name, value } = token;
            const nestedObj = this.transformTokenName(name, value);
            this.mergeObjects(designer.theme.preset.extend, nestedObj);
        });

        this.designerService.designer.set(designer);

        this.designerService.designer().verified && this.designerService.saveTheme(this.designerService.designer().theme);
        usePreset(this.designerService.designer().theme.preset);
        this.designerService.refreshACTokens();
        this.messageService.add({ key: 'designer', severity: 'success', summary: 'Success', detail: 'Tokens saved', life: 3000 });
    }

    transformTokenName(token: string, value: string) {
        const parts = token.split('.');

        const result = {};

        let current = result;

        for (let i = 0; i < parts.length - 1; i++) {
            current[parts[i]] = current[parts[i]] || {};

            current = current[parts[i]];
        }

        current[parts[parts.length - 1]] = value;

        return result;
    }

    objectToDotNotation(obj, prefix = '', result = []) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const path = prefix ? `${prefix}.${key}` : key;

                if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                    this.objectToDotNotation(obj[key], path, result);
                } else {
                    result.push({
                        name: path,

                        value: obj[key]
                    });
                }
            }
        }

        return result;
    }

    mergeObjects(target, source) {
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                    target[key] = target[key] || {};

                    this.mergeObjects(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }

        return target;
    }
}
