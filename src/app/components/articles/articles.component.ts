import { Component } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {
  articles = this.articleService.getArticles();

  constructor(private articleService: ArticleService, private metaService: Meta, private titleService: Title) {
    this.titleService.setTitle('Artykuły | Akademia Lekkiej Atletyki Wrocław');
    this.metaService.updateTag({ name: 'description', content: 'Przeczytaj artykuły dotyczące lekkoatletyki oraz rozwoju sportowego dzieci. Dowiedz się jak możesz pomóc swojemu dziecku w jego przygodzie ze sportem!' });
  };
}
