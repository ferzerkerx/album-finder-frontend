import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  //TODO rename
  public onSave: Subject<boolean>;
  @Input() title: string = '';

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.onSave = new Subject();
  }

  close() {
    this.bsModalRef.hide();
  }

  protected onSuccess() {
    this.close();
    this.onSave.next(true);
  }

  protected onFailure() {
    this.onSave.next(false);
  }
}
