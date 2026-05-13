import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { loveLanguages, LoveLanguage } from "@/lib/quiz-data";

type Scores = Record<LoveLanguage, number>;

export default function Results() {
  const [, setLocation] = useLocation();
  const [results, setResults] = useState<{
    primary: LoveLanguage;
    scores: { type: LoveLanguage; score: number; percentage: number }[];
  } | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("quiz_results");
    if (!saved) {
      setLocation("/");
      return;
    }

    const answers: LoveLanguage[] = JSON.parse(saved);
    const counts = answers.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {} as Record<LoveLanguage, number>);

    // Ensure all languages have a score
    const scores: Scores = {
      W: counts.W || 0,
      S: counts.S || 0,
      G: counts.G || 0,
      T: counts.T || 0,
      P: counts.P || 0,
    };

    const sortedScores = Object.entries(scores)
      .map(([type, score]) => ({
        type: type as LoveLanguage,
        score,
        percentage: (score / 10) * 100,
      }))
      .sort((a, b) => b.score - a.score);

    setResults({
      primary: sortedScores[0].type,
      scores: sortedScores,
    });
  }, [setLocation]);

  if (!results) return null;

  const primaryInfo = loveLanguages[results.primary];

  const handleShare = async () => {
    const text = `My primary love language is ${primaryInfo.name}! Discover yours.`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Love Language Quiz",
          text: text,
          url: window.location.origin,
        });
      } catch (err) {
        // Ignore aborts
      }
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.origin}`);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background py-12 px-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl w-full space-y-12"
      >
        <div className="text-center space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm font-medium text-muted-foreground uppercase tracking-widest"
          >
            Your Love Language Is
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            className="text-5xl md:text-6xl font-serif text-primary italic"
          >
            {primaryInfo.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-xl mx-auto"
          >
            {primaryInfo.description}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-card rounded-3xl p-6 md:p-8 shadow-sm border border-border/50 space-y-6"
        >
          <h3 className="text-xl font-serif text-foreground text-center">Your Spectrum</h3>
          <div className="space-y-4">
            {results.scores.map((item, i) => (
              <div key={item.type} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{loveLanguages[item.type].name}</span>
                  <span className="text-muted-foreground">{item.score}/10</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: 1.5 + (i * 0.1), duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full ${i === 0 ? 'bg-primary' : 'bg-primary/30'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
        >
          <button 
            onClick={handleShare}
            className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 text-lg font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            Share Results
          </button>
          <Link 
            href="/"
            onClick={() => sessionStorage.removeItem("quiz_results")}
            className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 text-lg font-medium text-foreground hover:bg-muted rounded-full transition-colors"
          >
            Retake Quiz
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
