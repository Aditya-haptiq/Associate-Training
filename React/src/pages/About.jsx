import React from 'react';
import { Users, Award, Shield, Truck } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Happy Customers', value: '10,000+', icon: <Users className="w-8 h-8 text-primary-600" /> },
    { label: 'Products Sold', value: '50,000+', icon: <Award className="w-8 h-8 text-primary-600" /> },
    { label: 'Years of Experience', value: '5+', icon: <Shield className="w-8 h-8 text-primary-600" /> },
    { label: 'Orders Delivered', value: '25,000+', icon: <Truck className="w-8 h-8 text-primary-600" /> },
  ];

  const team = [
    {
      name: 'Aditya R Kulkarni',
      role: 'Founder & CEO',
      image: '/src/assets/character2.jpg',
      description: 'Passionate about bringing quality fashion to everyone.'
    },
    {
      name: 'Aditya Kulkarni',
      role: 'Head of Design',
      image: '/src/assets/character2.jpg',
      description: 'Creative visionary with 10+ years in fashion design.'
    },
    {
      name: 'Aditya Kulkarni',
      role: 'Operations Manager',
      image: '/src/assets/character2.jpg',
      description: 'Ensures every order reaches you perfectly and on time.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">About Clothify</h1>
          <p className="text-xl leading-relaxed text-blue-100 max-w-2xl mx-auto">
            We're passionate about bringing you the latest in fashion trends while maintaining the highest quality standards.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center hover:scale-110 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 p-4 rounded-full shadow-md">
                  {stat.icon}
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-gray-600 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
<section className="py-28 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      {/* Image */}
      <div className="relative group">
        <img
          src="https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Our Story"
          className="rounded-3xl shadow-2xl transform transition duration-500 group-hover:scale-105"
        />
        <div className="absolute -inset-2 rounded-3xl border-4 border-purple-200 -z-10"></div>
      </div>

      {/* Content */}
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Founded in 2020, Clothify began as a small startup with a big dream: to revolutionize how people shop for fashion online.
        </p>

        <div className="space-y-6">
          {[
            {
              title: "Quality First",
              desc: "We work directly with trusted manufacturers to ensure every piece meets our strict quality standards.",
              icon: "🧵"
            },
            {
              title: "Customer-Centric",
              desc: "Our customers are at the heart of everything we do, from curated selections to support.",
              icon: "❤️"
            },
            {
              title: "Sustainable Fashion",
              desc: "We partner with ethical suppliers who value sustainability and responsible production.",
              icon: "🌱"
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>


<section className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white py-16">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">

    {/* Text Content */}
    <div className="text-center md:text-left">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-snug">
        Our Mission at Clothify
      </h2>
      <p className="text-base md:text-lg text-purple-100 leading-relaxed max-w-xl">
        We’re redefining how fashion meets function — blending modern style with sustainability to create a better-dressed and better-aware world.
      </p>
    </div>

    {/* Image */}
    <div className="flex justify-center md:justify-end">
      <img
        src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=compress&cs=tinysrgb&w=600"
        alt="Fashion mission"
        className="rounded-2xl shadow-xl w-full max-w-sm h-72 object-cover"
      />
    </div>

  </div>
</section>




      {/* Team Section - Modern */}
<section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Meet Our Team</h2>
      <p className="text-gray-600 text-lg max-w-xl mx-auto">The passionate minds building the future of fashion at Clothify.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {team.map((member, index) => (
        <div
          key={index}
          className="bg-white/70 backdrop-blur-md border border-gray-200 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-28 h-28 mx-auto rounded-full object-cover mb-4 border-4 border-indigo-200 shadow-md"
          />
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800">{member.name}</h3>
            <p className="text-indigo-600 font-medium text-sm mb-2">{member.role}</p>
            <p className="text-gray-600 text-sm">{member.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



    </div>
  );
};

export default About;
