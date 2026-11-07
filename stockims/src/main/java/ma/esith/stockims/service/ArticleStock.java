package ma.esith.stockims.service;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import ma.esith.stockims.model.Article;

/** Un article accompagné de son stock disponible (somme des entrées - somme des sorties). */
@Getter
@RequiredArgsConstructor
public class ArticleStock {
    private final Article article;
    private final long stock;

    public NiveauStock getNiveau() {
        return NiveauStock.de(stock, StockService.SEUIL_STOCK_FAIBLE);
    }
}
