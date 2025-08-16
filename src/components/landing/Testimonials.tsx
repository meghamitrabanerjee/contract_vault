import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "UI/UX Designer",
    avatar: "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Contract Vault transformed how I work with clients. No more awkward payment conversations or delayed invoices. The escrow system gives both sides peace of mind.",
    rating: 5
  },
  {
    name: "Marcus Johnson",
    role: "Full-stack Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    content: "The contract templates are spot-on for software projects. I love how everything is automated - from signatures to milestone payments. Saves me hours every week.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Consultant",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    content: "As someone who manages multiple client projects, the dashboard view is incredible. I can see all my contracts, payments, and deadlines at a glance.",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-muted border border-accent/20 rounded-full px-4 py-2 text-sm text-accent mb-6">
            <Star className="w-4 h-4" />
            <span>Loved by freelancers</span>
          </div>
          <h2 className="text-headline mb-4">
            What Our Users Say
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto">
            Join thousands of freelancers who've transformed their business with Contract Vault.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-soft bg-card hover:shadow-medium transition-all">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                  <p className="text-body text-muted-foreground italic relative z-10">
                    "{testimonial.content}"
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover shadow-elegant"
                  />
                  <div>
                    <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-small">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-small mb-4">Join 10,000+ satisfied users</p>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-sm font-medium">4.9/5 average rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};