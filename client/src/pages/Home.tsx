import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Newspaper, 
  FileText, 
  Briefcase, 
  Wrench, 
  Users, 
  BookOpen,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Data: Fueling Our Future
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              The comprehensive AI/ML, emerging tech, and data community hub for federal Chief Data Officers and their teams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/news">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Newspaper className="mr-2 h-5 w-5" />
                  Latest News
                </Button>
              </Link>
              <Link href="/jobs">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay informed, advance your career, and connect with the federal data community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* News */}
            <Link href="/news">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Newspaper className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Real-Time News</CardTitle>
                  <CardDescription>
                    Auto-updating federal AI/ML and tech news from FedScoop, GovExec, NIST, and more
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0">
                    Read Latest News →
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Policy & Guidance */}
            <Link href="/policy">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Policy & Guidance</CardTitle>
                  <CardDescription>
                    Track federal data policies, OMB memos, NIST standards, and legislative updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0">
                    Explore Policies →
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Jobs Board */}
            <Link href="/jobs">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Jobs Board</CardTitle>
                  <CardDescription>
                    Live federal AI/ML and data jobs from USAJOBS and contractor positions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0">
                    Find Opportunities →
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Career Tools */}
            <Link href="/career-tools">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>AI Career Tools</CardTitle>
                  <CardDescription>
                    AI-powered resume analyzer, cover letter optimizer, and career guidance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0">
                    Try AI Tools →
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Directory */}
            <Link href="/directory">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Agency Directory</CardTitle>
                  <CardDescription>
                    Connect with federal CDOs and CAIOs across government agencies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0">
                    Browse Directory →
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Resources */}
            <Link href="/resources">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Resources</CardTitle>
                  <CardDescription>
                    Curated collection of websites, blogs, podcasts, and standards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0">
                    Explore Resources →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Why CDO Portal */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why CDO Portal?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Always Current</h3>
                <p className="text-muted-foreground">
                  Auto-updating content ensures you never miss important news, policies, or job opportunities
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">AI-Powered</h3>
                <p className="text-muted-foreground">
                  Advanced AI tools help you optimize your resume and cover letter for federal positions
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Trusted Sources</h3>
                <p className="text-muted-foreground">
                  All content sourced from official government channels and reputable federal tech media
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join the federal data community and stay ahead with the latest insights, opportunities, and tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/news">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Explore News
              </Button>
            </Link>
            <Link href="/career-tools">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20">
                Try AI Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
