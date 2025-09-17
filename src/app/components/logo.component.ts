// Logo.component.ts
import { Component, computed, input } from '@angular/core';
import { twMerge } from 'tailwind-merge'

@Component({
  selector: 'app-logo',
  template: `
      <h1 [class]="computedClass()"> 
         <svg width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 10L16 2L28 10V24L16 32L4 24V10Z" fill="currentColor"/>
        </svg>  
        <span> VerifyPro </span>
    </h1>
  `
})
export class LogoComponent {
  styleClass = input('');

  computedClass = computed(
    () => twMerge(
      'text-3xl inline-flex items-center gap-2 font-semibold text-white text-center md:text-5xl py-4 ', this.styleClass() ?? ''
    )
  )

}