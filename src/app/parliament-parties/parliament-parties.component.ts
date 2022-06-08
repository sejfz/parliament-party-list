import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-parliament-parties',
  templateUrl: './parliament-parties.component.html',
  styleUrls: ['./parliament-parties.component.scss']
})
export class ParliamentPartiesComponent implements OnInit {
  parliament_members: Array<any>;
  parties: Array<any>;
  loadingData: boolean = false;
  @Output() parties_output = new EventEmitter<string[]>();
  @Input() filter_params: any;
  @Input() sort_value: string = 'first_name';
  @Input() min_age: number = 0;
  @Input() max_age: number = 100;
  @Input() filter_string: string = '';
  @Input() sort_asc: boolean = true;

  constructor() {
    this.parliament_members = [];
    this.parties = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log({changes})
    this.filterAll(this.filter_string, this.min_age, this.max_age, {value: this.sort_value, asc: this.sort_asc})
  }

  async ngOnInit(): Promise<any> {
    let res = await this.callApi('http://data.riksdagen.se/personlista/?utformat=json');
    console.log({res})
    this.parliament_members = res.personlista.person;
    this.parties = this.subArrays(res.personlista.person, 'parti');
    this.parties_output.emit(this.parties.map(p => {return p.name}));
  }

  async callApi(url: string) {
    /*
      Fetch API call, if no error occured, proceed to return the result. 
      If something went wrong, throw error.
    */
   this.loadingData = true;
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong when loading the data. Please try to refresh the page');
        }
      })
      .then(data => {
        this.loadingData = false;
        return data;
      });
  }

  subArrays(arr: Array<any>, prop: string): Array<any> {
    /*
      Function for grouping array items with a similar property into smaller arrays.
      Checks if array with smaller arrays has an item with property with value of a 
      certain item. If it does, the item is added to the data array for that specific match.
    */
    let party_arr: Array<Party> = [];

    arr.map(item => {
      let exist_index = party_arr.findIndex(i => i.name === item[prop]);
      if (!item[prop]) {
        console.log(item)
      }
      if (exist_index >= 0) {
        party_arr[exist_index].addMember(item);
      } else {
        party_arr.push(new Party(item[prop], [item]));
      }
    })
    return party_arr;
  }
  filterAll(str: string, min_age: number, max_age: number, sort_value?: any) {
    this.parties.forEach(p => {
      if (sort_value) {
        p.sort_value.value = sort_value.value;
        p.sort_value.asc = sort_value.asc;
      }
      p.filterMembers(str, min_age, max_age);
    })
  }
}

export class Party {
  name: string;
  members: any[];
  filtered_members: any[] = [];

  sort_value = {
    value: 'first_name',
    asc: true
  }
  filter_string: string = '';

  sort_options: any[] = [
    {
      title: 'Förnamn',
      value: 'first_name'
    },
    {
      title: 'Efternamn',
      value: 'last_name'
    },
    {
      title: 'Födelseår',
      value: 'birth_year'
    },
  ];

  sort_actions: any = {
    first_name: (a: any, b: any) => {
      return (a.tilltalsnamn + a.efternamn).localeCompare(b.tilltalsnamn + b.efternamn);
    },
    last_name: (a: any, b: any) => {
      return (a.efternamn + b.tilltalsnamn).localeCompare(b.efternamn + b.tilltalsnamn);
    }, 
    birth_year: (a: any, b: any) => {
      if (Number(a.fodd_ar) - Number(b.fodd_ar) === 0) {
        return a.tilltalsnamn.localeCompare(b.tilltalsnamn);
      }
      return Number(a.fodd_ar) - Number(b.fodd_ar);
    }
  }

  constructor(name: string, members: any[]) {
    this.name = name;
    this.members = members;
    this.filtered_members = this.members;
    this.sortMembers(this.sort_actions.first_name, true);
  }

  addMember(m:any) {
    this.members.push(m);
    this.filtered_members = this.members;
  }

  sortMembers(action?: Function, ascending: boolean = true) {
    this.filtered_members = action ? this.filtered_members.sort((a, b) => ascending ? action(a, b) : -action(a, b)) : this.filtered_members.sort();
  }

  filterMembers(str: string, min_age: number = 0, max_age: number = 100) {
    this.filtered_members = this.members.filter((f:any) => {
      return (
        (
          f.tilltalsnamn.toLowerCase().includes(str.toLowerCase()) 
          || 
          f.efternamn.toLowerCase().includes(str.toLowerCase())
        )
        &&
        (
          Number(f.fodd_ar) <= new Date().getFullYear() - min_age
          &&
          Number(f.fodd_ar) >= new Date().getFullYear() - max_age
        )
      );
    });
    this.sortMembers(this.sort_actions[this.sort_value.value], this.sort_value.asc);
  }
}
