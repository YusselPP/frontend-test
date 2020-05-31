import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GifSearchComponent } from './gif-search/gif-search.component';

const routes: Routes = [
  {
    path: 'gifs/search',
    component: GifSearchComponent
  },
  {
    path: '',
    redirectTo: '/gifs/search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
