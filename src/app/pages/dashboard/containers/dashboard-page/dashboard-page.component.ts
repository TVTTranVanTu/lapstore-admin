import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/pages/product/services/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent {
  homeIcon: string = '../../../assets/icons/home-icon.svg';
  slashIcon: string = '../../../assets/icons/slash-icon.svg';

  constructor(private productService: ProductService, private router: Router) {}
}
