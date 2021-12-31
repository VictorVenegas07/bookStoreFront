import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }
  @Input()titulo: any;
  @Input()mensaje: any;

  ngOnInit(): void {
  }

}
