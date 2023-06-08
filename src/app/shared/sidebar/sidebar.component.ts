import { Component, OnInit } from '@angular/core';
import { AuthService } from '@ui-core-services/auth.service';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // menuItems: ModuleRoute[] = [];
  // viewAllComponents = false;

  // PortalFeatureType = PortalFeatureType;
  // fModule!: ModuleRoute;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  isMobileMenu() {
    console.log('hit mobile')
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logout() {
    this.authService.logout();
  }

}
