import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { questions, Answer } from "@/lib/quiz-data";

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleAnswer = (answer: Answer) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newAnswers = [...answers, answer.type];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (isLastQuestion) {
        // Save results to sessionStorage so the results page can read it
        sessionStorage.setItem("quiz_results", JSON.stringify(newAnswers));
        setLocation("/results");
      } else {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(false);
      }
    }, 400); // Wait for exit animation
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-background relative selection:bg-primary/20">
      {/* Progress Header */}
      <header className="w-full pt-12 pb-6 px-6 flex flex-col items-center justify-center space-y-4">
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Question {currentIndex + 1} of {questions.length}
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

      {/* Main Quiz Area */}
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
