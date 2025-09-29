import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-footer',
    imports: [RouterModule, NgOptimizedImage],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {}
