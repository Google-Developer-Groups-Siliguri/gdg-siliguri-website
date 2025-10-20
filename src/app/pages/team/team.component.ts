import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommingSoonComponent } from 'src/app/components/comming-soon/comming-soon.component';
import { MemberCardComponent } from 'src/app/components/member-card/member-card.component';
import { DataService, Members } from 'src/app/services/data.service';

@Component({
  selector: 'app-team',
  imports: [MemberCardComponent, CommingSoonComponent, AsyncPipe],
  template: `
    @if (teamData$ | async; as teamData) { @if (teamData.enabled) {
    <div class="mt-20 max-w-screen-2xl mx-auto">
      <div class="mx-[1.5rem]">
        <h1
          class="text-[50px] lg:text-[70px] leading-tight tracking-wide font-bold text-gray-800 text-center"
        >
          Team
        </h1>
        <h2 class="text-xl text-[#9CA3AF] text-center font-semibold mt-4">
          Meet our DevFest Siliguri 2025 organisers and volunteers.
        </h2>

        <div class="w-full my-10">
          <h1 class="text-[40px] text-black text-center font-semibold my-4">
            Organizers
          </h1>
          <div
            class="grid items-center justify-center grid-cols-12 gap-x-4 gap-y-10 2xl:gap-x-20 md:gap-x-8"
          >
            @for (user of teamData.organizers; track $index) {

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
            @for (user of teamData.volunteers; track $index) {
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
    } @else {
    <div class="mt-20 min-h-[0vh]">
      <app-comming-soon></app-comming-soon>
    </div>
    } }
  `,
  styles: ``,
})
export class TeamComponent implements OnInit {
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
        enabled: result.enabled && result.data.length > 0,
        organizers: result.data.filter(
          (member) => member.designation === 'Organizer'
        ),
        volunteers: result.data.filter(
          (member) => member.designation === 'Volunteer'
        ),
      }))
    );
  }

  ngOnInit(): void {}
}
