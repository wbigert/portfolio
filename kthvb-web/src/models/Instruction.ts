import { AppData } from "./AppData";
import { BlogPost } from "./BlogPost"
import { EventPost } from "./EventPost"
import { Settings } from "./Settings";
import { User } from "./User";

export interface InstructionArgs {
  appData: AppData,
  setAppData: (appData: AppData) => void,
  navigateTo: (path: string) => void
}

export interface InstructionData {
  appData?: AppData
  blogPost?: BlogPost
  eventPost?: EventPost
  tryout_id?: string | null | undefined
  toDeleteId?: string
  email?: string
  settings?: Settings
  password?: string
  confirmPassword?: string
  resetToken?: string
  user?: User
  applicant?: Applicant
  delayUpdate?: boolean
}