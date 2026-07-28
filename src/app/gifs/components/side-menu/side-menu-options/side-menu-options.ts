import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface MenuItem {
  iconClass: string;
  label: string;
  description: string;
  active: boolean;
  link?: string;
}

@Component({
  selector: 'side-menu-options',
  imports: [RouterLink],
  templateUrl: './side-menu-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuOptions {
  protected readonly menuItems: MenuItem[] = [
    {
      iconClass: 'fa-solid fa-border-all',
      label: 'Dashboard',
      description: 'Data Overview',
      active: true,
      link: '/dashboard',
    },
    {
      iconClass: 'fa-solid fa-fire',
      label: 'Trending',
      description: 'Trending GIFs',
      active: false,
      link: '/dashboard/trending',
    },
    {
      iconClass: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      description: 'Search GIFs',
      active: false,
      link: '/dashboard/search',
    },
  ];
}
