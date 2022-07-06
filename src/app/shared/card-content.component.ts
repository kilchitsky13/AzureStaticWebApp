import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html'
})
export class CardContentComponent implements OnInit {
  @Input() name;
  @Input() description;

  ngOnInit() {}
}
