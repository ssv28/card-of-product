import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Lodder from './Component/Lodder';
import './App.css'; // For styling

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataFetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://fakestoreapi.com/products/');
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <div className="app-container">
      {loading ? (
        <Lodder />
      ) : (
        <div className="card-container">
          {data.map((item) => (
            <div className="card" key={item.id}>
              <img className="card-image" src={item.image} alt={item.title} />
              <div className="card-body">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-category">{item.category}</p>
                <p className="card-description">{item.description.slice(0, 100)}...</p>
                <p className="card-price">Price: ${item.price}</p>
                <p className="card-rating">
                  Rating: {item.rating.rate} ({item.rating.count} reviews)
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
