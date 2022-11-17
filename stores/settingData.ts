import { defineStore } from "pinia";

export const languageList = [
  "czech",
  "dutch",
  "english",
  "french",
  "german",
  "greek",
  "hungerian",
  "indonesian",
  "irish",
  "italian",
  "japanese",
  "korean",
  "latvian",
  "polish",
  "punjabi",
  "russian",
  "simplified-chinese",
  "slovak",
  "spanish",
] as const;

export type Language = typeof languageList[number];

export const useSettingData = defineStore("settingData", () => {
  const language = useState<Language>(() => "english" as Language);

  return {
    language,
  };
});
