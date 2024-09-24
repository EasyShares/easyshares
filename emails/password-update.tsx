import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function PassswordUpdateEmail({ url }: any) {
  return (
    <Html>
      <Head />
      <Preview>EasyShares Password Update</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Text style={logo}>EasyShares</Text>
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Password Updated!</Heading>
              <Text style={mainText}>
                You updated the password for your EasyShares account. If this
                was you, then no further action is required. However if you did
                NOT perform this password change, please reset your account
                password immediately. Remember to use a password that is both
                strong and unique to your EasyShares account. To learn more
                about how to create a strong and unique password.
              </Text>
              <Section style={verificationSection}>
                <Button style={codeText} href={process.env.NEXT_PUBLIC_URL}>
                  Login
                </Button>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                Easyhares will never email you and ask you to disclose your
                private information like passwords and otp codes.
              </Text>
            </Section>
          </Section>
          <Text style={footerText}>
            This message was produced and distributed by EasyShares. &copy;{" "}
            {new Date().getFullYear()} EasyShares. All rights reserved. View our{" "}
            <Link
              href="https://easyshares.pro/privacy-policy"
              target="_blank"
              style={link}
            >
              privacy policy
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};
const logo = {
  width: "220px",
  height: "40px",
  color: "#fff",
  fontSize: "24px",
  marginLeft: "20px",
  marginTop: "20px",
  fontWeight: "bold",
  borderRadius: "10px",
};
const headerimage = {
  backgroundColor: "#fff",
  borderRadius: "10px",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "blue",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const codeText = {
  ...text,
  fontWeight: "bold",
  fontSize: "18px",
  color: "blue",
  textDecoration: "underline",
  height: "40px",
  width: "150px",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "20px",
};

const validityText = {
  ...text,
  margin: "0px",
  textAlign: "center" as const,
};

const verificationSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
