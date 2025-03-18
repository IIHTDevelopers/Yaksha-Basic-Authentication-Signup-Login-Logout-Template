import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Use RouterModule.forRoot to define routes
  exports: [RouterModule]
})
export class AppRoutingModule { }
