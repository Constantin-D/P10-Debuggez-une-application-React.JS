import { fireEvent, render, screen } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Events from "./index";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Events />
      </DataProvider>
    );
    //Trouver tous les éléments avec le texte "avril"
    const months = await screen.findAllByText("avril");
    expect(months).toHaveLength(2);
  });

  describe("and an error occured", () => {
    it("an error message is displayed", async () => {
      //Mocker la fonction loadData pour qu'elle retourne une erreur
      api.loadData = jest.fn().mockRejectedValue(new Error("An error occured"));
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );
      expect(await screen.findByText("An error occured")).toBeInTheDocument();
    });
  });

  describe("and we select a category", () => {
    it("an filtered list is displayed", async () => {
        api.loadData = jest.fn().mockReturnValue(data);
        render(
            // Rendre le composant Events avec le contexte DataProvider
            <DataProvider>
                <Events />
            </DataProvider>
        );
        await screen.findByText("Forum #productCON");
        // Simuler un clic sur le bouton de collapse pour ouvrir la liste des catégories
        fireEvent(
            await screen.findByTestId("collapse-button-testid"),
            new MouseEvent("click", {
                cancelable: true,
                bubbles: true,
            })
        );
        // Simuler un clic sur la catégorie "soirée entreprise"
        fireEvent(
            (await screen.findAllByText("soirée entreprise"))[0],
            new MouseEvent("click", {
                cancelable: true,
                bubbles: true,
            })
        );

        await screen.findByText("Conférence #productCON");
        // Vérifier que le texte "Forum #productCON" n'est plus affiché
        expect(screen.queryByText("Forum #productCON")).not.toBeInTheDocument();
    });
  });
  // Test unitaire (sous-suite) pour vérifier que le nombre de pages est correct
  describe("and we click on an event", () => {
    it("the event detail is displayed", async () => {
        api.loadData = jest.fn().mockReturnValue(data);
        render(
            <DataProvider>
                <Events />
            </DataProvider>
        );
        // Simuler un clic sur l'événement "Conférence #productCON"
        fireEvent(
            await screen.findByText("Conférence #productCON"),
            new MouseEvent("click", {
                cancelable: true,
                bubbles: true,
            })
        );
        // Vérifier que les détails de l'événement sont affichés
        await screen.findByText("24-25-26 Février");
        await screen.findByText("1 site web dédié");
    });
  });
});
