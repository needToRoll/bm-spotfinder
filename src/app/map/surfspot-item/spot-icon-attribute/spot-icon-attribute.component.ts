import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spot-icon-attribute',
  templateUrl: './spot-icon-attribute.component.html',
  styleUrls: ['./spot-icon-attribute.component.scss'],
})
export class SpotIconAttributeComponent implements OnInit {
  @Input() values: string[];
  @Input() title: string;
  @Input() matIcon: any;

  constructor() {}

  ngOnInit(): void {}
}
