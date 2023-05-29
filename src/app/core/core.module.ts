import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenModule } from './interceptors/token/token.module';
import { postStatusPipe, postIsReviewPipe } from './pipes/posts.pipe';
import { userStatusPipe } from './pipes/users.pipe';

@NgModule({
  declarations: [postStatusPipe, postIsReviewPipe, userStatusPipe],
  imports: [CommonModule, TokenModule],
  exports: [TokenModule, postStatusPipe, postIsReviewPipe, userStatusPipe],
})
export class CoreModule {}
