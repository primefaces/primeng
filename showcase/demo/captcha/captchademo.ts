import {Component,OnInit} from '@angular/core';

@Component({
    templateUrl: 'showcase/demo/captcha/captchademo.html'
})
export class CaptchaDemo implements OnInit {
    ngOnInit () {
        
    }
    
    test(event) {
        console.log(event);
    }
}