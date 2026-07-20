document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Delegate Add To Cart clicks on the page
    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const text = btn.textContent || '';
        if (!/add to cart/i.test(text)) return;

        const card = btn.closest('.food-card');
        const name = card ? (card.querySelector('h3')?.innerText || 'Item') : 'Item';

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Add a simple item entry; quantity defaults to 1
        cart.push({ id: Date.now(), name, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartCount();
        alert(name + ' added to cart!');
    });
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const el = document.getElementById('cart-count');
    if (el) el.textContent = total;
}
