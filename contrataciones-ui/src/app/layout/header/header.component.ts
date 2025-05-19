import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Base64Pipe } from '../../core/pipes/base64.pipe';
import { AuthService, EstadosService } from '../../core/services/services.index';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ Base64Pipe, RouterLink ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public authService = inject(AuthService );
  public router = inject(Router );
  public estadosService = inject(EstadosService);

  estadoUsuario = this.authService.estadoUsuario;

  redirijeSeleccionPlan() {
    this.router.navigate(['/selectplan'])
        .then(() => {
          window.location.reload();
        });
  }

}
