import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsComponent } from './tickets.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: TicketsComponent }];

@NgModule({
  declarations: [TicketsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TicketsModule {}
