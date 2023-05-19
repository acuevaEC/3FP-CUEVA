import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InscripcionesService } from './services/inscripciones.service';
import { Inscripicion } from './models';
import { AbmInscripcionesComponent } from './components/abm-inscripciones/abm-inscripciones.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
//
export class InscripcionesComponent implements OnInit, OnDestroy{
  dataSource = new MatTableDataSource();
  inscripciones: Inscripicion[] = [];
  displayedColumns = [
    'id',
    'curso',
    'nombreCompleto',
   // 'detalle',
    'editar',
    'eliminar',
  ];

  constructor(
    private inscripcionesService: InscripcionesService,
    private matDialog: MatDialog
  ) {
    this.inscripcionesService
      .getInscripciones()
      .subscribe((res: Inscripicion[]) => {
        this.inscripciones = res;
      });
  }
  ngOnDestroy(): void {
  }

   
  
  ngOnInit(): void {
    this.inscripcionesService.getInscripciones().subscribe({
      next: (inscripciones) => {
        this.dataSource.data = inscripciones;
      },
    });
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  eliminarInscripcion(insc: Inscripicion): void {
    this.inscripcionesService.eliminarInscripcion(insc.id);
  }

  editarInscripcion(inscripcionParaEditar: Inscripicion): void {
    {
      const dialog = this.matDialog.open(AbmInscripcionesComponent, {
        data: {
          inscripcionParaEditar,
        },
      });
      

      dialog.afterClosed().subscribe((valorDelFormulario) => {
        if (valorDelFormulario) {
          this.inscripcionesService.editarInscripcion(
            inscripcionParaEditar.id,
            valorDelFormulario
          );
          console.log(valorDelFormulario)
        }
      })
      
    }
  }

}
