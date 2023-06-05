import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-developmentsection>
        <app-docsectiontext [title]="title" [id]="id">
            <div class="doc-section-description">
                <h3>Screen Reader</h3>
                <p>
                    A card can be utilized in many use cases as a result no role is enforced, in fact a role may not be necessary if the card is used for presentational purposes only. Any valid attribute is passed to the container element so if you
                    require to use one of the <a href="https://www.w3.org/TR/wai-aria/#landmark" alt="Landmark Roles">landmark</a> roles like <i>region</i>, you may use the <i>role</i> property.
                </p>
                <app-code [code]="code" [hideToggleCode]="true"></app-code>
                <h3>Keyboard Support</h3>
                <p>Component does not include any interactive elements.</p>
            </div>
        </app-docsectiontext>
    </app-developmentsection>`
})
export class AccessibilityDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        html: `<p-card role="region">
    Content
</p-card>`
    };
}
