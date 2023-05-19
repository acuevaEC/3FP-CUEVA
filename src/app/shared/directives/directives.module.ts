import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontSizeDirective } from './font-size.directive';
import { RepetirDirective } from './repetir.directive';



@NgModule({
  declarations: [
    FontSizeDirective,
    RepetirDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FontSizeDirective,
    RepetirDirective
  ]
})
export class DirectivesModule { }
