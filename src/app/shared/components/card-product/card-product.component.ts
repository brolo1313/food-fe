import { Component, Input, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalProductComponent } from '../modal-product/modal-product.component';
import { FavoriteService } from '../../services/favorite-services';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent {

  favoriteService = inject(FavoriteService);

  @Input() dataInfo: any;
  @Input() isFavoriteBlock!: boolean;


  public nameTrackBy = (item:any) => item?.name;
  
  public defaultImage: string = 'assets/image/default-product-image.png';
  constructor(private modalService: NgbModal) {
  }

  checkFavoriteList(data:any){
    const array = [...this.favoriteService.getFavoriteItems()]
    const result = array.some( vendor => vendor['name'] === data.name );
    
    return result;
  }

  public openModal(item: any) {
    const modalRef = this.modalService.open(ModalProductComponent, {
      centered: false,
      windowClass: 'bottom-modal',
    });
    modalRef.componentInstance.data = item;
  }

  togglerToFavorite(e: any, item: any) {
    e.stopPropagation()
    this.favoriteService.toggleFavorite(item);
  }
}
