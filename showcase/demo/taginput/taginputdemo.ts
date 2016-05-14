import {Component} from '@angular/core';
import {TagInput} from '../../../components/taginput/taginput';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    templateUrl: 'showcase/demo/taginput/taginputdemo.html',
    directives: [TagInput,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class TagInputDemo {

    tags: Array<string> = ['prime','angular'];

    validEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    emails: Array<string> = ['test@example.com'];
}
