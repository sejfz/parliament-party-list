import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent implements OnInit {
  @Input('input') person_data: any;

  constructor() {
    this.person_data = {};
  }

  ngOnInit(): void {
  }

}
