import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle,
  AlertTriangle,
  Award,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
  options: string[];
}

interface ExamTakingProps {
  examId: string;
  onComplete: () => void;
}

export const ExamTaking = ({ examId, onComplete }: ExamTakingProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Mock exam data - will be replaced with real data from backend
  const exam = {
    name: "Baptism Preparation Exam",
    totalQuestions: 30,
    passingPercentage: 80,
  };

  const questions: Question[] = [
    {
      id: "1",
      text: "What is the primary significance of baptism in Christianity?",
      options: [
        "It symbolizes death to sin and resurrection to new life in Christ",
        "It is a requirement for weekly church attendance",
        "It represents membership in a social organization",
        "It has no spiritual meaning",
      ],
    },
    {
      id: "2",
      text: "According to the Bible, who baptized Jesus Christ?",
      options: [
        "The Apostle Peter",
        "John the Baptist",
        "The Apostle Paul",
        "Moses",
      ],
    },
    {
      id: "3",
      text: 'What does the Greek word "baptizo" literally mean?',
      options: [
        "To sprinkle water",
        "To immerse or submerge",
        "To bless",
        "To purify by fire",
      ],
    },
    // Add more questions as needed for demo
    ...Array.from({ length: 27 }, (_, i) => ({
      id: (i + 4).toString(),
      text: `Sample question ${i + 4} about Christian faith and baptism preparation?`,
      options: [
        "Sample option A for this question",
        "Sample option B for this question",
        "Sample option C for this question",
        "Sample option D for this question",
      ],
    })),
  ];

  // Initialize answers array
  useEffect(() => {
    setAnswers(new Array(questions.length).fill(null));
  }, [questions.length]);

  // Timer effect
  useEffect(() => {
    if (showResults) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setShowConfirmSubmit(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowResults(true);
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const progress = (answeredCount / questions.length) * 100;

  // Mock result calculation
  const correctAnswers = 25; // Would be calculated from backend
  const score = Math.round((correctAnswers / questions.length) * 100);
  const passed = score >= exam.passingPercentage;

  if (showResults) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center animate-fade-in">
        <Card variant="elevated" className="w-full max-w-lg text-center">
          <CardContent className="p-8">
            <div
              className={`h-20 w-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
                passed ? "bg-success/20" : "bg-destructive/20"
              }`}
            >
              {passed ? (
                <CheckCircle className="h-10 w-10 text-success" />
              ) : (
                <XCircle className="h-10 w-10 text-destructive" />
              )}
            </div>

            <h1 className="text-3xl font-bold mb-2">
              {passed ? "Congratulations!" : "Exam Completed"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {passed
                ? "You have successfully passed the exam!"
                : "Unfortunately, you did not reach the passing score."}
            </p>

            <div className="bg-secondary/50 rounded-xl p-6 mb-6">
              <p className="text-5xl font-bold mb-2">{score}%</p>
              <p className="text-muted-foreground">
                {correctAnswers} out of {questions.length} correct
              </p>
            </div>

            <Badge
              variant={passed ? "success" : "destructive"}
              className="text-lg px-4 py-2 mb-6"
            >
              {passed ? "PASSED" : "NOT PASSED"}
            </Badge>

            {passed && (
              <div className="bg-success/10 border border-success/30 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-success">
                  <Award className="h-5 w-5" />
                  <span className="font-semibold">
                    Eligible for Baptism Certificate
                  </span>
                </div>
              </div>
            )}

            {!passed && (
              <div className="bg-muted rounded-xl p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  You needed {exam.passingPercentage}% to pass. Please contact
                  the instructor for guidance on retaking the exam.
                </p>
              </div>
            )}

            <Button variant="gold" size="lg" className="w-full" onClick={onComplete}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold text-lg">{exam.name}</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge
                variant={timeLeft < 300 ? "destructive" : "outline"}
                className="text-lg px-4 py-2"
              >
                <Clock className="h-4 w-4 mr-2" />
                {formatTime(timeLeft)}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-1 mt-3" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card variant="elevated" className="animate-scale-in">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="muted">Question {currentQuestion + 1}</Badge>
              {answers[currentQuestion] !== null && (
                <Badge variant="success">Answered</Badge>
              )}
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {questions[currentQuestion].text}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={cn(
                  "w-full p-4 rounded-xl text-left transition-all duration-200 border-2",
                  answers[currentQuestion] === index
                    ? "border-accent bg-accent/10 shadow-md"
                    : "border-border hover:border-accent/50 hover:bg-secondary/50"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm transition-colors",
                      answers[currentQuestion] === index
                        ? "gradient-gold text-accent-foreground"
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="pt-1">{option}</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {answeredCount}/{questions.length} answered
            </span>
          </div>

          {currentQuestion < questions.length - 1 ? (
            <Button
              variant="default"
              onClick={() =>
                setCurrentQuestion((prev) =>
                  Math.min(questions.length - 1, prev + 1)
                )
              }
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              variant="gold"
              onClick={() => setShowConfirmSubmit(true)}
              disabled={isSubmitting}
            >
              <Flag className="h-4 w-4 mr-2" />
              Submit Exam
            </Button>
          )}
        </div>

        {/* Question Navigator */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-3">Question Navigator</p>
            <div className="flex flex-wrap gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-sm font-medium transition-all",
                    currentQuestion === index
                      ? "gradient-gold text-accent-foreground"
                      : answers[index] !== null
                      ? "bg-success/20 text-success"
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Confirm Submit Dialog */}
      <Dialog open={showConfirmSubmit} onOpenChange={setShowConfirmSubmit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Submit Exam?
            </DialogTitle>
            <DialogDescription>
              You have answered {answeredCount} out of {questions.length} questions.
              {answeredCount < questions.length && (
                <span className="block mt-2 text-warning">
                  Warning: You have {questions.length - answeredCount} unanswered
                  question(s).
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowConfirmSubmit(false)}
            >
              Continue Exam
            </Button>
            <Button
              variant="gold"
              className="flex-1"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Exam"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
