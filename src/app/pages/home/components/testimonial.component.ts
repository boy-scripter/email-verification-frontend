import { Component } from "@angular/core";
import { NgxMarqueeComponent } from "@omnedia/ngx-marquee";
import { HeadingComponent } from "@components/header.component";
import { NgTemplateOutlet } from "@angular/common";

interface Testimonial {
  name: string;
  role: string;
  message: string;
  avatar: string;
}

@Component({
  selector: "app-testimonials",
  standalone: true,
  imports: [NgxMarqueeComponent, HeadingComponent, NgTemplateOutlet],
  template: `
    <section class="bg-black-theme py-5 px-6">
    <app-heading title=" What Our Customers Say" />

          <om-marquee  [animationDuration]="'25s'"  [pauseOnHover]="true"  >
              @for(t of testimonials; let i = $index; track $index) {
                <ng-template>  
                  <ng-container *ngTemplateOutlet="testiomonialCard; context: { $implicit: t, i: i }"></ng-container>  
                </ng-template>
              }
          </om-marquee>

            <ng-template #testiomonialCard let-t let-i="i">
                    <div class="bg-gray-800 rounded-2xl shadow-lg p-6 w-[280px] md:w-[320px] flex flex-col items-center text-center mx-2" role="group" aria-label="Customer testimonial">
                      <img
                        [src]="'https://i.pravatar.cc/100?img=' + (i + 1)"
                        [alt]="'Photo of ' + t.name"
                        class="w-16 h-16 rounded-full mb-4 border-2 border-green-400 object-cover"
                        loading="lazy"
                      />
                      <p class="text-gray-300 text-sm md:text-base italic mb-4">     “{{ t.message }}” </p>
                      <h4 class="text-white font-semibold text-lg">{{ t.name }}</h4>
                      <span class="text-gray-400 text-xs md:text-sm">{{ t.role }}</span>
                    </div>
             </ng-template>

    </section>
  `,
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      name: "Aarav Mehta",
      role: "Corporate Gifting Manager, TCS",
      message:
        "Sunrise Gifts has become our go-to for all corporate gifting needs. Their service is top-notch and delivery is always on time.",
      avatar: "/assets/images/avatars/avatar1.jpg",
    },
    {
      name: "Priya Sharma",
      role: "Marketing Executive, HDFC Bank",
      message:
        "We loved the premium quality and customization options. Our team and clients were equally impressed!",
      avatar: "/assets/images/avatars/avatar2.jpg",
    },
    {
      name: "Rahul Verma",
      role: "Event Organizer, Evently",
      message:
        "They helped us find the perfect gifts for our product launch. Great variety and even better customer support.",
      avatar: "/assets/images/avatars/avatar3.jpg",
    },
    {
      name: "Sneha Kapoor",
      role: "HR Manager, Infosys",
      message:
        "Sunrise Gifts made employee appreciation day truly special. The gifts were meaningful and beautifully packaged.",
      avatar: "/assets/images/avatars/avatar4.jpg",
    },
    // {
    //   name: "Rahul Verma",
    //   role: "Event Organizer, Evently",
    //   message:
    //     "They helped us find the perfect gifts for our product launch. Great variety and even better customer support.",
    //   avatar: "/assets/images/avatars/avatar3.jpg",
    // },
    // {
    //   name: "Sneha Kapoor",
    //   role: "HR Manager, Infosys",
    //   message:
    //     "Sunrise Gifts made employee appreciation day truly special. The gifts were meaningful and beautifully packaged.",
    //   avatar: "/assets/images/avatars/avatar4.jpg",
    // }
  ];
}
