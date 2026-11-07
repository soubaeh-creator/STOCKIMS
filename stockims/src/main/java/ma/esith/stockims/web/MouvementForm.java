package ma.esith.stockims.web;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
public class MouvementForm {

    @NotNull(message = "La quantité est obligatoire.")
    @Min(value = 1, message = "La quantité doit être positive.")
    @Max(value = 1000000, message = "La quantité ne peut pas dépasser 1 000 000.")
    private Integer quantite;
}