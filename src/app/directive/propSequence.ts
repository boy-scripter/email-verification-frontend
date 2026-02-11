import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPropSequence]',
})
export class PropSequenceDirective implements OnInit {
  private elementRef = inject(ElementRef);
  propSequence = input.required<string>();

  ngOnInit(): void {
    const arrayOfPropsName = this.propSequence().split(',');
    
   
  }
}
