import { LoadingService } from '@core/services/loading.service';
import { PostService } from './../../core/services/post.service';
import { Component, OnInit } from '@angular/core';
import { NotifyService } from '@core/services/notify.service';
import { UserService } from '@core/services/user.service';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  postCounts: number | undefined;
  userCounts: number | undefined;

  constructor(
    private readonly notifyService: NotifyService,
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly toastrService: ToastrService,
    private readonly socket: Socket,
    private readonly loadingService: LoadingService,
    private readonly authService: AuthService
  ) {}
  ngOnInit(): void {
    this.loadingService.setLoading(true);
    if (this.authService.getToken()) {
      this.postService.count().subscribe(
        (count: number) => (this.postCounts = count),
        (error) => {
          this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
          this.loadingService.setLoading(false);
        }
      );

      this.userService.count().subscribe(
        (count: number) => {
          this.userCounts = count;
          this.loadingService.setLoading(false);
        },
        (error) => {
          this.toastrService.error('Đã có lỗi xảy ra vui lòng thử lại');
          this.loadingService.setLoading(false);
        }
      );
      this.socket.on('notifyReceive', (data: string) => {
        this.toastrService.info(data);
      });
    }

    setTimeout(() => {
      this.loadingService.setLoading(false);
    }, 2000);
  }
}
