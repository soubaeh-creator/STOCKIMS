/*
 * StockIMS - filtre de la liste des articles.
 * Le tableau complet reste affiché si ce script ne s'exécute pas.
 */
(function () {
  "use strict";

  // Met en minuscules et retire les accents : "Rouleau" et "rouleau" sont égaux.
  function normaliser(texte) {
    return texte
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function initialiserFiltre() {
    var zone = document.getElementById("zone-filtre");
    var champ = document.getElementById("filtre");
    var tableau = document.getElementById("tableau-articles");
    var message = document.getElementById("aucun-resultat");
    var compteur = document.getElementById("compteur-filtre");

    // Page sans filtre (autre page du site) : rien à faire.
    if (!zone || !champ || !tableau || !tableau.tBodies.length) {
      return;
    }

    var lignes = Array.prototype.slice.call(tableau.tBodies[0].rows);

    // Aucun article : inutile de proposer un filtre.
    if (lignes.length === 0) {
      return;
    }

    // Texte de recherche de chaque ligne : référence + désignation.
    var textes = lignes.map(function (ligne) {
      var reference = ligne.cells[1] ? ligne.cells[1].textContent : "";
      var designation = ligne.cells[2] ? ligne.cells[2].textContent : "";
      return normaliser(reference + " " + designation);
    });

    // JavaScript fonctionne : on affiche le champ de filtre.
    zone.hidden = false;

    function filtrer() {
      var recherche = normaliser(champ.value);
      var visibles = 0;

      lignes.forEach(function (ligne, i) {
        var correspond = recherche === "" || textes[i].indexOf(recherche) !== -1;
        ligne.style.display = correspond ? "" : "none";
        if (correspond) {
          visibles++;
        }
      });

      if (message) {
        message.hidden = visibles !== 0;
      }
      if (compteur) {
        compteur.textContent =
          "Affichage : " + visibles + " sur " + lignes.length +
          (lignes.length > 1 ? " articles." : " article.");
      }
    }

    champ.addEventListener("input", filtrer);

    // La touche Échap efface le filtre.
    champ.addEventListener("keydown", function (evenement) {
      if (evenement.key === "Escape") {
        champ.value = "";
        filtrer();
      }
    });

    filtrer();
  }

  initialiserFiltre();
})();