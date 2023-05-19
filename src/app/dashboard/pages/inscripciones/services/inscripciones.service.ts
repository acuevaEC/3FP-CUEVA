import { Injectable } from '@angular/core';
import { Curso, Alumno, Inscripicion} from '../models';
import { BehaviorSubject, Observable, map, take } from 'rxjs';

// CURSOS, ALUMNOS E INSCRIPCIOENS MOCKS //

const CURSOS_MOCKS: Curso[] = [
  {
    id: 1,
    nombre: 'Angular',
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
  },
  {
    id: 2,
    nombre: 'Javascript',
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
  },
  {
    id: 3,
    nombre: 'Desarrollo Web',
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
  },
];

const ALUMNO_MOCKS: Alumno[] = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Parra',
    fecha_registro: new Date(),
  },
  {
    id: 2,
    nombre: 'Daniel',
    apellido: 'Parra',
    fecha_registro: new Date(),
  },
  {
    id: 3,
    nombre: 'Maria',
    apellido: 'Parra',
    fecha_registro: new Date(),
  },
];

const INSCRIPICIONES_MOCK: Inscripicion[] = [
  {
    id: 1,
    alumno: ALUMNO_MOCKS.at(0)!,
    curso: CURSOS_MOCKS.at(0)!
  },
  {
    id: 2,
    alumno: ALUMNO_MOCKS.at(0)!,
    curso: CURSOS_MOCKS.at(1)!
  },
  
  {
    id: 3,
    alumno: ALUMNO_MOCKS.at(0)!,
    curso: CURSOS_MOCKS.at(2)!
  },
  {
    id: 4,
    alumno: ALUMNO_MOCKS.at(1)!,
    curso: CURSOS_MOCKS.at(0)!
  },
  {
    id: 5,
    alumno: ALUMNO_MOCKS.at(1)!,
    curso: CURSOS_MOCKS.at(1)!
  },
  
  {
    id: 6,
    alumno: ALUMNO_MOCKS.at(2)!,
    curso: CURSOS_MOCKS.at(0)!
  },
];

@Injectable({
  providedIn: 'root'
})



export class InscripcionesService {

  private inscripciones$ = new BehaviorSubject<Inscripicion[]>(
    INSCRIPICIONES_MOCK
  );
  constructor() { 
    //private alumno
  }

  getInscripciones(): Observable<Inscripicion[]> {
    return this.inscripciones$.asObservable();
  }

  getInscipcionesDeAlumnos(
    AlumnoId: number
  ): Observable<Inscripicion[] | undefined> {
    return this.inscripciones$.pipe(
      map((Inscripciones: any[]) =>
        Inscripciones.filter((a: { alumno: { id: number; }; }) => a.alumno.id == AlumnoId)
      )
    );
  }

  getInscipcionesDeCurso(
    cursoId: number
  ): Observable<Inscripicion[] | undefined> {
    return this.inscripciones$.pipe(
      map((Inscripciones) => Inscripciones.filter((a) => a.curso.id == cursoId))
    );
  }

  eliminarInscripcion(inscripcionId: number): Observable<Inscripicion[]> {
    this.inscripciones$.pipe(take(1)).subscribe({
      next: (inscripciones) => {
        
        const inscripcionesActualizados = inscripciones.filter(
          (inscripcion) => inscripcion.id !== inscripcionId
        );
        this.inscripciones$.next(inscripcionesActualizados);
      },
      complete: () => {},
      error: () => {},
    });

    return this.inscripciones$.asObservable();
  }

  editarInscripcion(
    inscripcionId: number,
    actualizacion: Partial<Inscripicion>
  ): Observable<Inscripicion[]> {
    this.inscripciones$.pipe(take(1)).subscribe({
      next: (inscripciones) => {
        const inscripcionesActualizados = inscripciones.map((inscripcion) => {
          if (inscripcion.id === inscripcionId) {
            return {
              ...inscripcion,
              ...actualizacion,
            };
          } else {
            return inscripcion;
          }
        });
        console.log(inscripcionesActualizados)

        this.inscripciones$.next(inscripcionesActualizados);
      },
      //complete: () => {},
      //error: () => {}
    });

    return this.inscripciones$.asObservable();
  }

  
}
