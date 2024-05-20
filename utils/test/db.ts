import DatabaseService from "@/utils/db";
export const connect = async () => {
  DatabaseService.connect()
    .then(() => {
      console.log("Connected");
    })
    .catch((error) => console.log(error));
};
