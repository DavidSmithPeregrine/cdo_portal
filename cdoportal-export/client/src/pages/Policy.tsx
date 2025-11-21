import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, RefreshCw, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const categoryLabels = {
  laws_regulations: "Laws & Regulations",
  federal_guidance: "Federal Guidance",
  standards_practices: "Standards & Practices",
};

const categoryColors = {
  laws_regulations: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  federal_guidance: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  standards_practices: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

export default function Policy() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const { data: policies, isLoading, refetch } = trpc.policy.list.useQuery({
    category: selectedCategory as any,
    limit: 50,
  });

  const { data: stats } = trpc.policy.stats.useQuery();

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Policy & Guidance</h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl">
            Comprehensive collection of federal data policies, AI regulations, OMB memoranda, NIST standards, and legislative updates affecting federal data governance.
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
                  <span className="font-semibold">{stats.total}</span> policy documents
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

      {/* Filters and Content */}
      <section className="py-8">
        <div className="container">
          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setSelectedCategory(value === "all" ? undefined : value)}>
            <div className="flex items-center justify-between mb-6">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full lg:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="laws_regulations">Laws & Regulations</TabsTrigger>
                <TabsTrigger value="federal_guidance">Federal Guidance</TabsTrigger>
                <TabsTrigger value="standards_practices">Standards & Practices</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <PolicyGrid policies={policies} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="laws_regulations" className="mt-0">
              <PolicyGrid policies={policies} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="federal_guidance" className="mt-0">
              <PolicyGrid policies={policies} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="standards_practices" className="mt-0">
              <PolicyGrid policies={policies} isLoading={isLoading} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

function PolicyGrid({ policies, isLoading }: { policies: any[] | undefined; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

  if (!policies || policies.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-lg">No policy documents found.</p>
        <p className="text-muted-foreground text-sm mt-2">Check back soon for updates!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {policies.map((policy) => (
        <Card key={policy.id} className="flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge className={categoryColors[policy.category as keyof typeof categoryColors]}>
                {categoryLabels[policy.category as keyof typeof categoryLabels]}
              </Badge>
              <span className="text-xs text-muted-foreground">{policy.source}</span>
            </div>
            <CardTitle className="text-lg">{policy.title}</CardTitle>
            {policy.publishedAt && (
              <CardDescription className="text-xs">
                Published {formatDistanceToNow(new Date(policy.publishedAt), { addSuffix: true })}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {policy.summary && (
              <p className="text-sm text-muted-foreground mb-4">{policy.summary}</p>
            )}
            <div className="mt-auto">
              <a
                href={policy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                View Full Document
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
