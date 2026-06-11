import { SettingsState } from "@/types";

export class SettingsConstants {
  readonly COOKIE_KEY = "wdex-settings";
  readonly DEFAULT_SETTINGS: SettingsState = {
    filteredLanguages: ["vi"],
    originLanguages: [],
    filteredContent: ["safe", "suggestive"],
    dataSaver: false,
    maxImageWidth: undefined,
  };
}
