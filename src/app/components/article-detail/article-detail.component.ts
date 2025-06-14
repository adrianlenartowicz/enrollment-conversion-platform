import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ArticleDetailComponent implements OnInit {
  article: any;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private metaService: Meta,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.article = this.articleService.getArticleById(articleId);

      if (this.article) {
        this.setMetaTags();
      }
    }
  }

  private setMetaTags() {
    this.titleService.setTitle(this.article.metaTitle);
    this.metaService.updateTag({ name: 'description', content: this.article.metaDescription });
    this.metaService.updateTag({ property: 'og:title', content: this.article.header });
    this.metaService.updateTag({ property: 'og:description', content: this.article.paragraph });
    this.metaService.updateTag({ property: 'og:image', content: `alawroc.pl/assets/articles/${this.article.imageFileName}` });
  }
}
