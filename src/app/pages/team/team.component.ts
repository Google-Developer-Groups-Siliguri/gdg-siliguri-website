import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CommingSoonComponent } from 'src/app/components/comming-soon/comming-soon.component';
import { MemberCardComponent } from 'src/app/components/member-card/member-card.component';
import { DataService, Members } from 'src/app/services/data.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [MemberCardComponent, NgFor, CommingSoonComponent],
  template: `
    @if (sectionEnabled) {

    <div class="mt-20 max-w-screen-2xl mx-auto">
      <!-- <app-comming-soon></app-comming-soon> -->
      <div class="mx-[1.5rem]">
        <h1
          class="text-[50px] lg:text-[70px] leading-tight tracking-wide font-bold text-gray-800 text-center"
        >
          Team
        </h1>
        <h2 class="text-xl text-[#9CA3AF] text-center font-semibold mt-4">
          Meet our DevFest Siliguri 2024 organisers and volunteers.
        </h2>

        <div class="w-full my-10">
          <h1 class="text-[40px] text-black text-center font-semibold my-4">
            Organizers
          </h1>
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

        <div class="my-10">
          <h1 class="text-[40px] text-black text-center font-semibold my-4">
            Volunteers
          </h1>
          <div
            class="grid items-center justify-center grid-cols-12 gap-x-4 gap-y-10 2xl:gap-x-20 md:gap-x-8"
          >
            @for (user of volunteers; track $index) {
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
  styles: ``,
})
export class TeamComponent implements OnInit {
  organizersDetails: Members[] = [];
  organizers: Members[] = [];
  volunteers: Members[] = [];
  sectionEnabled: boolean = false;
  constructor(
    private meta: Meta,
    private title: Title,
    private $firebaseDataService: DataService
  ) {
    this.getSpeakersList();
    this.meta.addTag({
      name: 'title',
      content: 'Team | Devfest Siliguri 2024',
    });
    this.title.setTitle('Team | Devfest Siliguri 2024');
  }

  ngOnInit(): void {}

  getSpeakersList() {
    const subscription$ = this.$firebaseDataService.getAllTeams().subscribe({
      next: (result) => {
        if (result.data.length > 0) {
          this.organizersDetails = result.data;
          this.sectionEnabled = result.enabled;
          this.organizers = this.organizersDetails.filter(
            (member) => member.designation === 'Organizer'
          );
          this.volunteers = this.organizersDetails.filter(
            (member) => member.designation === 'Volunteer'
          );
          subscription$.unsubscribe();
        }
      },
      error: (err) => console.error(err),
    });
  }
}
