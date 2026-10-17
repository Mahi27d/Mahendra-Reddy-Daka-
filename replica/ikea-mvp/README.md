# Haven & Hearth storefront MVP

An original React + Vite home-furnishing storefront inspired by common e-commerce flows documented in the IKEA India reconnaissance. It is **not IKEA**, is not affiliated with IKEA, and does not use IKEA's brand assets or private APIs.

## Included
- Responsive homepage and category browsing
- Search, category filtering, sort and price filter
- Original demo product catalogue and product detail pages
- Variant selection and session cart quantity/remove
- Simulated home delivery / Click & Collect choice
- Six-digit demo PIN format check (not real serviceability)
- Form validation, order review, simulated order confirmation
- Accessible labels, keyboard focus styling and reduced-motion handling

## Run locally
Install Node.js LTS first. In a terminal, from this folder:

```bash
npm install
npm run dev
```

Open the local URL Vite prints. For a production build:

```bash
npm run build
npm run preview
```

## Important demo limitations
- Prices, delivery fees, collection points and PIN checks are invented prototype data. They do not reflect IKEA prices or actual delivery availability.
- Checkout is simulated. No payment is taken and no order is transmitted.
- Cart state is in memory and clears on page refresh. No database, authentication, order backend or real fulfilment integration is included.
- Product photos load from Unsplash URLs; network access is needed for those images. Replace them with images you own or have licensed before public production use.
- Google Fonts are loaded remotely with system fallbacks.
- Automated browser tests have not been run yet.

## Next validation
1. Run `npm install`, `npm run dev`, and `npm run build`.
2. Test the journey: browse → product → add to bag → cart → PIN → details → review → demo confirmation.
3. Test empty cart, invalid PIN, empty required fields, quantity changes, filters, mobile layout and keyboard navigation.
4. Add Playwright tests and a real test report before marking features as verified.
