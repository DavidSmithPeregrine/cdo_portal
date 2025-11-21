import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, RefreshCw, Filter } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const categoryLabels = {
  policy: "Policy",
  technology: "Technology",
  workforce: "Workforce",
  ethics: "Ethics",
  community: "Community",
};

const categoryColors = {
  policy: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  technology: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  workforce: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  ethics: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  community: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
};

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedSource, setSelectedSource] = useState<string | undefined>(undefined);

  const { data: news, isLoading, refetch } = trpc.news.list.useQuery({
    category: selectedCategory as any,
    source: selectedSource,
    limit: 50,
  });

  const { data: stats } = trpc.news.stats.useQuery();

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Federal AI/ML & Tech News</h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl">
            Stay informed with the latest news on artificial intelligence, machine learning, emerging technologies, and data policy from trusted federal sources.
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
                  <span className="font-semibold">{stats.total}</span> articles
                </div>
                {stats.lastUpdate && (
                  <div className="text-sm text-muted-foreground">
                    Last updated: {formatDistanceToNow(new Date(stats.lastUpdate), { addSuffix: true })}
                  </div>
                )}
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
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full lg:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="policy">Policy</TabsTrigger>
                <TabsTrigger value="technology">Technology</TabsTrigger>
                <TabsTrigger value="workforce">Workforce</TabsTrigger>
                <TabsTrigger value="ethics">Ethics</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <NewsGrid news={news} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="policy" className="mt-0">
              <NewsGrid news={news} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="technology" className="mt-0">
              <NewsGrid news={news} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="workforce" className="mt-0">
              <NewsGrid news={news} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="ethics" className="mt-0">
              <NewsGrid news={news} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="community" className="mt-0">
              <NewsGrid news={news} isLoading={isLoading} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

function NewsGrid({ news, isLoading }: { news: any[] | undefined; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

  if (!news || news.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No news articles found.</p>
        <p className="text-muted-foreground text-sm mt-2">Check back soon for updates!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((article) => (
        <Card key={article.id} className="flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge className={categoryColors[article.category as keyof typeof categoryColors]}>
                {categoryLabels[article.category as keyof typeof categoryLabels]}
              </Badge>
              <span className="text-xs text-muted-foreground">{article.source}</span>
            </div>
            <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
            <CardDescription className="text-xs">
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {article.summary && (
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{article.summary}</p>
            )}
            <div className="mt-auto">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                Read Full Article
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
