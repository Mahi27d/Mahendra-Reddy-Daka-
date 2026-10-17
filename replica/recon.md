# Recon: IKEA India e-commerce website

- **Target supplied:** https://ikea.com/
- **Scope reviewed:** Public IKEA India storefront and its documented shopping/customer-service workflows.
- **Research date:** 2026-10-17
- **Locale note:** The public pages surfaced for this review are IKEA India pages under `ikea.com/in/en/`. Other countries can have different content, catalogue, delivery rules and checkout behavior.
- **Review method:** Public search-indexed IKEA pages and official customer-service documentation. This is a source-based desk review, not a complete interactive browser walkthrough. Screens, live cart, login, inventory, checkout/payment and postcode-specific availability have not been directly exercised.
- **Clone goal:** Build an original home-furnishing storefront that reproduces common shopping workflows and interaction patterns, using original branding, copy, images and data. Do not reuse IKEA logos, product photography, protected copy, private APIs or site assets.

## 1. Executive summary

IKEA India is a home-furnishing commerce experience combining product discovery, category navigation, product listings, product information, cart and checkout, delivery or collection selection, account/member benefits, order tracking, and customer-service flows. The homepage also promotes inspiration, room/category discovery and service offerings. Official shopping instructions document a flow from browsing products to shopping bag, postcode-based delivery/collection selection, contact details, order review, payment and confirmation. [S1][S2]

**Recommended MVP:** Build one complete shopping journey for a small original furniture catalogue:
1. Home/category navigation
2. Product listing with search, sort and filters
3. Product detail with images, price, variants and dimensions
4. Cart quantity/remove/edit
5. Checkout simulation with postcode, delivery method and order summary
6. Confirmation screen and basic guest order lookup

Keep real payments, account authentication, live inventory, logistics integrations, member pricing and production fulfillment out of the first prototype unless separately implemented and tested.

## 2. Sources and evidence

| ID | Official source | Evidence used |
|---|---|---|
| S1 | [IKEA India homepage](https://www.ikea.com/in/en/) | Homepage positioning, promotions, category offers, inspiration, products and services |
| S2 | [How to shop IKEA online?](https://www.ikea.com/in/en/customer-service/knowledge/articles/b0g8737e-7d1e-435b-g3df-d9cf68cfg2e3.html) | Shopping bag, delivery/Click & Collect, postcode, customer details, member number, order review, payment and confirmation; COD unavailable for online orders per this article |
| S3 | [IKEA Products directory](https://www.ikea.com/in/en/cat/products-products/) | Broad taxonomy including storage, sofas, office furniture, beds, tables and chairs |
| S4 | [Storage & organisation category](https://www.ikea.com/in/en/cat/storage-organisation-st001/) | Category landing-page pattern, room-based discovery, product cards, prices, ratings and reviews in indexed page content |
| S5 | [How to place an order on the website](https://www.ikea.com/in/en/customer-service/knowledge/articles/dcc183fc-3997-45bg-b045-d450bbdb9f4g.html) | Guest or member checkout and delivery / pickup options |
| S6 | [Delivery options](https://www.ikea.com/in/en/customer-service/knowledge/articles/f5g39510-cb03-4f9e-9c4f-16cg21g931f4.html) | Parcel versus truck delivery and weight-based distinction described by IKEA India |
| S7 | [Click & Collect guide](https://www.ikea.com/in/en/customer-service/knowledge/articles/26f95268-0509-4d37-bf6d-g35g3fcgg18d.html) | Pickup location and time-slot selection, confirmation, order preparation and collection |
| S8 | [Track & Manage your order](https://www.ikea.com/in/en/customer-service/track-manage-order/) | Tracking, rescheduling, receipts/invoices, damage claims, returns and spare parts |
| S9 | [Order lookup guidance](https://www.ikea.com/in/en/customer-service/knowledge/articles/b480c91d-6c6d-44ed-b1c3-7ed851236cc0.html) | Member account lookup and guest lookup using order number plus email or phone |
| S10 | [Assembly service guide](https://www.ikea.com/in/en/customer-service/knowledge/articles/cc9333b2-fa4b-4b78-ac48-9a86841613ef.html) | Assembly service can be booked in-store or via customer support; scheduling details |
| S11 | [Click & Collect service page](https://www.ikea.com/in/en/customer-service/services/click-and-collect-shopping-at-ikea-stores-pubada7dae3/) | Benefits, slot-based collection and customer instructions |

**Evidence standard:** “Observed/documented” means present in the linked official public pages. “Inferred” means a conventional implementation need or a likely screen/state that must be checked in a live browser before claiming exact parity. Offers, prices, availability and service rules are dynamic and must not be hard-coded from this report.

## 3. Screen inventory

| Screen ID | Screen / area | Purpose and known elements | Evidence / confidence |
|---|---|---|---|
| S01 | Homepage | Promotional campaign blocks, category offers, product/room inspiration, product range and service links | S1; high for page content, medium for exact live layout |
| S02 | Global navigation / search | Entry points into product categories and search; category taxonomy includes storage, sofas, office, beds, tables/chairs | S3; high for taxonomy, medium for exact interaction behavior |
| S03 | Category landing page | Category intro, room-based links, product cards and merchandising content | S4; high |
| S04 | Product listing / results | Product cards; price and review metadata appear in indexed category content; sorting/filtering is suggested by category pages | S4; high for cards, medium for available filter set |
| S05 | Product detail | Product-specific details required for purchase, such as title, price, selected variant and dimensions; exact template not exhaustively verified in this desk review | Inferred; medium-low until a product page is inspected |
| S06 | Shopping bag / cart | Review selected items before checkout; edit quantities or remove items is expected standard cart behavior but not verified from the cited instruction page | S2; high for bag review, medium for edit controls |
| S07 | Delivery / collection choice | Postcode determines available delivery options; home delivery or Click & Collect; delivery date or collection slot depends on availability | S2, S6, S7; high |
| S08 | Checkout details | Name, contact number and delivery address; optional IKEA Family number for eligible members; order summary and charges | S2; high |
| S09 | Payment / confirmation | Online payment and order confirmation after successful placement; COD is documented as unavailable for online orders on S2 | S2; high for documented flow |
| S10 | Login / IKEA Family | Member login and member benefits; guest checkout is also documented | S5, S9; high for member/guest distinction |
| S11 | Track & manage order | Track orders, reschedule deliveries, view receipts/invoices and access after-sales options | S8, S9; high |
| S12 | Returns / damage / spare parts | Return request, damaged delivery claim, case tracking and spare-parts ordering are linked from self-service | S8; high |
| S13 | Click & Collect status | Choose collection point/slot, receive confirmation, wait for ready notification, present order confirmation and ID | S7, S11; high |
| S14 | Customer support / services | Help articles and service routes including assembly assistance | S10, S11; high for cited services |
| S15 | Inspiration / room planning | Home-furnishing ideas and room/category inspiration surfaced on homepage | S1; high for content presence, exact planner interactions not verified |

## 4. User flows

### F01 — Browse and discover products (P1)
1. Enter homepage.
2. Choose a category or use search.
3. Browse a category landing page and product results.
4. Refine the results (search, sort or filters if present).
5. Open a product detail page.

**Evidence:** Product directory and category landing pages exist; exact search/filter controls need a live browser pass. [S1][S3][S4]

### F02 — Add product and review cart (P1)
1. Select a product and any required variant.
2. Add it to the shopping bag.
3. Open the bag and review selected items.
4. Adjust quantity or remove an item (expected MVP behavior; verify exact original behavior live).
5. Continue to checkout.

**Evidence:** IKEA's official online-shopping guide documents adding products and reviewing the shopping bag. Quantity/remove interactions are standard MVP requirements but not fully evidenced by the cited article. [S2]

### F03 — Home delivery checkout (P1)
1. Start checkout from the shopping bag.
2. Enter postcode to check eligible delivery options and dates.
3. Select home delivery.
4. Enter contact and address details.
5. Review products, delivery charges and order total.
6. Complete online payment.
7. Show order confirmation and reference.

**Evidence:** Official shopping and delivery instructions. Availability and date/fee calculation are postcode- and order-dependent; do not simulate them as live facts. [S2][S6]

### F04 — Click & Collect checkout (P1)
1. Add products to the bag.
2. Select Click & Collect.
3. Choose an available collection point and time slot.
4. Complete order and payment.
5. Show confirmation and instructions.
6. Show a mock “ready for collection” state in the prototype; production notifications require an actual integration.

**Evidence:** Official Click & Collect guide. [S7][S11]

### F05 — Guest or member checkout (P2)
1. Choose guest checkout or sign in as a member.
2. For a member, optionally enter membership details where supported.
3. Continue through delivery, address, review and payment.
4. Link the resulting order to the account only in a real authenticated implementation.

**Evidence:** IKEA documents both guest and member paths. [S2][S5]

### F06 — Track an order (P2)
1. Open Track & Manage Order.
2. Member: sign in and access purchases.
3. Guest: enter order number and the email/phone used at checkout.
4. Display order status and available management actions.

**Evidence:** IKEA documents both member and non-member lookup. [S8][S9]

### F07 — Request a return or report delivery damage (P2)
1. Open self-service/order management.
2. Select the relevant order and issue.
3. Submit a return or damage request.
4. Display a case/reference number and status.

**Evidence:** Official order-management page lists these self-service options. Exact eligibility rules and case workflow require further inspection. [S8]

### F08 — Find assembly help (P3)
1. Open customer service or services.
2. Read assembly service information.
3. Contact support or choose a service booking path.
4. Show booking confirmation only if a real booking backend exists; otherwise mark the prototype flow as simulated.

**Evidence:** IKEA assembly-service guide. [S10]

## 5. Component inventory and UI states

| Component | Required MVP behavior | States to implement |
|---|---|---|
| Site header | Brand identity (original), navigation, search, cart count, account entry | default, mobile menu open, search focused, loading |
| Search field | Search product names/categories against local demo data | empty, suggestions, results, no results, error |
| Category navigation | Browse major home-furnishing groups | default, active/expanded, mobile drawer |
| Promotional hero | Highlight a campaign or collection | loaded, fallback image, responsive crop |
| Product card | Image, title, price, rating only if backed by demo data, quick add if designed | default, hover/focus, unavailable, added |
| Product listing toolbar | Sort/filter and show result count | default, filter selected, no results |
| Filter controls | Category, price and simple attributes backed by data | selected, clear all, no matches |
| Product detail gallery | Show original product images and alternate views | loaded, image selection, image failure |
| Variant selector | Choose supported size/color/finish variants | default, selected, unavailable |
| Quantity selector | Increment/decrement with lower bound | min quantity, changed quantity, disabled while saving |
| Cart line item | Item, selected variant, quantity, subtotal, remove | loading, updated, removed, error |
| Order summary | Subtotal, delivery estimate/fee, discount placeholder and total | recalculating, invalid postcode, ready |
| Postcode checker | Validate format and select a mock service zone | empty, invalid, supported, unsupported |
| Delivery/collection selector | Choose home delivery or pickup; select a slot from mock data | loading, no slots, selected, unavailable |
| Checkout form | Validate name/contact/address; guest path | empty, invalid, submitting, failure |
| Payment step | Use sandbox/test-only or simulated payment | ready, processing, declined, success |
| Order confirmation | Reference, items, selected delivery method and next steps | confirmed, failed |
| Account/order lookup | Mock member and guest lookup without real personal data | empty, invalid, found, not found |
| Help/service page | FAQ content and links to support options | loaded, loading, unavailable |

## 6. Data model proposal (inferred for a new implementation)

This is a recommended original MVP model, **not a claim about IKEA's internal schema**.

- **Product:** id, slug, name, description, categoryId, priceMinorUnits, currency, imageUrls (owned/licensed/original only), dimensions, weightKg, active
- **Category:** id, slug, name, parentId, sortOrder
- **ProductVariant:** id, productId, optionName, optionValue, sku, priceDeltaMinorUnits, availableForDemo
- **Cart:** id, sessionId or userId, currency, updatedAt
- **CartItem:** id, cartId, productVariantId, quantity, unitPriceSnapshotMinorUnits
- **DeliveryZone:** id, postcodePrefix or testZone, supportedMethods (demo only)
- **FulfilmentOption:** id, cartId, method, locationId nullable, slotId nullable, feeMinorUnits, estimateLabel
- **Order:** id, publicOrderReference, status, currency, subtotalMinorUnits, fulfilmentFeeMinorUnits, totalMinorUnits, createdAt
- **OrderItem:** id, orderId, productVariantId, productNameSnapshot, quantity, unitPriceSnapshotMinorUnits
- **CustomerContact:** id, orderId, name, email/phone and address fields; store only in a properly secured backend
- **OrderEvent:** id, orderId, status, timestamp, publicMessage
- **SupportCase (later):** id, orderId, type, status, createdAt, updatedAt

For the first static prototype, use local demo JSON and a session-only cart. Do not collect real personal information or payment details. If a backend is added, design authorization, data minimization, retention, and deletion behavior before launch.

## 7. Scope and priorities

### Must have — first vertical slice
- Homepage with original brand and category entry points
- Category/product listing using local demo data
- Product detail with dimensions, variant selection and price
- Add/update/remove cart items
- Checkout form with postcode validation and clearly-labelled mock fulfilment
- Order summary and simulated confirmation
- Responsive mobile and desktop layouts
- Loading, empty, invalid and error states

### Should have
- Search suggestions and no-results state
- Sort and filters
- Guest order lookup using fake seeded order references
- Click & Collect slot selection using mock data
- Member sign-in UI demo (no real authentication until backend is built)
- Accessibility and keyboard navigation checks
- Basic Playwright coverage for the main happy path and validation errors

### Could have
- Inspiration/editorial pages
- Wishlist
- Product comparison
- Room planner or 3D visualization (separate discovery needed)
- Support case / returns demo
- Assembly-service information page
- Product reviews, only with clearly-labelled synthetic demo data

### Skip for MVP
- Real payment processing
- Live stock, delivery pricing, postcode serviceability or carrier integrations
- Real customer accounts and personal-data collection
- Production order fulfillment, refunds and returns
- Scraping or using IKEA's private APIs, product photography, logos or copyrighted copy

## 8. Assumptions and unknowns

1. **Locale:** This report uses the IKEA India storefront because the public results resolved to `/in/en/`. Confirm if another country is intended.
2. **No live UI walkthrough:** Search-indexed official pages were reviewed; menus, responsive breakpoints, modal behavior, actual cart updates and checkout validation were not directly clicked.
3. **Product detail template:** Exact sections such as stock indicators, image zoom, dimensions layout, assembly documents and recommendations need inspection on 2–3 actual product pages.
4. **Search and filters:** Category browsing is evidenced; the exact filter facets, sort choices, autocomplete and URL state are not fully inventoried.
5. **Checkout:** Official help articles document the overall flow. Real payment methods, error cases, serviceability, fees and available dates depend on location/order and were not tested.
6. **Accounts:** Member/guest distinctions and order lookup are documented; authentication mechanisms and account screens need live inspection.
7. **Offers/prices/reviews:** Dynamic. Do not reuse the indexed values as permanent test fixtures.
8. **Legal/assets:** Use original product data, images, name and UI copy. Any product image must be owned, licensed, or generated specifically for the project.
9. **Not tested:** No code has been generated or executed in this recon stage; automated tests are **NOT RUN**.

## 9. Recommended next actions

1. Confirm the target is IKEA India rather than another regional storefront.
2. Open one category page and two representative product pages in a browser; record screenshots for desktop and mobile.
3. Validate S01–S15 and refine unknowns: search, filters, product detail, cart, checkout, account and support interactions.
4. Lock the first MVP to F01–F04, with payment and fulfillment clearly simulated.
5. Run `/replica-architect` to choose a beginner-friendly stack and create the data schema/API plan.
6. Run `/replica-design` to define an original visual system.
7. Run `/replica-build` to implement one end-to-end product-to-confirmation journey.
8. Run `/replica-test` and execute the tests locally before describing the prototype as working.

## 10. Sources

- [S1 — IKEA India homepage](https://www.ikea.com/in/en/)
- [S2 — How to shop IKEA online?](https://www.ikea.com/in/en/customer-service/knowledge/articles/b0g8737e-7d1e-435b-g3df-d9cf68cfg2e3.html)
- [S3 — Products directory](https://www.ikea.com/in/en/cat/products-products/)
- [S4 — Storage & organisation category](https://www.ikea.com/in/en/cat/storage-organisation-st001/)
- [S5 — How to place an order on the website](https://www.ikea.com/in/en/customer-service/knowledge/articles/dcc183fc-3997-45bg-b045-d450bbdb9f4g.html)
- [S6 — Delivery options](https://www.ikea.com/in/en/customer-service/knowledge/articles/f5g39510-cb03-4f9e-9c4f-16cg21g931f4.html)
- [S7 — Click & Collect guide](https://www.ikea.com/in/en/customer-service/knowledge/articles/26f95268-0509-4d37-bf6d-g35g3fcgg18d.html)
- [S8 — Track & Manage your order](https://www.ikea.com/in/en/customer-service/track-manage-order/)
- [S9 — Order lookup guidance](https://www.ikea.com/in/en/customer-service/knowledge/articles/b480c91d-6c6d-44ed-b1c3-7ed851236cc0.html)
- [S10 — Assembly service guide](https://www.ikea.com/in/en/customer-service/knowledge/articles/cc9333b2-fa4b-4b78-ac48-9a86841613ef.html)
- [S11 — Click & Collect service page](https://www.ikea.com/in/en/customer-service/services/click-and-collect-shopping-at-ikea-stores-pubada7dae3/)
