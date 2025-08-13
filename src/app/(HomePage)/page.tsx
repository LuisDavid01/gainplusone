import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { CheckCircle, Target, TrendingUp, Users, Dumbbell, Clock, BarChart3 } from "lucide-react"
import MainHeader from "~/components/MainHeader"
import MainFooter from "~/components/MainFooter"
import { cn } from "~/lib/utils"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader/>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
       <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              🎯 Personalized Fitness Platform
            </Badge>
            <h1 className=" font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
              Transform Your <span className="text-primary">Fitness Journey</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Personalized routines designed for your unique goals. Unlock the potential of tailored workouts, progress
              tracking, and analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <form
                              action={async () => {
                              "use server";
              
                              const session = await auth();
              
                              if (!session.userId) {
                                  return redirect("/sign-up");
                              }
              
                              //return redirect("/drive");
                              }}
                          >
                              <Button
                              size="lg"
                              type="submit"
                              className="text-lg px-8 py-6"
                              >
                              Start for free
                              </Button>
                          </form>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">No credit card required • Free forever plan available</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className=" font-bold text-3xl lg:text-4xl mb-6">Everything You Need to Succeed</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive tools designed to help you achieve your fitness goals faster and more efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className=" font-bold text-xl mb-4">Routine Creator</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Craft your ideal workout plan with ease. Choose from hundreds of exercises and create routines that
                  match your goals and schedule.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className=" font-bold text-xl mb-4">Workout Tracking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Stay accountable and see your progress. Log every rep, set, and weight to build momentum and track
                  your improvements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className=" font-bold text-xl mb-4">Progress Analytics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Visualize your growth and stay motivated. Advanced analytics help you understand your patterns and
                  optimize your training.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className=" font-bold text-xl mb-4">Smart Recommendations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  AI-powered suggestions based on your performance, helping you break plateaus and achieve consistent
                  progress.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className=" font-bold text-xl mb-4">Community Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Connect with like-minded fitness enthusiasts, share your progress, and get motivated by others'
                  success stories.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
                <h3 className=" font-bold text-xl mb-4">Exercise Library</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Access hundreds of exercises with detailed instructions, videos, and muscle group targeting for every
                  fitness level.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className=" font-bold text-3xl lg:text-4xl mb-6">Get Started at No Cost</h2>
            <p className="text-lg text-muted-foreground">
              Explore our free features or upgrade for just $19/month to unlock advanced capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="border-2 border-border">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className=" font-bold text-2xl mb-2">Free</h3>
                  <div className="text-4xl font-bold mb-2">$0</div>
                  <p className="text-muted-foreground">Forever free</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Basic routine creator</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Workout tracking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Exercise library access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Basic progress tracking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Community access</span>
                  </li>
                </ul>
                 <form
                              action={async () => {
                              "use server";
              
                              const session = await auth();
              
                              if (!session.userId) {
                                  return redirect("/sign-up");
                              }
              
                              //return redirect("/drive");
                              }}
                          >
                              <Button
                              size="lg"
                              variant="outline"
                              type="submit"
                              className="w-full bg-transparent"
                              >
                              Start for free
                              </Button>
                          </form>

              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-2 border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className=" font-bold text-2xl mb-2">Premium</h3>
                  <div className="text-4xl font-bold mb-2">$19</div>
                  <p className="text-muted-foreground">per month</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>AI-powered recommendations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Custom workout plans</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Export data & reports</span>
                  </li>
                </ul>

                 <form
                              action={async () => {
                              "use server";
              
                              const session = await auth();
              
                              if (!session.userId) {
                                  return redirect("/sign-up");
                              }
              
                              //return redirect("/drive");
                              }}
                          >
                              <Button
                              size="lg"
                              type="submit"
                              className="w-full"
                              >
                              Start Premium Trial
                              </Button>
                          </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className=" font-bold text-3xl lg:text-4xl mb-6">Ready to Transform Your Fitness?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who have already started their journey to better health and fitness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <form
                              action={async () => {
                              "use server";
              
                              const session = await auth();
              
                              if (!session.userId) {
                                  return redirect("/sign-up");
                              }
              
                              //return redirect("/drive");
                              }}
                          >
                              <Button
                              size="lg"
                              variant="outline"
                              type="submit"
                              className="text-lg px-8 py-6"
                              >
                              Start Your Free Journey
                              </Button>
                          </form>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <MainFooter/>
    </div>
  )
}

