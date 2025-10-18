import { Component } from '@angular/core';

import { NgOptimizedImage, provideImgixLoader } from '@angular/common';
@Component({
    selector: 'app-welcome',
    imports: [NgOptimizedImage],
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {}
