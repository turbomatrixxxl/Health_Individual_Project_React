import React from 'react'

import { NavLink } from "react-router-dom";
import styled from "styled-components";

import styles from './AuthLinks.module.css'

const StyledLink = styled(NavLink)`
  color: #9B9FAA;
  text-align: right;
  font-family: Verdana;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.56px;
  text-transform: uppercase;
  text-decoration: none;

  &.active {
    color:#212121
  }
`;

export default function AuthLinks() {

    return (
        <div className={styles.container}>
            <span>|</span>
            <nav className={styles.nav}>
                <StyledLink
                    className={styles.auth}
                    to={"/login"}>Log in
                </StyledLink>

                <StyledLink
                    className={styles.auth}
                    to={"/registration"}>Registration
                </StyledLink>
            </nav>
        </div>
    )
}

