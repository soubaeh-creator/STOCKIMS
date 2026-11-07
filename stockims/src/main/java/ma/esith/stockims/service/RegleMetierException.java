package ma.esith.stockims.service;

/** Violation d'une règle métier : le message est destiné à être affiché à l'utilisateur. */
public class RegleMetierException extends RuntimeException {
    public RegleMetierException(String message) {
        super(message);
    }
}
