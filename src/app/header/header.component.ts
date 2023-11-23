import { Component, ElementRef, Renderer2, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoriteService } from '../shared/services/favorite-services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FavoriteComponent } from '../shared/components/favorite-modal/favorite.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf, FavoriteComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  renderer = inject(Renderer2);
  favoriteService = inject(FavoriteService);
  modalService =inject(NgbModal);

  public isMobileNavVisible  = false;
  public checkVisited() {
    this.isMobileNavVisible  = !this.isMobileNavVisible ;

    return  this.isMobileNavVisible ? 
    this.renderer.addClass(document.body, 'showed-mobile-nav') : 
    this.renderer.removeClass(document.body, 'showed-mobile-nav')
  }


  public openModal(){
    const modalRef = this.modalService.open(FavoriteComponent, {
      centered: false,
      windowClass: 'favorite-part-modal',
    });
  }

  checkFavoriteList(data:any){
    const array = [...this.favoriteService.getFavoriteItems()]
    const result = array.some( vendor => vendor['name'] === data.name );
    
    return result;
  }
}
