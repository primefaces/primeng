import {Component} from '@angular/core';
import {Message} from '../../../components/common/api';

@Component({
    templateUrl: 'showcase/demo/captcha/captchademo.html'
})
export class CaptchaDemo {
    
    msgs: Message[] = [];
    
    showResponse(event) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail: 'User Responsed'});
    }
}