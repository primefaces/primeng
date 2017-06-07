import { ObjectUtils } from './objectutils';
import { inject, TestBed } from '@angular/core/testing';

describe('ObjectUtils Suite', () => {
    
    let objectUtils: ObjectUtils = null;
    
    beforeEach(() => TestBed.configureTestingModule({
        providers: [ ObjectUtils ]
    }));
    
    beforeEach(inject([ObjectUtils], s => {
        objectUtils = s;
    }));
    
    it('Should resolve field data', () => {
        let obj = {
            firstname: 'Silvio',
            lastname: 'Andolini',
            address: {
                country: {
                    name: 'Italy'
                },
                city: 'Corleone'
            }
        }
        
        expect(objectUtils.resolveFieldData(obj, 'firstname')).toBe('Silvio');
        expect(objectUtils.resolveFieldData(obj, 'lastname')).toBe('Andolini');
        expect(objectUtils.resolveFieldData(obj, 'address.city')).toBe('Corleone');
        expect(objectUtils.resolveFieldData(obj, 'address.country.name')).toBe('Italy');
        expect(objectUtils.resolveFieldData(obj, 'age')).toBeUndefined();
    });

});