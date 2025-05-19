import { Component, inject, OnInit } from '@angular/core';
import { EstadosService } from '../../../../core/services/estados.service';
import { CommonModule } from '@angular/common';
import { Base64Pipe } from '../../../../core/pipes/base64.pipe';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { Perfil } from '../../../../core/models/perfil.model';

@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [
    CommonModule, // Para el ppipe date
    Base64Pipe
],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.css'
})
export class ProfileListComponent implements OnInit{
  private estadosService = inject(EstadosService );
  private apiService = inject ( ApiService );

  estadoUsuario = this.estadosService.estadoUsuario;
  perfil!: Perfil;

  ngOnInit() {

    if (this.estadoUsuario()?.idfuncionario != null) {
      

      this.apiService.getPerfilById( Number( this.estadoUsuario()?.idfuncionario ) ).subscribe({
        next: ((res) => {
          this.perfil = res;
        }),
      })

    }

  }
}
