import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-hint-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-hint-modal.component.html',
  styleUrls: ['./update-hint-modal.component.scss']
})
export class UpdateHintModalComponent {

  constructor(
    public modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { }


  dismiss(reason: string) {
    this.activeModal.dismiss(reason);
  }

  closeWithResult(result: string) {
    this.activeModal.close(result);
  }
}
