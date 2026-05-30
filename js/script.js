/* ==========================================
   J&O Cupcakes - Interactive Logic & Tracking
   ========================================== */

/* ------------------------------------------
   1. Meta Pixel Integration
   ------------------------------------------ */
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

// Define standard Pixel ID (can be customized by user)
const META_PIXEL_ID = 'YOUR_PIXEL_ID';

if (META_PIXEL_ID && META_PIXEL_ID !== 'YOUR_PIXEL_ID') {
    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
} else {
    console.log('Meta Pixel: Cargado en modo simulación (Consola). Configura tu ID real.');
}

// Helper function to track events with fallback to console logs for testing
function trackMetaEvent(eventName, params = {}) {
    if (META_PIXEL_ID && META_PIXEL_ID !== 'YOUR_PIXEL_ID') {
        fbq('track', eventName, params);
    }
    console.log(`[Meta Event Tracked] Evento: "${eventName}"`, params);
}


/* ------------------------------------------
   2. Checkout State
   ------------------------------------------ */
const WHATSAPP_PHONE = '584241903404';
let checkoutSource = 'direct';
let selectedPayment = null;


/* ------------------------------------------
   3. DOM Interactive Elements & Listeners
   ------------------------------------------ */
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

// Mobile menu toggle
if (menuBtn && mobileMenu && menuIcon) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.textContent = 'menu';
        } else {
            menuIcon.textContent = 'close';
        }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.textContent = 'menu';
        });
    });
}

// Close details tags when opening another details tag (Accordion effect)
const detailsElements = document.querySelectorAll('details');
detailsElements.forEach(targetDetails => {
    targetDetails.addEventListener('click', () => {
        // If it was closed and is now being opened
        if (!targetDetails.open) {
            detailsElements.forEach(detail => {
                if (detail !== targetDetails) {
                    detail.removeAttribute('open');
                }
            });
        }
    });
});

// Modals Logic
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('hidden');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
}

// Close modals clicking outside the content box
window.addEventListener('click', (e) => {
    const privacyModal = document.getElementById('privacy-modal');
    const termsModal = document.getElementById('terms-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    if (e.target === privacyModal) privacyModal.classList.add('hidden');
    if (e.target === termsModal) termsModal.classList.add('hidden');
    if (e.target === checkoutModal) closeCheckoutModal();
});


/* ------------------------------------------
   4. Checkout Modal Logic
   ------------------------------------------ */
function openCheckoutModal(source) {
    checkoutSource = source;
    
    // Reset form state
    const nameInput = document.getElementById('checkout-name');
    if (nameInput) nameInput.value = '';
    
    selectedPayment = null;
    
    // Reset errors
    const nameError = document.getElementById('checkout-name-error');
    const paymentError = document.getElementById('checkout-payment-error');
    if (nameError) nameError.classList.add('hidden');
    if (paymentError) paymentError.classList.add('hidden');
    
    // Reset payment card classes
    const pmCard = document.getElementById('pm-card-pagomovil');
    const binanceCard = document.getElementById('pm-card-binance');
    const paypalCard = document.getElementById('pm-card-paypal');
    if (pmCard) {
        pmCard.className = 'payment-card-transition p-3 rounded-2xl bg-surface border border-outline-variant/30 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 text-center cursor-pointer';
    }
    if (binanceCard) {
        binanceCard.className = 'payment-card-transition p-3 rounded-2xl bg-surface border border-outline-variant/30 flex flex-col items-center justify-center gap-2 hover:border-[#F0B90B] hover:bg-[#F0B90B]/5 text-center cursor-pointer';
    }
    if (paypalCard) {
        paypalCard.className = 'payment-card-transition p-3 rounded-2xl bg-surface border border-outline-variant/30 flex flex-col items-center justify-center gap-2 hover:border-[#003087] hover:bg-[#003087]/5 text-center cursor-pointer';
    }

    // Show modal
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) checkoutModal.classList.remove('hidden');

    // Meta Event: InitiateCheckout
    trackMetaEvent('InitiateCheckout', { position: source });
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) checkoutModal.classList.add('hidden');
}

function selectPaymentMethod(method) {
    selectedPayment = method;
    
    // Hide payment error if visible
    const paymentError = document.getElementById('checkout-payment-error');
    if (paymentError) paymentError.classList.add('hidden');
    
    const pmCard = document.getElementById('pm-card-pagomovil');
    const binanceCard = document.getElementById('pm-card-binance');
    const paypalCard = document.getElementById('pm-card-paypal');
    
    if (method === 'pagomovil') {
        if (pmCard) {
            pmCard.className = 'payment-card-transition p-3 rounded-2xl bg-primary/5 border-2 border-primary flex flex-col items-center justify-center gap-2 text-center cursor-pointer';
        }
        if (binanceCard) {
            binanceCard.className = 'payment-card-transition p-3 rounded-2xl bg-surface border border-outline-variant/30 flex flex-col items-center justify-center gap-2 hover:border-[#F0B90B] hover:bg-[#F0B90B]/5 text-center opacity-60 cursor-pointer';
        }
        if (paypalCard) {
            paypalCard.className = 'payment-card-transition p-3 rounded-2xl bg-surface border border-outline-variant/30 flex flex-col items-center justify-center gap-2 hover:border-[#003087] hover:bg-[#003087]/5 text-center opacity-60 cursor-pointer';
        }
    } else if (method === 'binance') {
        if (pmCard) {
            pmCard.className = 'payment-card-transition p-3 rounded-2xl bg-surface border border-outline-variant/30 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 text-center opacity-60 cursor-pointer';
        }
        if (binanceCard) {
            binanceCard.className = 'payment-card-transition p-3 rounded-2xl bg-[#F0B90B]/5 border-2 border-[#F0B90B] glow-binance flex flex-col items-center justify-center gap-2 text-center cursor-pointer';
        }
        if (paypalCard) {
            paypalCard.className = 'payment-card-transition p-3 rounded-2xl bg-surface border border-outline-variant/30 flex flex-col items-center justify-center gap-2 hover:border-[#003087] hover:bg-[#003087]/5 text-center opacity-60 cursor-pointer';
        }
    } else if (method === 'paypal') {
        if (pmCard) {
            pmCard.className = 'payment-card-transition p-3 rounded-2xl bg-surface border border-outline-variant/30 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 text-center opacity-60 cursor-pointer';
        }
        if (binanceCard) {
            binanceCard.className = 'payment-card-transition p-3 rounded-2xl bg-surface border border-outline-variant/30 flex flex-col items-center justify-center gap-2 hover:border-[#F0B90B] hover:bg-[#F0B90B]/5 text-center opacity-60 cursor-pointer';
        }
        if (paypalCard) {
            paypalCard.className = 'payment-card-transition p-3 rounded-2xl bg-[#003087]/5 border-2 border-[#003087] glow-paypal flex flex-col items-center justify-center gap-2 text-center cursor-pointer';
        }
    }
}

function submitCheckout() {
    const nameInput = document.getElementById('checkout-name');
    const name = nameInput ? nameInput.value.trim() : '';
    
    const nameError = document.getElementById('checkout-name-error');
    const paymentError = document.getElementById('checkout-payment-error');
    
    let isValid = true;
    
    // Validate Name
    if (!name) {
        if (nameError) nameError.classList.remove('hidden');
        isValid = false;
    } else {
        if (nameError) nameError.classList.add('hidden');
    }
    
    // Validate Payment Method
    if (!selectedPayment) {
        if (paymentError) paymentError.classList.remove('hidden');
        isValid = false;
    } else {
        if (paymentError) paymentError.classList.add('hidden');
    }
    
    if (!isValid) return;
    
    const paymentNames = {
        'pagomovil': 'Pago Móvil',
        'binance': 'Binance Pay',
        'paypal': 'PayPal'
    };
    const paymentName = paymentNames[selectedPayment] || 'PayPal';
    
    // Compile WhatsApp Message
    const message = `Hola J&O Cupcake! Quiero adquirir la Guía de Costos por $5 USD.\n\n` +
                    `*Detalles del pedido*:\n` +
                    `- Nombre: ${name}\n` +
                    `- Método de pago: ${paymentName}\n\n` +
                    `¿Me envías la información de pago para comenzar?`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    
    // Track Meta Pixel Lead event with order metadata
    trackMetaEvent('Lead', {
        position: checkoutSource,
        payment_method: paymentName,
        value: 5.00,
        currency: 'USD'
    });
    
    // Track Meta Pixel Contact event (indicating WhatsApp redirection click)
    trackMetaEvent('Contact', {
        position: checkoutSource,
        destination: 'whatsapp'
    });
    
    // Open WhatsApp in a new window/tab
    window.open(whatsappUrl, '_blank');
    
    // Close modal
    closeCheckoutModal();
}
