import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, FileText, MessageSquare, Sparkles, CheckCircle2 } from "lucide-react";
import { Streamdown } from "streamdown";

export default function CareerTools() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-10 w-10" />
            <h1 className="text-4xl md:text-5xl font-bold">AI Career Tools</h1>
          </div>
          <p className="text-xl text-primary-foreground/90 max-w-3xl">
            Leverage AI-powered tools to enhance your federal career journey. Get resume feedback, prepare for interviews, and receive personalized career guidance.
          </p>
        </div>
      </section>

      {/* Tools */}
      <section className="py-12">
        <div className="container">
          <Tabs defaultValue="resume" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
              <TabsTrigger value="resume">Resume Review</TabsTrigger>
              <TabsTrigger value="interview">Interview Prep</TabsTrigger>
            </TabsList>

            <TabsContent value="resume" className="mt-6">
              <ResumeReview />
            </TabsContent>

            <TabsContent value="interview" className="mt-6">
              <InterviewPrep />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

function ResumeReview() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [feedback, setFeedback] = useState("");

  const reviewMutation = trpc.career.reviewResume.useMutation({
    onSuccess: (data: any) => {
      setFeedback(data.feedback as string);
    },
  });

  const handleReview = () => {
    if (!resumeText.trim()) {
      return;
    }
    reviewMutation.mutate({ resumeText, jobDescription: jobDescription || undefined });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Your Resume
          </CardTitle>
          <CardDescription>
            Paste your resume text below. Include your experience, skills, and education.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resume">Resume Text *</Label>
            <Textarea
              id="resume"
              placeholder="Paste your resume here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-desc">Target Job Description (Optional)</Label>
            <Textarea
              id="job-desc"
              placeholder="Paste the job description you're targeting for tailored feedback..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[150px] font-mono text-sm"
            />
          </div>
          <Button
            onClick={handleReview}
            disabled={!resumeText.trim() || reviewMutation.isPending}
            className="w-full"
          >
            {reviewMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Get AI Feedback
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            AI Feedback
          </CardTitle>
          <CardDescription>
            Personalized recommendations to improve your resume for federal positions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reviewMutation.isPending ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : feedback ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <Streamdown>{feedback}</Streamdown>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Your AI-generated feedback will appear here.</p>
              <p className="text-sm mt-2">Submit your resume to get started!</p>
            </div>
          )}
          {reviewMutation.isError && (
            <div className="text-destructive text-sm mt-4">
              Error: {reviewMutation.error.message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function InterviewPrep() {
  const [jobTitle, setJobTitle] = useState("");
  const [agency, setAgency] = useState("");
  const [questions, setQuestions] = useState("");

  const prepMutation = trpc.career.prepareInterview.useMutation({
    onSuccess: (data: any) => {
      setQuestions(data.questions as string);
    },
  });

  const handlePrep = () => {
    if (!jobTitle.trim()) {
      return;
    }
    prepMutation.mutate({ jobTitle, agency: agency || undefined });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Interview Details
          </CardTitle>
          <CardDescription>
            Tell us about the position you're interviewing for.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="job-title">Job Title *</Label>
            <Textarea
              id="job-title"
              placeholder="e.g., Data Scientist, Chief Data Officer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agency-name">Agency (Optional)</Label>
            <Textarea
              id="agency-name"
              placeholder="e.g., Department of Defense, HHS"
              value={agency}
              onChange={(e) => setAgency(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          <Button
            onClick={handlePrep}
            disabled={!jobTitle.trim() || prepMutation.isPending}
            className="w-full"
          >
            {prepMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Practice Questions
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Practice Questions
          </CardTitle>
          <CardDescription>
            AI-generated interview questions tailored to your target position.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {prepMutation.isPending ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : questions ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <Streamdown>{questions}</Streamdown>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Your practice questions will appear here.</p>
              <p className="text-sm mt-2">Enter job details to get started!</p>
            </div>
          )}
          {prepMutation.isError && (
            <div className="text-destructive text-sm mt-4">
              Error: {prepMutation.error.message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
