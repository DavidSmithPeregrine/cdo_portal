import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building2, ExternalLink, Mail, Phone, MapPin, Search } from "lucide-react";

const agencies = [
  {
    name: "Department of Defense (DoD)",
    acronym: "DoD",
    cdo: "David Spirk",
    website: "https://www.defense.gov",
    dataWebsite: "https://www.defense.gov/data",
    focus: ["AI/ML", "Cybersecurity", "Data Analytics"],
    description: "Leading federal agency in AI/ML adoption for national security applications.",
  },
  {
    name: "Department of Health and Human Services (HHS)",
    acronym: "HHS",
    cdo: "Jose Arrieta",
    website: "https://www.hhs.gov",
    dataWebsite: "https://www.healthdata.gov",
    focus: ["Healthcare Data", "Public Health Analytics", "AI in Medicine"],
    description: "Advancing data-driven healthcare and public health initiatives.",
  },
  {
    name: "Department of Veterans Affairs (VA)",
    acronym: "VA",
    cdo: "Oki Mek",
    website: "https://www.va.gov",
    dataWebsite: "https://www.data.va.gov",
    focus: ["Veterans Services", "Healthcare AI", "Benefits Analytics"],
    description: "Improving veteran services through data analytics and AI.",
  },
  {
    name: "Department of Homeland Security (DHS)",
    acronym: "DHS",
    cdo: "Jeanette Manfra",
    website: "https://www.dhs.gov",
    dataWebsite: "https://www.dhs.gov/data",
    focus: ["Border Security", "Cybersecurity", "Emergency Response"],
    description: "Protecting the homeland through advanced data analytics and AI.",
  },
  {
    name: "Department of Commerce",
    acronym: "DOC",
    cdo: "Kipp Jones",
    website: "https://www.commerce.gov",
    dataWebsite: "https://data.commerce.gov",
    focus: ["Economic Data", "Census Analytics", "Trade Intelligence"],
    description: "Driving economic growth through data-driven insights.",
  },
  {
    name: "Department of Transportation (DOT)",
    acronym: "DOT",
    cdo: "Dan Morgan",
    website: "https://www.transportation.gov",
    dataWebsite: "https://data.transportation.gov",
    focus: ["Transportation Safety", "Infrastructure Analytics", "Smart Cities"],
    description: "Modernizing transportation infrastructure with data and AI.",
  },
  {
    name: "Department of Energy (DOE)",
    acronym: "DOE",
    cdo: "Kimberly Boyd",
    website: "https://www.energy.gov",
    dataWebsite: "https://www.energy.gov/data",
    focus: ["Energy Analytics", "Climate Data", "Grid Optimization"],
    description: "Advancing clean energy through data science and AI.",
  },
  {
    name: "General Services Administration (GSA)",
    acronym: "GSA",
    cdo: "Kris Rowley",
    website: "https://www.gsa.gov",
    dataWebsite: "https://www.gsa.gov/data",
    focus: ["Government Operations", "Procurement Analytics", "Real Estate Data"],
    description: "Optimizing government operations through data-driven decision making.",
  },
  {
    name: "National Aeronautics and Space Administration (NASA)",
    acronym: "NASA",
    cdo: "Kaylin Bugbee",
    website: "https://www.nasa.gov",
    dataWebsite: "https://data.nasa.gov",
    focus: ["Space Exploration", "Earth Science", "Aeronautics Research"],
    description: "Exploring space and advancing science through data and AI.",
  },
  {
    name: "Office of Management and Budget (OMB)",
    acronym: "OMB",
    cdo: "Kris Rowley (Acting)",
    website: "https://www.whitehouse.gov/omb",
    dataWebsite: "https://www.whitehouse.gov/omb/information-regulatory-affairs",
    focus: ["Federal Data Policy", "Budget Analytics", "Regulatory Affairs"],
    description: "Setting federal data policy and governance standards.",
  },
];

export default function Directory() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAgencies = agencies.filter(
    (agency) =>
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.cdo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.focus.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Federal Agency Directory</h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl">
            Comprehensive directory of federal agencies, their Chief Data Officers, data initiatives, and contact information.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-muted/50 border-b border-border">
        <div className="container">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by agency name, CDO, or focus area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Agency Cards */}
      <section className="py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAgencies.map((agency) => (
              <Card key={agency.acronym} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <Badge variant="secondary">{agency.acronym}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{agency.name}</CardTitle>
                  <CardDescription className="text-sm">
                    CDO: <span className="font-medium text-foreground">{agency.cdo}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{agency.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {agency.focus.map((focus) => (
                      <Badge key={focus} variant="outline" className="text-xs">
                        {focus}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border">
                    <a
                      href={agency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      Agency Website
                    </a>
                    <a
                      href={agency.dataWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      Data Portal
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAgencies.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">No agencies found.</p>
              <p className="text-muted-foreground text-sm mt-2">Try a different search term!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
