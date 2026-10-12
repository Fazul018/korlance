# ShopNova — E-commerce Homepage Replication

ShopNova is an original, responsive e-commerce homepage built from scratch as a frontend development assignment inspired by common online-shopping design patterns. It does **not** use Amazon's logo, copied source code, or Amazon's promotional copy.

## Technologies
- HTML5 semantic structure
- CSS3, Flexbox, CSS Grid, responsive media queries
- Vanilla JavaScript (no framework or build step)
- Remote product photography from Unsplash Source URLs

## Features
- Brand header with delivery area, search, language, account, orders, and cart
- Responsive category navigation with mobile menu
- Three-slide promotional hero with previous/next controls
- Eight category tiles
- 12 sample products with images, category, ratings, prices, original prices, discounts, and badges
- Product search by name, category, and description
- Category filtering and deal filter
- Sorting by price, rating, and discount
- Add to cart, quantity controls, remove item, live cart count, and subtotal
- Wishlist button interaction (session-only demo)
- Newsletter form feedback (no real mailing-list service)
- Accessible labels, keyboard Escape to close cart, and reduced-motion support
- Responsive desktop, tablet, and mobile layouts

## Run locally
1. Download or clone this repository.
2. Open `index.html` directly in a browser, or use VS Code's **Live Server** extension.
3. An internet connection is required for Google Fonts and the remote product images. The site itself has no build step or backend.

## Deploy
### GitHub Pages
1. Create a GitHub repository named `shopnova-ecommerce`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`, then save.
6. Wait for the Pages URL to appear. It usually follows `https://YOUR-USERNAME.github.io/shopnova-ecommerce/`.

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

### Netlify alternative
1. Push the project to GitHub.
2. In Netlify, choose **Add new project → Import an existing project** and connect the repository.
3. No build command is needed for this plain static site; publish directory is the repository root.
4. Publish and copy the generated site URL.

Official guide: https://docs.netlify.com/start/quickstarts/deploy-from-repository/

## Suggested Git commands
```bash
git init
git add .
git commit -m "Build ShopNova e-commerce homepage"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/shopnova-ecommerce.git
git push -u origin main
```
Replace `YOUR-USERNAME` with your GitHub username.

## Testing checklist
- [ ] Search by product name and partial text
- [ ] Change category from both category tiles and navigation
- [ ] Test Today's Deals and Best Sellers
- [ ] Sort by price low/high, rating, and discount
- [ ] Add several products; verify cart count and subtotal
- [ ] Increase/decrease quantities and remove items
- [ ] Open/close cart with close button, backdrop, and Escape
- [ ] Test banner previous/next controls
- [ ] Open mobile navigation and test at narrow width
- [ ] Test newsletter validation and confirmation
- [ ] Check browser console and verify all product images load
- [ ] Capture desktop and mobile screenshots after final testing

## Challenges faced (edit to reflect your actual experience)
- Keeping product cards consistent across desktop, tablet, and mobile breakpoints.
- Coordinating search, category filtering, and sorting without a frontend framework.
- Maintaining a correct cart count and subtotal when quantities change.
- Making navigation and cart controls usable on touch screens.
- Using remote images while allowing a graceful visual fallback if an image fails.

## Limitations
- This is a frontend-only demonstration. It does not include authentication, a database, inventory, real checkout, payment processing, or a real newsletter backend.
- Product data and cart state are held in JavaScript memory and reset on page reload.
- Remote images/fonts require internet access.
- Update the challenges section and add your own screenshots/links before submission.
