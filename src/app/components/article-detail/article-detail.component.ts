import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleDetailComponent implements OnInit {
  article: any;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const articleId = params.get('id');
      if (articleId) {
        this.article = this.articleService.getArticleById(articleId);
      }
    });

    this.metaService.updateTag({ property: 'og:title', content: this.article.header });
    this.metaService.updateTag({ property: 'og:description', content: this.article.paragraph });
    this.metaService.updateTag({ property: 'og:image', content: `${window.location.origin}/assets/articles/${this.article.imageFileName}` });
  }
}
