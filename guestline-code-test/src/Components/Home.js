import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container, Rating, Icon } from "semantic-ui-react";
import Rooms from "./Rooms";
import { mapRoomsToHotel } from "../lib/mapRoomsToHotel";

const Home = () => {
  const [hotels, setHotels] = useState();
  const [adultCount, setAdultCount] = useState(6);
  const [childCount, setChildcount] = useState(4);
  const [resolvedHotels, setResolvedHotels] = useState();
  // const [filters, setFilters] = useState({
  //   starRating: 1,
  // });

  const [ratingFilter, setRatingFilter] = useState(0);

  const api = "https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG";

  // Get list of hotels from API
  useEffect(() => {
    const getDataFromHotels = async () => {
      const { data } = await axios.get(api);
      setHotels(data);
    };

    if (!hotels) {
      getDataFromHotels();
    }
  }, []);

  // Map the hotels to a new array with the rooms
  useEffect(() => {
    const mapHotels = async () => {
      const mappedHotels = await mapRoomsToHotel(hotels);
      // console.log("mappedHotels ->", mappedHotels);
      setResolvedHotels(mappedHotels);
    };

    if (hotels) mapHotels();
  }, [hotels]);


  // Filter hotels based on the rating
  useEffect(() => {
    if (resolvedHotels) {
      setRatingFilteredList(ratingFilter);
    }
  }, [ratingFilter]);

  useEffect(() => {
    if (adultCount) {
      setAdultCountFilteredList(adultCount);
    }
  }, [adultCount]);

  useEffect(() => {
    if (childCount) {
      setChildCountFilteredList(childCount);
    }
  }, [childCount]);



  const setRatingFilteredList = (value) => {
    if (resolvedHotels) {
      const list = hotels.filter((hotel) => {
        return hotel.starRating >= value;
      });
      setResolvedHotels(list);
    }
  };


  const setAdultCountFilteredList = (value) => {
    if (resolvedHotels) {
      const list = hotels.filter((hotel) => {
        return hotel.maxAdults <= value;
      });
      setResolvedHotels(list);
    }
  };


  const setChildCountFilteredList = (value) => {
    if (resolvedHotels) {
      const list = hotels.filter((hotel) => {
        return hotel.maxChildren <= value;
      });
      setResolvedHotels(list);
    }
  };


  // Returning the input from click on stars
  const handleRatingFilters = (e) => {
    setRatingFilter(e.target.attributes.getNamedItem("aria-posinset").value);
    console.log(
      "e target ",
      e.target.attributes.getNamedItem("aria-posinset").value
    );
  };


  // Adults count
  const increaseCount = () => {
    setAdultCount(adultCount + 1);
  };
  const decreaseCount = () => {
    if (adultCount === 0) {
      return;
    }
    setAdultCount(adultCount - 1);
  };

  // Children count
  const increaseChildCount = () => {
    setChildcount(childCount + 1);
  };
  const decreaseChildCount = () => {
    if (childCount === 0) {
      return;
    }
    setChildcount(childCount - 1);
  };


  // console.log("what is hotels ->", hotels);
  // console.log("what is filters ->", filters);

  return (
    <div>
      <div className="hotel-rating-filter">
        <div id="top-div">
          <Rating
            icon="star"
            defaultRating={0}
            maxRating={5}
            className="rating"
            size="massive"
            onClick={handleRatingFilters}
          />

          <div id="flex">
            <h4>Adults:</h4>
            <div>
              <Icon name="plus" onClick={increaseCount} id="plus" />
              <span>{adultCount}</span>
              <Icon name="minus" onClick={decreaseCount} id="minus" />
            </div>
          </div>

          <div id="flex">
            <h4>Children</h4>
            <div>
              <Icon name="plus" onClick={increaseChildCount} id="plus" />
              <span>{childCount}</span>
              <Icon name="minus" onClick={decreaseChildCount} id="minus" />
            </div>
          </div>
        </div>
      </div>
      {resolvedHotels &&
        resolvedHotels.map((item, i) => {
          return (
            // <>
            <section className="display" key={item.id}>
              <Container key={i} className="hotel-container">
                <div className="hotel-detail">
                  <div id="hotel-left">
                    <img
                      src={item.images[0].url}
                      alt=""
                      className="hotel-image"
                    />
                    <div className="hotel-name-address">
                      <div>{item.name}</div>
                      <div>{item.address1}</div>
                      <div>{item.address2}</div>
                    </div>
                  </div>

                  <div className="hotel-individual-rating">
                    <Rating
                      icon="star"
                      defaultRating={item.starRating}
                      maxRating={5}
                      className="rating"
                      size="massive"
                    />
                  </div>
                </div>

                <Rooms rooms={item.rooms} />
              </Container>
            </section>
            // </>
          );
        })}
    </div>
  );
};

export default Home;
