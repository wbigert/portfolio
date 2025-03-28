export interface User {
  id: string
  firstName: string
  lastName: string
  info: UserInfo
  tokens?: string[]
}

export type UserInfo = MiscInfo

export enum BoardPosition {
  None = 'none',
  President = 'president',
  VicePresident = 'vice_president',
  PrManager = 'pr_manager',
  ItManager = 'it_manager',
  EventManager = 'event_manager',
  EventPlanner = 'event_planner',
  InventoryManager = 'inventory_manager',
  KorpenManager = 'korpen_manager',
  ExternalAffairs = 'external_affairs',
  Revisor = 'revisor',
  TeamCaptainMen = 'captain_men',
  TeamCaptainWomen = 'captain_women'
}

export interface MiscInfo {
  readonly boardPosition: BoardPosition
  readonly email: string
  readonly phone?: string
  readonly preferredRoles: VolleyballRole[]
  readonly picture?: string
  readonly permissions: Permission[]
  readonly joinDate: Date
}

export enum VolleyballRole {
  OutsideHitter = 'outside_hitter',
  MiddleBlocker = 'middle_blocker',
  Opposite = 'opposite',
  Setter = 'setter',
  Libero = 'libero',
}

export enum Permission {
  Admin = 'admin_permission',
  Tryouts = 'tryouts_permission',
  Events = 'events_permission',
}

