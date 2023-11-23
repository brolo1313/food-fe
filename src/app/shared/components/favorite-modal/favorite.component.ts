import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../services/favorite-services';
import { CardProductComponent } from '../card-product/card-product.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule, CardProductComponent],
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {

  favoriteService = inject(FavoriteService);
  activeModal = inject(NgbActiveModal);

  favoriteList: any = [];
  
}
