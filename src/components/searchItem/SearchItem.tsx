

const SearchItem = ({list}: any) => {
  console.log(list)
  return (
    <div className="searchItem">
      <img
        src={list?.image || ''}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{list?.title}</h1>
        <span className="siDistance">{list?.distance}</span>
        <span className="siTaxiOp">{list?.taxiDip}</span>
        <span className="siSubtitle">
        {list?.subTitle}
        </span>
        <span className="siFeatures">
        {list?.features}
        </span>
        <span className="siCancelOp">{list?.cancelOption}</span>
        <span className="siCancelOpSubtitle">
        {list?.cancelOption}
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{list?.ratingTitle}</span>
          <button>{list?.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">{list?.price}</span>
          <span className="siTaxOp">{list?.taxes}</span>
          <button className="siCheckButton">{list?.checkAvailability}</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
