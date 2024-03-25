import React from "react";
import "./social.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareYoutube,
    faSquareXTwitter,
    faSquareInstagram,
    faSquareFacebook
  } from "@fortawesome/free-brands-svg-icons";

export default function Social() {
    return (
        <div class="social-container">
            <a href="https://www.facebook.com/"
                target="_blank"
                className="facebook social">
                <FontAwesomeIcon icon={faSquareFacebook} size="3x" />
            </a>
            <a href="https://www.instagram.com/"
                target="_blank"
                className="instagram social">
                <FontAwesomeIcon icon={faSquareInstagram} size="3x" />
            </a>
            <a href="https://twitter.com/"
                target="_blank"
                className="twitter social">
                <FontAwesomeIcon icon={faSquareXTwitter} size="3x" />
            </a>
            <a href="https://www.youtube.com/"
                target="_blank"
                className="youtube social">
                <FontAwesomeIcon icon={faSquareYoutube} size="3x" />
            </a>
        </div>
        
    );
}