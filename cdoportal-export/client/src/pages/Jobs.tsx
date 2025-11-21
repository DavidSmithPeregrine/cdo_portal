import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, RefreshCw, Briefcase, MapPin, DollarSign, Shield, Home } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Jobs() {
  const [keyword, setKeyword] = useState("");
  const [agency, setAgency] = useState("");
  const [clearanceLevel, setClearanceLevel] = useState<string | undefined>(undefined);
  const [remote, setRemote] = useState<boolean | undefined>(undefined);

  const filters = {
    keyword: keyword || undefined,
    agency: agency || undefined,
    clearanceLevel,
    remote,
    limit: 50,
  };

  const { data: jobs, isLoading, refetch } = trpc.jobs.list.useQuery(filters);

  // Quick search links for USAJOBS, Indeed, and LinkedIn
  const quickSearches = [
    { label: "Data Scientist", usajobs: "https://www.usajobs.gov/Search/Results?k=data%20scientist", indeed: "https://www.indeed.com/jobs?q=data+scientist+federal+government", linkedin: "https://www.linkedin.com/jobs/search/?keywords=data%20scientist%20federal%20government" },
    { label: "Data Analyst", usajobs: "https://www.usajobs.gov/Search/Results?k=data%20analyst", indeed: "https://www.indeed.com/jobs?q=data+analyst+federal+government", linkedin: "https://www.linkedin.com/jobs/search/?keywords=data%20analyst%20federal%20government" },
    { label: "Chief Data Officer", usajobs: "https://www.usajobs.gov/Search/Results?k=chief%20data%20officer", indeed: "https://www.indeed.com/jobs?q=chief+data+officer+federal", linkedin: "https://www.linkedin.com/jobs/search/?keywords=chief%20data%20officer%20federal" },
    { label: "ML Engineer", usajobs: "https://www.usajobs.gov/Search/Results?k=machine%20learning%20engineer", indeed: "https://www.indeed.com/jobs?q=machine+learning+engineer+federal", linkedin: "https://www.linkedin.com/jobs/search/?keywords=machine%20learning%20engineer%20federal" },
    { label: "AI Specialist", usajobs: "https://www.usajobs.gov/Search/Results?k=artificial%20intelligence", indeed: "https://www.indeed.com/jobs?q=artificial+intelligence+federal+government", linkedin: "https://www.linkedin.com/jobs/search/?keywords=artificial%20intelligence%20federal%20government" },
  ];

  const { data: stats } = trpc.jobs.stats.useQuery();

  const handleRefresh = () => {
    refetch();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Federal AI/ML & Data Jobs</h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl">
            Discover federal career opportunities in artificial intelligence, machine learning, data science, and data governance from USAJOBS and leading contractors.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      {stats && (
        <section className="bg-muted border-b border-border py-4">
          <div className="container">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="text-sm">
                  <span className="font-semibold">{stats.activeJobs}</span> active positions
                </div>
                <div className="text-sm text-muted-foreground">
                  {stats.total} total listings
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filters */}
      <section className="py-8 bg-muted/50 border-b border-border">
        <div className="container">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="keyword">Keyword</Label>
                <Input
                  id="keyword"
                  placeholder="e.g., Data Scientist, AI"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agency">Agency</Label>
                <Input
                  id="agency"
                  placeholder="e.g., DoD, HHS"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clearance">Clearance Level</Label>
                <Select value={clearanceLevel || "all"} onValueChange={(val) => setClearanceLevel(val === "all" ? undefined : val)}>
                  <SelectTrigger id="clearance">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="None">None Required</SelectItem>
                    <SelectItem value="Secret">Secret</SelectItem>
                    <SelectItem value="Top Secret">Top Secret</SelectItem>
                    <SelectItem value="Top Secret/SCI">Top Secret/SCI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="remote">Work Location</Label>
                <Select value={remote === undefined ? "all" : remote ? "remote" : "onsite"} onValueChange={(val) => setRemote(val === "all" ? undefined : val === "remote")}>
                  <SelectTrigger id="remote">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit">Search Jobs</Button>
          </form>
        </div>
      </section>

          {/* Quick Job Search Links */}
      <section className="py-6 bg-muted/30 border-y border-border">
        <div className="container">
          <h3 className="text-sm font-semibold mb-4">Quick Search by Role:</h3>
          <div className="space-y-3">
            {quickSearches.map((search) => (
              <div key={search.label} className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-medium text-sm min-w-[140px]">{search.label}:</span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={search.usajobs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 text-xs bg-background border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Briefcase className="h-3 w-3 mr-1.5" />
                    USAJOBS
                    <ExternalLink className="h-2.5 w-2.5 ml-1" />
                  </a>
                  <a
                    href={search.indeed}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 text-xs bg-background border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Briefcase className="h-3 w-3 mr-1.5" />
                    Indeed
                    <ExternalLink className="h-2.5 w-2.5 ml-1" />
                  </a>
                  <a
                    href={search.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 text-xs bg-background border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Briefcase className="h-3 w-3 mr-1.5" />
                    LinkedIn
                    <ExternalLink className="h-2.5 w-2.5 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="container">
          <JobsGrid jobs={jobs} isLoading={isLoading} />
        </div>
      </section>
    </div>
  );
}

function JobsGrid({ jobs, isLoading }: { jobs: any[] | undefined; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <Briefcase className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-lg">No job listings found.</p>
        <p className="text-muted-foreground text-sm mt-2">Try adjusting your search filters!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {jobs.map((job) => (
        <Card key={job.id} className="flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge variant="secondary">{job.source}</Badge>
              {job.remote && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <Home className="h-3 w-3 mr-1" />
                  Remote
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="text-sm font-medium">{job.agency}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              {job.location}
            </div>
            {(job.salaryMin || job.salaryMax) && (
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4 mr-2" />
                {job.salaryMin && job.salaryMax
                  ? `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}`
                  : job.salaryMin
                  ? `From $${job.salaryMin.toLocaleString()}`
                  : `Up to $${job.salaryMax?.toLocaleString()}`}
              </div>
            )}
            {job.clearanceLevel && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Shield className="h-4 w-4 mr-2" />
                {job.clearanceLevel} Clearance Required
              </div>
            )}
            <div className="text-xs text-muted-foreground">
              Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
              {job.closingAt && ` • Closes ${formatDistanceToNow(new Date(job.closingAt), { addSuffix: true })}`}
            </div>
            <div className="mt-auto pt-4">
              <a
                href={job.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary hover:underline font-medium"
              >
                Apply on USAJOBS
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
