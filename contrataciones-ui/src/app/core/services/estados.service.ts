import { Injectable, signal } from '@angular/core';
import { Usuario } from '../../auth/interfaces/usuario';
import { Plan } from '../../dashboard/models/plan.model';
import { MatTableDataSource } from '@angular/material/table';
import { FuncionarioInfo } from '../../auth/interfaces/funcionario.model';
import { Rpa } from '../../dashboard/models/rpa.model';

@Injectable({
  providedIn: 'root'
})

export class EstadosService {

  /// Estado usuario //////////////
  public estadoUsuario = signal<Usuario | null>(null)
  public estadoFuncionario = signal<FuncionarioInfo | null>(null)
  public estadoRpa = signal<Rpa | null>(null)



  
  ///// Otros estado de la App /////////////

  public planSeleccionado = signal<Plan | null>(null)
  public estadoPlanArray = signal<Plan[] | null>(null)


}
