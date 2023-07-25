import { LoadingService } from '@core/services/loading.service';
import { PostService } from './../../core/services/post.service';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-manage',
  templateUrl: './post-manage.component.html',
  styleUrls: ['./post-manage.component.scss'],
})
export class PostManageComponent implements OnInit {
  posts: any[] = [];
  toggle: boolean = true;
  name: string | null = null;

  totalItems: number = 0;
  isPagination: boolean = true;

  currentPage: number = 1;
  pageSize: number = 10;

  keyword: string = '';

  constructor(
    private readonly postService: PostService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.route.queryParamMap.subscribe((params) => {
      const name = params.get('name') || '';
      const orderBy = params.get('orderBy') || '';
      const currentPage = Number(params.get('currentPage') || 0);

      if (name === '') {
        this.postService.getAll(currentPage).subscribe({
          next: (data: any) => {
            this.posts = data.data;
            this.totalItems = data.totalCount;
            this.loadingService.setLoading(false);
          },
          error: (error) => {
            this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
            this.loadingService.setLoading(false);
          },
        });
      } else {
        // Fetch and render the sorted posts based on the query parameters
        this.fetchSortedPosts(name, orderBy);
      }
    });
  }

  onClickSort(name: string) {
    this.loadingService.setLoading(true);
    this.name = name;
    this.router
      .navigate(['/dashboard/posts'], {
        queryParams: {
          name,
          orderBy: this.toggle ? 'asc' : 'desc',
        },
      })
      .then((value) => value && this.loadingService.setLoading(false));

    this.toggle = !this.toggle;
  }

  onPageChange(event: PageEvent) {
    this.loadingService.setLoading(true);

    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    // Handle page change and update the displayed data accordingly
    this.router
      .navigate(['/dashboard/posts'], {
        queryParams: {
          currentPage: this.currentPage,
        },
      })
      .then(() => this.loadingService.setLoading(false))
      .catch(() => this.loadingService.setLoading(false));
  }

  private fetchSortedPosts(name: string, orderBy: string): void {
    this.postService.getAllAndSorting({ name, orderBy }).subscribe({
      next: (response) => {
        this.posts = response.data;
        this.totalItems = response.totalCount;
        this.loadingService.setLoading(false);
      },
      error: (error) => {
        this.loadingService.setLoading(false);
      },
    });
  }

  onChangeSearch(target: any) {
    this.keyword = target.value;
  }

  onClickSearch() {
    this.loadingService.setLoading(true);
    this.postService.search({ keyword: this.keyword }).subscribe({
      next: (response) => {
        this.posts = response;
        this.totalItems = 0;
        this.loadingService.setLoading(false);
      },
      error: (error) => {
        this.loadingService.setLoading(false);
      },
    });
  }
}
