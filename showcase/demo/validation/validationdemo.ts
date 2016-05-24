import {Component} from '@angular/core';
import {FORM_DIRECTIVES,Validators, FormBuilder,Control,ControlGroup} from '@angular/common';
import {InputText} from '../../../components/inputtext/inputtext';
import {Password} from '../../../components/password/password';
import {Panel} from '../../../components/panel/panel';
import {Button} from '../../../components/button/button';
import {Dropdown} from '../../../components/dropdown/dropdown';
import {SelectItem} from '../../../components/common';
import {InputTextarea} from '../../../components/inputtextarea/inputtextarea';

@Component({
    templateUrl: 'showcase/demo/validation/validationdemo.html',
    directives: [InputText,Password,Panel,Button,Dropdown,InputTextarea,FORM_DIRECTIVES]
})
export class ValidationDemo {
    
    form: ControlGroup;
    
    submitted: boolean;
    
    genders: SelectItem[];
    
    selectedGender: string;
    
    description: string;
    
    constructor(fb: FormBuilder) {
        this.form = fb.group({
            "firstName": new Control("", Validators.required),
            "lastName": new Control("", Validators.required),
            "password": new Control("", Validators.required)
        });
        
        this.genders = [];
        this.genders.push({label:'Select Gender', value:''});
        this.genders.push({label:'Male', value:'Male'});
        this.genders.push({label:'Female', value:'Female'});
    }
    
    onSubmit(value: string) {
        this.submitted = true;
    }
    
}