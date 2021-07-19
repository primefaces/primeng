import {Component} from '@angular/core';

@Component({
    templateUrl: './styleclassdemo.html',
    styles:[`
        .box {
            background-color: var(--green-500);
            color: #ffffff;
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 1rem;
            padding-bottom: 1rem;
            border-radius: 4px;
            margin-top: 1rem;
            font-weight: bold;
            box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        }

        @keyframes my-fadein {
            0%   { opacity: 0; }
            100% { opacity: 1; }
        }

        @keyframes my-fadeout {
            0%   { opacity: 1; }
            100% { opacity: 0; }
        }

        .my-fadein {
            animation: my-fadein 150ms linear;
        }
        
        .my-fadeout {
            animation: my-fadeout 150ms linear;
        }
    `],
})
export class StyleClassDemo {
    
}