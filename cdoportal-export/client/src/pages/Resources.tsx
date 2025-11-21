import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, BookOpen, Code, Database, GraduationCap, Users, FileText } from "lucide-react";

const resources = {
  learning: [
    {
      title: "Federal Data Strategy",
      description: "Comprehensive guide to federal data governance, ethics, and best practices.",
      url: "https://strategy.data.gov",
      category: "Official Guidance",
    },
    {
      title: "NIST AI Risk Management Framework",
      description: "Framework for managing risks associated with AI systems.",
      url: "https://www.nist.gov/itl/ai-risk-management-framework",
      category: "Standards",
    },
    {
      title: "Data.gov",
      description: "The home of the U.S. Government's open data portal.",
      url: "https://www.data.gov",
      category: "Data Portal",
    },
    {
      title: "AI.gov",
      description: "Federal AI initiatives, policies, and resources.",
      url: "https://www.ai.gov",
      category: "Official Guidance",
    },
    {
      title: "Coursera: Data Science Specializations",
      description: "Online courses in data science, machine learning, and AI.",
      url: "https://www.coursera.org/browse/data-science",
      category: "Training",
    },
    {
      title: "edX: AI and Machine Learning",
      description: "University-level courses in AI and ML from top institutions.",
      url: "https://www.edx.org/learn/artificial-intelligence",
      category: "Training",
    },
    {
      title: "Federal AI Use Case Inventory",
      description: "Public inventory of AI use cases across federal agencies.",
      url: "https://www.ai.gov/ai-use-cases",
      category: "Official Guidance",
    },
    {
      title: "Data Science at NIH",
      description: "NIH resources for data science training and research.",
      url: "https://datascience.nih.gov",
      category: "Training",
    },
    {
      title: "USDA Data Science Training",
      description: "Free data science courses from USDA.",
      url: "https://www.usda.gov/data",
      category: "Training",
    },
    {
      title: "Federal CDO Council Resources",
      description: "Resources and guidance from the Federal CDO Council.",
      url: "https://www.cdo.gov/resources",
      category: "Official Guidance",
    },
  ],
  tools: [
    {
      title: "GitHub",
      description: "Version control and collaboration platform for code.",
      url: "https://github.com",
      category: "Development",
    },
    {
      title: "Jupyter Notebooks",
      description: "Interactive computing environment for data science.",
      url: "https://jupyter.org",
      category: "Development",
    },
    {
      title: "TensorFlow",
      description: "Open-source machine learning framework by Google.",
      url: "https://www.tensorflow.org",
      category: "ML Framework",
    },
    {
      title: "PyTorch",
      description: "Open-source machine learning library by Meta.",
      url: "https://pytorch.org",
      category: "ML Framework",
    },
    {
      title: "Apache Spark",
      description: "Unified analytics engine for large-scale data processing.",
      url: "https://spark.apache.org",
      category: "Big Data",
    },
    {
      title: "Tableau Public",
      description: "Free data visualization tool for creating interactive dashboards.",
      url: "https://public.tableau.com",
      category: "Visualization",
    },
    {
      title: "RStudio",
      description: "Integrated development environment for R programming.",
      url: "https://posit.co/products/open-source/rstudio",
      category: "Development",
    },
    {
      title: "Apache Airflow",
      description: "Platform to programmatically author, schedule and monitor workflows.",
      url: "https://airflow.apache.org",
      category: "Data Engineering",
    },
    {
      title: "dbt (Data Build Tool)",
      description: "Transform data in your warehouse using SQL.",
      url: "https://www.getdbt.com",
      category: "Data Engineering",
    },
    {
      title: "Hugging Face",
      description: "Platform for machine learning models and datasets.",
      url: "https://huggingface.co",
      category: "ML Framework",
    },
    {
      title: "Weights & Biases",
      description: "MLOps platform for experiment tracking and model management.",
      url: "https://wandb.ai",
      category: "MLOps",
    },
    {
      title: "DVC (Data Version Control)",
      description: "Version control system for machine learning projects.",
      url: "https://dvc.org",
      category: "MLOps",
    },
  ],
  datasets: [
    {
      title: "Data.gov",
      description: "Over 250,000 datasets from federal agencies.",
      url: "https://www.data.gov",
      category: "General",
    },
    {
      title: "Census Bureau Data",
      description: "Demographic and economic data about the United States.",
      url: "https://data.census.gov",
      category: "Demographics",
    },
    {
      title: "NASA Open Data",
      description: "Space exploration and earth science datasets.",
      url: "https://data.nasa.gov",
      category: "Science",
    },
    {
      title: "NIH Data Sharing",
      description: "Biomedical and health research datasets.",
      url: "https://sharing.nih.gov",
      category: "Health",
    },
    {
      title: "NOAA Climate Data",
      description: "Weather, climate, and oceanographic data.",
      url: "https://www.ncdc.noaa.gov",
      category: "Climate",
    },
    {
      title: "FBI Crime Data Explorer",
      description: "National crime statistics and trends.",
      url: "https://crime-data-explorer.fr.cloud.gov",
      category: "Public Safety",
    },
    {
      title: "BLS Economic Data",
      description: "Labor statistics, employment, and economic indicators.",
      url: "https://www.bls.gov/data",
      category: "Economics",
    },
    {
      title: "USA Spending",
      description: "Federal spending and contract data.",
      url: "https://www.usaspending.gov",
      category: "Government Finance",
    },
    {
      title: "CDC Data Portal",
      description: "Public health data and statistics.",
      url: "https://data.cdc.gov",
      category: "Health",
    },
    {
      title: "DOE Energy Data",
      description: "Energy production, consumption, and infrastructure data.",
      url: "https://www.energy.gov/data/open-energy-data",
      category: "Energy",
    },
  ],
  communities: [
    {
      title: "Federal CDO Council",
      description: "Community of federal Chief Data Officers.",
      url: "https://www.cdo.gov",
      category: "Professional Network",
    },
    {
      title: "Data Science Central",
      description: "Online community for data science professionals.",
      url: "https://www.datasciencecentral.com",
      category: "Online Community",
    },
    {
      title: "Kaggle",
      description: "Platform for data science competitions and learning.",
      url: "https://www.kaggle.com",
      category: "Competitions",
    },
    {
      title: "AI Ethics Lab",
      description: "Community focused on responsible AI development.",
      url: "https://aiethicslab.com",
      category: "Ethics",
    },
    {
      title: "Federal AI Community of Practice",
      description: "Cross-agency collaboration on AI initiatives.",
      url: "https://www.ai.gov/community",
      category: "Professional Network",
    },
    {
      title: "ACT-IAC",
      description: "American Council for Technology and Industry Advisory Council.",
      url: "https://www.actiac.org",
      category: "Professional Network",
    },
    {
      title: "Data Coalition",
      description: "Advocacy organization for open data and transparency.",
      url: "https://www.datacoalition.org",
      category: "Advocacy",
    },
    {
      title: "Federal Data Strategy Community",
      description: "Collaborative community implementing the Federal Data Strategy.",
      url: "https://strategy.data.gov/community",
      category: "Professional Network",
    },
    {
      title: "GitHub Government Community",
      description: "Open source collaboration among government developers.",
      url: "https://government.github.com/community",
      category: "Online Community",
    },
    {
      title: "INFORMS",
      description: "Institute for Operations Research and the Management Sciences.",
      url: "https://www.informs.org",
      category: "Professional Network",
    },
  ],
};

export default function Resources() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources & Tools</h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl">
            Curated collection of learning resources, development tools, datasets, and professional communities for federal data professionals.
          </p>
        </div>
      </section>

      {/* Resources */}
      <section className="py-12">
        <div className="container">
          <Tabs defaultValue="learning" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="learning">
                <GraduationCap className="h-4 w-4 mr-2" />
                Learning
              </TabsTrigger>
              <TabsTrigger value="tools">
                <Code className="h-4 w-4 mr-2" />
                Tools
              </TabsTrigger>
              <TabsTrigger value="datasets">
                <Database className="h-4 w-4 mr-2" />
                Datasets
              </TabsTrigger>
              <TabsTrigger value="communities">
                <Users className="h-4 w-4 mr-2" />
                Communities
              </TabsTrigger>
            </TabsList>

            <TabsContent value="learning" className="mt-6">
              <ResourceGrid resources={resources.learning} />
            </TabsContent>

            <TabsContent value="tools" className="mt-6">
              <ResourceGrid resources={resources.tools} />
            </TabsContent>

            <TabsContent value="datasets" className="mt-6">
              <ResourceGrid resources={resources.datasets} />
            </TabsContent>

            <TabsContent value="communities" className="mt-6">
              <ResourceGrid resources={resources.communities} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

function ResourceGrid({ resources }: { resources: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge variant="secondary">{resource.category}</Badge>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-lg">{resource.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription>{resource.description}</CardDescription>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary hover:underline font-medium"
            >
              Visit Resource
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
