import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './core/components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent],
  // templateUrl: './app.component.html',
  template: `
    <app-spinner></app-spinner> <!-- Este es el spinner global -->
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent  {

}
