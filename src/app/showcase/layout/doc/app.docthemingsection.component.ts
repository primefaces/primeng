import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-docthemingsection',
    template: `
        <div class="doc-main">
            <div class="doc-intro">
                <h1>{{ header }} Theming</h1>
                <p>Theming documentation is in progress...</p>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocThemingSectionComponent {
    @Input() header!: string;
}
