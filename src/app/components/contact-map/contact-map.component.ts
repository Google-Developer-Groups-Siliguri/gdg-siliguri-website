import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressMapComponent } from '../address-map/address-map.component';

@Component({
  selector: 'app-contact-map',
  standalone: true,
  imports: [CommonModule, AddressMapComponent],
  templateUrl: './contact-map.component.html',
  styleUrls: ['./contact-map.component.css']
})
export class ContactMapComponent {

}
