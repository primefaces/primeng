import {Component,OnInit} from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {MessageService} from 'primeng/api';

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

    brands: string[] = ['Audi','BMW','Fiat','Ford','Honda','Jaguar','Mercedes','Renault','Volvo','VW'];
    
    filteredBrands: any[];

    cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
    ];
    
    constructor(private fb: FormBuilder, private messageService: MessageService) {}
    
    ngOnInit() {
        this.userform = this.fb.group({
            'firstname': new FormControl('', Validators.required),
            'lastname': new FormControl('', Validators.required),
            'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
            'brand' : new FormControl(''),
            'city' : new FormControl(''),
            'description': new FormControl('')
        });
    }

    filterBrands(event) {
        this.filteredBrands = [];
        for(let i = 0; i < this.brands.length; i++) {
            let brand = this.brands[i];
            if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(brand);
            }
        }
    }
    
    onSubmit(value: string) {
        this.submitted = true;
        this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted', sticky: true});
    }

    get diagnostic() { return JSON.stringify(this.userform.value); }
    
}
