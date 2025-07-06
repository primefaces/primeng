import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
/* @todo: Change the import path */
import APIDoc from '@/doc/apidoc/index.json';
//import ThemeDoc from '@/doc/apidoc/themedoc.json';
import ThemeDoc from '@primeuix/themes/tokens';

@Component({
    selector: 'app-docthemingsection',
    standalone: false,
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
export class AppDocThemingSectionComponent {
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
        if (ThemeDoc[docName]) {
            this.tokensDoc.set(ThemeDoc[docName]);
            this.navItems.update((prev) => [
                ...prev,
                {
                    id: this.header + 'DesignTokens',
                    label: 'Design Tokens'
                },
                { id: 'built-in-presets', label: 'Built-in Presets' }
            ]);
        }
        if (APIDoc[docName]) {
            const classes = APIDoc[docName]['style']['classes']['values'];
            this.classDoc.set({ classes: classes });

            this.navItems.update((prev) => [
                {
                    id: this.header + 'classes',
                    label: 'CSS Classes'
                },
                ...prev
            ]);
        }
    }
}
