import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

import LOGO from "../assets/react.svg";
const Navbar_ = () => {
  return (
    <div>
      <Navbar>
        <NavbarBrand>
          <img src={LOGO} alt="LOGO" />
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="secondary">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <Button color="success">Login</Button>
          <Button color="success" variant="bordered">
            Sign Up
          </Button>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default Navbar_;
