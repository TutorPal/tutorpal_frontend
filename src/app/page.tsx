import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";
import Navbar from "@/components/common/Navbar";


const page = () => {
  return (
    <div className="bg-green-900">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default page;
