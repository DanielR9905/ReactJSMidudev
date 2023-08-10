import React from "react";

export function TwitterFollowCard({ formattedUserName,userName, name, isFollowing }) {
  return (
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img
          src={`https://unavatar.io/${userName}`}
          alt="Avatar del perfil"
          className="tw-followCard-avatar"
        />
        <div className="tw-followCard-info">
          <strong>{name}</strong>
          <span>{formattedUserName}</span>
        </div>
      </header>

      <aside>
        <button className="tw-followCard-button">Seguir</button>
      </aside>
    </article>
  );
}
