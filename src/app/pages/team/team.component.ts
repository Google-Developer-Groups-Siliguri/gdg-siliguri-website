import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommingSoonComponent } from 'src/app/components/comming-soon/comming-soon.component';
import { MemberCardComponent } from 'src/app/components/member-card/member-card.component';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { SectionHeadingComponent } from 'src/app/components/ui/section-heading/section-heading';
import { DataService, Members } from 'src/app/services/data.service';

@Component({
  selector: 'app-team',
  imports: [MemberCardComponent, CommingSoonComponent, AsyncPipe, PageHeaderComponent, SectionHeadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header
      eyebrow="DevFest Siliguri"
      title="Team"
      subtitle="Meet the organisers and volunteers behind DevFest Siliguri 2025."
    />
    @if (teamData$ | async; as team) {
      @if (team.enabled) {
        <section class="page-container pb-12">
          <app-section-heading title="Organizers" />
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            @for (member of team.organizers; track member.name; let i = $index) {
              <app-member-card [item]="member" [index]="i" />
            }
          </div>
        </section>
        @if (team.volunteers.length) {
          <section class="page-container py-12">
            <app-section-heading title="Volunteers" />
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              @for (member of team.volunteers; track member.name; let i = $index) {
                <app-member-card [item]="member" [index]="i + 2" />
              }
            </div>
          </section>
        }
      } @else {
        <div class="page-container">
          <app-comming-soon message="The team line-up is coming soon" />
        </div>
      }
    }
  `,
})
export class TeamComponent {
  teamData$: Observable<{
    enabled: boolean;
    organizers: Members[];
    volunteers: Members[];
  }>;

  constructor(
    private meta: Meta,
    private title: Title,
    private $firebaseDataService: DataService
  ) {
    this.meta.addTag({
      name: 'title',
      content: 'Team | Devfest Siliguri 2025',
    });
    this.title.setTitle('Team | Devfest Siliguri 2025');

    this.teamData$ = this.$firebaseDataService.getAllTeams().pipe(
      map((result) => ({
        enabled: !!result?.enabled && result.data.length > 0,
        organizers: result?.data.filter((member) => member.designation === 'Organizer') ?? [],
        volunteers: result?.data.filter((member) => member.designation === 'Volunteer') ?? [],
      }))
    );
  }
}
