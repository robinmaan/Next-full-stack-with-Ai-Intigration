
import { Html, Button,Head, Hr,Row, Text, Preview, Section, Heading } from "@react-email/components";


interface VerificationEmailProps {
    username:string;
    otp:string;
}
export default function VerificationEmail( {username,otp }: VerificationEmailProps) {
  return (
    <Html lang="en">
       <Head>
        <Preview>
            Here is your verification code:{otp}
        </Preview></Head> 
        <Section>
            <Row>
                <Heading>Hello {username}</Heading>
            </Row>
            <Row>
                <Text>{otp}</Text>
            </Row>
        </Section>
      <Text>Verifiation Code</Text>
      <Hr />
      <Button href="https://example.com">Click me</Button>
    </Html>
  );
}


