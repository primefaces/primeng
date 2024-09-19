import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import ThemeDoc from 'src/app/showcase/doc/apidoc/themedoc.json';

@Component({
    selector: 'app-docthemingsection',
    template: `
        <div class="doc-main">
            <div class="doc-intro">
                <h1>{{ header }} Theming</h1>
            </div>
            @if (doc() && doc().tokens) {
                <app-docapitable
                    [id]="id()"
                    [label]="header + ' Design Tokens'"
                    description="List of design tokens used in a preset."
                    [data]="doc().tokens"
                />
            }
        </div>
        <app-docsection-nav [docs]="navItems()" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocThemingSectionComponent {
    @Input() header!: string;

    id = signal<string>('');

    doc = signal<any>([]);

    navItems = signal<any>([]);

    ngOnInit() {
        this.createDocs();
        this.navItems.set([
            {
                id: 'styled',
                label: 'Styled',
                children: [
                    {
                        id: this.header + 'DesignTokens',
                        label: 'Design Tokens',
                    },
                ],
            },
        ]);

        this.id.set(this.header + 'DesignTokens');
    }

    createDocs() {
        const docName = this.header.toLowerCase().replace(/\s+/g, '');
        this.doc.set(ThemeDoc[docName]);
    }
}
