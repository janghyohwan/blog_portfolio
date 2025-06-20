import AboutSection from "./components/About";
import ContactPage from "./components/Contact";
import ProjectSection from "./components/Project";
import GuestBookSection from "./components/GuestBook";
import SkillSection from "./components/Skills";

export default function Home() {
  return (
    <div>
      <AboutSection />
      <SkillSection />
      <ProjectSection />
      <GuestBookSection />
      <ContactPage />
    </div>
  );
}
