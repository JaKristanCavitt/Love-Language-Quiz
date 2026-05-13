import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { questions, partnerQuestions, Answer, QuizMode } from "@/lib/quiz-data";

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<QuizMode>("self");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("quiz_mode") as QuizMode | null;
    if (saved === "partner" || saved === "self") {
      setMode(saved);
    }
  }, []);

  const activeQuestions = mode === "partner" ? partnerQuestions : questions;
  const question = activeQuestions[currentIndex];
  const isLastQuestion = currentIndex === activeQuestions.length - 1;

  const handleAnswer = (answer: Answer) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const newAnswers = [...answers, answer.type];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (isLastQuestion) {
        sessionStorage.setItem("quiz_results", JSON.stringify(newAnswers));
        setLocation("/results");
      } else {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(false);
      }
    }, 400);
  };

  const progress = ((currentIndex + 1) / activeQuestions.length) * 100;

  const modeLabel = mode === "partner" ? "Guessing for your partner" : null;

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-background relative selection:bg-primary/20">
      <header className="w-full pt-10 pb-6 px-6 flex flex-col items-center justify-center space-y-3">
        {modeLabel && (
          <span className="text-xs font-medium text-primary/70 uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            {modeLabel}
          </span>
        )}
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Question {currentIndex + 1} of {activeQuestions.length}
        </span>
        <div className="w-full max-w-md h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary/40 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full space-y-10"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-snug text-center">
              {question.text}
            </h2>

            <div className="space-y-3 w-full">
              {question.answers.map((answer, i) => (
                <motion.button
                  key={i}
                  data-testid={`answer-option-${i}`}
                  onClick={() => handleAnswer(answer)}
                  disabled={isTransitioning}
                  whileHover={{ scale: 1.01, backgroundColor: "var(--color-accent)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left p-5 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group disabled:opacity-80"
                >
                  <p className="text-lg text-foreground group-hover:text-primary transition-colors">
                    {answer.text}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
