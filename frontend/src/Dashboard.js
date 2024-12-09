import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick'; // Import react-slick for the slideshow
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from './images/INVestIQ.png'; 
import './Dashboard.css'; // Ensure this CSS file exists and has the correct styles

const Dashboard = () => {
  const navigate = useNavigate();

  // Stock market images for the slideshow
  const stockImages = [
    '/stockmarket1.png',
    '/stockmarket2.png',
    '/stockmarket3.png',
    '/stockmarket4.png',
  ];

  // Companies array for display
  const companies = [
    { name: 'Apple', logo: '/apple-logo.png', url: 'https://www.apple.com/investor/', description: 'Apple Inc. is an American multinational technology company.' },
    { name: 'Google', logo: '/google-icon.png', url: 'https://www.google.com/finance/', description: 'Google LLC is an American multinational technology company specializing in Internet services.' },
    { name: 'Amazon', logo: '/amazon-logo.png', url: 'https://www.amazon.com/invest/', description: 'Amazon.com, Inc. is an American multinational technology company focusing on e-commerce.' },
    { name: 'Tesla', logo: '/tesla-logo.png', url: 'https://ir.tesla.com/#quarterly-disclosure', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.' },
    { name: 'Oracle', logo: '/oracle-logo.png', url: 'https://investor.oracle.com/home/default.aspx', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.'  },
    { name: 'NSE', logo: '/nse-logo.png', url: 'https://www.nseindia.com/investor-relations/financials', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.'  },
    { name: 'Aditya Birla', logo: '/aditya-logo.png', url: 'https://www.adityabirlacapital.com/investor-relations', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.'  },
    { name: 'Intuit', logo: '/intuit-logo.png', url: 'https://investors.intuit.com/', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.' },
    { name: 'ICICI Bank', logo: '/icicibank-logo.png', url: 'https://www.icicibank.com/about-us/investor-relations', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.'  },
    { name: 'Infosys', logo: '/infosys-logo.png', url: 'https://www.infosys.com/investors.html', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.'  },
    { name: 'Asian Paints', logo: '/Asian-Paints-logo.png', url: 'https://www.asianpaints.com/more/investors.html', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.'  },
    { name: 'Nestle', logo: '/nestle-logo.png', url: 'https://www.nestle.in/investors', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.'  },
    { name: 'Tata Motors', logo: '/tata-logo.png', url: 'https://www.tatamotors.com/investors/', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.'  },
    { name: 'Maruthi Suzuki', logo: '/maruthisuzuki-logo.png', url: 'https://www.marutisuzuki.com/corporate/investors', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.'  },
    { name: 'Reliance', logo: '/reliance-logo.png', url: 'https://www.ril.com/investors/investor-relations', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.'  },
    { name: 'TradeStation', logo: '/tradestation-logo.png', url: 'https://www.tradestation.com/press-and-news/', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.'  },
    { name: 'ITC', logo: '/itc-logo.png', url: 'https://www.itcportal.com/investor/index.aspx', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.'  },
    { name: 'NTPC', logo: '/ntpc-logo.png', url: 'https://ntpc.co.in/index.php/investors', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.'  },
    { name: 'Kotak Mahindra Bank', logo: '/Kotak-Mahindra-Bank-logo.png', url: 'https://www.kotak.com/en/investor-relations.html' , description: 'Tesla, Inc. is an American electric vehicle and clean energy company.' },
    { name: 'Wipro', logo: '/Wipro-logo.png', url: 'https://www.wipro.com/investors/', description: 'Tesla, Inc. is an American electric vehicle and clean energy company.'  }
    // Add more companies here...
  ];

  // Slider settings for stock market images
  const stockSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleLogout = () => {
    navigate('/'); // Redirect to the login page
  };

  const handleInvest = (companyUrl) => {
    window.open(companyUrl, '_blank'); // Open the company's stock-buying page
  };

  return (
    <div>
      {/* Watermark background */}
      <div className="dashboard-background"></div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src={logo}
              alt="StockMarketPro Logo"
              style={{ width: '40px', marginRight: '10px' }}
            />
            <span>InvestIQ</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="/home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/portfolio">Portfolio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/stock-prediction">Market Updates</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
            </ul>
            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      {/* Stock Market Image Slider */}
      <div className="container mt-4">
        <h3>Stock Market Insights</h3>
        <Slider {...stockSliderSettings}>
          {stockImages.map((image, index) => (
            <div key={index}>
              <img 
                src={image} 
                alt={`Stock Market Slide ${index + 1}`} 
                style={{ width: '100%', height: '300px', objectFit: 'cover' }} 
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Company Stocks Display */}
      <div className="container mt-4">
        <h3 className="mt-5">Company Stocks</h3>
        <div className="row">
          {companies.map((company) => (
            <div key={company.name} className="col-md-3 mb-4">
              <div className="card company-card" onClick={() => handleInvest(company.url)}>
                <img
                  src={company.logo}
                  className="card-img-top"
                  alt={`${company.name} logo`}
                  style={{ height: '150px', objectFit: 'contain' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{company.name}</h5>
                </div>
                {/* Hoverable info */}
                <div className="company-info">{company.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



