import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavContainer, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { RoutingEnum } from '../shared/enums/routing.enum';
@Component({
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        RouterLink,
        RouterLinkActive,
        MatSidenavModule,
        MatSidenavContainer,
        MatSidenavContent
    ],
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
    protected readonly RoutingEnum = RoutingEnum
}