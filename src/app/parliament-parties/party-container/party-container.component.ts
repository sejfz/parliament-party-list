import { Component, OnInit, Input } from '@angular/core';
import { Party } from '../parliament-parties.component';

@Component({
  selector: 'app-party-container',
  templateUrl: './party-container.component.html',
  styleUrls: ['./party-container.component.scss']
})
export class PartyContainerComponent implements OnInit {
  @Input('input') party: Party;
  min_age: number;
  max_age: number;
  constructor() {
    this.party = new Party('', []);
    this.min_age = 18;
    this.max_age = 100;
  }

  ngOnInit(): void {
    this.party.filterMembers('', this.min_age, this.max_age);
  }
}
