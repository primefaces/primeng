import APIDoc from '@/doc/apidoc/index.json';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import ThemeDoc from '@primeuix/themes/tokens';
import { AppDocSectionNav } from './app.docsection-nav';
import { AppDocStyledPreset } from './app.docstyledpreset';
import { AppDocThemingTable } from './app.docthemingtable';

@Component({
    selector: 'app-docthemingsection',
    standalone: true,
    imports: [CommonModule, AppDocThemingTable, AppDocStyledPreset, AppDocSectionNav],
    template: `
        <div class="doc-main">
            <div class="doc-intro">
                <h1>{{ header() }} Theming</h1>
            </div>

            <!-- CSS Classes Table -->
            @if (classDoc()) {
                <app-docthemingtable [id]="header() + 'Classes'" label="CSS Classes" description="List of class names used in the styled mode." tableType="classes" [data]="classDoc().classes" />
            }

            <!-- Design Tokens Table -->
            @if (tokensDoc()) {
                <app-docthemingtable [id]="header() + 'DesignTokens'" [label]="header() + ' Design Tokens'" description="List of design tokens used in a preset." tableType="tokens" [data]="tokensDoc().tokens" />
            }

            <app-docstyledpreset [data]="componentName().toLowerCase()" />
        </div>
        <app-docsection-nav [docs]="navItems()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDocThemingSection {
    header = input.required<string>();
    docs = input<string>('');
    componentName = input<string>('');

    tokensDoc = signal<any>(null);
    classDoc = signal<any>(null);
    navItems = signal<any[]>([]);

    ngOnInit() {
        this.createDocs();
    }

    createDocs() {
        const docName = this.header().toLowerCase().replace(/\s+/g, '');
        const themeDocKey = docName === 'table' ? 'datatable' : docName;
        const navItems: any[] = [];

        // Check for CSS classes
        if (APIDoc[docName]?.style?.classes?.values) {
            const classes = APIDoc[docName].style.classes.values;

            if (classes && classes.length > 0) {
                this.classDoc.set({ classes });
                navItems.push({
                    id: this.header() + 'Classes',
                    label: 'CSS Classes'
                });
            }
        }

        // Check for design tokens
        if (ThemeDoc[themeDocKey]) {
            this.tokensDoc.set(ThemeDoc[themeDocKey]);
            navItems.push({
                id: this.header() + 'DesignTokens',
                label: 'Design Tokens'
            });
            navItems.push({
                id: 'built-in-presets',
                label: 'Built-in Presets'
            });
        }

        this.navItems.set(navItems);
    }
}
