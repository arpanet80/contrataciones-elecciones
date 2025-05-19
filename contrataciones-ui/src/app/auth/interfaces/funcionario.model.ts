export interface FuncionarioInfo {
  id: number
  nombres: string
  paterno: string
  materno: string
  fechaingreso: string
  fechanacimiento: string
  documento: number
  celular: number
  correo: string
  citememorandum: string
  idtipofuncionario: number
  idcargo: number
  idformacion: number
  createdAt: string
  updatedAt: string
  foto: string
  activo: boolean
  tipofuncionario: Tipofuncionario
  formacion: Formacion
  cargo: Cargo
}

export interface Tipofuncionario {
  id: number
  descripcion: string
  activo: boolean
}

export interface Formacion {
  id: number
  titulo: string
  prefijo: string
  idnivelformacion: number
  activo: boolean
  nivelformacion: Nivelformacion
}

export interface Nivelformacion {
  id: number
  descripcion: string
  activo: boolean
}

export interface Cargo {
  id: number
  cargo: string
  dependencia: number
  idunidadorganizacional: number
  identidad: number
  activo: boolean
  entidad: Entidad
  unidadorganizacional: Unidadorganizacional
}

export interface Entidad {
  id: number
  institucion: string
  abreviacion: string
  iddepartamento: number
  activo: boolean
  departamento: Departamento
}

export interface Departamento {
  id: number
  nombre: string
  activo: boolean
}

export interface Unidadorganizacional {
  id: number
  unidad: string
  abreviacion: string;
  activo: boolean
}
