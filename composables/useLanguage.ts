import { useSettingData } from "~/stores/settingData";

export const useLanguage = () => {
  const settingData = useSettingData();
  const { pending, data: languageData } = useLazyAsyncData<
    Record<string, string>
  >("localization", () => $fetch(`/locales/${settingData.language}.json`));

  watch(
    () => settingData.language,
    () => void refreshNuxtData("localization")
  );

  return { pending, languageData };
};
