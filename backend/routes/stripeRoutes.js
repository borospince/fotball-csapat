const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
    try {
        // A frontendről mostantól várjuk az 'isInternational' változót (true vagy false)
        // const { items, isInternational } = req.body;
        const { items } = req.body;
        console.log(items);
        

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Hiányzó adatok" });
        }

        const line_items = items.map(elem => ({
            price_data: {
                currency: "huf",
                product_data: {
                    name: elem.nev,
                    images: [elem.kep],
                },
                unit_amount: Math.round(parseFloat(elem.ar) * 100), 
            },
            quantity: elem.quantity
        }));

        // DINAMIKUS SZÁLLÍTÁS VÁLASZTÁS
        // Ha a vásárló külföldit választott, csak a külföldi ID-kat küldjük be
        // let shippingOptions = [];
        
        // if (isInternational) {
        //     shippingOptions = [
        //         { shipping_rate: 'shr_1SrHTy8OQQ62ZqRHS9IIWGuU' }, // Külföldi standard
        //         { shipping_rate: 'shr_1SrHUL8OQQ62ZqRHOJfguKKu' }  // Külföldi expressz
        //     ];
        // } else {
        //     shippingOptions = [
        //         { shipping_rate: 'shr_1SrHO98OQQ62ZqRHutxhLymV' }, // Belföldi standard
        //         { shipping_rate: 'shr_1SrHRV8OQQ62ZqRHEjsCbjbw' }  // Belföldi expressz
        //     ];
        // }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"], 
            line_items: line_items,
            
            // shipping_address_collection: {
            //     // Itt marad az összes ország, hogy ki tudják választani a címet
            //     allowed_countries: ['HU', 'AT', 'BE', 'DE', 'FR', 'RO', 'SK'], 
            // },
            
            // shipping_options: shippingOptions, // Csak a kiválasztott kettő kerül bele

            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });

        res.status(200).json({ url: session.url });

    } catch (error) {
        console.error("Stripe hiba:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const Stripe = require("stripe");

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// router.post("/create-checkout-session", async (req, res) => {
//     try {
//         const { items } = req.body;
//         console.log(items);
        

//         if (items.length === 0) {
//             return res.status(400).json({ error: "Hiányzó adatok" });
//         }

//         const session = await stripe.checkout.sessions.create({
//             mode: "payment",
//             payment_method_types: ["card"],
//             line_items: [
//                 {
//                     price_data: {
//                         currency: "huf",
//                         product_data: {
//                             nev: nev
//                         },
//                         unit_amount: ar * 100
//                     },
//                     quantity: 1
//                 }
//             ],
//             success_url: "http://localhost:5173/",
//             cancel_url: "http://localhost:5173/cart"
//         });

//         res.status(200).json({ url: session.url });

//     } catch (error) {
//         console.error("Stripe hiba:", error.message);
//         res.status(500).json({ error: "Stripe hiba" });
//     }
// });

// module.exports = router;