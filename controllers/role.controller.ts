import { Controller } from "@/schema/common";
import { Areas } from "@/schema/role/areas";
import { verifyUser } from "@/services/auth";
import { getArea, getRole } from "@/services/role";

import {
  ErrorStatuses,
  UserErrorCodes,
  UserErrorMessages,
} from "@/vendor/errors";
import { Method } from "axios";

export class RoleController extends Controller {
  constructor(public area: Areas, public method: Method) {
    super();
  }

  /**
   * Verify token, if error, @return ErrorStatuses.unauthorized error
   * @param authToken
   *
   */

  public verifyUserRole = async (req, res, next) => {
    // Get auth token.
    const authToken = req.headers.authorization;
    const isSearching = req.query.phone;

    // Verify token.
    try {
      // const user = await verifyUser(authToken);
      if (!isSearching) {
        throw new Error("Not allowed");
      }
      // if (user.role && !isSearching) {
      //   const role = getRole(user.role);
      //   const area = getArea(role, this.area);
      //   if (area) {
      //     let rightMethod = "read";
      //     switch (this.method) {
      //       case "GET":
      //         rightMethod = "read";
      //         break;
      //       case "DELETE":
      //         rightMethod = "delete";
      //         break;
      //       case "PATCH":
      //         rightMethod = "update";
      //         break;
      //       case "POST":
      //         rightMethod = "create";
      //         break;
      //     }
      //     const right = area.rights[rightMethod];
      //     if (!right) {
      //       throw new Error(UserErrorMessages.userNotValidRole);
      //     }
      //   } else {
      //     throw new Error(UserErrorMessages.userNotValidRole);
      //   }
      // }
    } catch (error) {
      res.statusCode = ErrorStatuses.forbidden;
      return res.send({
        status: ErrorStatuses.forbidden,
        error: UserErrorMessages.userNotValidRole,
        errorCode: UserErrorCodes.userNotValidRole + "1",
      });
    }

    next();
  };
}
