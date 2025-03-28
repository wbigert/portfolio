import Contact from "@/components/Contact";
import { AppData } from "@/models/AppData";
import { ContactElement } from "@/models/Contact";
import { User } from "@/models/User";
import { useTranslation } from "react-i18next";
interface UserProfileProps {
  appData: AppData
}


export default function UserProfile({ appData }: UserProfileProps) {
  const { t } = useTranslation()

  const user = (appData.users || []).find((user: User) => user.id === appData.userDetails?.id)

  if (!user) {
    return null;
  }
  const element: ContactElement = {
    id: user.id,
    picture: user.info.picture,
    name: `${user.firstName} ${user.lastName}`,
    // phone: e.info.phone,
    email: user.info.email,
    role: t(user.info.role),
    navbar: true,
    lg: true,
  };

  return (
    <div className='p-2'>
      <Contact element={element} />
    </div>
  )
}