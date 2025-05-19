import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { EstadosService } from '../../../core/services/estados.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Plan } from '../../models/plan.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  // public estadosService = inject(EstadosService );

  // ngOnInit(): void {
  //   console.log(this.estadosService.planSeleccionado());

  // }

  

}
