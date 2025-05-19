import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent, BreadcrumbsComponent
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
