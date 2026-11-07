package ma.esith.stockims.config;

import lombok.RequiredArgsConstructor;
import ma.esith.stockims.repository.ArticleRepository;
import ma.esith.stockims.service.ArticleService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Insère 3 articles de démonstration au premier démarrage uniquement
 * (si la table article est vide). Les données sont ensuite conservées en base.
 */
@Component
@RequiredArgsConstructor
public class DonneesInitiales implements CommandLineRunner {

    private final ArticleRepository repository;
    private final ArticleService service;

    @Override
    public void run(String... args) {
        if (repository.count() > 0) {
            return;
        }
        service.creer("TIS-001", "Rouleau de coton");
        service.creer("TIS-002", "Bobine de fil polyester");
        service.creer("TIS-003", "Tissu de soie naturelle");
    }
}
