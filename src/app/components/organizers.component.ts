import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { filter, take } from 'rxjs';
import { DataService, Members } from '../services/data.service';
import { MemberCardComponent } from './member-card/member-card.component';
import { SectionHeadingComponent } from './ui/section-heading/section-heading';

@Component({
  selector: 'app-organizers',
  imports: [MemberCardComponent, SectionHeadingComponent],
  template: `
    @if (sectionEnabled) {
      <section class="page-container py-10 md:py-14">
        <app-section-heading
          eyebrow="The people behind it"
          title="Organizers"
          description="Volunteers who plan the meetups, wrangle the speakers and keep the community running."
        />
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (user of organizers; track user.name; let i = $index) {
            <app-member-card [item]="user" [index]="i" />
          }
        </div>
      </section>
    }
  `,
})
export class OrganizersComponent implements OnInit {
  organizers: Members[] = [];
  sectionEnabled = false;

  constructor(
    private $firebaseDataService: DataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getOrganizers();
  }

  getOrganizers() {
    this.$firebaseDataService
      .getAllTeams()
      .pipe(
        filter((result) => result.data.length > 0),
        take(1)
      )
      .subscribe({
        next: (result) => {
          this.sectionEnabled = result.enabled;
          this.organizers = result.data.filter((member) => member.designation === 'Organizer');
          this.cd.detectChanges();
        },
        error: (err) => console.error(err),
      });
  }
}
