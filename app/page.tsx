import Hero from "@/section/hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main>
        <Hero/>
        <section className="min-h-screen bg-slate-800 flex items-center justify-center text-white">
          <h2 className="text-4xl font-bold">More Content Here</h2>
        </section>
      </main>
    </div>
  );
}
