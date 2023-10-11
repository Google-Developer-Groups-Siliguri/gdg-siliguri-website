import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from 'src/app/components/timeline/timeline.component';

const routes: Routes = [{ path: '', component: ScheduleComponent }];

@NgModule({
  declarations: [ScheduleComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TimelineComponent],
})
export class ScheduleModule {}
