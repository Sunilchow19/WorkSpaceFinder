import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";  // Import Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Heading from "./heading";
import Footer from "./footer";
import styles from "../Styles/seemore.module.css"
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./loading";

function Seemore() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    // Fetch workspace data from backend API
    axios.get(`https://workspacefinder.onrender.com/api/workspaces/${id}`)
      .then((response) => {
        setWorkspace(response.data); // Set the workspace data from the API
      })
      .catch((error) => {
        console.error("There was an error fetching the workspaces!", error);
      });
  }, []);

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };



  return (
    <>
      <Heading/>
    <div className={styles.container}>
      {workspace ? (
        <div className={styles.onDiv}>
          <div className={styles.card} key={workspace.id}>
          {/* Slider component */}
          <Slider {...settings}>
            {/* For demonstration, using the same image multiple times */}
            <div>
              <img src={workspace.image1 || (workspace.images && workspace.images[0])} alt={workspace.title} className={styles.image} />
            </div>
            <div>
              <img src={workspace.image1 || (workspace.images && workspace.images[1])} alt={workspace.title} className={styles.image} />
            </div>
            <div>
              <img src={workspace.image1 || (workspace.images && workspace.images[2])} alt={workspace.title} className={styles.image} />
            </div>
             <div>
              <img src={workspace.image1 || (workspace.images && workspace.images[3])} alt={workspace.title} className={styles.image} />
            </div>
             <div>
              <img src={workspace.image1 || (workspace.images && workspace.images[4])} alt={workspace.title} className={styles.image} />
            </div>
            {/* Add more images if available in the workspace data */}
          </Slider>

          <h1 className={styles.title}>{workspace.title}</h1>
          <p className={styles.detail}><strong>Price:</strong> ₹{workspace.price}/hr</p>
          <p className={styles.description}>{workspace.description}</p>
          <p className={styles.description}><b>Location: </b>{workspace.locationName}</p>
          <p className={styles.description}>{workspace.sqft}sqft</p>
          <a href={workspace.location} target="_blank" rel="noopener noreferrer" className={styles.link}>
            View Location
          </a>
          
        </div>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
            Back
        </button>
        </div>
      ) : (
        <p><Loading/></p>
      )}
    </div>
    {/* <Footer/> */}
    </>
  );
}

export default Seemore;
