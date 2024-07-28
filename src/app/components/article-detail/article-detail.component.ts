import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ArticleDetailComponent implements OnInit {
  article: any;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const articleId = params.get('id');
      if (articleId) {
        this.article = this.articleService.getArticleById(articleId);
      }
    });
  }

  // formatTextToHtml(text: string): string {
  //   const paragraphs = text.split('#').map(paragraph => `<p>${paragraph.trim()}</p>`);
  //   return paragraphs.join('');
  // }

  // getFormattedHtml() {
  //   return this.formatTextToHtml(this.article.content);
  // }

}
