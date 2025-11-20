import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../services/data.service';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      [href]="blog().url"
      target="_blank"
      rel="noopener noreferrer"
      class="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full border-black border-2"
    >
      <div class="relative h-48 overflow-hidden">
        <img
          [src]="
            blog().coverImage.url ||
            'https://via.placeholder.com/400x300?text=No+Image'
          "
          [alt]="blog().title"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div class="p-5">
        <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {{ blog().title }}
        </h3>
        <p class="text-gray-600 text-sm mb-4 line-clamp-3">
          {{ blog().brief }}
        </p>
        <div class="flex items-center justify-between text-sm text-gray-500">
          <div class="flex items-center gap-2">
            <img
              [src]="blog().author.profilePicture"
              [alt]="blog().author.name"
              class="w-8 h-8 rounded-full"
            />
            <span>{{ blog().author.name }}</span>
          </div>
          <span>{{ blog().readTimeInMinutes }} min read</span>
        </div>
        <div class="mt-3 text-xs text-gray-400">
          {{ formattedDate() }}
        </div>
      </div>
    </a>
  `,
  styles: [
    `
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `,
  ],
})
export class BlogCardComponent {
  blog = input.required<BlogPost>();

  formattedDate = computed(() => {
    const date = new Date(this.blog().publishedAt);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });
}
