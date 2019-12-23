import {Component,OnInit} from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './validationdemo.html',
    providers: [MessageService]
})
export class ValidationDemo implements OnInit {
    
    userform: FormGroup;
    
    submitted: boolean;
    
    genders: SelectItem[];
    
    description: string;
    
    constructor(private fb: FormBuilder, private messageService: MessageService, private app: AppComponent) {}
    
    ngOnInit() {
        this.userform = this.fb.group({
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
        this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted', sticky: true});
    }
    
    getTop() {
        return this.app.newsActive ? '150px' : '80px';
    }

    get diagnostic() { return JSON.stringify(this.userform.value); }
    
}
