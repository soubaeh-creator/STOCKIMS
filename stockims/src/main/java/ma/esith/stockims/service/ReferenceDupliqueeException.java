package ma.esith.stockims.service;

public class ReferenceDupliqueeException extends RegleMetierException {
    public ReferenceDupliqueeException(String reference) {
        super("La référence « " + reference + " » existe déjà. Choisissez une référence unique.");
    }
}
