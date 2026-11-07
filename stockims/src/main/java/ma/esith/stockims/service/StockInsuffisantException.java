package ma.esith.stockims.service;

public class StockInsuffisantException extends RegleMetierException {
    public StockInsuffisantException(long stockDisponible, int quantiteDemandee) {
        super("Sortie refusée : vous demandez " + quantiteDemandee
                + " unité(s) alors que le stock disponible est de " + stockDisponible
                + ". Le stock reste inchangé.");
    }
}
