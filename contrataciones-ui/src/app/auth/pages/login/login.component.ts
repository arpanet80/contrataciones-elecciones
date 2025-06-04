import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { EstadosService } from '../../../core/services/estados.service';
import { finalize, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {

  private fb = inject( FormBuilder );
  private router = inject( Router )
  private authService = inject( AuthService );
    private estadosService = inject(EstadosService );
  
  
  loading: boolean = false;
  errorMessage: string = "";

  public myForm: FormGroup = this.fb.group({
    usuario:    ['', [ Validators.required, , Validators.minLength(5) ]],
    contrasena: ['', [ Validators.required, , Validators.minLength(3)]],
  });

  login(): void {
    if (this.myForm.invalid) return;
  
    const { usuario, contrasena } = this.myForm.value;
    this.loading = true;
  
    this.authService.login(usuario, contrasena).pipe(

      switchMap((resp) => this.authService.getFuncionarioById(resp.userInfo.idfuncionario).pipe(
          tap((funcionario) => {
            console.log(resp);
            this.estadosService.estadoFuncionario.set(funcionario);
            localStorage.setItem('funcionarioInfo', JSON.stringify(funcionario));
          })
        )
      ),
      
      finalize(() => this.loading = false) // Asegura que `loading` se desactive siempre
    ).subscribe({
      next: () =>  
        // window.location.href = '/selectplan', // Redirección con recarga
        this.router.navigate(['/dashboard/home'])
            .then(() => {
              window.location.reload();
            }),
      error: (error) => console.error("Error en el login:", error)
    });
  }

  
  /*
  login(): void {

    const { usuario, contrasena } = this.myForm.value;

    if (this.myForm.valid) {

      this.loading = true;

      this.authService.login(usuario, contrasena)
      .subscribe({
        next: ((resp) => {

            this.authService.getFuncionarioById(resp.userInfo.idfuncionario)
              .subscribe({

                next: ((resp) => {

                  this.estadosService.estadoFuncionario.set(resp);
                  localStorage.setItem('usuarioFuncionario', JSON.stringify(resp));

                  window.location.href = '/selectplan';
                  
                  // this.router.navigate(['/dashboard/home']);

                  // this.router.navigate(['/selectplan'])
                  //   .then(() => {
                  //     window.location.reload();
                  //   });
                }),

                error: (message) => {
                  this.loading = false;
                  // this.myForm.reset();
                }
         
          })

        }),

        error: (message) => {
          this.loading = false;
          // this.myForm.reset();
        }

      })
      
    }
  }
*/


}
