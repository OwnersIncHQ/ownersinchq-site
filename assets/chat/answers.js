/* Owners Inc. chat helper — canned answers only. No generated text.
   Bookkeeping prices/terms are the approved wording from
   /bookkeeping-services/ verbatim. Store mode never lists products or
   prices in chat — it links to the store page, where the checked card
   price and check date live. Every non-root node automatically gets a
   "Main menu" button from chat.js. The daily website-quality rail
   re-checks this file for freshness. */
window.OI_ANSWERS = {
config: {
  endpoint: "https://formsubmit.co/ajax/hello@ownersinchq.com",
  subject: "New bookkeeping lead — Owners Inc. website chat",
  phoneDisplay: "(651) 314-9387",
  phoneHref: "tel:+16513149387",
  email: "hello@ownersinchq.com"
},
lead: {
  rootSay: "Hi — this is the Owners Inc. helper, an automated helper (not a person). I can answer the common questions about our bookkeeping and take your info for the free review. Please don't share bank details, account numbers, or passwords here — we'll never ask for them in chat. What can I help with?",
  rootButtons: [
    { label: "What does cleanup cost?", go: "cost" },
    { label: "What's in the free review?", go: "freereview" },
    { label: "I'm behind — where do I start?", go: "behind" },
    { label: "Do you do taxes?", go: "taxes" },
    { label: "Talk to a person", go: "person" }
  ],
  nodes: {
    cost: {
      say: "Cleanup is a one-time paid job, priced by how far behind the books are: up to 6 months behind, $1,200–$1,500 · 7–12 months behind, $2,500–$3,200 · more than 12 months behind, from $5,000. The exact price is quoted in writing after the free 30-minute books review, before any work starts and before you pay anything. After a completed cleanup, ongoing bookkeeping is from $300/month.",
      links: [{ label: "See the pricing section", href: "/bookkeeping-services/#pricing" }],
      buttons: [
        { label: "What's in the free review?", go: "freereview" },
        { label: "Request the free review", go: "FORM" }
      ]
    },
    freereview: {
      say: "The free 30-minute books review looks at how far behind your books are. You get the cleanup price in writing — no work and no charges before you approve it. One fence, stated plainly: the first month of ongoing bookkeeping is free only after a completed paid cleanup and a committed ongoing term. The cleanup itself is not free.",
      buttons: [
        { label: "What's included?", go: "included" },
        { label: "How fast do we start?", go: "howfast" },
        { label: "Request the free review", go: "FORM" }
      ]
    },
    included: {
      say: "Your records organized, invoices and receipts sorted as part of the monthly books, and tidy monthly books you can hand straight to your tax preparer — kept current month after month, by phone and online.",
      buttons: [
        { label: "Request the free review", go: "FORM" },
        { label: "What does cleanup cost?", go: "cost" }
      ]
    },
    howfast: {
      say: "It starts with a short call or text, then the free 30-minute books review. You get the cleanup price in writing, and the cleanup begins once you approve the quote — no work and no charges before that.",
      buttons: [
        { label: "Request the free review", go: "FORM" },
        { label: "Talk to a person", go: "person" }
      ]
    },
    behind: {
      say: "That's exactly who this is for — there's no cutoff; the price just follows how far behind you are. Want me to take your info for the free review?",
      buttons: [
        { label: "Yes — take my info", go: "FORM" },
        { label: "What does cleanup cost?", go: "cost" }
      ]
    },
    taxes: {
      say: "Bookkeeping only — not tax filing, tax advice, or CPA services. We keep the monthly books tidy so your tax preparer gets clean books to work from.",
      buttons: [
        { label: "What's in the free review?", go: "freereview" },
        { label: "Request the free review", go: "FORM" }
      ]
    },
    person: {
      say: "This helper is automated, so nobody is watching this chat live. To reach a person: call or text (651) 314-9387, or email hello@ownersinchq.com. We reply within one business day. Or leave your info here and we'll reach out:",
      links: [{ label: "Call or text (651) 314-9387", href: "tel:+16513149387" }],
      buttons: [
        { label: "Leave my info", go: "FORM" },
        { label: "Is there an office?", go: "office" }
      ]
    },
    office: {
      say: "We're phone and online only for Hastings-area businesses — there's no walk-in office. Call or text (651) 314-9387.",
      buttons: [
        { label: "Request the free review", go: "FORM" },
        { label: "Talk to a person", go: "person" }
      ]
    }
  },
  form: {
    askName: "First, what's your name?",
    namePlaceholder: "Your name",
    askContact: "Thanks. What's the best phone number or email to reach you?",
    contactPlaceholder: "Phone or email",
    askBehind: "How far behind are your books?",
    behindOptions: ["Not behind — just want monthly help", "Up to 6 months", "7–12 months", "More than 12 months", "Not sure"],
    privacy: "We only use this to reply about your free review — nothing else. And a reminder: never share bank details, account numbers, or passwords here.",
    askConsent: "Is it okay to contact you about the free review?",
    consentYes: "Yes — contact me about the free review",
    consentNo: "Not now",
    declined: "No problem — nothing was sent. If you'd rather reach out yourself, call or text (651) 314-9387 or email hello@ownersinchq.com.",
    summaryIntro: "Here's what I'll send:",
    sendLabel: "Request my free review",
    startOver: "Start over",
    sending: "Sending…",
    success: "Got it — thanks. We'll reach out to set up your free 30-minute review. We reply within one business day. Need us sooner? Call or text (651) 314-9387.",
    error: "Something went wrong and your info was not sent. Please call or text (651) 314-9387, or email hello@ownersinchq.com — or tap below to try again.",
    retry: "Try sending again",
    badContact: "That phone or email looks incomplete — mind checking it and typing it once more?"
  },
  keywords: [
    { words: ["cost", "price", "charge", "expensive", "fee"], go: "cost" },
    { words: ["tax", "cpa", "1099", "file"], go: "taxes" },
    { words: ["free", "review"], go: "freereview" },
    { words: ["behind", "catch up", "messy", "backlog"], go: "behind" },
    { words: ["include", "cover"], go: "included" },
    { words: ["fast", "start", "begin", "soon"], go: "howfast" },
    { words: ["human", "person", "call", "phone", "talk", "email"], go: "person" },
    { words: ["office", "located", "location", "where", "address", "visit", "hastings"], go: "office" }
  ]
},
store: {
  rootSay: "Looking for something? I can point you to the right page. What are you shopping for?",
  rootButtons: [
    { label: "Gifts & holidays", go: "gifts" },
    { label: "Home & kitchen", go: "home" },
    { label: "Tools & outdoors", go: "tools" },
    { label: "TVs, tech & gaming", go: "tech" },
    { label: "Kids & family", go: "kids" },
    { label: "More stores", go: "more" },
    { label: "About Owners Inc.", go: "about" }
  ],
  nodes: {
    gifts: {
      say: "Gift shopping — start with these pages:",
      links: [
        { label: "Christmas Finds", href: "/christmas-finds/" },
        { label: "Black Friday", href: "/black-friday/" },
        { label: "Family Gift Finds", href: "/family-gift-finds/" },
        { label: "Faith Finds", href: "/faith-finds/" },
        { label: "Jordan Finds", href: "/jordan-finds/" },
        { label: "Pop Culture Merch", href: "/pop-culture-merch/" }
      ]
    },
    home: {
      say: "For the home — pick a department:",
      links: [
        { label: "Home & Kitchen Finds", href: "/home-kitchen-finds/" },
        { label: "Furniture Finds", href: "/furniture-finds/" },
        { label: "Cleaning Supplies", href: "/cleaning-supplies/" },
        { label: "Home Security Finds", href: "/home-security-finds/" }
      ],
      buttons: [{ label: "Appliances", go: "appliances" }]
    },
    appliances: {
      say: "Appliances — each page has prices checked at the retailer:",
      links: [
        { label: "Refrigerators", href: "/refrigerators/" },
        { label: "Freezers", href: "/freezers/" },
        { label: "Ovens & Ranges", href: "/ovens-and-ranges/" },
        { label: "Washers & Dryers", href: "/washers-and-dryers/" },
        { label: "Heating & Cooling", href: "/heating-and-cooling/" }
      ]
    },
    tools: {
      say: "Tools and the outdoors — pick a lane:",
      links: [
        { label: "Tools", href: "/tools/" },
        { label: "Work Safety hub", href: "/safety-equipment-finds/" }
      ],
      buttons: [
        { label: "Deck & yard", go: "deck" },
        { label: "Outdoors", go: "outdoors" }
      ]
    },
    deck: {
      say: "Deck and yard:",
      links: [
        { label: "Deck Supplies", href: "/deck-supplies/" },
        { label: "Landscaping Supplies", href: "/landscaping-supplies/" }
      ]
    },
    outdoors: {
      say: "Outdoors:",
      links: [
        { label: "Sports & Outdoors", href: "/sports-outdoors/" },
        { label: "Fishing", href: "/fishing/" },
        { label: "Ice Fishing", href: "/ice-fishing/" },
        { label: "Golf Finds", href: "/golf-finds/" },
        { label: "E-Bikes", href: "/e-bikes/" }
      ]
    },
    tech: {
      say: "Tech — pick a page:",
      links: [
        { label: "TVs", href: "/tvs/" },
        { label: "Electronics", href: "/electronics/" },
        { label: "Gaming", href: "/gaming/" }
      ]
    },
    kids: {
      say: "Kids and family:",
      links: [
        { label: "Kids Toys", href: "/kids-toys/" },
        { label: "Baby Finds", href: "/baby-finds/" },
        { label: "Pet Finds", href: "/pet-finds/" },
        { label: "Clothing & Shoes", href: "/clothing-shoes/" },
        { label: "Mobility Finds", href: "/mobility-finds/" }
      ]
    },
    more: {
      say: "More stores — pick a lane:",
      links: [{ label: "Tax Prep", href: "/tax-prep/" }],
      buttons: [
        { label: "Beauty & health", go: "beauty" },
        { label: "Everyday", go: "everyday" }
      ]
    },
    beauty: {
      say: "Beauty and health:",
      links: [
        { label: "Beauty Finds", href: "/beauty-finds/" },
        { label: "Health Finds", href: "/health-finds/" },
        { label: "Fitness Finds", href: "/fitness-finds/" }
      ]
    },
    everyday: {
      say: "Everyday stores:",
      links: [
        { label: "Office Supplies", href: "/office-supplies/" },
        { label: "Preparedness", href: "/preparedness/" },
        { label: "Walmart Finds", href: "/walmart-finds/" },
        { label: "Temu Finds", href: "/temu-finds/" },
        { label: "Ammunition", href: "/ammunition/" }
      ]
    },
    about: {
      say: "Owners Inc. is a family-owned finds business in Hastings, Minnesota. We check deals by hand at the retailer and post the ones that hold up. We also do bookkeeping for Hastings-area businesses, by phone and online. Questions? Call (651) 314-9387 or email hello@ownersinchq.com. Enjoying the finds? Tip jar, never required: ko-fi.com/ownersinchq",
      buttons: [
        { label: "How do prices work?", go: "price" },
        { label: "Do you ship?", go: "shipping" },
        { label: "Is it a good deal?", go: "buy" },
        { label: "Bookkeeping", go: "bk" }
      ]
    },
    bk: {
      say: "We do bookkeeping for Hastings-area businesses — paid cleanups priced by how far behind the books are, then tidy monthly books. It starts with a free 30-minute books review. The details are on the bookkeeping page:",
      links: [{ label: "Bookkeeping Services", href: "/bookkeeping-services/" }]
    },
    price: {
      say: "Prices change fast, so we don't quote them in chat — the card on each page shows the price we last checked at the retailer, with the check date. Tap through to the store page to see today's price at the retailer.",
      buttons: [{ label: "See everything", go: "everything" }]
    },
    shipping: {
      say: "We don't ship anything ourselves — the retailer ships it. Free-shipping notes and their conditions are printed on each card."
    },
    buy: {
      say: "We don't push anyone to buy through our links — the page shows what we verified (the price we checked, the retailer, and the date) so you can judge for yourself. Here's where to look:",
      buttons: [{ label: "See everything", go: "everything" }]
    },
    everything: {
      say: "Every find, in one place:",
      links: [{ label: "The Everything Store", href: "/everything-store/" }]
    },
    contact: {
      say: "This helper is automated, so nobody is watching this chat live. To reach a person: call or text (651) 314-9387, or email hello@ownersinchq.com.",
      links: [{ label: "Call or text (651) 314-9387", href: "tel:+16513149387" }]
    }
  },
  keywords: [
    { words: ["price", "cost", "how much", "expensive", "cheap"], go: "price" },
    { words: ["ship", "deliver"], go: "shipping" },
    { words: ["gift", "christmas", "present", "holiday"], go: "gifts" },
    { words: ["tool", "drill", "safety"], go: "tools" },
    { words: ["tv", "television", "gaming", "game", "electronics", "xbox", "playstation"], go: "tech" },
    { words: ["toy", "kid", "baby", "pet", "dog", "cat"], go: "kids" },
    { words: ["kitchen", "furniture", "appliance", "fridge", "washer"], go: "home" },
    { words: ["bookkeep", "books", "accounting"], go: "bk" },
    { words: ["buy", "deal", "worth"], go: "buy" },
    { words: ["human", "person", "call", "phone", "contact", "email", "talk"], go: "contact" },
    { words: ["everything", "all stores", "browse"], go: "everything" }
  ]
},
shared: {
  hello: ["hi", "hello", "hey"],
  sensitive: "Stop there — please don't share that here. We never ask for bank details, account numbers, passwords, or Social Security numbers in chat, and nothing you type here needs them. If you were trying to reach us about your books or an order, call or text (651) 314-9387 instead.",
  fallback1: "I don't have that one — I can only answer the questions I've got buttons for. Try one of these, or type a word like “price”, “gift”, or “tools”:",
  fallback2: "Still not one I can answer — I don't want to guess and give you something wrong. The fastest route to a person is call or text (651) 314-9387, or email hello@ownersinchq.com. Or pick a topic:",
  inputPlaceholder: "Or type a word…",
  sendLabel: "Send"
}
};
