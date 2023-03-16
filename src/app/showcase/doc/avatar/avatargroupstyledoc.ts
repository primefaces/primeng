import { Component, Input } from '@angular/core';

@Component({
    selector: 'avatarstyle-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Element</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>p-avatar-group</td>
                        <td>Container element.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class AvatarGroupStyleDoc {
    @Input() id: string;

    @Input() title: string;
}
