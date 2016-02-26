import {Component} from 'angular2/core';
import {CodeHighlighter} from '../components/codehighlighter/codehighlighter';

@Component({
    templateUrl: 'showcase/setup.component.html',
    directives: [CodeHighlighter]
})
export class SetupComponent {

}