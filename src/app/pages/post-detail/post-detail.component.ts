import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { PostService } from '@core/services/post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  id: string | null = null;
  post: any;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly postService: PostService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];

      this.postService.getOne(params['id']).subscribe((data) => {
        this.post = data;
      });
    });
  }

  onClickApproved() {
    this.loadingService.setLoading(true);
    const data = {
      isReview: true,
      status: 'show',
    };
    this.postService.approved(this.id, data).subscribe((data) => {
      this.loadingService.setLoading(false);
      this.toastrService.success('Duyệt tin thành công');
    });
  }
}
