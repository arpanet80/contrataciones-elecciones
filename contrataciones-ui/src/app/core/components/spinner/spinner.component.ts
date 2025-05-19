import { Component, inject } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  // templateUrl: './spinner.component.html',
  template: `
    @if(isLoading()){
      <div class="spinner-overlay">
          <div class="spinner"></div>
      </div>
    }
  `,
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  private readonly spinnerSvc = inject(SpinnerService);

  isLoading = this.spinnerSvc.isLoading;

}
