import { Component } from '@angular/core';
import {
  CardComponent,
  CardContentComponent,
} from 'src/app/components/ui/card/card.component';
import {
  LucideAngularModule,
  Users,
  Share2,
  CalendarDays,
  Clock,
  MapPin,
} from 'lucide-angular';
import { SeparatorComponent } from '../../components/ui/separator/separator.component';
@Component({
    selector: 'app-event-details-page',
    imports: [
        LucideAngularModule,
        CardComponent,
        CardContentComponent,
        SeparatorComponent,
    ],
    template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white border-b">
        <div class="container px-4 py-4 mx-auto">
          <nav class="flex justify-between items-center">
            <div class="flex items-center space-x-8">
              <h1 class="text-xl font-semibold">TechEvents</h1>
              <div class="hidden space-x-6 md:flex">
                <a href="#" class="text-gray-600 hover:text-gray-900">About</a>
                <a href="#" class="text-gray-600 hover:text-gray-900"
                  >Communities</a
                >
                <a href="#" class="text-gray-600 hover:text-gray-900">Events</a>
              </div>
            </div>
            <Button>Sign In</Button>
          </nav>
        </div>
      </header>

      <main class="container px-4 py-8 mx-auto">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div class="space-y-6 md:col-span-2">
            <div>
              <h1 class="mb-4 text-3xl font-bold">
                Exploring OpenSource Satellite Imagery with GenAI - ML Study
                Jams Day 15
              </h1>
              <div class="flex items-center space-x-4 text-gray-600">
                <span class="flex items-center">
                  <lucide-angular
                    class="mr-1 w-4 h-4"
                    [img]="Users"
                  ></lucide-angular>
                  TFUG Islamabad
                </span>
                <Button variant="outline" size="sm">
                  <lucide-angular
                    [img]="Share2"
                    class="mr-2 w-4 h-4"
                  ></lucide-angular>
                  Share
                </Button>
              </div>
            </div>

            <app-card>
              <app-card-content class="p-6">
                <div class="max-w-none prose">
                  <h2 class="mb-4 text-xl font-semibold">About this event</h2>
                  <p>
                    Join us for an exciting session on exploring OpenSource
                    Satellite Imagery using Generative AI. This is part of our
                    ML Study Jams series where we dive deep into practical
                    applications of machine learning.
                  </p>
                  <h3 class="mt-6 mb-2 text-lg font-semibold">
                    What you'll learn:
                  </h3>
                  <ul>
                    <li>Understanding satellite imagery data sources</li>
                    <li>Processing and analyzing satellite data</li>
                    <li>Applying GenAI techniques to satellite imagery</li>
                    <li>Hands-on practice with real-world examples</li>
                  </ul>
                  <h3 class="mt-6 mb-2 text-lg font-semibold">Requirements:</h3>
                  <ul>
                    <li>Basic understanding of Python</li>
                    <li>Laptop with internet connection</li>
                    <li>Google Colab account (free)</li>
                  </ul>
                </div>
              </app-card-content>
            </app-card>

            <div class="rounded-xl border shadow bg-card text-card-foreground">
              <app-card-content class="p-6">
                <h2 class="mb-4 text-xl font-semibold">Speakers</h2>
                <div class="flex items-center space-x-4">
                  <img
                    src="/placeholder.svg"
                    alt="Speaker"
                    width="{64}"
                    height="{64}"
                    class="rounded-full"
                  />
                  <div>
                    <h3 class="font-semibold">Dr. Sarah Johnson</h3>
                    <p class="text-gray-600">
                      AI Research Scientist at SatelliteTech
                    </p>
                  </div>
                </div>
              </app-card-content>
            </div>
          </div>
          <div class="space-y-6">
            <div class="rounded-xl border shadow bg-card text-card-foreground">
              <div class="p-6 space-y-6">
                <div class="space-y-4">
                  <div class="flex items-start space-x-3">
                    <lucide-angular
                      [img]="CalendarDays"
                      class="w-5 h-5 text-gray-500 mt-0.5"
                    ></lucide-angular>
                    <div>
                      <h3 class="font-semibold">Date</h3>
                      <p class="text-gray-600">Saturday, January 20, 2024</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <lucide-angular
                      class="w-5 h-5 text-gray-500 mt-0.5"
                      [img]="Clock"
                    ></lucide-angular>
                    <div>
                      <h3 class="font-semibold">Time</h3>
                      <p class="text-gray-600">2:00 PM - 4:00 PM PKT</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <lucide-angular
                      class="w-5 h-5 text-gray-500 mt-0.5"
                      [img]="MapPin"
                    ></lucide-angular>
                    <div>
                      <h3 class="font-semibold">Location</h3>
                      <p class="text-gray-600">Online Event</p>
                      <p class="text-sm text-blue-600">View on Maps</p>
                    </div>
                  </div>
                </div>
                <app-separator></app-separator>
                <div>
                  <Button class="w-full" size="lg"> Register Now </Button>
                  <p class="mt-2 text-sm text-center text-gray-600">
                    42 spots remaining
                  </p>
                </div>
              </div>
            </div>

            <app-card>
              <app-card-content class="p-6">
                <h3 class="mb-2 font-semibold">Organizer</h3>
                <div class="flex items-center space-x-3">
                  <img
                    src="/placeholder.svg"
                    alt="TFUG Islamabad"
                    width="{48}"
                    height="{48}"
                    class="rounded-lg"
                  />
                  <div>
                    <p class="font-medium">TFUG Islamabad</p>
                    <p class="text-sm text-gray-600">2.5k members</p>
                  </div>
                </div>
                <Button variant="outline" class="mt-4 w-full"> Follow </Button>
              </app-card-content>
            </app-card>
          </div>
        </div>
      </main>
    </div>
  `
})
export class EventDetailsPageComponent {
  readonly Users = Users;
  readonly Share2 = Share2;
  readonly CalendarDays = CalendarDays;
  readonly Clock = Clock;
  readonly MapPin = MapPin;
}
