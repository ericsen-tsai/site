"use server";

import { env } from "@erichandsen/env";

type AllTimeSinceTodayResponse = {
  data: {
    total_seconds: number;
    text: string;
    decimal: string;
    digital: string;
    daily_average: number;
    is_up_to_date: boolean;
  };
};

const getAllTimeSinceToday = async () => {
  const response = await fetch("https://wakatime.com/api/v1/users/current/all_time_since_today", {
    headers: {
      Authorization: `Basic ${env.WAKATIME_API_KEY}`
    }
  });

  const data = (await response.json()) as AllTimeSinceTodayResponse;

  return {
    totalHoursText: data.data.text
  };
};

export default getAllTimeSinceToday;
