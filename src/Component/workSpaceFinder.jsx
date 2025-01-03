import { useState, useEffect } from "react";
import Heading from "./heading";
import "../Styles/WorkSpaceFinder.css";
import { Link } from "react-router-dom";
import Footer from "./footer";
import MapComponent from "./MapComponent";
import { useSelector } from "react-redux";

function WorkSpaceFinder() {
  const workspaceData = [
    {
      id: 1,
      title: "Cozy Cafe Workspace ☕",
      description: "A quiet and comfortable cafe to work from.",
      image: "https://i.pinimg.com/originals/51/7c/c8/517cc8a781f778d4ef099cb026dd4667.jpg",
      city: "📍Banjara Hills,Hyderabad,Telangana",
      latitude: 17.42337791214707,
      longitude: 78.43143888465458,
    },
    {
      id: 2,
      title: "Downtown Office Space 🏢",
      description: "A professional office environment in the city center.",
      image: "https://www.huitt-zollars.com/sites/default/files/styles/project_photos/public/2018-05/houston-downtown-office-01.jpg?itok=pfg6l6Wt",
      city: "📍Gachibowli,Hyderabad,Telangana",
      latitude: 17.420832087603817,
      longitude: 78.33996179999998,
    },
    {
      id: 3,
      title: "Library Workspace 📚",
      description: "A peaceful library with private workstations.",
      image: "https://ideas.demco.com/wp-content/uploads/2014/11/Existing-spaces-7.jpg",
      city:"📍Sattva Knowledge City,Hyderabad,Telangana",
      longitude:78.3809871087439,
      latitude:17.43381805718274
    },
    {
      id: 4,
      title: "Beachside Workspace 🌊",
      description: "Work with a stunning view of the ocean.",
      image: "https://www.architectureartdesigns.com/wp-content/uploads/2014/12/289.jpg",
      city:"📍Kannur,Kerala,India",
      longitude:75.40251821349094,
      latitude:11.839597606500455
    },
    {
      id: 5,
      title: "Mountain Retreat Office 🏞️",
      description: "A serene office space nestled in the mountains.",
      image: "https://th.bing.com/th/id/R.ffe842fdaa7bc01aed74d8d35675d8b2?rik=EFrm5vjxB0ujHA&riu=http%3a%2f%2fwww.architectureartdesigns.com%2fwp-content%2fuploads%2f2018%2f03%2f18-Stylish-Rustic-Home-Office-Designs-That-Will-Boost-Your-Productivity-1.jpg&ehk=a%2bQ1oNhhLI8k1q9MzJjeEASSUBQZ3YcbMStS8np471E%3d&risl=&pid=ImgRaw&r=0",
      city:"📍Wayanad,Kerala,India",
      longitude:75.93687812299638,
      latitude:11.664964618185898
    },
    {
      id: 6,
      title: "Open-Air Rooftop Workspace 🌇",
      description: "An inspiring open-air rooftop with city views.",
      image: "https://img.agentaccount.com/d02a89932a2eeac1ad3527f3a4efb2a4c961a526",
      city:"📍HITEC City,Madhapur,Hyderabad,Telangana",
      longitude:78.38814598650906,
      latitude:17.434623323548028
    },
    {
      id: 7,
      title: "Industrial Loft Workspace 🏭",
      description: "A trendy loft with an industrial vibe.",
      image: "https://thumbs.dreamstime.com/b/luxury-workspace-office-decorated-industrial-loft-modern-interior-design-peculiar-ai-generative-image-268677784.jpg",
      city:"📍Durga Towers,Hyderabad,Telangana",
      longitude:78.4754850476657,
      latitude:17.443432158736844
    },
    {
      id: 8,
      title: "Modern Co-working Hub",
      description: "A trendy co-working space with all modern amenities.",
      image: "https://image.architonic.com/prj2-3/20123606/evolution-design-6280-ch-coworking-hub-architonic-07-01-arcit18.jpg",
      city:"📍Ameerpet,Hyderabad,Telangana",
      longitude:78.44501983917763,
      latitude:17.434421376196067 
    },
    {
      id: 9,
      title: "Tech Incubator Workspace",
      description: "Ideal for startups and tech innovators.",
      image: "https://i.pinimg.com/736x/29/7b/9e/297b9e7a9f6bd9baed5233b257623384.jpg",
      city:"📍IIT HYDERABAD,Kandi,Sangareddy,Telangana",
      longitude:78.1219810237457,
      latitude:17.589319323635603
    },
  ];

  const data = useSelector((res) => res);
  const { locationDet } = data;

  const [arr, setArr] = useState(workspaceData);
  const [searchTerm, setSearchTerm] = useState("");
  const [nearbyWorkspaces, setNearbyWorkspaces] = useState([]);
  const [locationError, setLocationError] = useState(false);
  const proximityThreshold = 0.07;

  useEffect(() => {
    if (locationDet && locationDet[0]) {
      const { latitude, longitude } = locationDet[0];

      const nearby = workspaceData.filter((workspace) => {
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
  }, [locationDet]);

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

  const filteredWorkspaces = arr.filter(
    (workspace) =>
      workspace.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workspace.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workspace.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter out the workspaces that are in nearbyWorkspaces
  const remainingWorkspaces = filteredWorkspaces.filter(
    (workspace) => !nearbyWorkspaces.some((nearby) => nearby.id === workspace.id)
  );

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
                  src={workspace.image}
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
                  <Link to={`/seemore/${workspace.id}`}>
                    <button style={styles.seeMoreButton}>See More</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={styles.noResults}>No places available nearby.</div>
      )}

      <h2 style={styles.heading}>Remaining Workspaces</h2>
      <div style={styles.cardContainer}>
        {remainingWorkspaces.length > 0 ? (
          remainingWorkspaces.map((workspace) => (
            <div key={workspace.id} style={styles.card}>
              <img
                src={workspace.image}
                alt={workspace.title}
                style={styles.cardImage}
              />
              <div style={styles.cardContent}>
                <h2 style={styles.cardTitle}>{workspace.title}</h2>
                <p style={styles.cardDescription}>{workspace.description}</p>
                <p style={styles.cardDescription}>{workspace.city}</p>
                <Link to={`/seemore/${workspace.id}`}>
                  <button style={styles.seeMoreButton}>See More</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.noResults}>No remaining workspaces.</div>
        )}
      </div>

      <br />
      <MapComponent />
      <Footer />
    </>
  );
}

export default WorkSpaceFinder;
