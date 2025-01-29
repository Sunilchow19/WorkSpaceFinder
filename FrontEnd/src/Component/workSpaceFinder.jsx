import { useState, useEffect } from "react";
import Heading from "./heading";
import "../Styles/WorkSpaceFinder.css";
import { Link } from "react-router-dom";
import Footer from "./footer";
import MapComponent from "./MapComponent";
import { useSelector } from "react-redux";
import axios from "axios"; // Import axios for making HTTP requests
import Loading from "./loading";

function WorkSpaceFinder() {
  const data = useSelector((res) => res);
  const { locationDet } = data;

  const [workspaces, setWorkspaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nearbyWorkspaces, setNearbyWorkspaces] = useState([]);
  const [locationError, setLocationError] = useState(false);
  const proximityThreshold = 0.07;

  useEffect(() => {
    // Fetch workspace data from backend API
    axios.get('https://workspacefinder.onrender.com/api/workspaces')
      .then((response) => {
        setWorkspaces(response.data); // Set the workspace data from the API
      })
      .catch((error) => {
        console.error("There was an error fetching the workspaces!", error);
      });
  }, []);
// console.log(workspaces)
  useEffect(() => {
    if (locationDet && locationDet[0]) {
      const { latitude, longitude } = locationDet[0];

      const nearby = workspaces.filter((workspace) => {
        const isNearby =
          Math.abs(workspace.latitude - latitude) <= proximityThreshold &&
          Math.abs(workspace.longitude - longitude) <= proximityThreshold;
        return isNearby;
      });

      setNearbyWorkspaces(nearby);
      setLocationError(false);
    } else {
      setLocationError(true);
    }
  }, [locationDet, workspaces]); // Add workspaces to the dependency array

  const filteredWorkspaces = workspaces.filter(
    (workspace) =>
      workspace.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workspace.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workspace.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter out the workspaces that are in nearbyWorkspaces
  const remainingWorkspaces = filteredWorkspaces.filter(
    (workspace) => !nearbyWorkspaces.some((nearby) => nearby._id === workspace._id)
  );
  const styles = {
    searchContainer: { textAlign: "center", marginTop: "40px" },
    heading: { fontSize: "2rem", marginBottom: "20px" ,textAlign:"center"},
    searchInput: {
      width: "60%",
      padding: "10px",
      fontSize: "1rem",
      marginRight: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    searchButton: {
      padding: "10px 20px",
      fontSize: "1rem",
      border: "none",
      borderRadius: "5px",
      background: "#007BFF",
      color: "white",
      cursor: "pointer",
    },
    cardContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "20px",
      marginTop: "40px",
    },
    card: {
      width: "300px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      textAlign: "left",
    },
    cardImage: { width: "100%", height: "150px", objectFit: "cover" },
    cardContent: { padding: "15px" },
    cardTitle: { fontSize: "1.5rem", marginBottom: "10px" },
    cardDescription: { fontSize: "1rem", color: "#555" },
    seeMoreButton: {
      marginTop: "10px",
      padding: "8px 16px",
      fontSize: "1rem",
      background: "#007BFF",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    noResults: {
      textAlign: "center",
      marginTop: "40px",
      fontSize: "1.5rem",
      color: "#777",
    },
    locationPopup: {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "10px 20px",
      backgroundColor: "#f8d7da",
      color: "#721c24",
      borderRadius: "5px",
      border: "1px solid #f5c6cb",
      zIndex: 1000,
    },
  };

  return (
    <>
      <Heading />
      {locationError && (
        <div style={styles.locationPopup}>Please turn on location access.</div>
      )}
      <div className="workspace-finder">
        <div className="content">
          <p className="quote">
            "Find the perfect place to focus, create, and achieve."
          </p>
        </div>
      </div>
      <div style={styles.searchContainer}>
        <h1 style={styles.heading}>Search Workspaces</h1>
        <input
          type="text"
          placeholder="Search by location or type..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button style={styles.searchButton}>Search</button>
      </div>

      {nearbyWorkspaces.length > 0 ? (
        <>
          <h2 style={styles.heading}>Near By WorkSpaces</h2>
          <div style={styles.cardContainer}>
            {nearbyWorkspaces.map((workspace) => (
              <div key={workspace.id} style={styles.card}>
                <img
                  src={workspace.image1 || (workspace.images && workspace.images[0])}
                  alt={workspace.title}
                  style={styles.cardImage}
                />
                <div style={styles.cardContent}>
                  <h2 style={styles.cardTitle}>{workspace.title}</h2>
                  <p style={styles.cardDescription}>{workspace.description}</p>
                  <p style={styles.cardDescription}>{workspace.city}</p>
                  <p style={styles.cardDescription}>
                    <img
                      src="https://th.bing.com/th/id/OIP.STducNHieo_mODUK_QA6HQAAAA?rs=1&pid=ImgDetMain"
                      alt=""
                      width={15}
                      height={15}
                    />
                    nearBy:{(proximityThreshold * 100).toPrecision(2)}km
                  </p>
                  <Link to={`/seemore/${workspace._id}`}>
                  {/* {console.log(workspace._id)} */}
                    <button style={styles.seeMoreButton}>See More</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={styles.noResults}>
          <h2 style={styles.heading}>Near By WorkSpaces</h2>
          <Loading/>
          
          </div>
      )}

      <h2 style={styles.heading}>Remaining Workspaces</h2>
      <div style={styles.cardContainer} >
        {remainingWorkspaces.length > 0 ? (
          remainingWorkspaces.map((workspace) => (
            <div key={workspace.id} style={styles.card}>
              {/* {console.log(workspace)} */}
              <img
                src={workspace.image1 || (workspace.images && workspace.images[0])}
                alt={workspace.title}
                style={styles.cardImage}
              />
              <div style={styles.cardContent}>
                <h2 style={styles.cardTitle}>{workspace.title}</h2>
                <p style={styles.cardDescription}>{workspace.description}</p>
                <p style={styles.cardDescription}>{workspace.city}</p>
                <Link to={`/seemore/${workspace._id}`}>
                  <button style={styles.seeMoreButton}>See More</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.noResults}><Loading/></div>
        )}
      </div>

      <br />
      <MapComponent />
      <Footer />
    </>
  );
}

export default WorkSpaceFinder;
