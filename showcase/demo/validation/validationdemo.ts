import {Component} from '@angular/core';
import {FORM_DIRECTIVES,Validators,FormBuilder,Control,ControlGroup} from '@angular/common';
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
    directives: [InputText,Password,Panel,Button,Dropdown,TabView,TabPanel,Growl,CodeHighlighter,InputTextarea,FORM_DIRECTIVES]
})
export class ValidationDemo {
    
    msgs: Message[] = [];
    
    userform: ControlGroup;
    
    submitted: boolean;
    
    genders: SelectItem[];
        
    description: string;
    
    constructor(fb: FormBuilder) {
        this.userform = fb.group({
            'firstname': new Control('', Validators.required),
            'lastname': new Control('', Validators.required),
            'password': new Control('', Validators.compose([Validators.required, Validators.minLength(6)])),
            'description': new Control(''),
            'gender': new Control('', Validators.required)
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