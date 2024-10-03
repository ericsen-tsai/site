import { env } from "@erichandsen/env";

type LastSevenDaysMostUsedLanguageResponse = {
  data: {
    languages: Array<{
      name: string;
      total_seconds: number;
      percent: number;
      digital: string;
      decimal: string;
      text: string;
      hours: number;
      minutes: number;
    }>;
    editors: Array<{
      name: string;
      total_seconds: number;
      percent: number;
      digital: string;
      decimal: string;
      text: string;
      hours: number;
      minutes: number;
    }>;
  };
};

const getMostUsedLanguageDuringSevenDays = async () => {
  const response = await fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
    headers: {
      Authorization: `Basic ${env.WAKATIME_API_KEY}`
    }
  });
  const data = (await response.json()) as LastSevenDaysMostUsedLanguageResponse;
  const mostUsedLanguage = data.data.languages[0];
  const mostUsedEditor = data.data.editors[0];

  return {
    language: {
      name: mostUsedLanguage?.name,
      percent: mostUsedLanguage?.percent,
      hours: mostUsedLanguage?.hours
    },
    editor: {
      name: mostUsedEditor?.name,
      percent: mostUsedEditor?.percent,
      hours: mostUsedEditor?.hours
    }
  };
};

export default getMostUsedLanguageDuringSevenDays;
