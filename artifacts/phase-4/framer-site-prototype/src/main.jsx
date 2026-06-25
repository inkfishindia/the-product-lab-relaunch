import React from "react";
import ReactDOM from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import "./styles.css";

const pages = {
  home: {
    nav: "Shop",
    title: "Small objects. Big opinions.",
    subtitle:
      "A connected prototype for a sharper, more interactive TPL relaunch.",
  },
  collections: {
    nav: "Collections",
    title: "Collections with a point of view.",
    subtitle:
      "Browse by attitude first, then by object. That is the whole move.",
  },
  product: {
    nav: "Product",
    title: "Product pages should read like posters.",
    subtitle:
      "Let the title carry the emotional hit, then support it with proof.",
  },
  gifts: {
    nav: "Gifts",
    title: "Gifting should feel specific, not generic.",
    subtitle:
      "The site should help the buyer identify a person before comparing SKUs.",
  },
  about: {
    nav: "About",
    title: "The brand story needs edge, not fluff.",
    subtitle:
      "Show why TPL exists, how artists fit in, and why Bengaluru matters.",
  },
};

const toneOptions = [
  {
    id: "no-filter",
    label: "No Filter",
    line: "For people who are done pretending the group chat deserves diplomacy.",
    products: ["Idiot Repellent", "Bullshit Remover", "Signal Set"],
  },
  {
    id: "quiet-flex",
    label: "Quiet Flex",
    line: "For people with specific taste and no interest in explaining it twice.",
    products: ["Seen Enough", "Studio Exit", "Artist Pin Drop"],
  },
  {
    id: "gift-scout",
    label: "Gift Scout",
    line: "For buyers who want the friend to say, yes, exactly this.",
    products: ["Opinion Starter Pack", "For The Specific One", "Gift Edit"],
  },
];

const collectionCards = [
  {
    type: "Card sticker",
    name: "No Chill",
    price: "249",
    copy: "Turns the bank card into the first expression of the brand.",
  },
  {
    type: "Keychain",
    name: "Idiot Repellent",
    price: "299",
    copy: "Sharp enough to define the No Filter world in one glance.",
  },
  {
    type: "Bundle",
    name: "Opinion Starter Pack",
    price: "499",
    copy: "Keeps the free-shipping threshold visible without sounding salesy.",
  },
];

const giftProfiles = [
  "For the sarcastic one",
  "For the impossible-to-shop-for",
  "For the one who says this is so me",
];

const journeyStages = [
  {
    step: "01",
    title: "Instagram discovery",
    copy: "A Reel, Story, or screenshot makes the first promise before the site even loads.",
  },
  {
    step: "02",
    title: "WhatsApp validation",
    copy: "The product or line gets forwarded to one friend who can say yes, this is you.",
  },
  {
    step: "03",
    title: "Mobile purchase",
    copy: "The site has to close quickly, build trust fast, and nudge the basket toward ₹499.",
  },
];

const trustSignals = [
  ["Artist-made", "Original work, named creators, and proof that the object came from somewhere real."],
  ["7-day returns", "Day-one trust cannot rely on reviews alone, so the policy has to do more work."],
  ["2-4 day shipping", "The gifter needs to believe the thing will land on time and look good when opened."],
];

const pageDetails = {
  home: {
    label: "Homepage system",
    title: "The homepage should feel like the brand before a single product is seen.",
    copy:
      "Hero statement first. Then card stickers. Then No Filter. Then trust, gifting, and the drop. The order itself should sell the point of view.",
  },
  collections: {
    label: "Collection behavior",
    title: "Collections should start with a person, not a product type.",
    copy:
      "Lead with an attitude statement, keep the product grid clean, and use related lanes plus bundles to move people laterally and upward.",
  },
  product: {
    label: "PDP behavior",
    title: "The product page should read like a poster and close like a good text message.",
    copy:
      "Identity hook first, WhatsApp line close by, specs last, and artist proof nearby so trust and desire arrive together.",
  },
  gifts: {
    label: "Gifting routes",
    title: "The gifting experience should help people buy for a person, not browse a warehouse.",
    copy:
      "Recipient personalities, price-led bundles, and shipping reassurance should all sit in the same flow.",
  },
  about: {
    label: "About page",
    title: "The about page should explain why TPL exists without sounding like a startup memo.",
    copy:
      "Use the 3-line pitch, show the artist model, anchor the brand in Bengaluru, and keep the tone sharp instead of sentimental.",
  },
};

const engagementChallenges = [
  {
    id: "taste",
    label: "Taste check",
    title: "Pick the sharpest lane",
    prompt: "Choose the version of TPL that feels most like you right now.",
  },
  {
    id: "bundle",
    label: "Build mode",
    title: "Hit the threshold without killing the vibe",
    prompt: "Mix products until the total clicks into a more giftable bundle.",
  },
  {
    id: "share",
    label: "Forward test",
    title: "Make it WhatsApp-worthy",
    prompt: "The page should give you something easy to send to one specific friend.",
  },
];

function App() {
  const [activePage, setActivePage] = React.useState("home");
  const [activeTone, setActiveTone] = React.useState(toneOptions[0]);
  const [selectedBundle, setSelectedBundle] = React.useState([
    "No Chill",
    "Bullshit Remover",
  ]);
  const [shareCopied, setShareCopied] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showIntro, setShowIntro] = React.useState(false);
  const [activeChallenge, setActiveChallenge] = React.useState(engagementChallenges[0]);
  const [reactionScore, setReactionScore] = React.useState(74);

  React.useEffect(() => {
    const loadingTimer = window.setTimeout(() => {
      setIsLoading(false);
      setShowIntro(true);
    }, 2200);
    return () => window.clearTimeout(loadingTimer);
  }, []);

  React.useEffect(() => {
    if (!showIntro) {
      return undefined;
    }
    const introTimer = window.setTimeout(() => {
      setShowIntro(false);
    }, 3200);
    return () => window.clearTimeout(introTimer);
  }, [showIntro]);

  React.useEffect(() => {
    const toneBonus = activeTone.id === "no-filter" ? 10 : activeTone.id === "quiet-flex" ? 6 : 4;
    const bundleBonus = selectedBundle.length * 5;
    const pageBonus =
      activePage === "product" ? 8 :
      activePage === "gifts" ? 6 :
      activePage === "collections" ? 4 : 2;
    setReactionScore(Math.min(98, 58 + toneBonus + bundleBonus + pageBonus));
  }, [activeTone, selectedBundle, activePage]);

  const shareLine = `Found a TPL lane for "${activeTone.label}". ${activeTone.line}`;
  const bundleTotal =
    selectedBundle.length === 3 ? "₹749" : selectedBundle.length === 2 ? "₹499" : "₹249";

  const toggleBundle = (item) => {
    setSelectedBundle((current) => {
      if (current.includes(item)) {
        return current.filter((entry) => entry !== item);
      }
      if (current.length === 3) {
        return [...current.slice(1), item];
      }
      return [...current, item];
    });
    setActiveChallenge(engagementChallenges[1]);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLine);
      setShareCopied(true);
      setActiveChallenge(engagementChallenges[2]);
      window.setTimeout(() => setShareCopied(false), 1800);
    } catch {
      setShareCopied(false);
    }
  };

  const handleToneSelect = (tone) => {
    setActiveTone(tone);
    setActiveChallenge(engagementChallenges[0]);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading ? <LoadingScreen key="loading" /> : null}
      </AnimatePresence>

      <AnimatePresence>
        {showIntro ? (
          <IntroSlide key="intro" dismiss={() => setShowIntro(false)} />
        ) : null}
      </AnimatePresence>

      <div className="app-shell">
        <BackgroundGlow />
        <div className="topline">
          <span>Framer Motion prototype</span>
          <span>Connected pages + interactive states + launch theater</span>
        </div>

        <header className="main-header">
          <button className="brand" type="button" onClick={() => setActivePage("home")}>
            <span className="brand-mark">TPL</span>
            <span className="brand-copy">
              <strong>The Product Lab</strong>
              <em>Wear your opinion.</em>
            </span>
          </button>

          <nav className="main-nav" aria-label="Primary">
            {Object.entries(pages).map(([id, page]) => (
              <button
                key={id}
                type="button"
                className={id === activePage ? "nav-link active" : "nav-link"}
                onClick={() => setActivePage(id)}
              >
                {page.nav}
              </button>
            ))}
          </nav>

          <div className="header-tools">
            <button className="tool-button" type="button">Search</button>
            <button className="tool-button" type="button">Cart 0</button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.main
            key={activePage}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -28 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="page-wrap"
          >
            <HeroPanel activePage={activePage} showIntro={() => setShowIntro(true)} />

            <section className="content-grid">
              <InteractiveOpinionPanel
                activeTone={activeTone}
                setActiveTone={handleToneSelect}
                shareLine={shareLine}
                handleCopy={handleCopy}
                shareCopied={shareCopied}
              />
              <BundleBuilder
                selectedBundle={selectedBundle}
                toggleBundle={toggleBundle}
                bundleTotal={bundleTotal}
              />
            </section>

            <EngagementLayer
              activeChallenge={activeChallenge}
              setActiveChallenge={setActiveChallenge}
              reactionScore={reactionScore}
              activeTone={activeTone}
              selectedBundle={selectedBundle}
            />

            <AnimatedPageContent activePage={activePage} />
          </motion.main>
        </AnimatePresence>
      </div>
    </>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      className="overlay-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
    >
      <div className="loading-core">
        <motion.div
          className="loading-ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="loading-stamp"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          TPL
        </motion.div>
      </div>
      <motion.p
        className="loading-copy"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35 }}
      >
        Loading opinions, tuning attitude, warming up the drop.
      </motion.p>
      <div className="loading-bar">
        <motion.div
          className="loading-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

function IntroSlide({ dismiss }) {
  return (
    <motion.div
      className="overlay-screen intro-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="intro-panel"
        initial={{ y: 50, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -28, opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="eyebrow">Intro sequence</span>
        <h1>
          This is not
          <span> a placeholder.</span>
        </h1>
        <p>
          The relaunch should open like a reveal, not like a utility page. Motion, copy,
          and interaction all need to feel like the brand arriving on purpose.
        </p>
        <div className="intro-actions">
          <button className="cta-button" type="button" onClick={dismiss}>
            Enter Prototype
          </button>
          <button className="ghost-button" type="button" onClick={dismiss}>
            Skip Intro
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BackgroundGlow() {
  return (
    <div className="background-layer" aria-hidden="true">
      <motion.div
        className="glow glow-red"
        animate={{ x: [0, 40, -10, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="glow glow-yellow"
        animate={{ x: [0, -35, 20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function HeroPanel({ activePage, showIntro }) {
  const page = pages[activePage];
  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <span className="eyebrow">Connected prototype pages</span>
        <motion.h1
          key={page.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {page.title}
        </motion.h1>
        <motion.p
          key={page.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          {page.subtitle}
        </motion.p>
        <div className="hero-actions">
          <button className="cta-button" type="button">See the flow</button>
          <button className="ghost-button" type="button" onClick={showIntro}>
            Replay intro
          </button>
        </div>
      </div>

      <motion.div
        className="hero-stage"
        initial={{ opacity: 0.72, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
      >
        <div className="stage-card large">
          <span>Current view</span>
          <strong>{pages[activePage].nav}</strong>
          <p>
            This panel changes with the page so the prototype feels connected instead of like disconnected mockups.
          </p>
        </div>
        <div className="stage-stack">
          <div className="stage-card">
            <span>Motion role</span>
            <strong>Page transition</strong>
          </div>
          <div className="stage-card">
            <span>Commercial role</span>
            <strong>Keep ₹499 visible</strong>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function InteractiveOpinionPanel({
  activeTone,
  setActiveTone,
  shareLine,
  handleCopy,
  shareCopied,
}) {
  return (
    <section className="panel">
      <div className="panel-head">
        <span>Engagement layer</span>
        <h2>Opinion picker</h2>
      </div>

      <div className="tone-list">
        {toneOptions.map((tone) => (
          <motion.button
            key={tone.id}
            type="button"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className={tone.id === activeTone.id ? "tone-card active" : "tone-card"}
            onClick={() => setActiveTone(tone)}
          >
            <strong>{tone.label}</strong>
            <span>{tone.line}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTone.id}
          className="preview-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="preview-top">
            <span>Selected lane</span>
            <strong>{activeTone.label}</strong>
          </div>
          <p>{activeTone.line}</p>
          <div className="product-pill-row">
            {activeTone.products.map((item) => (
              <motion.div
                key={item}
                layout
                className="product-pill"
                whileHover={{ scale: 1.03 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
          <div className="share-box">
            <span>WhatsApp-ready line</span>
            <p>{shareLine}</p>
            <button className="mono-accent" type="button" onClick={handleCopy}>
              {shareCopied ? "Copied" : "Copy share line"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function BundleBuilder({ selectedBundle, toggleBundle, bundleTotal }) {
  const options = ["No Chill", "Bullshit Remover", "Studio Exit", "Gift Edit"];
  return (
    <section className="panel">
      <div className="panel-head">
        <span>Interactive commerce block</span>
        <h2>Bundle builder</h2>
      </div>

      <div className="bundle-options">
        {options.map((item) => {
          const active = selectedBundle.includes(item);
          return (
            <motion.button
              key={item}
              type="button"
              className={active ? "bundle-option active" : "bundle-option"}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleBundle(item)}
            >
              <span>{active ? "Selected" : "Add"}</span>
              <strong>{item}</strong>
            </motion.button>
          );
        })}
      </div>

      <motion.div layout className="bundle-summary">
        <span>Live prototype total</span>
        <strong>{bundleTotal}</strong>
        <p>
          This gives the user something to play with while quietly teaching the site&apos;s commercial logic.
        </p>
        <div className="selected-row">
          {selectedBundle.map((item) => (
            <motion.div layout key={item} className="selected-pill">
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function EngagementLayer({
  activeChallenge,
  setActiveChallenge,
  reactionScore,
  activeTone,
  selectedBundle,
}) {
  return (
    <section className="page-section engagement-layer">
      <div className="section-title">
        <div>
          <span>Engagement layer</span>
          <h2>Give users more to do than scroll</h2>
        </div>
        <p>
          The relaunch gets stronger when the page asks for lightweight participation:
          react, compare, build, and forward.
        </p>
      </div>

      <div className="engagement-grid">
        <div className="challenge-stack">
          {engagementChallenges.map((challenge) => (
            <motion.button
              key={challenge.id}
              type="button"
              className={challenge.id === activeChallenge.id ? "challenge-card active" : "challenge-card"}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveChallenge(challenge)}
            >
              <span>{challenge.label}</span>
              <strong>{challenge.title}</strong>
              <p>{challenge.prompt}</p>
            </motion.button>
          ))}
        </div>

        <motion.div layout className="engagement-score">
          <span>Audience energy</span>
          <strong>{reactionScore}%</strong>
          <p>
            Based on the currently selected tone, page, and bundle behavior, this mock score hints at how “locked in” a visitor feels.
          </p>
          <div className="score-bar">
            <motion.div
              className="score-fill"
              animate={{ width: `${reactionScore}%` }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="micro-stats">
            <div>
              <span>Current tone</span>
              <strong>{activeTone.label}</strong>
            </div>
            <div>
              <span>Bundle size</span>
              <strong>{selectedBundle.length} picks</strong>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeChallenge.id}
            className="engagement-preview"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.3 }}
          >
            <span>Live challenge</span>
            <strong>{activeChallenge.title}</strong>
            <p>{activeChallenge.prompt}</p>
            <div className="engagement-orbs" aria-hidden="true">
              <motion.div
                className="orb orb-red"
                animate={{ y: [0, -10, 0], scale: [1, 1.06, 1] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="orb orb-yellow"
                animate={{ y: [0, 12, 0], scale: [1, 0.96, 1] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="orb orb-white"
                animate={{ x: [0, 8, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function AnimatedPageContent({ activePage }) {
  const content = {
    home: (
      <>
        <SectionTitle
          label={pageDetails.home.label}
          title={pageDetails.home.title}
          copy={pageDetails.home.copy}
        />
        <CardGrid cards={collectionCards} />
        <JourneyRail />
        <SignalGrid
          label="Day-one trust"
          items={trustSignals}
        />
      </>
    ),
    collections: (
      <>
        <SectionTitle
          label={pageDetails.collections.label}
          title={pageDetails.collections.title}
          copy={pageDetails.collections.copy}
        />
        <ThreeUp
          items={[
            ["Collection statement", "Lead with the point of view, not a filter bar. The page should frame who this is for before anything else."],
            ["Related lanes", "No Filter, Best Sellers, New In, and The Drop should sit nearby as lateral paths, not hidden elsewhere."],
            ["Bundle nudge", "Keep the ₹499 and ₹699 bundles close enough to feel natural, not bolted on."],
          ]}
        />
        <SignalGrid
          label="Segment fit"
          items={[
            ["The Loud Whisper", "Self-expression buyers come here to find the object that says what they mean without explanation."],
            ["The Thoughtful Gifter", "Gift buyers need a one-sentence reason this collection fits their friend."],
            ["The Micro-Collector", "Collectors need proof that the design is original and worth claiming early."],
          ]}
        />
      </>
    ),
    product: (
      <>
        <SectionTitle
          label={pageDetails.product.label}
          title={pageDetails.product.title}
          copy={pageDetails.product.copy}
        />
        <ThreeUp
          items={[
            ["Identity hook", "For everyone who has ever handed over their debit card and thought: this could say something more interesting about me."],
            ["WhatsApp line", "Stick your opinion on your bank card. Takes five minutes. Works indefinitely."],
            ["Specs last", "Material, fit, and finish belong after the emotional yes, not before it."],
          ]}
        />
        <SignalGrid
          label="What they need to believe"
          items={[
            ["Looks good IRL", "Photography and motion have to do the work that reviews normally do."],
            ["Made by someone real", "Artist name and origin proof should be visible without leaving the page."],
            ["Worth ₹249-299", "The copy and layout must make the price feel right, not defensive."],
          ]}
        />
      </>
    ),
    gifts: (
      <>
        <SectionTitle
          label={pageDetails.gifts.label}
          title={pageDetails.gifts.title}
          copy={pageDetails.gifts.copy}
        />
        <ThreeUp
          items={giftProfiles.map((profile) => [
            profile,
            "A gift route anchored in identity, not generic merch labels, with the right price band visible early."
          ])}
        />
        <SignalGrid
          label="Gifting rules"
          items={[
            ["Appropriateness over value", "The right ₹249-499 gift beats a generic expensive one."],
            ["Fast choice", "A good gifting flow should get someone to the right direction in under ten minutes."],
            ["Looks good opened", "Packaging and shipping cues matter here more than on self-purchase routes."],
          ]}
        />
      </>
    ),
    about: (
      <>
        <SectionTitle
          label={pageDetails.about.label}
          title={pageDetails.about.title}
          copy={pageDetails.about.copy}
        />
        <ThreeUp
          items={[
            ["3-line pitch", "The Product Lab is an accessories brand where every object has an opinion."],
            ["Artist system", "Independent creators are part of the trust architecture, not just decorative attribution."],
            ["Bengaluru footing", "Ground the brand in place so it feels real, specific, and ownable."],
          ]}
        />
        <JourneyRail
          heading="Narrative spine"
          copy="The launch story should move from mystery to positioning to product reveal to urgency without breaking voice."
        />
      </>
    ),
  };

  return <section className="page-section">{content[activePage]}</section>;
}

function JourneyRail({
  heading = "Actual customer path",
  copy = "The site should acknowledge how discovery, validation, and purchase really happen instead of pretending every user arrives ready to buy."
}) {
  return (
    <div className="journey-rail">
      <div className="journey-head">
        <span>Conversion path</span>
        <strong>{heading}</strong>
        <p>{copy}</p>
      </div>
      <div className="journey-track">
        {journeyStages.map((stage) => (
          <motion.article
            key={stage.step}
            className="journey-card"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <span>{stage.step}</span>
            <strong>{stage.title}</strong>
            <p>{stage.copy}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function SignalGrid({ label, items }) {
  return (
    <div className="signal-grid-wrap">
      <div className="signal-head">
        <span>{label}</span>
      </div>
      <div className="signal-grid">
        {items.map(([title, copy]) => (
          <motion.article
            key={title}
            className="signal-card"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <strong>{title}</strong>
            <p>{copy}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ label, title, copy }) {
  return (
    <div className="section-title">
      <div>
        <span>{label}</span>
        <h2>{title}</h2>
      </div>
      <p>{copy}</p>
    </div>
  );
}

function CardGrid({ cards }) {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <motion.article
          key={card.name}
          className="catalog-card"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <div className="catalog-visual">
            <div className="visual-chip">{card.name}</div>
          </div>
          <span>{card.type}</span>
          <strong>{card.name}</strong>
          <p>{card.copy}</p>
          <div className="catalog-foot">
            <em>₹{card.price}</em>
            <button type="button">Add</button>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function ThreeUp({ items }) {
  return (
    <div className="three-up">
      {items.map(([title, copy]) => (
        <motion.article
          key={title}
          className="info-card"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <span>Page block</span>
          <strong>{title}</strong>
          <p>{copy}</p>
        </motion.article>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
