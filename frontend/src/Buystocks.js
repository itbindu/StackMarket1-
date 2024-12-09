import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import './Portfolio.css';


const BuyStocks = () => {
  const navigate = useNavigate();

  // Company data
  const companies = [
    { id: 'apple', name: 'Apple', price: 175, logo: '/apple-logo.png' },
    { id: 'google', name: 'Google', price: 2800, logo: '/google-icon.png' },
    { id: 'amazon', name: 'Amazon', price: 3400, logo: '/amazon-logo.png' },
    { id: 'tesla', name: 'Tesla', price: 1000, logo: '/tesla-logo.png' },
    { id: 'oracle', name: 'Oracle', price: 1500, logo: '/oracle-logo.png' },
    { id: 'nse', name: 'NSE', price: 2000, logo: '/nse-logo.png' },
    { id: 'adityabirla', name: 'Aditya Birla', price: 3000, logo: '/aditya-logo.png' },
    { id: 'intuit', name: 'Intuit', price: 200, logo: '/intuit-logo.png' },
    { id: 'icici bank', name: 'ICICI Bank', price: 2000, logo: '/icicibank-logo.png' },
    { id: 'infosys', name: 'Infosys', price: 2050, logo: '/infosys-logo.png' },
    { id: 'asian paints', name: 'Asian Paints', price: 125, logo: '/Asian-Paints-logo.png' },
    { id: 'nestle', name: 'Nestle', price: 150, logo: '/nestle-logo.png' },
    { id: 'tata motors', name: 'Tata Motors', price: 170, logo: '/tata-logo.png' },
    { id: 'maruthi suzuki', name: 'Maruthi Suzuki', price: 3000, logo: '/maruthisuzuki-logo.png' },
    { id: 'reliance', name: 'Reliance', price: 1005, logo: '/reliance-logo.png' },
    { id: 'tradestation', name: 'TradeStation', price: 120, logo: '/tradestation-logo.png' },
    { id: 'itc', name: 'ITC', price: 2020, logo: '/itc-logo.png' },
    { id: 'ntpc', name: 'NTPC', price: 100, logo: '/ntpc-logo.png' },
    { id: 'kotak mahindra bank', name: 'Kotak Mahindra Bank', price: 1500, logo: '/Kotak-Mahindra-Bank-logo.png' },
    { id: 'wipro', name: 'Wipro', price: 1200, logo: '/Wipro-logo.png' },



  ];


  const [selectedCompany, setSelectedCompany] = useState(companies[0]); // Default to the first company
  const [quantity, setQuantity] = useState(1); // Quantity input
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  // Handle stock purchase
  const handleBuyStock = async (e) => {
    e.preventDefault();

    // Basic validation
    if (quantity < 1) {
      alert('Quantity must be at least 1.');
      return;
    }

    setIsLoading(true); // Set loading state

    try {
      const token = localStorage.getItem('token'); // Retrieve JWT from localStorage
      if (!token) {
        alert('You must be logged in to make a purchase.');
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/investments/buy',
        {
          stockName: selectedCompany.name,
          quantity,
          price: selectedCompany.price,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Add token in headers
        }
      );

      if (response.status === 201) {
        alert(`Successfully purchased ${quantity} shares of ${selectedCompany.name}!`);
        navigate('/portfolio'); // Redirect to portfolio page
      } else {
        alert('Failed to purchase stock. Please try again.');
      }
    } catch (error) {
      console.error('Error purchasing stock:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="portfolio-container">
      <div className="portfolio-card">
        <h2>Select a Company to Invest</h2>

        {/* Company Slider */}
        <Slider {...sliderSettings}>
          {companies.map((company) => (
            <div
              key={company.id}
              className="text-center p-3"
              onClick={() => setSelectedCompany(company)} // Update selected company
              style={{ cursor: 'pointer' }}
            >
              <div className={`card ${selectedCompany.id === company.id ? 'selected' : ''}`}>
                <img
                  src={company.logo}
                  className="card-img-top"
                  alt={`${company.name} logo`}
                  style={{ height: '150px', objectFit: 'contain', marginBottom: '10px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{company.name}</h5>
                  <p>Price: ₹{company.price}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Quantity Input */}
        <div className="mt-4">
          <h3>{selectedCompany.name}</h3>
          <p>Current Price (₹): {selectedCompany.price}</p>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
        </div>

        {/* Buy Button */}
        <button className="btn-primary mt-3" onClick={handleBuyStock} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
};

export default BuyStocks;
