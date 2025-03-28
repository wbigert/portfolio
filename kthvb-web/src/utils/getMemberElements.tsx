import { useWindowWidth } from "@/hooks/useWindowWidth";
import { ContactElement } from "@/models/Contact";
import { User } from "@/models/User";
import i18next from "i18next";

export function getMemberElements(users: User[], windowWidth: number) {
  const elements = users.map((e) => {
    const element: ContactElement = {
      id: e.id,
      picture: e.info.picture,
      name: `${e.firstName} ${e.lastName}`,
      // phone: e.info.phone,
      email: e.info.email,
      role: i18next.t(e.info.boardPosition),
      vertical: true,
      lg: windowWidth >= 768
    };

    return element;
  });
  return elements
}