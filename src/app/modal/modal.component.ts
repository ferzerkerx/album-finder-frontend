import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  public onActionClicked: Subject<boolean>;
  @Input() title = '';

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.onActionClicked = new Subject();
  }

  close() {
    this.bsModalRef.hide();
  }

  protected onSuccess() {
    this.close();
    this.onActionClicked.next(true);
  }

  protected onFailure() {
    this.onActionClicked.next(false);
  }
}
