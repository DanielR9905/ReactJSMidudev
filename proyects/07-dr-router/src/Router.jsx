import { EVENTS } from "./const";
import { useState, useEffect, Children } from "react";
import { match } from "path-to-regexp";

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>,
}) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    //Este callback lo tenemos que ejecutar  cada vez que ejecutemos el NAVIGATION EVENT
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams = {};

  //add routes from children <Route/> components
  const routesFromChildren = Children.map( children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null;
  }).filter(Boolean)

  const routeToUse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routeToUse.find(({ path }) => {
    if (path === currentPath) return true;

    //Hemos usado path-to-regexp
    //Para poder detectar rutas dinamicas como por ejemplo
    //search/:query <- :query es una ruta dinamica
    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matched = matcherUrl(currentPath); // /search/javascript
    if (!matched) return false;

    //guardar los parametros de la url que eran dinamicos
    //y que hemos extraido con path-to-regexp
    //por ejemplo, si la ruta es /search/:query
    //matched.params.query === 'Javacript'
    // search/:query
    routeParams = matched.params; // { query: 'javascript'}

    //Devolvemos true por que lo hemos encontrado
    return true;
  })?.Component;
  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
}
