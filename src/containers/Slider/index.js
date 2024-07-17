import { useEffect, useState, Fragment } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  
  useEffect(() => {
    const nextCard = setInterval(
        () =>
            setIndex((prevIndex) => (prevIndex + 1) % (byDateDesc.length || 1)),
        5000);
    
       
    
    return () => clearInterval(nextCard);
    
  });
  return (
      <div className="SlideCardList">
          {byDateDesc?.map((event, idx) => (
              <Fragment key={event.title}>
                  <div
                      className={`SlideCard SlideCard--${
                          index === idx ? "display" : "hide"
                      }`}
                  >
                      <img src={event.cover} alt="forum" />
                      <div className="SlideCard__descriptionContainer">
                          <div className="SlideCard__description">
                              <h3>{event.title}</h3>
                              <p>{event.description}</p>
                              <div>{getMonth(new Date(event.date))}</div>
                          </div>
                      </div>
                  </div>
              </Fragment>
          ))}
          <div className="SlideCard__paginationContainer">
              <div className="SlideCard__pagination">
                  {byDateDesc?.map((_, radioIdx) => (
                      <input
                          key={`${_.title + _.id}`}
                          type="radio"
                          name="radio-button"
                          checked={index === radioIdx}
                      />
                  ))}
              </div>
          </div>
      </div>
  );
};

export default Slider;
