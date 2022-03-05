import React from "react";

export default function Events({events}) {
    return (
        <>
        {events?.map((ev, i) => {
            <div key={i}>
              <img src={ev.actor?.avatar_url} alt="Gambar" className="w-16 rounded-full" />
              <h1 className="break-words">
                {ev?.actor?.login} {ev?.type}
                <br />
                {ev?.repo?.name}
              </h1>
            </div>
        })}
        </>
    )
}