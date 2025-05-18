import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Activity, Recycle, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    value: "500+",
    label: "Tons Recycled",
    description: "Plastic waste diverted from landfills and oceans",
    icon: <Recycle className="h-10 w-10 text-primary/30" />,
    color: "from-green-50 to-emerald-50 border-green-100"
  },
  {
    value: "1,200+",
    label: "Active Users",
    description: "Growing community of dedicated participants",
    icon: <Users className="h-10 w-10 text-primary/30" />,
    color: "from-blue-50 to-sky-50 border-blue-100"
  },
  {
    value: "30+",
    label: "Business Partners",
    description: "Sri Lankan companies committed to sustainable practices",
    icon: <Activity className="h-10 w-10 text-primary/30" />,
    color: "from-amber-50 to-yellow-50 border-amber-100"
  },
  {
    value: "Rs 12M+",
    label: "Economic Impact",
    description: "Value generated for local waste collectors",
    icon: <TrendingUp className="h-10 w-10 text-primary/30" />,
    color: "from-violet-50 to-purple-50 border-violet-100"
  }
];

const impactItems = [
  { value: "250,000", label: "Plastic bottles kept out of landfills" },
  { value: "120", label: "Tons of CO2 emissions avoided" },
  { value: "Rs 3.4M", label: "Income generated for waste collectors" },
  { value: "15+", label: "Districts covered across Sri Lanka" },
];

export function StatsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-primary/5" id="stats">
      <Container>
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider inline-block mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Making a Difference in Sri Lanka</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Together we&apos;re making significant progress in reducing plastic waste and creating value for communities across Sri Lanka.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center p-8 rounded-xl bg-gradient-to-br ${stat.color} border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group`}
            >
              <div className="absolute -right-6 -top-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold mb-2">{stat.label}</div>
              <p className="text-muted-foreground text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-white rounded-xl shadow-sm border p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 relative inline-block">
                Environmental & Social Impact
                <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-primary/30 rounded-full"></span>
              </h3>
              
              <div className="space-y-4">
                {impactItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-semibold">{i + 1}</span>
                    </div>
                    <div>
                      <div className="font-bold">{item.value}</div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button asChild className="mt-8">
                <Link href="/register">Join Our Efforts</Link>
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -translate-y-1/4 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-secondary/10 rounded-full translate-y-1/4 -translate-x-1/4" />
              
              <blockquote className="relative z-10">
                <p className="text-xl italic font-serif text-gray-700 mb-6">
                  "Our initiative has already prevented the equivalent of over 2.5 million plastic bottles from entering Sri Lanka's beautiful oceans and landfills."
                </p>
                <footer className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                    DR
                  </div>
                  <div>
                    <p className="font-semibold">Dr. Rajitha Perera</p>
                    <p className="text-sm text-muted-foreground">Environmental Scientist, University of Colombo</p>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Our work is supported by the Ministry of Environment, Central Environmental Authority, and local government bodies across Sri Lanka.
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-24 h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
} 