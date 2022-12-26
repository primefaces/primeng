/* بسم الله الرحمن الرحیم */

import { Injectable } from '@angular/core';

@Injectable()
export class ArithmeticsService {
    /**
     * This function removes fraction part of the number if exists. So, for example, it will turn -145,455 to -145 and
     * 145,455 to 145.
     */
    round(x: number): number {
        // eslint-disable-line prefer-arrow/prefer-arrow-functions
        if (x < 0) {
            return Math.ceil(x);
        } else {
            return Math.floor(x);
        }
    }

    /**
     * This function returns integer part of division result of num1 and num2 numbers.
     *
     * For example: div (10, 3) is equal to 3.
     */
    div(num1: number, num2: number): number {
        // eslint-disable-line prefer-arrow/prefer-arrow-functions
        return this.round(num1 / num2);
    }

    /**
     * This function return arithmetic mod result of two inputs as a integer.
     */
    mod(num1: number, num2: number): number {
        // eslint-disable-line prefer-arrow/prefer-arrow-functions
        return num1 - this.div(num1, num2) * num2;
    }
}
