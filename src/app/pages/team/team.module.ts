import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { RouterModule, Routes } from '@angular/router';
import { MemberCardComponent } from 'src/app/components/member-card/member-card.component';

const routes: Routes = [{ path: '', component: TeamComponent }];

@NgModule({
  declarations: [TeamComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MemberCardComponent],
})
export class TeamModule {}
