import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FindedAirdropPageComponent } from './finded-airdrop-page/finded-airdrop-page.component';

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'upcoming', component: FindedAirdropPageComponent},
  {path: 'active', component: FindedAirdropPageComponent},
  {path: 'past', component: FindedAirdropPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
