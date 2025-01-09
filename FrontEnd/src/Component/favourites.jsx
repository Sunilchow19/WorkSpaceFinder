import React from "react";

const Favorites = ({ favorites }) => {
  return (
    <div style={{ padding: "10px", background: "#f0f0f0", textAlign: "center" }}>
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {favorites.map((fav) => (
            <li key={fav.id} style={{ display: "inline-block", margin: "10px" }}>
              <img src={fav.image} alt={fav.title} style={{ width: "60px", borderRadius: "8px" }} />
              <p>{fav.title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites yet!</p>
      )}
    </div>
  );
};

export default Favorites;
