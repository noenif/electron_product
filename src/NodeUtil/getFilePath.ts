import { OpenDialogOptions } from "electron";

const { dialog } = require("electron");
type propertiesType = Array<
  | "openFile"
  | "openDirectory"
  | "multiSelections"
  | "showHiddenFiles"
  | "createDirectory"
  | "promptToCreate"
  | "noResolveAliases"
  | "treatPackageAsDirectory"
  | "dontAddToRecent"
>;
const getPath = (config: propertiesType) => {
  return dialog.showOpenDialog({ properties: config }).then((res) => {
    return res;
  });
};
export default { getPath };
