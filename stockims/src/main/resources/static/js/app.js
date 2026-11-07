/* StockIMS — améliorations d'interface.
   Toutes les validations restent faites côté serveur : ce script ne fait qu'améliorer le confort. */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initRecherche();
        initBascules();
        initConfirmationSortie();
        initAlertes();
        initAntiDoubleClic();
    });

    /* 1. Filtre de recherche dynamique dans le tableau des articles */
    function initRecherche() {
        var champ = document.querySelector('[data-filtre-table]');
        if (!champ) { return; }
        var tableau = document.querySelector(champ.getAttribute('data-filtre-table'));
        if (!tableau) { return; }
        var lignes = Array.prototype.slice.call(tableau.querySelectorAll('tbody tr'));
        var compteur = document.getElementById('compteur-articles');
        var message = document.getElementById('aucun-resultat');

        function normaliser(texte) {
            return texte.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
        }

        champ.addEventListener('input', function () {
            var terme = normaliser(champ.value.trim());
            var visibles = 0;
            lignes.forEach(function (ligne) {
                var ok = terme === '' || normaliser(ligne.textContent).indexOf(terme) !== -1;
                ligne.hidden = !ok;
                if (ok) { visibles++; }
            });
            if (compteur) { compteur.textContent = visibles + ' article(s)'; }
            if (message) { message.hidden = visibles !== 0; }
        });
    }

    /* 2. Affichage / masquage des formulaires d'entrée et de sortie */
    function initBascules() {
        var boutons = document.querySelectorAll('[data-bascule]');
        if (!boutons.length) { return; }

        var panneaux = document.querySelectorAll('.panneau');
        panneaux.forEach(function (p) {
            // Un panneau contenant une erreur serveur reste ouvert.
            if (!p.classList.contains('ouvert')) { p.classList.add('cache'); }
        });
        majEtat();

        boutons.forEach(function (bouton) {
            bouton.addEventListener('click', function () {
                var cible = document.getElementById(bouton.getAttribute('data-bascule'));
                if (!cible) { return; }
                cible.classList.toggle('cache');
                if (!cible.classList.contains('cache')) {
                    var champ = cible.querySelector('input');
                    if (champ) { champ.focus(); }
                }
                majEtat();
            });
        });

        function majEtat() {
            boutons.forEach(function (b) {
                var cible = document.getElementById(b.getAttribute('data-bascule'));
                b.setAttribute('aria-expanded', cible && !cible.classList.contains('cache') ? 'true' : 'false');
            });
        }
    }

    /* 3. Boîte de confirmation avant de valider une sortie */
    function initConfirmationSortie() {
        var formulaire = document.querySelector('form[data-confirmation-sortie]');
        if (!formulaire) { return; }
        formulaire.addEventListener('submit', function (evenement) {
            var champ = formulaire.querySelector('input[type="number"]');
            var quantite = champ ? champ.value.trim() : '';
            // Valeur vide ou invalide : on laisse le serveur afficher son message d'erreur.
            if (!/^\d+$/.test(quantite) || parseInt(quantite, 10) <= 0) { return; }
            var designation = formulaire.getAttribute('data-designation') || 'cet article';
            var stock = formulaire.getAttribute('data-stock') || '?';
            var texte = 'Confirmer la sortie de ' + quantite + ' unité(s) de « ' + designation + ' » ?\n' +
                        'Stock actuellement disponible : ' + stock + '.';
            if (!window.confirm(texte)) { evenement.preventDefault(); }
        });
    }

    /* 4. Les messages de succès disparaissent après quelques secondes */
    function initAlertes() {
        document.querySelectorAll('.alerte-succes').forEach(function (alerte) {
            setTimeout(function () {
                alerte.classList.add('disparait');
                setTimeout(function () { alerte.hidden = true; }, 600);
            }, 6000);
        });
    }

    /* 5. Empêche le double envoi d'un formulaire (double clic) */
    function initAntiDoubleClic() {
        // Retour arrière du navigateur : on réactive les boutons.
        window.addEventListener('pageshow', function () {
            document.querySelectorAll('form button[type="submit"]').forEach(function (b) { b.disabled = false; });
        });
        document.querySelectorAll('form').forEach(function (form) {
            form.addEventListener('submit', function (evenement) {
                if (evenement.defaultPrevented) { return; }
                var bouton = form.querySelector('button[type="submit"]');
                if (bouton) {
                    // différé : le navigateur doit d'abord lancer l'envoi
                    setTimeout(function () { bouton.disabled = true; }, 0);
                }
            });
        });
    }
})();
