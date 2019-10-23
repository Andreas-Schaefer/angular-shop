import {Component, OnInit} from '@angular/core';
import {DynamicContentService} from '../services/dynamic/dynamic-content.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  elements;

  constructor(private contentService: DynamicContentService) {
  }

  ngOnInit() {
    this.elements = this.contentService.getDynamicContent('welcome');
  }
}
