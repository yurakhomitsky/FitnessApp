import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ListItemComponent } from './components/list-item/list-item.component';
import { MessageComponent } from './components/message/message.component';
import { JoinPipe } from './pipes/join.pipe';
import { WorkoutPipe } from './pipes/workout.pipe';
@NgModule({
  declarations: [ListItemComponent, MessageComponent, JoinPipe, WorkoutPipe],
  imports: [CommonModule, RouterModule, AngularFireDatabaseModule],
  exports: [ListItemComponent, MessageComponent, JoinPipe, WorkoutPipe],
  providers: [],
})
export class SharedModule { }
