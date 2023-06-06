import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.scss']
})
export class AuthCardComponent implements OnInit {
  @Input() imgSrc!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
