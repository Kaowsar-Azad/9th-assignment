
import AdoptionProcess from "@/components/AdoptionProcess";
import CareGuides from "@/components/CareGuides";
import HeroBanner from "@/components/HeroBanner";
import HomePagePetSection from "@/components/HomePagePetSection";
import PetAdoptionHero from "@/components/PetAdoptionHero";
import StatsSection from "@/components/StatsSection";
import SuccessStories from "@/components/SuccessStories";



export default function Home() {
  return (
    <>
   <HeroBanner></HeroBanner>
    <HomePagePetSection  ></HomePagePetSection>
    <PetAdoptionHero></PetAdoptionHero>
    <AdoptionProcess></AdoptionProcess>
    <SuccessStories></SuccessStories>
    <CareGuides></CareGuides>
    <StatsSection></StatsSection>
    </>
    
  );
}
