import Image from "next/image";
import Layout from "../components/layout";
import Logo from "../public/iparking-logo.png";

export default function Home() {
  return (
    <>
      <Image src={Logo} alt={"Next.js Logo"} width={180} height={37} priority />
    </>
  );
}
