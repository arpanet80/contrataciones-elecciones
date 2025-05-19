import { Component, inject, OnInit } from '@angular/core';
import { MenuPrincipalComponent } from './menu/menu-principal/menu-principal.component';
import { AuthService } from '../../core/services/services.index';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  // imports: [ RouterLink, RouterLinkActive, MenuPrincipalComponent ],
  imports: [MenuPrincipalComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  
  private authService = inject(AuthService );
  estadoUsuario = this.authService.estadoUsuario;

  rol = (this.estadoUsuario() && this.estadoUsuario()?.permisos ) ? this.estadoUsuario()?.permisos[0].nombreRol : '';

}
