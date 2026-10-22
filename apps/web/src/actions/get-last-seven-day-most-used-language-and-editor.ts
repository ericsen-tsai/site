"use server";

import { env } from "@erichandsen/env";

type LastSevenDaysMostUsedLanguageResponse = {
  data?: {
    languages?: Array<{
      name: string;
      total_seconds: number;
      percent: number;
      digital: string;
      decimal: string;
      text: string;
      hours: number;
      minutes: number;
    }>;
    editors?: Array<{
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
  try {
    const url = new URL("https://wakatime.com/api/v1/users/current/stats/last_7_days");
    url.searchParams.set("api_key", env.WAKATIME_API_KEY);

    const response = await fetch(url, {
      next: {
        revalidate: 3600
      }
    });

    if (!response.ok) {
      return {
        language: {},
        editor: {}
      };
    }

    const data = (await response.json()) as LastSevenDaysMostUsedLanguageResponse;
    const mostUsedLanguage = data.data?.languages?.[0];
    const mostUsedEditor = data.data?.editors?.[0];

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
  } catch {
    return {
      language: {},
      editor: {}
    };
  }
};

export default getMostUsedLanguageDuringSevenDays;
