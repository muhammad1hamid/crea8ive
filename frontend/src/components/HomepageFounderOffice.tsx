import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin, Navigation } from "lucide-react";
import { FOUNDER } from "@/lib/authority-data";
import {
  BUSINESS_DETAILS,
  BUSINESS_LOCATION,
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_EMBED_URL,
  GOOGLE_MAPS_PLACE_URL,
} from "@/lib/site-config";
import FounderOfficeMotion from "./FounderOfficeMotion";
import styles from "./homepage-founder-office.module.css";

const principles = [
  "Start with the business problem—not a preferred tool.",
  "Show the work and be precise about the results.",
  "Create systems that stay useful after launch.",
];

const capabilities = [
  { label: "Digital Strategy", image: "digital-strategy" },
  { label: "Search Visibility", image: "search-visibility" },
  { label: "Business Automation", image: "business-automation" },
];

function FounderPortrait() {
  return (
    <figure className={styles.portrait} data-founder-reveal>
      <Link href={FOUNDER.canonicalPath} className={styles.portraitLink} aria-label={`Read ${FOUNDER.name}’s founder profile`}>
        {/* The supplied photograph already includes the founder's name and role.
            Keep the complete artwork and face intact instead of duplicating overlays. */}
        <div className={styles.portraitImage}>
          <Image
            src="/assets/syed-qamar-abbas-founder-card.webp"
            alt="Syed Qamar Abbas, Founder and CEO of Crea8iv Media digital marketing agency"
            width={1728}
            height={1152}
            sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 640px, 44vw"
            loading="lazy"
          />
        </div>
      </Link>
      <figcaption className={styles.capabilities}>
        {capabilities.map(({ label, image }) => (
          <span key={label}>
            <Image src={`/img/homepage/founder-office/${image}.webp`} width={32} height={32} alt="" loading="lazy" />
            <span>{label}</span>
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

function OfficeLocation() {
  return (
    <section className={styles.office} aria-labelledby="homepage-location-heading">
      <div className={styles.officeIntro} data-founder-reveal>
        <p className={styles.officeEyebrow}>Visit the office</p>
        <h2 id="homepage-location-heading">A real office, clear directions, and a faster path to conversation.</h2>
        <p className={styles.officeDescription}>Meet Crea8iv Media in Bahria Town, Rawalpindi, or open Google Maps instantly for directions, calls, and route planning.</p>
        <div className={styles.officeActions}>
          <a href={GOOGLE_MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className={styles.primary}>
            <Navigation size={19} aria-hidden="true" />
            Get directions
          </a>
          <Link href="/contact/" className={styles.outline}>
            Contact the team <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className={styles.locationCard} data-founder-reveal>
        <div className={styles.mapPanel}>
          <div className={styles.mapFallback} aria-hidden="true">
            <MapPin size={36} aria-hidden="true" />
            <span>Bahria Town</span>
          </div>
          <iframe
            src={GOOGLE_MAPS_EMBED_URL}
            title="Crea8iv Media office map — Bahria Town, Rawalpindi"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className={styles.locationInfo}>
          <div className={styles.addressHeading}>
            <Image src="/img/homepage/founder-office/office-building.webp" width={54} height={54} alt="" loading="lazy" />
            <div>
              <h3>{BUSINESS_LOCATION.shortLabel}</h3>
              <address>{BUSINESS_DETAILS.address}</address>
            </div>
          </div>
          <ul className={styles.locationTags} aria-label="Location and service areas">
            {BUSINESS_LOCATION.serviceAreas.map(area => <li key={area}>{area}</li>)}
          </ul>
          <a href={GOOGLE_MAPS_PLACE_URL} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
            Open in Google Maps <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomepageFounderOffice() {
  return (
    <section id="home-founder-office" data-home-founder className={styles.section} aria-labelledby="home-founder-heading">
      <FounderOfficeMotion className={styles.inner}>
        <div className={styles.founder}>
          <FounderPortrait />
          <div className={styles.story}>
            <div data-founder-reveal>
              <p className={styles.eyebrow}>The people behind the work</p>
              <h2 id="home-founder-heading">We get to know your business before we <em>get to work.</em></h2>
            </div>
            <p className={styles.paragraph} data-founder-reveal>Your customers, offer and growth priorities guide what we recommend. Our job is to make each part of your digital presence work harder together—not to sell services you do not need.</p>
            <p className={styles.paragraph} data-founder-reveal>Crea8iv Media is a digital marketing and website development agency based in Rawalpindi, Pakistan. Founded by Syed Qamar Abbas, it works across website strategy, search visibility, paid media, creative production and practical business automation.</p>
            <ul className={styles.principles}>
              {principles.map(principle => (
                <li key={principle} data-founder-reveal>
                  <span className={styles.check}><Check size={15} strokeWidth={2.5} aria-hidden="true" /></span>
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
            <div className={styles.founderActions} data-founder-reveal>
              <Link href="/about/" className={styles.outline}>Meet Crea8iv Media <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <Link href={FOUNDER.canonicalPath} className={styles.outline}>Read the Founder Story <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
        <OfficeLocation />
      </FounderOfficeMotion>
    </section>
  );
}
