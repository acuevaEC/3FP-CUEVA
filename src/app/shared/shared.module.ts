import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';



@NgModule({
  declarations: [
    // AQUI VAN COMPONENTES, DIRECTIVAS Y PIPES
  ],
  imports: [
    // AQUI VAN SOLO MODULOS
    CommonModule,
  ],
  exports: [
    // AQUI PUEDEN EXPORTAR COMPONENTES, MODULOS, DIRECTIVAS
    DirectivesModule,
    PipesModule,
  ],
  providers: [
    // AQUI SUELEN IR SERVICIOS
  ]
})
export class SharedModule { }
