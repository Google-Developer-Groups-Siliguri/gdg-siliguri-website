import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { RouterModule, Routes } from '@angular/router';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { M3ShapeComponent } from 'src/app/components/ui/m3-shape/m3-shape';

const routes: Routes = [{ path: '', component: ContactComponent }];

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, RouterModule.forChild(routes), PageHeaderComponent, M3ShapeComponent],
})
export class ContactModule {}
