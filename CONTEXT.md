# Ramos Store

Ramos Store is a single-seller online catalog of soccer jerseys for individual (B2C) customers in Brazil, priced in Brazilian Reais (R$). There is no online payment processing: the shopping cart is converted into a pre-filled WhatsApp message so the seller and customer can finalize availability, delivery, and payment manually.

## Language

**Jersey**:
A soccer shirt listed for sale, identified by club/team, edition (e.g. home/away/alternate), and season, offered in multiple sizes at one fixed price. Men's, Women's, and Kids' versions of the same design are separate Jerseys, each with its own size range and price.
_Avoid_: Product, item, SKU

**Cart**:
The set of Jerseys, sizes, and quantities a Customer has selected but not yet submitted.
_Avoid_: Basket

**Customer**:
An individual (B2C) visitor browsing the catalog and building a Cart.
_Avoid_: Client, buyer, user

**Order Request**:
A snapshot of a Customer's Cart (Jerseys, sizes, quantities, and price at the time of order) plus the Customer's name, saved when the Customer taps "Complete Order," before being redirected to WhatsApp to finalize availability and delivery manually. Carries a status (`Pending → Contacted → Completed/Cancelled`) updated manually as the WhatsApp conversation progresses.
_Avoid_: Order, Inquiry, Cart submission

**Club**:
The football team a Jersey represents (e.g. Benfica). One of the three facets, alongside Fit Line and League, that Customers browse and filter the catalog by.
_Avoid_: Team

**Fit Line**:
The Men's, Women's, or Kids' category of a Jersey; each Fit Line of the same design is a separate Jersey with its own size range and price. Another facet Customers browse and filter the catalog by.
_Avoid_: Gender, category

**League**:
The competition a Club competes in (e.g. Serie A, Premier League, Bundesliga). A property of the Club, not the Jersey — Customers filter the catalog by League indirectly, through the Club it belongs to.
_Avoid_: Championship, competition, division
