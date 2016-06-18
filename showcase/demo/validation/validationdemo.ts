import {Component} from '@angular/core';
import {FORM_DIRECTIVES,REACTIVE_FORM_DIRECTIVES,Validators,FormControl,FormGroup} from '@angular/forms';
import {InputText} from '../../../components/inputtext/inputtext';
import {Password} from '../../../components/password/password';
import {Panel} from '../../../components/panel/panel';
import {Button} from '../../../components/button/button';
import {Dropdown} from '../../../components/dropdown/dropdown';
import {SelectItem} from '../../../components/common';
import {InputTextarea} from '../../../components/inputtextarea/inputtextarea';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Growl} from '../../../components/growl/growl';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Message} from '../../../components/common';

@Component({
    templateUrl: 'showcase/demo/validation/validationdemo.html',
    directives: [InputText,Password,Panel,Button,Dropdown,TabView,TabPanel,Growl,CodeHighlighter,InputTextarea,REACTIVE_FORM_DIRECTIVES]
})
export class ValidationDemo {
    
    msgs: Message[] = [];
    
    userform: FormGroup;
    
    submitted: boolean;
    
    genders: SelectItem[];
        
    description: string;
    
    ngOnInit() {
        this.userform = new FormGroup({
            'firstname': new FormControl('', Validators.required),
            'lastname': new FormControl('', Validators.required),
            'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
            'description': new FormControl(''),
            'gender': new FormControl('', Validators.required)
        });
        
        this.genders = [];
        this.genders.push({label:'Select Gender', value:''});
        this.genders.push({label:'Male', value:'Male'});
        this.genders.push({label:'Female', value:'Female'});
    }
    
    onSubmit(value: string) {
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Submitted'});
    }
    
    get diagnostic() { return JSON.stringify(this.userform.value); }
    
}