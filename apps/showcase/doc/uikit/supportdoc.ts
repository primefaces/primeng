import { Component } from '@angular/core';
import { AppDocModule } from '@/components/doc/app.doc.module';

@Component({
    selector: 'support-doc',
    standalone: true,
    imports: [AppDocModule],
    template: `<app-docsectiontext>
        <p>
            The community gathers on <a href="https://github.com/orgs/primefaces/discussions/categories/figma-ui-kit" target="_blank" rel="noopener noreferrer">GitHub Discussions</a> and
            <a href="https://discord.gg/gzKFYnpmCY" target="_blank" rel="noopener noreferrer">Discord</a> to ask questions, share ideas, and discuss the technology. For direct inquiries or suggestions, feel free to contact us at
            <a href="mailto:contact@primetek.com.tr">contact&#64;primetek.com.tr</a>.
        </p>
    </app-docsectiontext>`
})
export class SupportDoc {}
