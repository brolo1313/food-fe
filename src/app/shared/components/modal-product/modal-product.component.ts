import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FavoriteService } from '../../services/favorite-services';

@Component({
  selector: 'app-modal-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss']
})
export class ModalProductComponent {

  favoriteService = inject(FavoriteService);
  activeModal = inject(NgbActiveModal);
  
  @Input() data!:any;

  public defaultImage: string = 'assets/image/default-product-image.png';

  togglerToFavorite(e: any, item: any) {
    e.stopPropagation()
    this.favoriteService.toggleFavorite(item);
  }

  checkFavoriteList(data:any){
    const array = [...this.favoriteService.getFavoriteItems()]
    const result = array.some( vendor => vendor['name'] === data.name );
  
    return result;
  }
}
