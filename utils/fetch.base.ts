import { EXPO_PUBLIC_API_URL } from "./dotenv";

export interface IHeaderProps {
  "x-auth-token"?: string;
}
type KHeaderProps = keyof IHeaderProps;

export function post(
  path: string,
  body: string | null = null,
  headerProps: IHeaderProps = {}
) {
  const uri: RequestInfo = EXPO_PUBLIC_API_URL + path;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("pragma", "no-cache");
  headers.append("cache-control", "no-cache");
  Object.keys(headerProps).forEach((header: string) => {
    const value: string = headerProps[header as KHeaderProps] ?? "";
    headers.append(header, value);
  });

  const requestOptions: RequestInit = {
    cache: "no-cache",
    method: "POST",
    headers,
    body,
    redirect: "follow",
  };

  return fetch(uri, requestOptions).then((response) => response.json()); // API call
}

export function get(path: string, headerProps: IHeaderProps = {}) {
  const uri: RequestInfo = EXPO_PUBLIC_API_URL + path;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("pragma", "no-cache");
  headers.append("cache-control", "no-cache");
  Object.keys(headerProps).forEach((header: string) => {
    const value: string = headerProps[header as KHeaderProps] ?? "";
    headers.append(header, value);
  });

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
    redirect: "follow",
  };

  return fetch(uri, requestOptions).then((response) => response.json()); // API call
}
