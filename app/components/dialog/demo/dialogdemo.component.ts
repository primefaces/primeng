import {Component} from 'angular2/core';
import {DialogComponent} from '../dialog.component';
import {ButtonDirective} from '../../button/button.directive';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Dialog</span>
                <span class="defaultText dispTable">Dialog is a container widget featuring modality, minimize, maximize and animations.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <p-dialog id="dlgelement" header="Godfather I" [(visible)]="display" modal="modal" minimizable="minimizable" maximizable="maximizable">
                <p>The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. 
                   His beloved son Michael has just come home from the war, but does not intend to become part of his father's business. 
                   Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, 
                   kind and benevolent to those who give respect, 
                   but given to ruthless violence whenever anything stands against the good of the family.</p>
            </p-dialog>

            <button type="text" (click)="showDialog()" pButton icon="fa-external-link-square">Show</button>
        </div>
    `,
    directives: [DialogComponent, ButtonDirective]
})
export class DialogDemoComponent {

    display: boolean = false;

    showDialog() {
        this.display = true;
    }

}