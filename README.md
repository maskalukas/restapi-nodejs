**REST API košíky**

Kvůli nedostatku času mi chybí dodělat:
    - Konfigurační soubory pro production a development environments.
    - Ověřování uživatelů.
    - Ověřování existence produktů, který se vkládají do košíků.
    - Prevence proti injections a DDoS útokům.
    - Role, testy,..


Docker
---------
1) git clone https://github.com/maskalukas/restapi-nodejs.git
2) docker-compose -f docker-compose.yml up --build

host: localhost
port: 8080

Databáze
---------
- mongo
document: { 
  cartId: number, 
  products: { quantity: number, productId: number }, 
  incompletePurchase: null|true 
}
  incompletePurchase:
        null = Zákazník ještě ani nezkusil objednávku potvrdit.
        true = Zákazník před posláním objednávky odešel.

CRON job
---------
V souboru jobs/control-incomplete-purchase je cron job, který spouští script každý den v půlnoci.
Prohledává nedokončené objednávky a daným zákazníkům odesílá email.

API
---------
cartId = userId
Routy se nachází v souborech routes/*.
---------
API pro jeden košík:
---------
    - POST: 
        - Přidání produktu do košíku.
            - v1/cart/:cartId/product/:productId
            - Pokud košík neexistuje, tak se vytvoří.
                - Kdyby zákazník potvrdil objednávku, tak by se košík odstranil. 
                    - Potvrzení objednávky není implementování.

    - PUT: 
        - Navýšení počtu kusů v košíku u určitého produktu o 1.
            - v1/cart/:cartId/product/:productId/increment

        - Snížení počtu kusů v košíku u určitího produktu o 1.
            - v1/cart/:cartId/product/:productId/decrement

        - Nastavení určitého množství v určitém košíku u daného produktu.
            - v1/cart/:cartId/product/:productId/quantity/:number
                - :number = Nový počet kusů.
    - DELETE:
        - Odstranění produktu z košíku.
            - v1/cart/:cartId/product/:productId

        - Odstranění všech produktů z košíku.
            - v1/cart/:cartId

----------
API pro více košíků:
----------
    - GET:
        - Získání všech nedokončených objednávek.
            - v1/carts/incompletepurchase
        
        - Získání všech košíků.
            - v1/carts

    - DELETE:
        - Odstranění všech košíků.
            - v1/carts


-------------
Architektura:
routes -> controllers -> services -> repositories
