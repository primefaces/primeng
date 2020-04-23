import {Component,OnInit} from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './validationdemo.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .forms-grid > div {
            display: flex;
            align-items: center;
            padding: 1em;
        }

        :host ::ng-deep .forms-grid > div > div:first-child {
           min-width: 10em;
        }
        
        input, textarea {
            flex: 1 1 auto;
        }

        :host ::ng-deep .ui-message {
            margin-left: 1em;
        }

        @media screen and (max-width: 64em) {
            :host ::ng-deep .ui-message-text {
                display: none;
            }
        }
    `]
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
            'description': new FormControl('')
        });
    }
    
    onSubmit(value: string) {
        this.submitted = true;
        this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted', sticky: true});
    }

    get diagnostic() { return JSON.stringify(this.userform.value); }
    
}
