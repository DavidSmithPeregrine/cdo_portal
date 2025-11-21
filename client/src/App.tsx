import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import News from "./pages/News";
import Policy from "./pages/Policy";
import Jobs from "./pages/Jobs";
import CareerTools from "./pages/CareerTools";
import Directory from "./pages/Directory";
import Resources from "./pages/Resources";
import AskAI from "./pages/AskAI";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Router() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/news"} component={News} />
          <Route path={"/policy"} component={Policy} />
          <Route path={"/jobs"} component={Jobs} />
          <Route path={"/career-tools"} component={CareerTools} />
          <Route path={"/directory"} component={Directory} />
          <Route path={"/resources"} component={Resources} />
          <Route path={"/ask-ai"} component={AskAI} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
