import useSWR, { mutate } from "swr";

const fetcher = (url, token) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then(res => res.json());

export const useTokens = (token: string | null) => {
  const { data, error, mutate } = useSWR(() => token ? ['/api/user/tokens', token] : null, fetcher);

  return {
    update: mutate,
    tokens: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export const useUsage = (token: string | null) => {
  const { data, error} = useSWR(() => token ? ['/api/user/usage', token] : null, fetcher);

  return {
    usage: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export const useLogs = (token: string | null, params: string, options) => {
const { data, error} = useSWR(() => token ? [`/api/user/logs${params}`, token] : null, fetcher, options);
  return {
    logs: data,
    isLoadingLogs: !error && !data,
    isErrorLogs: error,
  };
};
