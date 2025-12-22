import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Download,
  Trophy,
  CheckCircle,
  XCircle,
  Medal,
  Award,
  TrendingUp,
} from "lucide-react";

interface Result {
  id: string;
  studentName: string;
  studentEmail: string;
  examName: string;
  score: number;
  percentage: number;
  passed: boolean;
  rank: number;
  completedAt: string;
  eligibleForBaptism: boolean;
}

export const ResultsView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterExam, setFilterExam] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data - will be replaced with real data from backend
  const results: Result[] = [
    {
      id: "1",
      studentName: "Sarah Mitchell",
      studentEmail: "sarah.m@email.com",
      examName: "Baptism Preparation",
      score: 28,
      percentage: 93,
      passed: true,
      rank: 1,
      completedAt: "2025-12-20",
      eligibleForBaptism: true,
    },
    {
      id: "2",
      studentName: "David Lee",
      studentEmail: "david.lee@email.com",
      examName: "Baptism Preparation",
      score: 26,
      percentage: 87,
      passed: true,
      rank: 2,
      completedAt: "2025-12-20",
      eligibleForBaptism: true,
    },
    {
      id: "3",
      studentName: "Maria Garcia",
      studentEmail: "maria.g@email.com",
      examName: "Baptism Preparation",
      score: 25,
      percentage: 83,
      passed: true,
      rank: 3,
      completedAt: "2025-12-19",
      eligibleForBaptism: true,
    },
    {
      id: "4",
      studentName: "John Davis",
      studentEmail: "john.d@email.com",
      examName: "Baptism Preparation",
      score: 22,
      percentage: 73,
      passed: false,
      rank: 4,
      completedAt: "2025-12-19",
      eligibleForBaptism: false,
    },
    {
      id: "5",
      studentName: "Emily Chen",
      studentEmail: "emily.c@email.com",
      examName: "Fundamentals of Faith",
      score: 19,
      percentage: 95,
      passed: true,
      rank: 1,
      completedAt: "2025-12-18",
      eligibleForBaptism: true,
    },
  ];

  const exams = [...new Set(results.map((r) => r.examName))];

  const filteredResults = results.filter((r) => {
    const matchesSearch =
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExam = filterExam === "all" || r.examName === filterExam;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "passed" && r.passed) ||
      (filterStatus === "failed" && !r.passed);
    return matchesSearch && matchesExam && matchesStatus;
  });

  const stats = {
    totalResults: results.length,
    passed: results.filter((r) => r.passed).length,
    failed: results.filter((r) => !r.passed).length,
    averageScore: Math.round(
      results.reduce((sum, r) => sum + r.percentage, 0) / results.length
    ),
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Medal className="h-5 w-5 text-accent" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-muted-foreground" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-warning" />;
    return <span className="font-medium">#{rank}</span>;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Results & Rankings</h1>
          <p className="text-muted-foreground mt-1">
            View exam results, rankings, and baptism eligibility
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Results
        </Button>
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
                <p className="text-2xl font-bold">{stats.totalResults}</p>
                <p className="text-sm text-muted-foreground">Total Results</p>
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
              <div className="h-10 w-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.failed}</p>
                <p className="text-sm text-muted-foreground">Failed</p>
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
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterExam} onValueChange={setFilterExam}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exams</SelectItem>
                {exams.map((exam) => (
                  <SelectItem key={exam} value={exam}>
                    {exam}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card variant="elevated">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">Rank</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Exam</TableHead>
                  <TableHead className="text-center">Score</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Baptism Eligible</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        {getRankBadge(result.rank)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{result.studentName}</p>
                        <p className="text-sm text-muted-foreground">
                          {result.studentEmail}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{result.examName}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-bold text-lg">{result.percentage}%</span>
                      <p className="text-xs text-muted-foreground">
                        {result.score}/30
                      </p>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={result.passed ? "success" : "destructive"}>
                        {result.passed ? "PASSED" : "NOT PASSED"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {result.eligibleForBaptism ? (
                        <div className="flex items-center justify-center gap-1 text-success">
                          <Award className="h-4 w-4" />
                          <span className="text-sm font-medium">Eligible</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Not Eligible
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {result.completedAt}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
