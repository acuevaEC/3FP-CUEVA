export interface Curso {
    id: number;
    nombre: string;
    fecha_inicio: Date;
    fecha_fin: Date;
  }


  export interface Alumno {
    id: number,
    nombre: string,
    apellido: string,
    fecha_registro: Date;
  }

  
  export interface Inscripicion {
    id: number;
    alumno: Alumno;
    curso: Curso;
  }