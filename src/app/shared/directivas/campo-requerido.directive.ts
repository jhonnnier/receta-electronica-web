import {Directive, ElementRef, HostListener, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[marcarError]'
})
export class CampoRequeridoDirective implements OnChanges {

  @Input('marcarError') marcarError: boolean;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }


  @HostListener('change') ngOnChanges() {
    if(this.marcarError){
      this.elementRef.nativeElement.style.border = '1px solid #C72230';
      return;
    }

    this.elementRef.nativeElement.style.border = '1px solid #AFC4D1';
  }

}
