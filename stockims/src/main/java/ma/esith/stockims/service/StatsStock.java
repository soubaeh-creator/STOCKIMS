package ma.esith.stockims.service;

import lombok.AllArgsConstructor;
import lombok.Getter;

/** Chiffres clés affichés sur le tableau de bord. */
@Getter
@AllArgsConstructor
public class StatsStock {
    private final long nombreArticles;
    private final long totalEntrees;
    private final long totalSorties;
    private final long stockGlobal;
    private final long nombreRuptures;
    private final long nombreFaibles;
}
