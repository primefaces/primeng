import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { MessageModule } from 'primeng/message';

@Component({
    selector: 'icon-doc',
    standalone: true,
    imports: [MessageModule, AvatarModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The icon of a message is specified with the <i>icon</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center items-center gap-4">
            <p-message severity="info" icon="pi pi-send" text="Info Message" styleClass="h-full" />
            <p-message severity="success">
                <ng-template #icon>
                    <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
                </ng-template>
                <span class="ms-2">How may I help you?</span>
            </p-message>
        </div>
        <app-code selector="message-icon-demo"></app-code>
    `
})
export class IconDoc implements OnInit {
    ngOnInit() {}
}
