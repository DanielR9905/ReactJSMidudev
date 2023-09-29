import { BUTTON, EVENTS } from "./const";

export function navigate(href) {
  window.history.pushState({}, "", href);
  //Vamos a crear un evento personalizado para avisar que hemos cambiado la url
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  //Despacha el evento
  window.dispatchEvent(navigationEvent);
}

export function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === BUTTON.primary; //primary click
    const isModifiedEvent =
      event.metaKey || event.altKey || event.ctrlKey || event.shiftKey; //primary click
    const isManageableEvent = target === undefined || target === "_self";
    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      //Prevenimos la recarga completa de la app (Evitamos el evento por defecto)
      event.preventDefault();
      navigate(to);//NAvegacion con spa
      window.scrollTo(0,0)
    }
  };
  return <a onClick={handleClick} href={to} target={target} {...props} />;
}
