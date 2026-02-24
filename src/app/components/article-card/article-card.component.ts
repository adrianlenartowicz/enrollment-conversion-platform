import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent {
  @Input() header: string = '';
  @Input() paragraph: string = '';
  @Input() image: string = '';
  @Input() imageSrcset?: string;
  @Input() id: string = '';
}
