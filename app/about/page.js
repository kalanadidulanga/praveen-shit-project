import { Container } from "@/components/layout/Container";
import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { SimpleFooter } from "@/components/layout/SimpleFooter";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Globe, Recycle, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <SimpleHeader />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-green-50 py-20">
          <Container className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About EcoRecycle</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Empowering Sri Lanka to build a sustainable future through innovative plastic waste management and recycling solutions.
            </p>
            <div className="relative h-[400px] w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
              <Image 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                alt="The EcoRecycle Team"
                fill
                style={{ objectFit: 'cover' }}
                priority
                className="rounded-xl"
              />
            </div>
          </Container>
        </section>

        {/* Mission and Vision */}
        <section className="py-16 bg-white">
          <Container>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-green-50 p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  To revolutionize plastic waste management in Sri Lanka by creating an accessible, efficient, and rewarding recycling ecosystem that connects waste producers with recyclers while promoting environmental consciousness.
                </p>
                <ul className="space-y-3">
                  {[
                    "Reduce plastic pollution in Sri Lanka&apos;s natural environments",
                    "Create economic opportunities through the circular economy",
                    "Educate communities about sustainable waste management practices",
                    "Develop innovative technologies for efficient recycling solutions"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-gray-700 mb-6">
                  A cleaner, greener Sri Lanka where plastic waste is transformed from an environmental threat into a valuable resource, fostering sustainable development and environmental preservation.
                </p>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                    alt="Clean beaches in Sri Lanka"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-gradient-to-b from-white to-green-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  EcoRecycle was founded in 2021 by a group of passionate environmental engineers and tech entrepreneurs from the University of Moratuwa who witnessed firsthand the devastating impact of plastic pollution on Sri Lanka&apos;s beautiful landscapes and oceans.
                </p>
                <p>
                  What began as a small campus initiative quickly grew into a comprehensive platform connecting individuals, businesses, and waste collectors across the country. We identified a critical gap in the recycling ecosystem: while many people wanted to recycle, the process was often inconvenient, and the benefits were unclear.
                </p>
                <p>
                  Our solution was to create a reward-based system that makes recycling not just environmentally responsible but also economically beneficial. By partnering with local businesses and government initiatives, we&apos;ve developed a platform that turns environmental action into tangible rewards.
                </p>
                <p>
                  Today, EcoRecycle operates across major cities in Sri Lanka and has helped recycle over 500 tonnes of plastic waste. Our community continues to grow as more Sri Lankans join our mission to build a sustainable future.
                </p>
                <div className="mt-8 not-prose">
                  <Button asChild className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                    <Link href="/register">
                      Join Our Community
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-white">
          <Container>
            <h2 className="text-3xl font-bold mb-10 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Globe className="h-10 w-10 text-green-600 mb-4" />,
                  title: "Environmental Stewardship",
                  desc: "We are committed to protecting and preserving Sri Lanka's natural environments for future generations."
                },
                {
                  icon: <Recycle className="h-10 w-10 text-green-600 mb-4" />,
                  title: "Innovation",
                  desc: "We continuously seek new technologies and approaches to make recycling more efficient and accessible."
                },
                {
                  icon: <Users className="h-10 w-10 text-green-600 mb-4" />,
                  title: "Community Empowerment",
                  desc: "We believe in equipping individuals and communities with the knowledge and tools to create sustainable change."
                }
              ].map((value, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gradient-to-b from-green-50 to-white">
          <Container>
            <h2 className="text-3xl font-bold mb-10 text-center">Our Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Ayesha Perera",
                  role: "Founder & CEO",
                  bio: "Environmental engineer with 10+ years of experience in waste management systems.",
                  image: "https://randomuser.me/api/portraits/women/32.jpg"
                },
                {
                  name: "Dinesh Jayawardena",
                  role: "CTO",
                  bio: "Tech entrepreneur specializing in sustainable technology solutions.",
                  image: "https://randomuser.me/api/portraits/men/68.jpg"
                },
                {
                  name: "Malini Fernando",
                  role: "Head of Operations",
                  bio: "Expert in logistics and supply chain management for recycling operations.",
                  image: "https://randomuser.me/api/portraits/women/45.jpg"
                }
              ].map((member, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image 
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-1">{member.name}</h3>
                  <p className="text-green-600 text-center mb-3">{member.role}</p>
                  <p className="text-gray-600 text-center">{member.bio}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Our team also includes over 30 passionate individuals working across technology, operations, community engagement, and business development.
              </p>
              <Button variant="outline" asChild>
                <Link href="/join-team">Join Our Team</Link>
              </Button>
            </div>
          </Container>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <Container className="text-center">
            <h2 className="text-3xl font-bold mb-6">Join Us in Building a Sustainable Sri Lanka</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Whether you&apos;re an individual, business, or waste collector, there&apos;s a place for you in our ecosystem.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-white text-green-600 hover:bg-gray-100">
                <Link href="/register">Get Started Today</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-green-600">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
} 