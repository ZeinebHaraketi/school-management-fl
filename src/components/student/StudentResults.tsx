import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  CheckCircle,
  XCircle,
  Medal,
  Award,
  Calendar,
  TrendingUp,
} from "lucide-react";

export const StudentResults = () => {
  // Mock data - will be replaced with real data from backend
  const results = [
    {
      id: "1",
      examName: "Fundamentals of Faith",
      score: 85,
      percentage: 85,
      totalQuestions: 20,
      correctAnswers: 17,
      passed: true,
      rank: 3,
      totalParticipants: 22,
      completedAt: "Dec 18, 2025",
      passingPercentage: 75,
      eligibleForBaptism: true,
    },
  ];

  const stats = {
    totalExams: 1,
    passed: 1,
    averageScore: 85,
    bestRank: 3,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Results</h1>
        <p className="text-muted-foreground mt-1">
          View your exam history and performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalExams}</p>
                <p className="text-sm text-muted-foreground">Exams Taken</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.passed}</p>
                <p className="text-sm text-muted-foreground">Passed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.averageScore}%</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <Medal className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">#{stats.bestRank}</p>
                <p className="text-sm text-muted-foreground">Best Rank</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">No results yet</h3>
              <p className="text-muted-foreground">
                Complete an exam to see your results here
              </p>
            </CardContent>
          </Card>
        ) : (
          results.map((result) => (
            <Card key={result.id} variant="elevated">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Score Circle */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-24 h-24 rounded-full flex flex-col items-center justify-center ${
                        result.passed ? "bg-success/20" : "bg-destructive/20"
                      }`}
                    >
                      <span className="text-3xl font-bold">
                        {result.percentage}%
                      </span>
                      <Badge
                        variant={result.passed ? "success" : "destructive"}
                        className="mt-1"
                      >
                        {result.passed ? "PASSED" : "FAILED"}
                      </Badge>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {result.examName}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Correct Answers</p>
                        <p className="font-semibold">
                          {result.correctAnswers}/{result.totalQuestions}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Class Rank</p>
                        <p className="font-semibold flex items-center gap-1">
                          <Medal className="h-4 w-4 text-accent" />
                          #{result.rank} of {result.totalParticipants}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Pass Requirement</p>
                        <p className="font-semibold">
                          {result.passingPercentage}%
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Completed</p>
                        <p className="font-semibold flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {result.completedAt}
                        </p>
                      </div>
                    </div>

                    {result.eligibleForBaptism && (
                      <div className="mt-4 p-3 bg-success/10 border border-success/30 rounded-lg inline-flex items-center gap-2">
                        <Award className="h-5 w-5 text-success" />
                        <span className="font-medium text-success">
                          Eligible for Baptism Certificate
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
