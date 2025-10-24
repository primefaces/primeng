import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'communication-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Join the Contributors channel on the <a href="https://discord.com/invite/gzKFYnpmCY" target="_blank" rel="noopener noreferrer">PrimeLand Discord</a> server to connect with PrimeNG staff and fellow contributors. In this channel, you
                can discuss the areas you want to contribute to and receive feedback. This channel is open to everyone who'd like to contribute.
            </p>
        </app-docsectiontext>
    `
})
export class CommunicationDoc {}
