import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jbb-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent implements OnInit {
  @Input() item: any;
  constructor() {}

  ngOnInit(): void {}
}
