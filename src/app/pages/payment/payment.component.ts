import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { UserService } from '@core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  payments: any = [];
  reason: string | null = null;
  paymentId: string | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly loadingService: LoadingService,
    private readonly toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.userService.getPayments().subscribe({
      next: (response) => {
        this.payments = response;
      },
      error: (err) => {},
    });
  }

  onClickApproved(status: string) {
    if (this.paymentId) {
      this.loadingService.setLoading(true);
      const data: any = {
        status,
      };
      this.userService.updatePayments(this.paymentId, data).subscribe({
        next: (response: any) => {
          console.log(
            '🚀 ~ file: payment.component.ts:43 ~ PaymentComponent ~ this.userService.updatePayments ~ response:',
            response
          );
          this.payments?.map((payment: any) => {
            if (payment?._id === response._id) {
              payment.status = response.status;
            }
          });
          this.toastrService.success('Cập nhật giao dịch thành công');
          this.loadingService.setLoading(false);
        },
        error: (err) => {
          this.toastrService.error('Cập nhật giao dịch thất bại');
          this.loadingService.setLoading(false);
        },
      });
      if (status === 'denined') {
        data.reason = this.reason;
      }
    }
  }

  reasonChange($event: Event) {
    this.reason = ($event.target as any).value;
  }

  onClick(id: string) {
    this.paymentId = id;
  }
}
