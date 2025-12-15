import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
/* @todo: Change the import path */
import APIDoc from '@/doc/apidoc/index.json';
// import ThemeDoc from '@/doc/apidoc/themedoc.json';
import { CommonModule } from '@angular/common';
import ThemeDoc from '@primeuix/themes/tokens';
import { AppDocApiTable } from './app.docapitable';
import { AppDocSectionNav } from './app.docsection-nav';
import { AppDocStyledPreset } from './app.docstyledpreset';
@Component({
    selector: 'app-docthemingsection',
    standalone: true,
    imports: [CommonModule, AppDocApiTable, AppDocStyledPreset, AppDocSectionNav],
    template: `
        <div class="doc-main">
            <div class="doc-intro">
                <h1>{{ header }} Theming</h1>
            </div>
            @if (classDoc()) {
                <app-docapitable [id]="header + 'Classes'" [label]="'CSS Classes'" description="List of class names used in the styled mode." [data]="classDoc().classes" />
            }
            @if (tokensDoc()) {
                <app-docapitable [id]="header + 'DesignTokens'" [label]="header + ' Design Tokens'" description="List of design tokens used in a preset." [data]="tokensDoc().tokens" />
            }
            <app-docstyledpreset [data]="componentName.toLowerCase()"></app-docstyledpreset>
        </div>
        <app-docsection-nav [docs]="navItems()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDocThemingSection {
    @Input() header!: string;

    @Input() docs: string;

    @Input() componentName: string;

    tokensDoc = signal<any>([]);

    classDoc = signal<any>([]);

    navItems = signal<any>([]);

    ngOnInit() {
        this.createDocs();
    }

    createDocs() {
        const docName = this.header.toLowerCase().replace(/\s+/g, '');
        const themeDocKey = docName === 'table' ? 'datatable' : docName;
        const navItems = [];

        // Check for CSS classes in the new structure
        if (APIDoc[docName]?.style?.classes?.values) {
            const classes = APIDoc[docName].style.classes.values;

            if (classes && classes.length > 0) {
                this.classDoc.set({ classes });
                navItems.push({
                    id: this.header + 'Classes',
                    label: 'CSS Classes'
                });
            }
        }

        // Check for design tokens
        if (ThemeDoc[themeDocKey]) {
            this.tokensDoc.set(ThemeDoc[themeDocKey]);
            navItems.push({
                id: this.header + 'DesignTokens',
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
