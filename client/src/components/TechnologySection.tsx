import { Droplets, Shield, Sparkles } from "lucide-react";

export default function TechnologySection() {
  const technologies = [
    {
      icon: <Droplets className="w-12 h-12" />,
      title: "Purification",
      description: "Removes contaminants but preserves natural minerals"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Sterilization",
      description: "Eliminates viruses & harmful bacteria (99.8% COVID-19 reduction)"
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "Deodorization",
      description: "Removes odors, restores clean taste"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-gray-900" id="technology">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full px-6 py-2 text-sm font-medium inline-block mb-4">
            Japanese Water Technology
          </div>
          <h2 className="text-5xl md:text-6xl tracking-tight text-foreground mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}>
            The 3-Step Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Developed by founder Shigeyoshi Morita over 45+ years of research in Tottori, Japan. Unlike conventional RO systems that strip away beneficial minerals, this patented process selectively removes contaminants while preserving 30+ essential minerals.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-4">
            <span className="font-semibold text-blue-600 dark:text-blue-400">99.8% virus and bacteria elimination</span> with advanced filtration technology.
          </p>
        </div>
        
        <div className="flex flex-wrap items-start justify-center gap-12 md:gap-16 max-w-5xl mx-auto">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center max-w-[250px]"
            >
              <div className="mb-6 text-blue-600 dark:text-blue-400">
                {tech.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {tech.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
