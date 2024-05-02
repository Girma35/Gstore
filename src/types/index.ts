import { Metadata } from "next";
import { ReactNode } from "react";

export interface PageProps<Params = {}, SearchParams = {}> {
  params: Params;
  searchParams: SearchParams;
}
export type Page<Params = {}, SearchParams = {}> = (
  p: PageProps<Params, SearchParams>
) => ReactNode | Promise<ReactNode>;

export type GenerateMetadata<Params = {}, SearchParams = {}> = (
  p: PageProps<Params, SearchParams>
) => Promise<Metadata> | Metadata;
