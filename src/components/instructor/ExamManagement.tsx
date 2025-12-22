import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  BookOpen,
  Clock,
  Users,
  Settings,
  Play,
  Pause,
  Trash2,
  Edit,
  FileQuestion,
  Percent,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Exam {
  id: string;
  name: string;
  totalQuestions: number;
  questionsPerExam: number;
  timeLimit: number;
  passingPercentage: number;
  isActive: boolean;
  studentsEnrolled: number;
  completions: number;
}

export const ExamManagement = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);

  const [exams, setExams] = useState<Exam[]>([
    {
      id: "1",
      name: "Baptism Preparation Exam",
      totalQuestions: 100,
      questionsPerExam: 30,
      timeLimit: 45,
      passingPercentage: 80,
      isActive: true,
      studentsEnrolled: 15,
      completions: 8,
    },
    {
      id: "2",
      name: "Fundamentals of Faith",
      totalQuestions: 60,
      questionsPerExam: 20,
      timeLimit: 30,
      passingPercentage: 75,
      isActive: true,
      studentsEnrolled: 22,
      completions: 18,
    },
    {
      id: "3",
      name: "Christian Living Assessment",
      totalQuestions: 50,
      questionsPerExam: 25,
      timeLimit: 40,
      passingPercentage: 70,
      isActive: false,
      studentsEnrolled: 10,
      completions: 10,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    totalQuestions: 100,
    questionsPerExam: 30,
    timeLimit: 45,
    passingPercentage: 80,
  });

  const handleSubmit = () => {
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Please enter an exam name",
        variant: "destructive",
      });
      return;
    }

    if (editingExam) {
      setExams(
        exams.map((e) =>
          e.id === editingExam.id
            ? { ...e, ...formData }
            : e
        )
      );
      toast({
        title: "Exam Updated",
        description: "The exam has been updated successfully.",
      });
    } else {
      setExams([
        ...exams,
        {
          id: Date.now().toString(),
          ...formData,
          isActive: false,
          studentsEnrolled: 0,
          completions: 0,
        },
      ]);
      toast({
        title: "Exam Created",
        description: "New exam has been created successfully.",
      });
    }

    setFormData({
      name: "",
      totalQuestions: 100,
      questionsPerExam: 30,
      timeLimit: 45,
      passingPercentage: 80,
    });
    setEditingExam(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (exam: Exam) => {
    setEditingExam(exam);
    setFormData({
      name: exam.name,
      totalQuestions: exam.totalQuestions,
      questionsPerExam: exam.questionsPerExam,
      timeLimit: exam.timeLimit,
      passingPercentage: exam.passingPercentage,
    });
    setIsDialogOpen(true);
  };

  const toggleExamStatus = (id: string) => {
    setExams(
      exams.map((e) =>
        e.id === id ? { ...e, isActive: !e.isActive } : e
      )
    );
    const exam = exams.find((e) => e.id === id);
    toast({
      title: exam?.isActive ? "Exam Deactivated" : "Exam Activated",
      description: exam?.isActive
        ? "Students can no longer take this exam"
        : "Students can now take this exam",
    });
  };

  const handleDelete = (id: string) => {
    setExams(exams.filter((e) => e.id !== id));
    toast({
      title: "Exam Deleted",
      description: "The exam has been removed.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Exam Management</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage examinations
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="gold"
              size="lg"
              onClick={() => {
                setEditingExam(null);
                setFormData({
                  name: "",
                  totalQuestions: 100,
                  questionsPerExam: 30,
                  timeLimit: 45,
                  passingPercentage: 80,
                });
              }}
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Exam
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingExam ? "Edit Exam" : "Create New Exam"}
              </DialogTitle>
              <DialogDescription>
                Configure the exam settings below
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="examName">Exam Name</Label>
                <Input
                  id="examName"
                  placeholder="e.g., Baptism Preparation Exam"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalQuestions">Total Questions in Bank</Label>
                  <Input
                    id="totalQuestions"
                    type="number"
                    min={1}
                    value={formData.totalQuestions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalQuestions: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="questionsPerExam">Questions per Exam</Label>
                  <Input
                    id="questionsPerExam"
                    type="number"
                    min={1}
                    value={formData.questionsPerExam}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        questionsPerExam: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    min={1}
                    value={formData.timeLimit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        timeLimit: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passingPercentage">Passing Percentage</Label>
                  <Input
                    id="passingPercentage"
                    type="number"
                    min={1}
                    max={100}
                    value={formData.passingPercentage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        passingPercentage: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Randomization Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Each student will receive {formData.questionsPerExam} randomly
                  selected questions from a pool of {formData.totalQuestions}.
                  Answer choices will also be shuffled.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="gold" className="flex-1" onClick={handleSubmit}>
                  {editingExam ? "Update Exam" : "Create Exam"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                <Play className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {exams.filter((e) => e.isActive).length}
                </p>
                <p className="text-sm text-muted-foreground">Active Exams</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {exams.reduce((sum, e) => sum + e.studentsEnrolled, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Enrolled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {exams.reduce((sum, e) => sum + e.completions, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Completions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exams List */}
      <div className="space-y-4">
        {exams.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">No exams created</h3>
              <p className="text-muted-foreground">
                Create your first exam to get started
              </p>
            </CardContent>
          </Card>
        ) : (
          exams.map((exam) => (
            <Card
              key={exam.id}
              variant="elevated"
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{exam.name}</h3>
                      <Badge variant={exam.isActive ? "success" : "muted"}>
                        {exam.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileQuestion className="h-4 w-4" />
                        <span>
                          {exam.questionsPerExam} of {exam.totalQuestions} questions
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{exam.timeLimit} minutes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Percent className="h-4 w-4" />
                        <span>{exam.passingPercentage}% to pass</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{exam.studentsEnrolled} enrolled</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 mr-4">
                      <Switch
                        checked={exam.isActive}
                        onCheckedChange={() => toggleExamStatus(exam.id)}
                      />
                      <span className="text-sm">
                        {exam.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(exam)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(exam.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
