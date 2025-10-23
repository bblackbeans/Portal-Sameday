export class RouteInfo {
    path: string;
    code: string;
    title: string;
    icon: string;
    class: string;
    children?:RouteInfo[];
}