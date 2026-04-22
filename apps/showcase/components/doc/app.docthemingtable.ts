import { AppConfigService } from '@/service/appconfigservice';
import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { AppDocSectionText } from './app.docsectiontext';

type ThemingTableType = 'classes' | 'tokens';

interface CssClassItem {
    class: string;
    description: string;
}

interface TokenItem {
    name: string;
    token: string;
    variable: string;
}

@Component({
    selector: 'app-docthemingtable',
    standalone: true,
    imports: [CommonModule, AppDocSectionText],
    template: `
        @if (data() && data().length > 0) {
            <!-- Section Title and Description -->
            <app-docsectiontext [id]="id()" [title]="label()" [level]="3">
                <p>{{ description() }}</p>
            </app-docsectiontext>

            <div class="doc-tablewrapper mt-4">
                <table class="doc-table">
                    <!-- CSS Classes Table -->
                    @if (tableType() === 'classes') {
                        <thead>
                            <tr>
                                <th>Class</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            @for (item of classData(); track item.class) {
                                <tr>
                                    <td>
                                        <span [attr.id]="id() + '.' + item.class" class="doc-option-name">
                                            {{ item.class }}
                                            <a (click)="navigate($event, item.class)" class="doc-option-link">
                                                <i class="pi pi-link"></i>
                                            </a>
                                        </span>
                                    </td>
                                    <td>
                                        <div class="doc-option-description">{{ item.description }}</div>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    }

                    <!-- Design Tokens Table -->
                    @if (tableType() === 'tokens') {
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Token</th>
                                <th style="min-width: 30rem">Variable</th>
                            </tr>
                        </thead>
                        <tbody>
                            @for (item of tokenData(); track item.variable) {
                                <tr>
                                    <td>
                                        <span [attr.id]="id() + '.' + item.name" class="doc-option-name">
                                            {{ item.name }}
                                            <a (click)="navigate($event, item.name)" class="doc-option-link">
                                                <i class="pi pi-link"></i>
                                            </a>
                                        </span>
                                    </td>
                                    <td>
                                        <span class="doc-option-type">{{ item.token }}</span>
                                    </td>
                                    <td>
                                        <div class="doc-option-return-type min-w-full" [class.doc-option-dark]="isDarkMode()" [class.doc-option-light]="!isDarkMode()">
                                            {{ item.variable }}
                                        </div>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    }
                </table>
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDocThemingTable {
    private configService = inject(AppConfigService);
    private location = inject(Location);

    id = input<string>('');
    label = input<string>('');
    data = input<any[]>([]);
    description = input<string>('');
    tableType = input<ThemingTableType>('classes');

    isDarkMode = computed(() => this.configService.appState().darkTheme);

    classData = computed(() => {
        if (this.tableType() !== 'classes') return [];
        return this.data() as CssClassItem[];
    });

    tokenData = computed(() => {
        if (this.tableType() !== 'tokens') return [];
        return this.data() as TokenItem[];
    });

    navigate(event: Event, param: string): void {
        if (typeof window !== 'undefined') {
            const parentElement = (event.currentTarget as HTMLElement).parentElement;
            this.location.go(this.location.path() + '#' + this.id() + '.' + param);

            setTimeout(() => {
                parentElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }, 1);
            event.preventDefault();
        }
    }
}
