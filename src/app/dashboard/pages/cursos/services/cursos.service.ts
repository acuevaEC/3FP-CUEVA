import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, switchMap, take, tap, filter } from 'rxjs';
import { CrearCursoPayload, Curso } from '../models';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private cursos$ = new BehaviorSubject<Curso[]>(
    []
  );

  constructor(
    private httpClient: HttpClient
  ) {}

  get cursos(): Observable<Curso[]> {
    return this.cursos$.asObservable();
  }



  getCursoById(cursoId: number): Observable<Curso | undefined> {
 return this.cursos$.pipe(map((Cursos) => Cursos.find((a) => a.id === cursoId)));
  }



// LISTAR CURSOS //
obtenerCursos(): Observable<Curso[]> {
  return this.httpClient.get<Curso[]>(`http://localhost:3000/cursos`)
    .pipe(
      tap((cursos) => this.cursos$.next(cursos)),
      mergeMap(() => this.cursos$.asObservable())
    );
}

// CREAR CURSO //
  crearCurso(payload: CrearCursoPayload): Observable<Curso[]> {

   
    this.cursos$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (cursos) => {
          this.cursos$.next([
            ...cursos,
            {
              id: cursos.length + 1,
              ...payload,
            },
          ]);
        },
        complete: () => {},
        error: () => {}
      })
      this.httpClient.post<Curso[]>(`http://localhost:3000/cursos`,payload).subscribe()
    return this.cursos$.asObservable();
  }


// EDITAR CURSO //

  editarCurso(cursoId: number, actualizacion: Partial<Curso>): Observable<Curso[]> {
    let cursosActualizados: Curso[]=[]
    let numeral: number=0
    let cadena: String = 'http://localhost:3000/cursos/'
    let nombre: String =''
    this.cursos$
      .pipe(
        take(1),
      )
      .subscribe({
        next: (cursos) => {

          cursosActualizados = cursos.map((curso) => {
            nombre=curso.nombre
            if (curso.id === cursoId) {
              return {
                ...curso,
                ...actualizacion,
              }
            } else {
              return curso;
            }
          })
          cadena = cadena+cursoId.toString()
          this.cursos$.next(cursosActualizados);
          numeral=cursoId
          
          
        },
        complete: () => {},
        error: () => {}
      });
      
     console.log(cursosActualizados[numeral-1])
      this.httpClient.put<Curso[]>(cadena.toString(),cursosActualizados[numeral-1]).subscribe()
    return this.cursos$.asObservable();
  }

// ELIMINAR CURSO //

  eliminarCurso(cursoId: number): Observable<Curso[]> {
    let cadena: String = 'http://localhost:3000/cursos/'
   
    this.cursos$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (cursos) => {
        let cursosActualizados = cursos.filter((curso) => curso.id !== cursoId)
        this.cursos$.next(cursosActualizados);
        cadena = cadena+cursoId.toString()
        
      },
      complete: () => {},
      error: () => {}
    });
   this.httpClient.delete(cadena.toString()).subscribe()
   
    return this.cursos$.asObservable();
    
  }
}
