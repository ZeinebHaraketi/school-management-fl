import { useState } from "react";
import { AuthForm } from "@/components/AuthForm";
import { DashboardLayout } from "@/components/DashboardLayout";
import { InstructorDashboard } from "@/components/instructor/InstructorDashboard";
import { QuestionBank } from "@/components/instructor/QuestionBank";
import { ExamManagement } from "@/components/instructor/ExamManagement";
import { ResultsView } from "@/components/instructor/ResultsView";
import { StudentDashboard } from "@/components/student/StudentDashboard";
import { StudentResults } from "@/components/student/StudentResults";
import { ExamTaking } from "@/components/student/ExamTaking";
import { CertificateStatus } from "@/components/CertificateStatus";
import { useToast } from "@/hooks/use-toast";

type UserRole = "instructor" | "student" | null;

const Index = () => {
  const [user, setUser] = useState<{
    email: string;
    role: UserRole;
    name: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [takingExam, setTakingExam] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLogin = (email: string, password: string, role: "instructor" | "student") => {
    // Mock login - will be replaced with real auth
    setUser({
      email,
      role,
      name: email.split("@")[0],
    });
    setCurrentPage("dashboard");
    toast({
      title: "Welcome!",
      description: `Logged in successfully as ${role}`,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("dashboard");
    setTakingExam(null);
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  const handleStartExam = (examId: string) => {
    setTakingExam(examId);
  };

  const handleExamComplete = () => {
    setTakingExam(null);
    setCurrentPage("results");
  };

  // Show login if not authenticated
  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  // Show exam taking view
  if (takingExam) {
    return <ExamTaking examId={takingExam} onComplete={handleExamComplete} />;
  }

  // Render the appropriate content based on role and current page
  const renderContent = () => {
    if (user.role === "instructor") {
      switch (currentPage) {
        case "dashboard":
          return <InstructorDashboard onNavigate={setCurrentPage} />;
        case "questions":
          return <QuestionBank />;
        case "exams":
          return <ExamManagement />;
        case "results":
          return <ResultsView />;
        case "certificates":
          return <CertificateStatus role="instructor" />;
        case "students":
          return (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold">Student Management</h1>
              <p className="text-muted-foreground mt-1">Coming soon...</p>
            </div>
          );
        case "settings":
          return (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground mt-1">Coming soon...</p>
            </div>
          );
        default:
          return <InstructorDashboard onNavigate={setCurrentPage} />;
      }
    } else {
      switch (currentPage) {
        case "dashboard":
          return (
            <StudentDashboard
              onNavigate={setCurrentPage}
              onStartExam={handleStartExam}
            />
          );
        case "exams":
          return (
            <StudentDashboard
              onNavigate={setCurrentPage}
              onStartExam={handleStartExam}
            />
          );
        case "results":
          return <StudentResults />;
        case "certificates":
          return <CertificateStatus role="student" />;
        default:
          return (
            <StudentDashboard
              onNavigate={setCurrentPage}
              onStartExam={handleStartExam}
            />
          );
      }
    }
  };

  return (
    <DashboardLayout
      role={user.role!}
      userName={user.name}
      onLogout={handleLogout}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default Index;
