import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      // date: "2022-01-29T20:28:45.744Z", // Changer la date à janvier pour le test
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      // date: "2022-02-29T20:28:45.744Z", // Changer la date à février pour le test
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      // date: "2022-03-29T20:28:45.744Z", // Changer la date à mars pour le test
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
      // Mock console.error pour supprimer les logs indésirables
      window.console.error = jest.fn();
      // Mock de la fonction loadData pour retourner les données simulées
      api.loadData = jest.fn().mockReturnValue(data);
      // Rendu du composant Slider dans le contexte de DataProvider
      render(
          <DataProvider>
              <Slider />
          </DataProvider>
      );
      // Vérifie la présence du titre "World economic forum"
      await screen.findByText("World economic forum");
      await screen.findByText("janvier");
      await screen.findByText(
          "Oeuvre à la coopération entre le secteur public et le privé."
      );
  });
});
