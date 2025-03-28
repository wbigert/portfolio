import { User } from './User';
import { BlogPost } from './BlogPost';
import { EventPost } from './EventPost';
import { LoginResponse } from './Login';
import { Settings } from '@/models/Settings';

export interface AppData {
  users: User[] | null
  applicants: Applicant[] | null,
  tryout_id: string | null,
  settings: Settings | null,
  blogPosts: BlogPost[] | null
  events: EventPost[] | null
  loggedIn: boolean
  userDetails: LoginResponse | null
  didFetchCollections: boolean
}