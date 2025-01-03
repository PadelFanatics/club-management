import React from 'react';
import { Star } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "This platform has transformed how we manage our club. The booking system alone has saved us countless hours.",
      author: "Maria Rodriguez",
      role: "Club Manager",
      club: "Padel Elite Barcelona"
    },
    {
      quote: "The tournament management tools are incredible. We've doubled our tournament participation since implementing this system.",
      author: "John Smith",
      role: "Tournament Director",
      club: "London Padel Club"
    },
    {
      quote: "Our members love the mobile app. It's made everything from booking courts to tracking progress so much easier.",
      author: "Sophie Martin",
      role: "Operations Manager",
      club: "Paris Padel Academy"
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Trusted by Leading Clubs</h2>
          <p className="text-xl text-gray-600">
            See what our customers have to say
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-600 mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-bold">{testimonial.author}</div>
                <div className="text-sm text-gray-500">
                  {testimonial.role}, {testimonial.club}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}