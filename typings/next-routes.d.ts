import http from "http";
import next from "next";
import { ComponentType } from "react";
import { LinkState } from "next/link";
import { SingletonRouter, EventChangeOptions } from "next/router";

export type HTTPHandler = (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => void;

export type RouteParams = {
  [k: string]: string | number;
};

export interface LinkProps extends LinkState {
  route: string;
  params?: RouteParams;
}

export interface Router extends SingletonRouter {
  pushRoute(
    route: string,
    params?: RouteParams,
    options?: EventChangeOptions
  ): Promise<boolean>;
  replaceRoute(
    route: string,
    params?: RouteParams,
    options?: EventChangeOptions
  ): Promise<boolean>;
  prefetchRoute(
    route: string,
    params?: RouteParams
  ): Promise<React.ComponentType<any>>;
}

export interface Routes {
  getRequestHandler(app: next.Server, custom?: HTTPHandler): HTTPHandler;
  add(name: string, pattern?: string, page?: string): this;
  add(pattern: string, page: string): this;
  add(options: { name: string; pattern?: string; page?: string }): this;
  Link: ComponentType<LinkProps>;
  Router: Router;
}

export interface RoutesOptions {
  Link: ComponentType<LinkProps>;
  Router: Router;
}

export default (options?: RoutesOptions) => Routes;
