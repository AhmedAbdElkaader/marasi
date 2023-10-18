import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Units',
    icon: 'nb-location',
    link: '/pages/units',
    home: false,
  }
  ,
  {
    title: 'Staff',
    icon: 'fa fa-user-tie fa-xs',
    link: '/pages/staff',
    home: false,
  },
  {
    title: 'Payments',
    icon: 'nb-bar-chart',
    link: '/pages/payments',
    home: false,
  },
  {
    title: 'Reports',
    icon:  'fa fa-pencil-alt fa-xs',
    //link: '/pages/report',
    home: false,
    children: [
      {
        title: 'Activation Report',
        link: '/pages/report'
      },
      {
        title: 'All Report',
        link: '/pages/Allreport'
      }
    ]
  },
  
];