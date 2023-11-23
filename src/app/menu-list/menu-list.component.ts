import { Component, ElementRef, HostListener, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from '../shared/components/card-product/card-product.component';
import { SET_INFO } from '../shared/data-models/set-info';
import { SALAD_INFO } from '../shared/data-models/salad-info';
import { CLASSIC_ROLLS_INFO } from '../shared/data-models/classic-rolls-info';
import { SOUPS_INFO } from '../shared/data-models/soups-info';
import { WOK_INFO } from '../shared/data-models/wok-info';
import { WARP_DISHES_INFO } from '../shared/data-models/ward-dishes-info';
import { FavoriteComponent } from '../shared/components/favorite-modal/favorite.component';
import { FavoriteService } from '../shared/services/favorite-services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, CardProductComponent, FavoriteComponent],
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent {

  private header: any;

  private sticky = 0;

  public setList = SET_INFO;
  public saladList = SALAD_INFO;
  public classicRollsList = CLASSIC_ROLLS_INFO;
  public soupList = SOUPS_INFO;
  public warmDishesList = WARP_DISHES_INFO;
  public wokList = WOK_INFO;


  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    public favoriteService: FavoriteService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.scrollSpyHandler();
  }

  ngAfterViewInit() {
    this.header = this.el.nativeElement.querySelector('nav');
    this.sticky = this.header.offsetTop;
    
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if(window.screen.width < 768) {
      this.setNavHeaderSticky();
    }
  }

  scrollSpyHandler() {
    const scrollSpyEl = document.querySelector('[data-bs-spy="scroll"]')
    scrollSpyEl!.addEventListener('activate.bs.scrollspy', (e) => {
      this.setScrollToACtiveLink();
    })
  }

  setNavHeaderSticky() {
    const favoriteContainer = this.el.nativeElement.querySelector('#favorite-hint');
    const scrollSpyContainer = this.el.nativeElement.querySelector('.scrollspy-example');


    const shouldStick = window.pageYOffset > this.sticky;

    if (shouldStick) {
      this.renderer.addClass(scrollSpyContainer, 'margin-top-75');
      this.renderer.addClass(this.header, 'sticky');

      this.renderer.addClass(favoriteContainer, 'favorite-container');
      this.renderer.addClass(scrollSpyContainer, 'margin-top-150');

    } else {
      this.renderer.removeClass(this.header, 'sticky');
      this.renderer.removeClass(scrollSpyContainer, 'margin-top-75');

       this.renderer.removeClass(favoriteContainer, 'favorite-container');
        this.renderer.removeClass(scrollSpyContainer, 'margin-top-150');
    }
    
    if(!this.favoriteService.getFavoriteItems().length){
      this.renderer.removeClass(scrollSpyContainer, 'margin-top-150');
    }
  }

  setScrollToACtiveLink() {
    const nav = this.el.nativeElement.querySelector('nav');
    const activeLink = nav.querySelector('.active');
    if (activeLink.innerHTML !== 'Сети') {
      activeLink?.scrollIntoView({ behavior: 'auto', inline: 'center' });
    }
  }

  public openFavoriteModal() {
    const modalRef = this.modalService.open(FavoriteComponent, {
      centered: false,
      windowClass: 'favorite-part-modal',
    });
  }
}







// setNavHeaderSticky() {
//   const favoriteContainer = this.el.nativeElement.querySelector('#favorite-hint');
//   const scrollSpyContainer = this.el.nativeElement.querySelector('.scrollspy-example');


//   const shouldStick = window.pageYOffset > this.sticky;

//   if (shouldStick) {
//     if (!this.header.classList.contains('sticky')) {
//       this.renderer.addClass(this.header, 'sticky');
//     }
//     if (!scrollSpyContainer.classList.contains('margin-top-75')) {
//       // this.renderer.addClass(scrollSpyContainer, 'margin-top-75');
//     }
//     // this.renderer.addClass(this.header, 'sticky');
//     // this.renderer.addClass(scrollSpyContainer, 'margin-top-75');

//   } else {
//     this.renderer.removeClass(this.header, 'sticky');
//     // this.renderer.removeClass(scrollSpyContainer, 'margin-top-75');
//   }

//   if (favoriteContainer) {
//     if (shouldStick) {
//       if (!favoriteContainer.classList.contains('favorite-container')) {
//         this.renderer.addClass(favoriteContainer, 'favorite-container');
//       }
//       // this.renderer.addClass(favoriteContainer, 'favorite-container');
//       // this.renderer.addClass(scrollSpyContainer, 'margin-top-150');
//       if (!scrollSpyContainer.classList.contains('margin-top-150')) {
//         this.renderer.addClass(scrollSpyContainer, 'margin-top-150');
//       }
//     } else {
//       this.renderer.removeClass(favoriteContainer, 'favorite-container');
//       this.renderer.removeClass(scrollSpyContainer, 'margin-top-150');
//     }
    
//   }

//   if(!this.favoriteService.getFavoriteItems().length){
//     this.renderer.removeClass(scrollSpyContainer, 'margin-top-150');
//   }
// }