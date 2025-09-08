import { Component } from "@angular/core";
import { NgxMarqueeComponent } from "@omnedia/ngx-marquee";

interface Testimonial {
  name: string;
  role: string;
  message: string;
  avatar: string;
}

@Component({
  selector: "app-testimonials",
  standalone: true,
  imports: [NgxMarqueeComponent],
  template: `
    <section class="bg-gray-900 py-16 px-6 relative">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-white mb-10">
        What Our Customers Say
      </h2>

      <om-marquee
        [animationDuration]="'25s'"
        [marqueeGap]="'2rem'"
        [pauseOnHover]="true"
        class="w-full"
      >
        @for( t of testimonials;track $index){
          <div
            class="bg-gray-800 rounded-2xl shadow-lg p-6 max-w-xs w-[280px] md:w-[320px] flex flex-col items-center text-center"
          >
            <img
              [src]="t.avatar"
              [alt]="t.name"
              class="w-16 h-16 rounded-full mb-4 border-2 border-green-400"
            />
            <p class="text-gray-300 text-sm md:text-base italic">"{{ t.message }}"</p>
            <h4 class="text-white font-semibold mt-4">{{ t.name }}</h4>
            <span class="text-gray-400 text-xs md:text-sm">{{ t.role }}</span>
          </div>
          }
      </om-marquee>
    </section>
  `,
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      message: "This email validation tool boosted our campaign efficiency dramatically!",
      avatar: "/assets/images/avatars/avatar1.jpg",
    },
    {
      name: "David Kim",
      role: "Startup Founder",
      message: "Fast, reliable, and developer-friendly. Integration was a breeze.",
      avatar: "/assets/images/avatars/avatar2.jpg",
    },
    {
      name: "Emma Rodriguez",
      role: "Growth Hacker",
      message: "Saved us from sending emails to invalid addresses. Huge ROI improvement.",
      avatar: "/assets/images/avatars/avatar3.jpg",
    },
    {
      name: "James Lee",
      role: "CTO",
      message: "We can now trust our mailing list 100%. Highly recommend this service.",
      avatar: "/assets/images/avatars/avatar4.jpg",
    },
  ];
}
