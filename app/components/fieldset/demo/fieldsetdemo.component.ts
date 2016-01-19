import {Component} from 'angular2/core';
import {FieldsetComponent} from '../fieldset.component';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Fieldset</span>
                <span class="defaultText dispTable">Fieldset is a grouping component providing a content toggle feature.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <p-fieldset id="default">
                <legend>Godfather</legend>
                The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. 
                His beloved son Michael has just come home from the war, but does not intend to become part of his father's business. 
                Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, 
                kind and benevolent to those who give respect, 
                but given to ruthless violence whenever anything stands against the good of the family.
            </p-fieldset>
            <br>
            <p-fieldset id="toggle" toggleable="true">
                <legend>Toggleable</legend>
                The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. 
                His beloved son Michael has just come home from the war, but does not intend to become part of his father's business. 
                Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, 
                kind and benevolent to those who give respect, 
                but given to ruthless violence whenever anything stands against the good of the family.
            </p-fieldset>
        </div>
    `,
    directives: [FieldsetComponent]
})
export class FieldsetDemoComponent {

}