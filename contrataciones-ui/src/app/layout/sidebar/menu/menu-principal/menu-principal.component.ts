import { Component } from '@angular/core';
import { MenuEtiquetaComponent } from '../menu-etiqueta/menu-etiqueta.component';
import { MenuPrimerNivelComponent } from '../menu-primer-nivel/menu-primer-nivel.component';
import { MenuSegundoNivelComponent } from '../menu-segundo-nivel/menu-segundo-nivel.component';
import { MenuSimpleComponent } from '../menu-simple/menu-simple.component';
import { menuDeOpcionesDos, menuDeOpcionesUno } from '../../../../core/services/menu-sidebar/menu-opcionex-sidebar';


@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [MenuSimpleComponent, MenuEtiquetaComponent, MenuPrimerNivelComponent],
  templateUrl: './menu-principal.component.html',
})
export class MenuPrincipalComponent {
  
  menuDeOpcionesUno = menuDeOpcionesUno;
  menuDeOpcionesDos = menuDeOpcionesDos;

}
