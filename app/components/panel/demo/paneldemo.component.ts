import {Component} from 'angular2/core';
import {PanelComponent} from '../panel.component';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Panel</span>
                <span class="defaultText dispTable">Panel is a grouping component providing with content toggle and close features.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <p-panel header="Godfather I" toggleable="true">
                The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. 
                His beloved son Michael has just come home from the war, but does not intend to become part of his father's business. 
                Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, 
                kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
            </p-panel>
        </div>
    `,
    directives: [PanelComponent]
})
export class PanelDemoComponent {

}