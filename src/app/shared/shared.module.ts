import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
    declarations: [
        NavbarComponent,
        HomeComponent,
        NotFoundComponent,
    ],
    imports : [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    exports : [
        NavbarComponent,
        HomeComponent,
    ]
})
export class SharedModule{

}