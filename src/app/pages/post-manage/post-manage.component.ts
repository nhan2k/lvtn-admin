import { LoadingService } from '@core/services/loading.service';
import { PostService } from './../../core/services/post.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-manage',
  templateUrl: './post-manage.component.html',
  styleUrls: ['./post-manage.component.scss'],
})
export class PostManageComponent implements OnInit {
  posts: any[] = [];

  constructor(
    private readonly postService: PostService,
    private readonly loadingService: LoadingService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.postService.getAll().subscribe((data: any[]) => {
      this.posts = [...data];
      this.loadingService.setLoading(false);
    });
  }
}
