import axios from "axios";


export const mapRoomsToHotel = async (hotels) => {
  const mappedHotels = []

  // this loop finds the rooms attribute and maxAdults + maxChildren to each hotel object to be easier on filter logic
  // this logic was made knowing that there were 4 hotels only, otherwise I would've created a backend service that would deal with mapping through
  for(var i = 0; i < hotels.length; i++) {
    const rooms = await axios.get(`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${hotels[i].id}`);
    //mapping through rooms adults occupancy and reducing to the highest number 
    const maxAdults = await rooms.data.rooms.map((room) => room.occupancy.maxAdults).reduce((prev, current) => prev > current ? prev : current)

    //mapping through rooms children occupancy and reducing to the highest number 
    const maxChildren = await rooms.data.rooms.map((room) => room.occupancy.maxChildren).reduce((prev, current) => prev > current ? prev : current)

    // assigning the returned values from reduce method to each hotel in the array
    hotels[i]['rooms'] = rooms.data;
    hotels[i]['maxAdults'] = maxAdults;
    hotels[i]['maxChildren'] = maxChildren;
    mappedHotels.push(hotels[i]);
  }

  return mappedHotels
};