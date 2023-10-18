import { Component, Input } from '@angular/core';

@Component({
  selector: 'status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() on = false;
  @Input() clickable = false;


  buttonClick() {
    if (!this.clickable)
     return this.on = !this.on
  }

  staticUpdate() {
    this.on = !this.on
  }
}
