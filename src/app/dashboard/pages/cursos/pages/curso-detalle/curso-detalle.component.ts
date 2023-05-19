import { Component, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/dashboard/pages/cursos/services/cursos.service';
import { Curso } from 'src/app/dashboard/pages/cursos/cursos.component';
import { Subject, takeUntil } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inscripicion } from '../../../inscripciones/models';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.css'],
})
export class CursoDetalleComponent implements OnDestroy {
  curso: Curso | undefined = undefined;
  inscripciones: Inscripicion[] | undefined = undefined;

  private destroyed$ = new Subject();

  // constructor(
  //   private activatedRoute: ActivatedRoute,
  //   private cursosService: CursosService
  // ) {
  //   this.cursosService
  //     .obtenerCursoPorId(parseInt(this.activatedRoute.snapshot.params['id']))
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe((curso) => (this.curso = curso));
  // }

  constructor(
    private dialogRef: MatDialogRef<CursoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      // console.log(data);
      this.curso = data.element;
      this.inscripciones = data.inscs;
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
