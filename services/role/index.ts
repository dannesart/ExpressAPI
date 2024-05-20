import { Role } from "@/schema/role";
import { Areas } from "@/schema/role/areas";

const adminRole: Role = {
  name: "admin",
  areas: [
    {
      name: Areas.users,
      rights: {
        read: true,
        create: true,
        delete: true,
        update: true,
      },
    },
    {
      name: Areas.user,
      rights: {
        read: true,
        create: true,
        delete: true,
        update: true,
      },
    },
  ],
};

const defaultRole: Role = {
  name: "default",
  areas: [
    {
      name: Areas.users,
      rights: {
        read: false,
        create: false,
        delete: false,
        update: false,
      },
    },
    {
      name: Areas.user,
      rights: {
        read: true,
        create: true,
        delete: true,
        update: true,
      },
    },
  ],
};

const getArea = (role: Role, areaToFind: Areas) => {
  return role.areas.filter((area) => area.name === areaToFind)[0];
};

const getRole = (roleName: string) => {
  return [adminRole, defaultRole].filter((role) => role.name === roleName)[0];
};

export { adminRole, defaultRole, getRole, getArea };
