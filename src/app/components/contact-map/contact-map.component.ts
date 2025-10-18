import { Component } from '@angular/core';

import { AddressMapComponent } from '../address-map/address-map.component';

@Component({
    selector: 'app-contact-map',
    imports: [AddressMapComponent],
    templateUrl: './contact-map.component.html',
    styleUrls: ['./contact-map.component.css']
})
export class ContactMapComponent {

}
