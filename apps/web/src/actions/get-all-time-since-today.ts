"use server";

import { env } from "@erichandsen/env";

type AllTimeSinceTodayResponse = {
  data?: {
    total_seconds: number;
    text: string;
    decimal: string;
    digital: string;
    daily_average: number;
    is_up_to_date: boolean;
  };
};

const getAllTimeSinceToday = async () => {
  try {
    const url = new URL("https://wakatime.com/api/v1/users/current/all_time_since_today");
    url.searchParams.set("api_key", env.WAKATIME_API_KEY);

    const response = await fetch(url, {
      next: {
        revalidate: 3600
      }
    });

    if (!response.ok) {
      return {
        totalHoursText: ""
      };
    }

    const data = (await response.json()) as AllTimeSinceTodayResponse;

    return {
      totalHoursText: data.data?.text ?? ""
    };
  } catch {
    return {
      totalHoursText: ""
    };
  }
};

export default getAllTimeSinceToday;
