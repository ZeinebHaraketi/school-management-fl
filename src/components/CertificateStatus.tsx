import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  CheckCircle,
  Clock,
  Download,
  Mail,
  Phone,
  XCircle,
} from "lucide-react";

interface CertificateStatusProps {
  role: "instructor" | "student";
}

export const CertificateStatus = ({ role }: CertificateStatusProps) => {
  // Mock data - will be replaced with real data from backend
  const studentCertificateData = {
    eligible: true,
    examsPassed: 1,
    examsRequired: 1,
    passedExams: [
      { name: "Fundamentals of Faith", score: 85, date: "Dec 18, 2025" },
    ],
    certificateStatus: "pending_approval", // pending_approval, approved, issued
  };

  const eligibleStudents = [
    {
      id: "1",
      name: "Sarah Mitchell",
      email: "sarah.m@email.com",
      examsPassed: 1,
      lastExamDate: "Dec 20, 2025",
      status: "approved",
    },
    {
      id: "2",
      name: "David Lee",
      email: "david.lee@email.com",
      examsPassed: 1,
      lastExamDate: "Dec 20, 2025",
      status: "pending",
    },
    {
      id: "3",
      name: "Maria Garcia",
      email: "maria.g@email.com",
      examsPassed: 1,
      lastExamDate: "Dec 19, 2025",
      status: "pending",
    },
    {
      id: "4",
      name: "Emily Chen",
      email: "emily.c@email.com",
      examsPassed: 1,
      lastExamDate: "Dec 18, 2025",
      status: "issued",
    },
  ];

  if (role === "student") {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Certificate Status</h1>
          <p className="text-muted-foreground mt-1">
            Track your baptism certificate eligibility
          </p>
        </div>

        {/* Main Status Card */}
        <Card
          variant="elevated"
          className={`border-2 ${
            studentCertificateData.eligible
              ? "border-success/30"
              : "border-muted"
          }`}
        >
          <CardContent className="p-8 text-center">
            <div
              className={`h-24 w-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
                studentCertificateData.eligible
                  ? "bg-success/20"
                  : "bg-muted"
              }`}
            >
              {studentCertificateData.eligible ? (
                <Award className="h-12 w-12 text-success" />
              ) : (
                <Clock className="h-12 w-12 text-muted-foreground" />
              )}
            </div>

            <h2 className="text-2xl font-bold mb-2">
              {studentCertificateData.eligible
                ? "You are Eligible!"
                : "Keep Going!"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {studentCertificateData.eligible
                ? "You have successfully completed all required examinations."
                : `Complete ${studentCertificateData.examsRequired - studentCertificateData.examsPassed} more exam(s) to become eligible.`}
            </p>

            {!studentCertificateData.eligible && (
              <div className="max-w-xs mx-auto mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>
                    {studentCertificateData.examsPassed}/
                    {studentCertificateData.examsRequired} exams
                  </span>
                </div>
                <Progress
                  value={
                    (studentCertificateData.examsPassed /
                      studentCertificateData.examsRequired) *
                    100
                  }
                  className="h-2"
                />
              </div>
            )}

            {studentCertificateData.eligible && (
              <Badge
                variant={
                  studentCertificateData.certificateStatus === "issued"
                    ? "success"
                    : "gold"
                }
                className="text-base px-4 py-2"
              >
                {studentCertificateData.certificateStatus === "pending_approval"
                  ? "Pending Instructor Approval"
                  : studentCertificateData.certificateStatus === "approved"
                  ? "Approved - Certificate Being Prepared"
                  : "Certificate Issued"}
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Passed Exams */}
        {studentCertificateData.passedExams.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Completed Exams</CardTitle>
              <CardDescription>
                Exams you have successfully passed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studentCertificateData.passedExams.map((exam, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-success/10 border border-success/30"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">{exam.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {exam.date}
                        </p>
                      </div>
                    </div>
                    <Badge variant="success">{exam.score}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Card */}
        <Card variant="bordered">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Need Assistance?</h3>
            <p className="text-muted-foreground mb-4">
              If you have questions about your certificate status or need to
              retake an exam, please contact the instructor.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Contact Instructor
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Instructor View
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Certificate Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Review and manage baptism certificate eligibility
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Eligible List
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                <Award className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{eligibleStudents.length}</p>
                <p className="text-sm text-muted-foreground">Total Eligible</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {eligibleStudents.filter((s) => s.status === "pending").length}
                </p>
                <p className="text-sm text-muted-foreground">Pending Approval</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {eligibleStudents.filter((s) => s.status === "approved").length}
                </p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {eligibleStudents.filter((s) => s.status === "issued").length}
                </p>
                <p className="text-sm text-muted-foreground">Issued</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Eligible Students List */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Eligible Students</CardTitle>
          <CardDescription>
            Students who have passed all required examinations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eligibleStudents.map((student) => (
              <div
                key={student.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-border hover:border-accent/50 transition-colors gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center">
                    <span className="text-accent-foreground font-bold text-lg">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    Completed: {student.lastExamDate}
                  </div>
                  <Badge
                    variant={
                      student.status === "issued"
                        ? "success"
                        : student.status === "approved"
                        ? "default"
                        : "warning"
                    }
                  >
                    {student.status === "pending"
                      ? "Pending"
                      : student.status === "approved"
                      ? "Approved"
                      : "Issued"}
                  </Badge>
                  {student.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="success">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
