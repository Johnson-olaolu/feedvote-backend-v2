type RoleTypes = 'SuperAdmin' | 'Owner' | 'Admin' | 'Member' | 'Guest';
type CompanyPermissionTypes =
  | 'Create:Company'
  | 'Edit:Company'
  | 'Delete:Company'
  | '';

type FeedPermissionType =
  | 'Create:Feed'
  | 'Edit:Feed'
  | 'Delete:Feed'
  | 'View:Feed';

export const permissions: {
  name: FeedPermissionType | CompanyPermissionTypes;
  description: string;
}[] = [
  {
    name: 'Create:Feed',
    description: 'Allows user to create feed',
  },
  {
    name: 'Delete:Feed',
    description: 'Allows user to delete feed',
  },
  {
    name: 'Edit:Feed',
    description: 'Allows user to edit feed details',
  },
  {
    name: 'View:Feed',
    description: 'Allows user to view feed details',
  },
  {
    name: 'Create:Company',
    description: 'Allows user to create a company',
  },
  {
    name: 'Edit:Company',
    description: 'Allows user to create a company',
  },
  {
    name: 'Delete:Company',
    description: 'Allows user to create a company',
  },
];

export const roles: {
  name: RoleTypes;
  description: string;
  permissions: (CompanyPermissionTypes | FeedPermissionType)[];
}[] = [
  {
    name: 'SuperAdmin',
    description: 'site owner',
    permissions: [
      'Create:Company',
      'Create:Feed',
      'Delete:Company',
      'Delete:Feed',
      'Edit:Company',
      'Edit:Feed',
      'View:Feed',
    ],
  },
  {
    name: 'Owner',
    description: 'Company Owner',
    permissions: [
      'Create:Company',
      'Edit:Company',
      'Delete:Company',
      'Create:Feed',
      'Edit:Feed',
      'View:Feed',
    ],
  },
  {
    name: 'Member',
    description: 'Company Member',
    permissions: ['Create:Feed', 'Edit:Feed', 'View:Feed', 'Delete:Feed'],
  },
  {
    name: 'Guest',
    description: 'guest',
    permissions: ['View:Feed'],
  },
];
