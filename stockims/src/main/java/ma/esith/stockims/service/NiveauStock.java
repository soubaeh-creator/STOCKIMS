package ma.esith.stockims.service;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/** Niveau d'un stock, utilisé pour colorer les pastilles dans l'interface. */
@Getter
@RequiredArgsConstructor
public enum NiveauStock {
    RUPTURE("Rupture", "badge-danger"),
    FAIBLE("Stock faible", "badge-warn"),
    NORMAL("En stock", "badge-ok");

    private final String libelle;
    private final String css;

    public static NiveauStock de(long stock, int seuilFaible) {
        if (stock <= 0) {
            return RUPTURE;
        }
        return stock <= seuilFaible ? FAIBLE : NORMAL;
    }
}
