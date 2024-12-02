import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";  // Import Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Heading from "./heading";
import Footer from "./footer";
import styles from "./seemore.module.css"

function Seemore() {
  const { id } = useParams();

  const workspaceData = [
    {
      "id": 1,
      "title": "Cozy Cafe Workspace ☕",
      "description": "A quiet and comfortable cafe to work from.",
      "image1": "https://i.pinimg.com/originals/51/7c/c8/517cc8a781f778d4ef099cb026dd4667.jpg",
      "image2": "https://cdn.pixabay.com/photo/2018/04/12/08/32/sweets-3312766_1280.jpg",
      "image3": "https://i.pinimg.com/originals/45/be/14/45be142f2ce17a2594892bab6a8f0316.jpg",
      "image4": "https://th.bing.com/th/id/OIP.p10eoxD9D4ek-L3sGwNTjgHaE7?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "image5": "https://th.bing.com/th/id/OIP.DQ27PZP9iGebs3JR6evnoAHaE8?w=209&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "price": 400,
      "locationName": "Roastery Coffee House 82, 418, 287/12, Road No. 14, Banjara Hills, Hyderabad, Telangana 500034",
      "location": "https://maps.app.goo.gl/zv4q2ivuSp8kBg1f6"
    },
    {
      "id": 2,
      "title": "Downtown Office Space 🏢",
      "description": "A professional office environment in the city center.",
      "image1": "https://www.huitt-zollars.com/sites/default/files/styles/project_photos/public/2018-05/houston-downtown-office-01.jpg?itok=pfg6l6Wt",
      "image2": "https://www.officespacesny.com/wp-content/uploads/2018/11/20181120_191434559_iOS.jpg",
      "image3": "https://offices.net/officeimages/22983_4.jpg",
      "image4": "https://mlczkkc65aeb.i.optimole.com/cb:nuYn~24b7a/w:auto/h:auto/q:mauto/ig:avif/https://office.hr/wp-content/uploads/2023/08/20230831_095804.jpg",
      "image5": "https://myperfectworkplace.com/sites/default/files/styles/original_image/public/2020-10-06/01515_8O9KJZYFhdc_600x450.jpg?itok=I9p18fDb",
      "price": 2500,
      "locationName": "Gachibowli,IT Park,Hyderabad",
      "location": "https://maps.app.goo.gl/8ZmrUYq5gPrvMw8U8"
    },
    {
      "id": 3,
      "title": "Library Workspace 📚",
      "description": "A peaceful library with private workstations.",
      "image1": "https://ideas.demco.com/wp-content/uploads/2014/11/Existing-spaces-7.jpg",
      "image2": "https://s3.mortarr.com/images/project_gallery_images/library-workstations-1920x1920.jpeg",
      "image3": "https://library.princeton.edu/sites/default/files/news/images/SMS_6071%20LR.jpg",
      "image4": "https://bowa.com/wp-content/uploads/2016/07/HAN_HAN-Great-Falls-VA-Library2-a.jpg",
      "image5": "https://i.pinimg.com/originals/35/6c/e3/356ce32d11870a114f3bb61874c45f05.jpg",
      "price": 1500,
      "locationName": "Level 7, Octave 3B, Salarpuria Sattva Knowledge City,Hyderabad, TS",
      "location": "https://maps.app.goo.gl/wiTv7uFWuKi2gr6d8"
    },
    {
      "id": 4,
      "title": "Beachside Workspace 🌊",
      "description": "Work with a stunning view of the ocean.",
      "image1": "https://www.architectureartdesigns.com/wp-content/uploads/2014/12/289.jpg",
      "image2": "https://img.freepik.com/premium-photo/beachside-office-dedicated-marketer_882186-19997.jpg",
      "image3": "https://barrister-suites.com/wp-content/uploads/2018/02/100-wilshire-blvd-700-3-003-1024x683.jpg",
      "image4": "https://th.bing.com/th/id/R.072fc2d0799866b32200a1f6c8182910?rik=D2fTOJQXFveLAA&riu=http%3a%2f%2fcdn.home-designing.com%2fwp-content%2fuploads%2f2013%2f04%2fTropical-Beach-Villa-dark-wood-framed-open-plan-living-and-workspace-with-distant-ocean-views.jpeg&ehk=Dwm0pdEfrt41cr2ha0TnADL0ZdmbK2Pjl%2fr%2bQhDVYJA%3d&risl=&pid=ImgRaw&r=0",
      "image5": "https://www.architectureartdesigns.com/wp-content/uploads/2015/03/244.jpg",
      "price": 3000,
      "locationName": "Roba Beach Side Cafe, Aadi Kadalayi Nada, Kannur, Kerala, India",
      "location": "https://maps.app.goo.gl/9jXoWCvWvkznXwRYA"
    },
    {
      "id": 5,
      "title": "Mountain Retreat Office 🏞️",
      "description": "A serene office space nestled in the mountains.",
      "image1": "https://th.bing.com/th/id/R.ffe842fdaa7bc01aed74d8d35675d8b2?rik=EFrm5vjxB0ujHA&riu=http%3a%2f%2fwww.architectureartdesigns.com%2fwp-content%2fuploads%2f2018%2f03%2f18-Stylish-Rustic-Home-Office-Designs-That-Will-Boost-Your-Productivity-1.jpg&ehk=a%2bQ1oNhhLI8k1q9MzJjeEASSUBQZ3YcbMStS8np471E%3d&risl=&pid=ImgRaw&r=0",
      "image2": "https://i.pinimg.com/originals/66/ad/b2/66adb29cb6b8c2ad43377e31ecd7d4f3.jpg",
      "image3": "https://th.bing.com/th/id/R.4e42af951bda073680e63630c72482e6?rik=t%2btc11Lnkfx7xQ&riu=http%3a%2f%2fcdn.decoist.com%2fwp-content%2fuploads%2f2015%2f02%2fExquisite-home-office-with-amazing-mountain-view.jpg&ehk=imHAwQUKp1ARu15xtv9XyLPFnXOcGf7T04uVVuf9VAQ%3d&risl=&pid=ImgRaw&r=0",
      "image4": "https://www.mountainretreats.co.uk/wp-content/uploads/AJP_1084_5_6_7_8HDR.jpg",
      "image5": "https://wpcdn.us-midwest-1.vip.tn-cloud.net/www.mountainliving.com/content/uploads/2020/12/36-Quartz-AR-198-1603-scaled.jpg",
      "price": 4000,
      "locationName": "Kuttiyamvayal, Padinjarathara,Wayanad, Kerala, 673575, India.",
      "location": "https://maps.app.goo.gl/mzyQMepa7VNC8swi9"
    },
    {
      "id": 6,
      "title": "Open-Air Rooftop Workspace 🌇",
      "description": "An inspiring open-air rooftop with city views.",
      "image1": "https://img.agentaccount.com/d02a89932a2eeac1ad3527f3a4efb2a4c961a526",
      "image2": "https://cdn.homedsgn.com/wp-content/uploads/2019/05/Office-Rooftop-desks-and-group-seating.jpg",
      "image3": "https://i.pinimg.com/originals/d5/4b/f7/d54bf716f0ee7cc866e3d0a8d71ef050.jpg",
      "image4": "https://i.pinimg.com/originals/ae/ef/e1/aeefe17dbfb38f189efb14eeec9f56f6.jpg",
      "image5": "https://www.brightview.com/sites/default/files/inline-images/Rooftop%20Terrace%20Workspace.jpg",
      "price": 4500,
      "locationName": "Plot No 5, Survey No 62, 2nd Floor, Inorbit Mall Rd, HITEC City, Madhapur, Telangana 500081",
      "location": "https://maps.app.goo.gl/7AeVe7CuLNbS7f2A7"
    },
    {
      "id": 7,
      "title": "Industrial Loft Workspace 🏭",
      "description": "A trendy loft with an industrial vibe.",
      "image1": "https://thumbs.dreamstime.com/b/luxury-workspace-office-decorated-industrial-loft-modern-interior-design-peculiar-ai-generative-image-268677784.jpg",
      "image2": "https://thumbs.dreamstime.com/b/luxury-workspace-office-decorated-industrial-loft-modern-interior-design-peculiar-ai-generative-image-267456493.jpg",
      "image3": "https://thumbs.dreamstime.com/b/luxury-workspace-office-decorated-industrial-loft-modern-interior-design-peculiar-ai-generative-image-luxury-workspace-office-267496908.jpg",
      "image4": "https://thumbs.dreamstime.com/b/luxury-workspace-office-decorated-industrial-loft-modern-interior-design-ai-generative-268157134.jpg",
      "image5": "https://img.freepik.com/premium-photo/industrial-loft-workspace-design-generative-ai_893610-2622.jpg",
      "price": 3400,
      "locationName": "Durga Towers,Hyderabad",
      "location": "https://maps.app.goo.gl/UmMTngfy1cqBDyFa7"
    },
    {
      "id": 8,
      "title": "Modern Co-working Hub",
      "description": "A trendy co-working space with all modern amenities.",
      "image1": "https://image.architonic.com/prj2-3/20123606/evolution-design-6280-ch-coworking-hub-architonic-07-01-arcit18.jpg",
      "image2": "https://image.architonic.com/prj2-3/20123606/evolution-design-6280-ch-coworking-hub-architonic-12-02-arcit18.jpg",
      "image3": "https://i.pinimg.com/originals/cd/22/a2/cd22a28c1634cd44f9267a457f9de582.jpg",
      "image4": "https://i.pinimg.com/736x/dc/4d/d2/dc4dd26eff48d32d3664b30c687dbbc2.jpg",
      "image5": "https://i.pinimg.com/736x/cd/9d/10/cd9d109a83bd0c21a21c48f15abdea73.jpg",
      "price": 3000,
      "locationName": " Vasavi MPM Grand,Ameerpet,Hyderabad",
      "location": "https://maps.app.goo.gl/4xX5vy7HcC4uyDT79"
    },
    {
      "id": 9,
      "title": "Tech Incubator Workspace",
      "description": "Ideal for startups and tech innovators.",
      "image1": "https://i.pinimg.com/736x/29/7b/9e/297b9e7a9f6bd9baed5233b257623384.jpg",
      "image2": "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/23dd8a142364143.6265daa349152.png",
      "image3": "https://www.silkroad40.com/images/articles/nomadic-tech-incubator/silkroad-40-nomadic-tech-incubator-1.jpg",
      "image4": "https://www.csemag.com/wp-content/uploads/sites/5/2017/04/CSE1703_IMG_innovation_hubs_1.jpg",
      "image5": "https://www.rochester.edu/newscenter/wp-content/uploads/2018/02/fea-Sibley-building-high-tech-rochester.jpg",
      "price": 4000,
      "locationName": "Technology Innovation Park, IIT HYDERABAD, Kandi, Sangareddy , Telangana",
      "location": "https://maps.app.goo.gl/i7EbCQkgyHYNuqmSA"
    }
];

  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    const selectedWorkspace = workspaceData.find(
      (workspace) => workspace.id === parseInt(id)
    );
    setWorkspace(selectedWorkspace || null);
  }, [id]);

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
              <img src={workspace.image1} alt={workspace.title} className={styles.image} />
            </div>
            <div>
              <img src={workspace.image2} alt={workspace.title} className={styles.image} />
            </div>
            <div>
              <img src={workspace.image3} alt={workspace.title} className={styles.image} />
            </div>
             <div>
              <img src={workspace.image4} alt={workspace.title} className={styles.image} />
            </div>
             <div>
              <img src={workspace.image5} alt={workspace.title} className={styles.image} />
            </div>
            {/* Add more images if available in the workspace data */}
          </Slider>

          <h1 className={styles.title}>{workspace.title}</h1>
          <p className={styles.detail}><strong>Price:</strong> {workspace.price}/hr</p>
          <p className={styles.description}>{workspace.description}</p>
          <p className={styles.description}><b>Location: </b>{workspace.locationName}</p>
          <a href={workspace.location} target="_blank" rel="noopener noreferrer" className={styles.link}>
            View Location
          </a>
          
        </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default Seemore;
