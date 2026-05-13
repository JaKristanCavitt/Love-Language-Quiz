import { useLocation } from "wouter";
import { motion } from "framer-motion";
import type { QuizMode } from "@/lib/quiz-data";

export default function Home() {
  const [, setLocation] = useLocation();

  const handleStart = (mode: QuizMode) => {
    sessionStorage.setItem("quiz_mode", mode);
    sessionStorage.removeItem("quiz_results");
    setLocation("/quiz");
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full text-center relative z-10 space-y-10"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl font-serif text-foreground leading-tight">
              How do you <br />
              <span className="italic text-primary">love?</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Ten thoughtful questions to reveal the way you — or the one you love — most deeply gives and receives love.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Who is this quiz for?
          </p>

          <div className="flex flex-col gap-3">
            <button
              data-testid="button-start-self"
              onClick={() => handleStart("self")}
              className="w-full inline-flex flex-col items-center justify-center py-5 px-8 text-primary-foreground bg-primary hover:bg-primary/90 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
            >
              <span className="text-lg font-medium">Discover my love language</span>
              <span className="text-sm text-primary-foreground/70 mt-1">Answer as yourself</span>
            </button>

            <button
              data-testid="button-start-partner"
              onClick={() => handleStart("partner")}
              className="w-full inline-flex flex-col items-center justify-center py-5 px-8 text-foreground bg-card hover:bg-accent border border-border/60 hover:border-primary/30 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
            >
              <span className="text-lg font-medium">Guess my partner's love language</span>
              <span className="text-sm text-muted-foreground mt-1">Answer based on how they behave</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
