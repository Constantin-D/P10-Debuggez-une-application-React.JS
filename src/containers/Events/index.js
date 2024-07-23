import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
    const { data, error } = useData(); // Récupérer les données et les erreurs du contexte DataContext
    const [type, setType] = useState(); // État pour le type d'événement sélectionné
    const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle

    // Filtrer les événements en fonction du type et de la page actuelle
    const filteredEvents = (
        (!type
            ? data?.events // Si aucun type n'est sélectionné, afficher tous les événements
            : data?.events.filter((event) => event.type === type)) || []
    ) // Si les données ne sont pas encore chargées, afficher un tableau vide
        .filter((_event, index) => {
            if (
                (currentPage - 1) * PER_PAGE <= index &&
                PER_PAGE * currentPage > index
            ) {
                return true;
            }
            return false;
        });

    // Fonction pour changer le type et réinitialiser la page à 1
    const changeType = (evtType) => {
        setCurrentPage(1);
        setType(evtType);
    };
    const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
    const typeList = new Set(data?.events.map((event) => event.type));
    return (
        <>        
            {error && <div>An error occured</div>}
            {data === null ? (
                "loading"
            ) : (
                <>
                    <h3 className="SelectTitle">Catégories</h3>
                    <Select
                        selection={Array.from(typeList)}
                        onChange={(value) =>
                            value ? changeType(value) : changeType(null)
                        }
                    />
                    <div id="events" className="ListContainer">
                        {filteredEvents.map((event) => (
                            <Modal
                                key={event.id}
                                Content={<ModalEvent event={event} />}
                            >
                                {({ setIsOpened }) => (
                                    <EventCard
                                        onClick={() => setIsOpened(true)}
                                        imageSrc={event.cover}
                                        title={event.title}
                                        date={new Date(event.date)}
                                        label={event.type}
                                    />
                                )}
                            </Modal>
                        ))}
                    </div>
                    {/* <div className="Pagination">
                        {[...Array(pageNumber || 0)].map((_, n) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <a
                                key={n}
                                href="#events"
                                onClick={() => setCurrentPage(n + 1)}
                            >
                                {n + 1}
                            </a>
                        ))}
                    </div> */}
                    <div className="Pagination">
                        {Array.from({ length: pageNumber }, (_, n) => (
                            <a
                                key={n + 1} // Utiliser n + 1 comme clé
                                href="#events" // Lien ancre qui scroll la page jusqu'à l'élément ayant l'id "events"
                                onClick={() => setCurrentPage(n + 1)}
                            >
                                {n + 1}
                            </a>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default EventList;
