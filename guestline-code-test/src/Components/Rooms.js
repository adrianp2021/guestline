import React from "react";
import { Container } from "semantic-ui-react";

const Rooms = ({ rooms }) => {
  console.log("what is rooms ->", rooms);

  return (
    <div>
      {rooms &&
        rooms.rooms.map((room) => {
          return (
            <Container key={room.id} id="hotel-rooms-container">
              <div key={room.id} className="hotel-room-left">
                <h3>{room.name}</h3>
                <div>
                  <p>
                    Adults:&nbsp;
                    {room.occupancy.maxAdults}
                  </p>
                </div>
                <div>
                  <p>
                    Children:&nbsp;
                    {room.occupancy.maxChildren}
                  </p>
                </div>
              </div>
              <div className="hotel-room-description">
                <p>{room.longDescription}</p>
              </div>
            </Container>
          );
        })}
    </div>
  );
};

export default Rooms;
