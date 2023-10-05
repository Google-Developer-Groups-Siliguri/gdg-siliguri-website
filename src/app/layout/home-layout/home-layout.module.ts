import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

const routes: Routes = [{ path: '', component: HomeLayoutComponent }];

@NgModule({
  declarations: [HomeLayoutComponent],
  imports: [CommonModule, NavbarComponent, FooterComponent,RouterModule.forChild(routes)],
})
export class HomeLayoutModule {}
