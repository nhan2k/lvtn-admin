import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { PostService } from '@core/services/post.service';
import { environment } from '@environment/environment.development';
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
  objCategory: Object | any = {};
  Object = Object;

  reason: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postService: PostService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        this.id = params['id'];

        this.postService.getOne(params['id']).subscribe(
          (data) => {
            this.post = data;

            for (const key in data) {
              if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (key.includes('PostId') && data[key]) {
                  this.objCategory = data[key];
                  if (data[key]?.address) {
                    (this.objCategory as any).address =
                      data[key]?.address?.address +
                      data[key]?.address?.district +
                      data[key]?.address?.province;
                  }
                }
              }
            }
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
    const data: any = {
      isReview: true,
      status,
      isAdmin: true,
    };

    if (status === 'denined') {
      data.reason = this.reason;
    }

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

  reasonChange($event: Event) {
    this.reason = ($event.target as any).value;
  }
}
