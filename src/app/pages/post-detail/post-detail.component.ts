import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { PostService } from '@core/services/post.service';
import { environment } from '@environment/environment.development';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  id: string | null = null;
  post: any;
  endpointURL: string = environment.imgUrl;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postService: PostService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
    private readonly socket: Socket
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        this.id = params['id'];

        this.postService.getOne(params['id']).subscribe(
          (data) => {
            this.post = data;
          },
          (error) => {
            this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
            this.loadingService.setLoading(false);
          }
        );
      },
      (error) => {
        this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
        this.loadingService.setLoading(false);
      }
    );
  }

  onClickApproved(status: string) {
    this.loadingService.setLoading(true);
    const data = {
      isReview: true,
      status,
      isAdmin: true,
    };
    this.postService.approved(this.id, data).subscribe({
      next: (data) => {
        this.loadingService.setLoading(false);
        this.toastrService.success('Duyệt tin thành công');
        this.router.navigate(['/dashboard/posts']);
      },
      error: (error) => {
        this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
        this.loadingService.setLoading(false);
      },
    });
  }
}
