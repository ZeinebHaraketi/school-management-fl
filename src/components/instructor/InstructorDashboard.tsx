import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FileQuestion,
  BookOpen,
  Trophy,
  TrendingUp,
  Award,
  Plus,
  ArrowRight,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface InstructorDashboardProps {
  onNavigate: (page: string) => void;
}

export const InstructorDashboard = ({ onNavigate }: InstructorDashboardProps) => {
  // Mock data - will be replaced with real data from backend
  const stats = {
    totalStudents: 45,
    totalQuestions: 120,
    activeExams: 3,
    completedExams: 12,
    eligibleForBaptism: 28,
    averageScore: 78,
  };

  const recentResults = [
    { name: "Sarah M.", exam: "Baptism Preparation", score: 92, passed: true },
    { name: "John D.", exam: "Baptism Preparation", score: 75, passed: false },
    { name: "Maria K.", exam: "Fundamentals of Faith", score: 88, passed: true },
    { name: "David L.", exam: "Baptism Preparation", score: 85, passed: true },
  ];

  const upcomingExams = [
    { name: "Baptism Preparation", students: 15, date: "Dec 28, 2025" },
    { name: "Christian Living", students: 22, date: "Jan 5, 2026" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Instructor Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's an overview of your examination portal.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card variant="elevated" className="hover:scale-[1.02] transition-transform duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold mt-1">{stats.totalStudents}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="hover:scale-[1.02] transition-transform duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Question Bank</p>
                <p className="text-3xl font-bold mt-1">{stats.totalQuestions}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <FileQuestion className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="hover:scale-[1.02] transition-transform duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Exams</p>
                <p className="text-3xl font-bold mt-1">{stats.activeExams}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="hover:scale-[1.02] transition-transform duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-3xl font-bold mt-1">{stats.averageScore}%</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="hover:scale-[1.02] transition-transform duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Exams</p>
                <p className="text-3xl font-bold mt-1">{stats.completedExams}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                <Trophy className="h-6 w-6 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="hover:scale-[1.02] transition-transform duration-300 border-2 border-success/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Eligible for Baptism</p>
                <p className="text-3xl font-bold mt-1 text-success">{stats.eligibleForBaptism}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
                <Award className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          variant="gold"
          size="xl"
          className="h-auto py-6 flex-col gap-2"
          onClick={() => onNavigate("questions")}
        >
          <Plus className="h-6 w-6" />
          <span>Add Questions</span>
        </Button>
        <Button
          variant="default"
          size="xl"
          className="h-auto py-6 flex-col gap-2"
          onClick={() => onNavigate("exams")}
        >
          <BookOpen className="h-6 w-6" />
          <span>Create Exam</span>
        </Button>
        <Button
          variant="outline"
          size="xl"
          className="h-auto py-6 flex-col gap-2"
          onClick={() => onNavigate("certificates")}
        >
          <Award className="h-6 w-6" />
          <span>View Certificates</span>
        </Button>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Results */}
        <Card variant="elevated">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Results</CardTitle>
              <CardDescription>Latest exam submissions</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("results")}>
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentResults.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                      <span className="text-primary-foreground text-sm font-medium">
                        {result.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{result.name}</p>
                      <p className="text-xs text-muted-foreground">{result.exam}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{result.score}%</span>
                    {result.passed ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card variant="elevated">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Exams</CardTitle>
              <CardDescription>Scheduled examinations</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("exams")}>
              Manage <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-border hover:border-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{exam.name}</h4>
                    <Badge variant="gold">{exam.date}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{exam.students} students enrolled</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
