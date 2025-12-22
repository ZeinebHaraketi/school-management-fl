import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Trophy,
  Clock,
  ArrowRight,
  Award,
  CheckCircle,
  AlertCircle,
  Play,
} from "lucide-react";

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
  onStartExam: (examId: string) => void;
}

export const StudentDashboard = ({ onNavigate, onStartExam }: StudentDashboardProps) => {
  // Mock data - will be replaced with real data from backend
  const availableExams = [
    {
      id: "1",
      name: "Baptism Preparation Exam",
      questions: 30,
      timeLimit: 45,
      passingPercentage: 80,
      status: "available",
    },
    {
      id: "2",
      name: "Fundamentals of Faith",
      questions: 20,
      timeLimit: 30,
      passingPercentage: 75,
      status: "completed",
      score: 85,
      passed: true,
    },
  ];

  const recentResults = [
    {
      examName: "Fundamentals of Faith",
      score: 85,
      passed: true,
      date: "Dec 18, 2025",
      rank: 3,
    },
  ];

  const certificateStatus = {
    eligible: true,
    examsPassed: 1,
    examsRequired: 1,
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome Back!</h1>
        <p className="text-muted-foreground mt-1">
          Continue your journey towards spiritual growth
        </p>
      </div>

      {/* Certificate Status Banner */}
      <Card
        variant="elevated"
        className={`border-2 ${
          certificateStatus.eligible
            ? "border-success/30 bg-success/5"
            : "border-warning/30 bg-warning/5"
        }`}
      >
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`h-14 w-14 rounded-xl flex items-center justify-center ${
                  certificateStatus.eligible ? "bg-success/20" : "bg-warning/20"
                }`}
              >
                <Award
                  className={`h-7 w-7 ${
                    certificateStatus.eligible ? "text-success" : "text-warning"
                  }`}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {certificateStatus.eligible
                    ? "Eligible for Baptism Certificate!"
                    : "Certificate Progress"}
                </h2>
                <p className="text-muted-foreground">
                  {certificateStatus.eligible
                    ? "Congratulations! You have passed all required exams."
                    : `Complete ${certificateStatus.examsRequired - certificateStatus.examsPassed} more exam(s) to become eligible.`}
                </p>
              </div>
            </div>
            {certificateStatus.eligible && (
              <Button variant="success" onClick={() => onNavigate("certificates")}>
                View Certificate Status
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
          {!certificateStatus.eligible && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>
                  {certificateStatus.examsPassed}/{certificateStatus.examsRequired} exams
                </span>
              </div>
              <Progress
                value={
                  (certificateStatus.examsPassed / certificateStatus.examsRequired) * 100
                }
                className="h-2"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Exams */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Available Exams</h2>
          <Button variant="ghost" onClick={() => onNavigate("exams")}>
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableExams.map((exam) => (
            <Card
              key={exam.id}
              variant="elevated"
              className={`hover:shadow-lg transition-all ${
                exam.status === "completed" ? "opacity-80" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge
                      variant={exam.status === "completed" ? "success" : "gold"}
                    >
                      {exam.status === "completed" ? "Completed" : "Available"}
                    </Badge>
                    <h3 className="font-semibold text-lg mt-2">{exam.name}</h3>
                  </div>
                  {exam.status === "completed" && exam.passed && (
                    <CheckCircle className="h-6 w-6 text-success" />
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{exam.questions} questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{exam.timeLimit} minutes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    <span>{exam.passingPercentage}% to pass</span>
                  </div>
                </div>
                {exam.status === "completed" ? (
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      Score: {exam.score}%
                    </span>
                    <Badge variant={exam.passed ? "success" : "destructive"}>
                      {exam.passed ? "PASSED" : "NOT PASSED"}
                    </Badge>
                  </div>
                ) : (
                  <Button
                    variant="gold"
                    className="w-full"
                    onClick={() => onStartExam(exam.id)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Exam
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Results */}
      {recentResults.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Results</h2>
            <Button variant="ghost" onClick={() => onNavigate("results")}>
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentResults.map((result, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                          result.passed ? "bg-success/20" : "bg-destructive/20"
                        }`}
                      >
                        {result.passed ? (
                          <CheckCircle className="h-6 w-6 text-success" />
                        ) : (
                          <AlertCircle className="h-6 w-6 text-destructive" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{result.examName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {result.date} • Rank #{result.rank}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{result.score}%</p>
                      <Badge variant={result.passed ? "success" : "destructive"}>
                        {result.passed ? "PASSED" : "NOT PASSED"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Quick Info */}
      <Card variant="bordered">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Exam Guidelines</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Each exam can only be taken once unless reset by the instructor</li>
                <li>• Questions are randomly selected and shuffled for each student</li>
                <li>• Your exam will auto-submit when the time expires</li>
                <li>• You must score at least the passing percentage to be eligible for baptism</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
