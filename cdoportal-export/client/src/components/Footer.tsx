import { Link } from "wouter";
import { APP_TITLE } from "@/const";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-3">About {APP_TITLE}</h3>
            <p className="text-sm text-muted-foreground">
              A comprehensive AI/ML, emerging tech (AIMLET), and data community hub serving U.S. federal Chief Data Officers and their teams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/news" className="text-muted-foreground hover:text-foreground transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Policy & Guidance
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Jobs Board
                </Link>
              </li>
              <li>
                <Link href="/career-tools" className="text-muted-foreground hover:text-foreground transition-colors">
                  Career Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="mt-8 pt-8 border-t border-border space-y-3">
          <p className="text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> This site is for informational and professional development use only and is not an official government portal.
          </p>
          <p className="text-xs text-muted-foreground">
            <strong>AI Tools:</strong> All AI-generated feedback is for informational purposes and does not guarantee hiring outcomes.
          </p>
          <p className="text-xs text-muted-foreground">
            <strong>Privacy:</strong> No user-uploaded documents are stored. Resume and cover letter analysis is ephemeral and private.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          © {currentYear} {APP_TITLE}. Data: Fueling Our Future.
        </div>
      </div>
    </footer>
  );
}
