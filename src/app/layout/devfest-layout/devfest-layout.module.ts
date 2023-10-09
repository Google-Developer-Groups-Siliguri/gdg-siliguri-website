import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevfestLayoutComponent } from './devfest-layout.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarDevfestComponent } from 'src/app/components/navbar-devfest/navbar-devfest.component';

@NgModule({
  declarations: [DevfestLayoutComponent],
  imports: [CommonModule, FooterComponent, NavbarDevfestComponent, RouterModule],
})
export class DevfestLayoutModule {}
