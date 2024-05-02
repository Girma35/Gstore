import axios, { AxiosRequestConfig } from "axios";
import { MutableRefObject } from "react";

export const ifSpreadObject = <T>(condition: boolean, data: T) =>
  condition ? data : {};

// ROUTE HOSTS
export const API_HOST = process.env.NEXT_PUBLIC_API_HOST as string;

// ROUTE GENERATORS
export const apiRoute = (path: string) => `${API_HOST}${path}`;

// TYPES || INTERFACES

/**
 * excluding Url from the AxiosRequestConfig and appending custom url
 */

export interface Options<Req> extends Omit<AxiosRequestConfig<Req>, "url"> {
  url?: string;
  controller?: MutableRefObject<AbortController | undefined>;
}

export type Fetcher<
  Res,
  Req = undefined,
  Params = undefined,
  Query = undefined
> = (
  options: Options<Req> &
    (Params extends undefined
      ? { urlParams?: undefined }
      : { urlParams: Params }) &
    (Req extends undefined ? { data?: undefined } : { data: Req }) &
    (Query extends undefined ? { query?: undefined } : { query: Query })
) => Promise<Res>;

export interface DefaultOptions<Params = object>
  extends Omit<AxiosRequestConfig, "url"> {
  url: string | ((param: Params) => string);
  getTokens?: boolean;
  withTokens?: boolean;
  isFormData?: boolean;
}

export interface ErrorResponse {
  error: any;
  msg: string;
  status: 404 | number;
  success: boolean;
  message?: string;
  name?: string;
}

export interface ResWrapper<T> {
  body?: T;
  status: number;
  err?: ErrorResponse;
}

const toFormData = (data: any) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return formData;
};

const getLocal = (item: string) => {
  try {
    return localStorage.getItem(item);
  } catch {
    return null;
  }
};

export const createFetcher =
  <Res = object, Req = undefined, Params = undefined, Query = undefined>({
    url,
    getTokens,
    withTokens,
    isFormData,
    ...defaultOptions
  }: DefaultOptions<Params>): Fetcher<Res, Req, Params, Query> =>
  async ({ data, urlParams, query, controller, ...options }) => {
    if (controller) {
      controller.current?.abort();
      controller.current = new AbortController();
    }
    return await axios({
      signal: controller?.current?.signal,
      headers: {
        "Content-Type": "application/json",
        ...ifSpreadObject(!!isFormData, {
          "Content-Type": "multipart/form-data",
        }),
        ...ifSpreadObject(!!withTokens, {
          Authorization: `Bearer ${getLocal("profile_token") ?? ""}`,
        }),
      },
      url:
        typeof url === "function"
          ? url(urlParams || ({} as Params))
          : url || "",
      ...defaultOptions,
      ...options,
      data: isFormData
        ? toFormData(data)
        : {
            ...defaultOptions.data,
            ...data,
          },
      params: {
        ...defaultOptions.params,
        ...options.params,
        ...query,
      },
    })
      .then((res) => {
        if (getTokens && res.data.body.tokens.token)
          localStorage.setItem("profile_token", res.data.body.tokens.token);
        return { ...res.data };
      })
      .catch((error) => {
        return {
          err: (error.response?.data
            ? error.response.data
            : error) as ErrorResponse,
        };
      });
  };

export type ApiStatus<T = object> = {
  success: boolean;
} & T;
export const dummyApiFunc = async () => ({ success: false });
