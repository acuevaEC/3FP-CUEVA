import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-inscripciones',
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.css']
})
export class AbmInscripcionesComponent {
  cursoControl = new FormControl('', [Validators.required]);
  alumnoControl = new FormControl('', [Validators.required]);
  fechaControl = new FormControl('', [Validators.required]);

  inscripcionesForm = new FormGroup({
    curso: this.cursoControl,
    alumno: this.alumnoControl,
    fecha: this.fechaControl,
  });
  constructor(
    private dialogRef: MatDialogRef<AbmInscripcionesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      console.log(data);
      
      this.cursoControl.setValue(data.inscripcionParaEditar.curso.nombre);
      this.alumnoControl.setValue(data.inscripcionParaEditar.alumno.nombre);
      this.fechaControl.setValue(data.inscripcionParaEditar.curso.fecha_inicio);
    }
  }

  guardar(): void {
    if (this.inscripcionesForm.valid) {
      this.dialogRef.close(this.inscripcionesForm.value);
    } else {
      this.inscripcionesForm.markAllAsTouched();
    }
  }
}
