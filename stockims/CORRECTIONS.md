# Bugs identifiés et corrections

| # | Fichier | Problème | Correction |
|---|---------|----------|-----------|
| 1 | `templates/articles/liste.html` | **Cause de l'erreur 500.** Les consignes du guide (`<th>Stock</th>` et `<td><a th:href="@{/stock/{id}(id=${a.id})}">`) ont été collées *après* `</html>`, hors de la boucle `th:each`. Thymeleaf les évalue quand même : `a` vaut `null` → `${a.id}` lève une exception SpEL → Whitelabel 500 sur `/articles`. | Colonnes « Stock » et lien « Voir le stock » intégrées dans le tableau, dans la boucle. |
| 2 | `pom.xml` | `java.version` = 25 alors que le projet est en Java 21 : échec de compilation sur un JDK 21. | `java.version` = 21. |
| 3 | `StockController` | Un seul `@ModelAttribute("mouvement")` pour deux formulaires/boutons ; erreurs affichées au mauvais endroit, un `IllegalArgumentException` générique servait de règle métier. | Deux formulaires (`entree`, `sortie`) ; exceptions métier dédiées (`StockInsuffisantException`, `RegleMetierException`…). |
| 4 | `ArticleController` / `ArticleService` | Doublon de référence détecté uniquement via l'exception SQL ; pas de contrôle dans le service (casse, espaces). | Contrôle `existsByReferenceIgnoreCase` dans le service + filet `DataIntegrityViolationException`. |
| 5 | `StockService.calculerStock` | Chargeait toutes les entrées/sorties en mémoire. | Requêtes `SUM` (et agrégation groupée pour la liste : 3 requêtes au lieu de N+1). |
| 6 | Validation | Message technique si saisie non numérique (`abc`), pas de borne max. | `messages.properties`, `@Max`, contrôle de la quantité aussi dans le service. |
| 7 | `application.properties` | La base devait exister au préalable ; mot de passe uniquement en dur. | `createDatabaseIfNotExist=true`, `allowPublicKeyRetrieval`, surcharge par variables d'environnement. |
| 8 | Archive | `hs_err_pid*.log` / `replay_pid*.log` : le JVM de debug a manqué de mémoire (RAM Windows), sans lien avec le code. Dossier `target/` obsolète. | Fichiers retirés ; fermer des applications ou limiter `-Xmx` si cela se reproduit. |
