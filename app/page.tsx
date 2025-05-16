import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ChevronRight, Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex-box flex h-16 items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <Image src="/phms-logo.png" alt="PHMS Logo" width={32} height={32} />
            <span className="text-xl font-bold">PHMS</span>
          </div>

          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 hidden sm:inline-block">
              Sign In
            </Link>
            <Button asChild>
              <Link href="#cta">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="w-full flex-box px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Modern Pharmacy Management, Simplified
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    PHMS is a cloud-based Pharmacy Management System (SaaS) that streamlines prescription processing, inventory, billing, and compliance—empowering pharmacies to deliver better patient care and operate efficiently.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="#cta">
                      Start Free Trial
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    <Link href="#features">See How It Works</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="/phms-hero.png"
                width={550}
                height={550}
                alt="PHMS Dashboard Preview"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="flex-box px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">All-in-One Pharmacy Management</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  PHMS provides everything your pharmacy needs: prescription management, inventory tracking, billing, compliance, and more—all in a secure, cloud-based platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle>Prescription Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Process, track, and refill prescriptions with ease. Integrated e-prescribing and patient profiles ensure accuracy and compliance.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Inventory & Stock Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Real-time inventory tracking, automated reorder alerts, and expiry management to keep your pharmacy stocked and compliant.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Insurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Streamlined billing, insurance claims, and payment processing—all in one place, with full audit trails.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Compliance & Reporting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Stay compliant with regulatory standards. Generate detailed reports for audits, inventory, and sales with a single click.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="flex-box px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Trusted by Pharmacies Nationwide</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  See how PHMS is transforming pharmacy operations and patient care.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-base">Dr. Sarah Johnson</CardTitle>
                      <CardDescription>Owner, Johnson's Pharmacy</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "PHMS has made managing prescriptions and inventory effortless. Our workflow is faster, and compliance is no longer a headache."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-base">Michael Chen</CardTitle>
                      <CardDescription>Pharmacy Manager, CityMed</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "The cloud-based system lets us access everything securely from anywhere. PHMS support is top-notch and always available."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-base">Emily Rodriguez</CardTitle>
                      <CardDescription>Lead Pharmacist, HealthFirst</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "PHMS has helped us reduce errors and improve patient satisfaction. The reporting tools are a lifesaver during audits."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="flex-box px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Choose the plan that's right for your pharmacy. All plans include a 14-day free trial and full support.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$29</span>
                    <span className="text-muted-foreground">/month per pharmacy</span>
                  </div>
                  <CardDescription>Perfect for independent pharmacies.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Up to 2 users</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Prescription & inventory management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Start Free Trial
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-primary">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Professional</CardTitle>
                    <div className="inline-block rounded-lg bg-primary px-3 py-1 text-xs text-primary-foreground">
                      Popular
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">$59</span>
                    <span className="text-muted-foreground">/month per pharmacy</span>
                  </div>
                  <CardDescription>For growing pharmacies with advanced needs.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Unlimited users</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Advanced reporting & compliance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Insurance & billing integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Free Trial</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">Custom</span>
                    <span className="text-muted-foreground">Contact us</span>
                  </div>
                  <CardDescription>For pharmacy chains and enterprise needs.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Multi-location support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Custom integrations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>24/7 support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Contact Sales
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
          <div className="flex-box px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Modernize Your Pharmacy?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join pharmacies nationwide that trust PHMS to power their operations and deliver better patient care.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button type="submit" className="sm:w-auto w-full">
                    Start Free Trial
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  No credit card required. 14-day free trial.{" "}
                  <Link href="#" className="underline underline-offset-2">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-4 w-full border-t bg-background">
        <div className="flex-box flex-col gap-8 py-8 md:py-12 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image src="/phms-logo.png" alt="PHMS Logo" width={32} height={32} />
                <span className="text-xl font-bold">PHMS</span>
              </div>
              <p className="text-sm text-muted-foreground">Cloud-based pharmacy management for modern pharmacies.</p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-medium">Product</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Features
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Integrations
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Changelog
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Roadmap
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-medium">Company</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Press
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-medium">Resources</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Community
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Webinars
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Partners
                </Link>
              </nav>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} PHMS, Inc. All rights reserved.
            </p>
            <nav className="flex gap-4">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
