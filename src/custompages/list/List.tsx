import { useState } from "react";
import SearchItem from "../../components/searchItem/SearchItem";

const List = ({lists}: any) => {
  const [listsData, setListsData] = useState(lists);
  const [destination, setDestination] = useState('');
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const [adult, setAdult] = useState<number>(0);
  const [room, setRoom] = useState<number>(0);

const filterList = () => {
  const data = listsData.filter((item: any) => {
    const isDestinationMatch = !!destination && item.title.toLowerCase().includes(destination.toLowerCase());
    const isPriceMatch = item.price >= minPrice && item.price <= maxPrice;
    const isChildrenMatch = item.children >= children;
    const isAdultMatch = item.adult >= adult;
    const isRoomMatch = item.room >= room;

    return (
      isDestinationMatch ||
      isPriceMatch ||
      isChildrenMatch ||
      isAdultMatch ||
      isRoomMatch
    );
  });
  setListsData(data);
};
  return (
    <div>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" value={minPrice} onChange={(e) => setMinPrice(parseInt(e.target.value))} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))}  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={''}
                    value={adult} 
                    onChange={(e) => setAdult(parseInt(e.target.value))}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={''}
                    value={children} 
                    onChange={(e) => setChildren(parseInt(e.target.value))}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={''}
                    value={room} 
                    onChange={(e) => setRoom(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
            <button onClick={() => filterList()}>Search</button>
          </div>
          <div className="listResult">
            {listsData?.map((list: any) => (
              <SearchItem list={list}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
