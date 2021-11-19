import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";

const Rooms = ({ id }) => {
  const [roomTypes, setRoomTypes] = useState();
  const api = `https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${id}`;

  useEffect(() => {
    const getDataFromHotels = async () => {
      const { data } = await axios.get(api);
      setRoomTypes(data);
    };
    getDataFromHotels();
  }, []);

  // ! See hotel details (including hotel name, address, and star rating) and
  // ! room details (including room type, max adults, max children, and long description)

  return (
    <div>
      {roomTypes &&
        roomTypes.rooms &&
        roomTypes.rooms.map((room) => {
          return (
            <Container key={room.id}>
              <div key={room.id} className="hotel-room-left">
                <h3>{room.name}</h3>
                <div>
                  Adults:
                  {room.occupancy.maxAdults}
                </div>
                <div>
                  Children:
                  {room.occupancy.maxChildren}
                </div>
              </div>
              <div>
                <p>{room.shortDescription}</p>
              </div>
            </Container>
          );
        })}
    </div>
  );
};

export default Rooms;
