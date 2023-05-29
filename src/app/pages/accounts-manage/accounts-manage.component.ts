import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { UserService } from '@core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts-manage.component.html',
  styleUrls: ['./accounts-manage.component.scss'],
})
export class AccountsManageComponent implements OnInit {
  users: any[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.userService.getAll().subscribe((users) => {
      this.users = users;
      this.loadingService.setLoading(false);
    });
  }

  onClickupdateStatus(id: string, status: string) {
    this.loadingService.setLoading(true);
    this.userService.updateStatus(id, status).subscribe((response: any) => {
      this.users.map((user) => {
        if (user?._id === response?._id) {
          user.status = response.status;
        }
      });
      this.loadingService.setLoading(false);
      this.toastrService.success('Cập nhật thành công');
    });
  }
}
