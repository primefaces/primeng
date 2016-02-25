import {Component} from 'angular2/core';
import {pCode} from '../components/codehighlighter/codehighlighter';

@Component({
    templateUrl: 'showcase/setup.component.html',
    directives: [pCode]
})
export class SetupComponent {

}