import React from "react";
import styles from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import footerLogo from "../../assets/Footer.png";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.left}>
          <img
            src={footerLogo}
            alt="Evangadi Footer Logo"
            className={styles.footerLogo}
          />

          <div className={styles.socials}>
            <a
              href="https://www.facebook.com/evangaditech"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.icon}
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/evangaditech"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.icon}
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.youtube.com/@EvangadiTech"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.icon}
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div className={styles.section}>
          <h3>Useful Link</h3>
          <ul>
            <li>How it works</li>
            <li>Terms of Service</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className={styles.section}>
          <h3>Contact Info</h3>
          <ul>
            <li>Evangadi Networks</li>
            <li>support@evangadi.com</li>
            <li>+1-202-386-2702</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
