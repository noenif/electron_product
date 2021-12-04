import { connectDataBase, operateCollection } from "@/server/server";
import { Document } from "bson";
const addObject = (data: Document) => {
  return new Promise((resolve, reject) => {
    if (operateCollection !== null) {
      addCore(operateCollection, data, resolve, reject);
    } else {
      connectDataBase().then((res) => {
        addCore(operateCollection, data, resolve, reject);
      });
    }
  });
};

const addCore = (operateCollection, data, resolve, reject) => {
  operateCollection.insertOne(data, {}, function (err, result) {
    if (!err) {
      resolve(result);
    }
    reject(err);
  });
};
export { addObject };
