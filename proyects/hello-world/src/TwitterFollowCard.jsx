import React from "react";
import { useState } from "react";

export function TwitterFollowCard({ children, userName, initialIsFollowing}) {
  //hook de estado para boton seguir
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  //Condicional de renderizado
  const text = isFollowing ? "Siguiendo" : " Seguir";
  const buttonClassName = isFollowing
    ? "tw-followCard-button is-following"
    : "tw-followCard-button ";

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };
  return (
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img
          src={`https://unavatar.io/${userName}`}
          alt="Avatar del perfil"
          className="tw-followCard-avatar"
        />
        <div className="tw-followCard-info">
          <strong>{children}</strong>
          <span>@{userName}</span>
        </div>
      </header>

      <aside>
        <button className={buttonClassName} onClick={handleClick}>
          <span className="tw-followCard-text">{text}</span>
          <span className="tw-followCard-stopFollow">Dejar de Seguir</span>
        </button>
      </aside>
    </article>
  );
}
