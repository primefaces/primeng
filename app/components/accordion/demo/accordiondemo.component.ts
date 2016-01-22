import {Component} from 'angular2/core';
import {AccordionComponent} from '../accordion.component';
import {AccordionTabComponent} from '../accordiontab.component'
import {ButtonDirective} from '../../button/button.directive';

@Component({
    template: `
        <div class="ContentSideSections">
            <div class="Content100 overHidden TextShadow">
                <span class="fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock">Accordion</span>
                <span class="defaultText dispTable">Accordion groups a collection of contents in tabs.</span>
            </div>
        </div>

        <div class="ContentSideSections Implementation">
            <h3 class="first">Default</h3>
            <p-accordion>
                <p-accordionTab header="Godfather I">
                    The story begins as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
                </p-accordionTab>
                <p-accordionTab header="Godfather II">
                    Francis Ford Coppola's legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels the young Vito Corleone's rise with his son Michael's spiritual fall, deepening The_Godfather's depiction of the dark side of the American dream. In the early 1900s, the child Vito flees his Sicilian village for America after the local Mafia kills his family. Vito struggles to make a living, legally or illegally, for his wife and growing brood in Little Italy, killing the local Black Hand Fanucci after he demands his customary cut of the tyro's business. With Fanucci gone, Vito's communal stature grows.
                </p-accordionTab>
                <p-accordionTab header="Godfather III">
                    After a break of more than  15 years, director Francis Ford Coppola and writer Mario Puzo returned to the well for this third and final story of the fictional Corleone crime family. Two decades have passed, and crime kingpin Michael Corleone, now divorced from his wife Kay has nearly succeeded in keeping his promise that his family would one day be completely legitimate.
                </p-accordionTab>
            </p-accordion>

            <h3>Active Index Binding - {{activeTabIndex}}</h3>
            <button type="button" (click)="changeTab()" pButton icon="fa fa-arrows-v">Change</button>
            <br /><br />
            <p-accordion [(activeIndex)]="activeTabIndex">
                <p-accordionTab header="Godfather I">
                    The story begins as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
                </p-accordionTab>
                <p-accordionTab header="Godfather II">
                    Francis Ford Coppola's legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels the young Vito Corleone's rise with his son Michael's spiritual fall, deepening The_Godfather's depiction of the dark side of the American dream. In the early 1900s, the child Vito flees his Sicilian village for America after the local Mafia kills his family. Vito struggles to make a living, legally or illegally, for his wife and growing brood in Little Italy, killing the local Black Hand Fanucci after he demands his customary cut of the tyro's business. With Fanucci gone, Vito's communal stature grows.
                </p-accordionTab>
                <p-accordionTab header="Godfather III">
                    After a break of more than  15 years, director Francis Ford Coppola and writer Mario Puzo returned to the well for this third and final story of the fictional Corleone crime family. Two decades have passed, and crime kingpin Michael Corleone, now divorced from his wife Kay has nearly succeeded in keeping his promise that his family would one day be completely legitimate.
                </p-accordionTab>
            </p-accordion>

            <h3>Multiple</h3>
            <p-accordion multiple="multiple">
                <p-accordionTab header="Godfather I">
                    The story begins  as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
                </p-accordionTab>
                <p-accordionTab header="Godfather II">
                    Francis Ford Coppola's legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels the young Vito Corleone's rise with his son Michael's spiritual fall, deepening The_Godfather's depiction of the dark side of the American dream. In the early 1900s, the child Vito flees his Sicilian village for America after the local Mafia kills his family. Vito struggles to make a living, legally or illegally, for his wife and growing brood in Little Italy, killing the local Black Hand Fanucci after he demands his customary cut of the tyro's business. With Fanucci gone, Vito's communal stature grows.
               </p-accordionTab>
                <p-accordionTab header="Godfather III">
                    After a break of more than  15 years, director Francis Ford Coppola and writer Mario Puzo returned to the well for this third and final story of the fictional Corleone crime family. Two decades have passed, and crime kingpin Michael Corleone, now divorced from his wife Kay has nearly succeeded in keeping his promise that his family would one day be completely legitimate.
                </p-accordionTab>
            </p-accordion>
        </div>
    `,
    directives: [AccordionComponent,AccordionTabComponent, ButtonDirective]
})
export class AccordionDemoComponent {

    activeTabIndex: number = 1; 

    changeTab() {
        var index = this.activeTabIndex;
        index++;
        if(index > 2) {
            index = 0;
        }

        this.activeTabIndex = index;
    }
}