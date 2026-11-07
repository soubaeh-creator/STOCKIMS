package ma.esith.stockims.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ArticleIntrouvableException extends RuntimeException {
    public ArticleIntrouvableException(Long id) {
        super("Article introuvable : " + id);
    }
}
