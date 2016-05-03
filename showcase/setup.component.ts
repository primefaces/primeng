import {Component} from '@angular/core';
import {CodeHighlighter} from '../components/codehighlighter/codehighlighter';

@Component({
    templateUrl: 'showcase/setup.component.html',
    directives: [CodeHighlighter]
})
export class SetupComponent {

}