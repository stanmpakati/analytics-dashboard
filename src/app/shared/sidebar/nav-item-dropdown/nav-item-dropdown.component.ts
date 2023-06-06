import { Subscription } from 'rxjs';
import { ModuleRoute } from '@ui-core-models/component-nav';
import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { PortalService } from '@ui-core-services/portal.service';

@Component({
  selector: 'app-nav-item-dropdown',
  templateUrl: './nav-item-dropdown.component.html',
  styleUrls: ['./nav-item-dropdown.component.scss']
})
export class NavItemDropdownComponent implements OnInit, AfterViewInit {
  @Input() menuItem: ModuleRoute
  @Input() showComponent: boolean
  pageUrl: string;
  pageUrlSub: Subscription = new Subscription()

  constructor(private portalService: PortalService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.pageUrl = this.portalService.getPageUrl

    this.pageUrlSub = this.portalService.getPageUrlListener.subscribe((url) => {
      this.pageUrl = url
    })
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.pageUrlSub.unsubscribe()
  }
}
