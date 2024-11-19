import { ChangeDetectorRef, Component } from '@angular/core';
import { DataService, Members } from '../services/data.service';
import { Meta, Title } from '@angular/platform-browser';
import { MemberCardComponent } from './member-card/member-card.component';

@Component({
  selector: 'app-organizers',
  standalone: true,
  imports: [MemberCardComponent],
  template: `
    @if (sectionEnabled) {

    <div class="mt-20 max-w-screen-2xl mx-auto">
      <!-- <app-comming-soon></app-comming-soon> -->
      <div class="mx-[1.5rem]">
        <h1
          class="text-[50px] lg:text-[70px] leading-tight tracking-wide font-bold text-gray-800 text-center"
        >
          Organizers
        </h1>

        <div class="w-full my-10">
          <div
            class="grid items-center justify-center grid-cols-12 gap-x-4 gap-y-10 2xl:gap-x-20 md:gap-x-8"
          >
            @for (user of organizers; track $index) {

            <div class="h-full col-span-12 lg:col-span-3 md:col-span-4">
              <div class="flex items-center justify-center h-full">
                <app-member-card
                  [item]="user"
                  class="w-full h-full"
                ></app-member-card>
              </div>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
    }
  `,
})
export class OrganizersComponent {
  organizersDetails: Members[] = [];
  organizers: Members[] = [];
  volunteers: Members[] = [];
  sectionEnabled: boolean = false;
  constructor(
    private meta: Meta,
    private title: Title,
    private $firebaseDataService: DataService,
    private cd: ChangeDetectorRef
  ) {
    this.meta.addTag({
      name: 'title',
      content: 'Team | Devfest Siliguri 2023',
    });
    this.title.setTitle('Team | Devfest Siliguri 2023');
  }

  ngOnInit(): void {
    this.getSpeakersList();
  }

  getSpeakersList() {
    const subscription$ = this.$firebaseDataService.getAllTeams().subscribe({
      next: (result) => {
        if (result.data.length > 0) {
          this.organizersDetails = result.data;
          console.log(result.enabled);
          this.sectionEnabled = result.enabled;
          this.organizers = this.organizersDetails.filter(
            (member) => member.designation === 'Organizer'
          );
          this.volunteers = this.organizersDetails.filter(
            (member) => member.designation === 'Volunteer'
          );
          this.cd.detectChanges();
          subscription$.unsubscribe();
        }
      },
      error: (err) => console.error(err),
    });
  }
}
