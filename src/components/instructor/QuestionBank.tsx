import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  Search,
  Edit,
  Trash2,
  CheckCircle,
  FileQuestion,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export const QuestionBank = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Mock data - will be replaced with real data from backend
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      text: "What is the significance of baptism in Christianity?",
      options: [
        "It's a symbolic act of cleansing and rebirth",
        "It's a requirement for attending church",
        "It has no spiritual significance",
        "It's only for children",
      ],
      correctAnswer: 0,
      category: "Baptism",
    },
    {
      id: "2",
      text: "Who baptized Jesus Christ?",
      options: ["Peter", "John the Baptist", "Paul", "Moses"],
      correctAnswer: 1,
      category: "Biblical History",
    },
    {
      id: "3",
      text: "According to the Bible, what does baptism represent?",
      options: [
        "Graduation from faith studies",
        "Death and resurrection with Christ",
        "Membership in a church",
        "A family tradition",
      ],
      correctAnswer: 1,
      category: "Baptism",
    },
  ]);

  const [formData, setFormData] = useState({
    text: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    category: "",
  });

  const handleSubmit = () => {
    if (!formData.text || formData.options.some((opt) => !opt) || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (editingQuestion) {
      setQuestions(
        questions.map((q) =>
          q.id === editingQuestion.id
            ? { ...q, ...formData }
            : q
        )
      );
      toast({
        title: "Question Updated",
        description: "The question has been updated successfully.",
      });
    } else {
      setQuestions([
        ...questions,
        {
          id: Date.now().toString(),
          ...formData,
        },
      ]);
      toast({
        title: "Question Added",
        description: "New question has been added to the bank.",
      });
    }

    setFormData({
      text: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      category: "",
    });
    setEditingQuestion(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      text: question.text,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      category: question.category,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
    toast({
      title: "Question Deleted",
      description: "The question has been removed from the bank.",
    });
  };

  const filteredQuestions = questions.filter(
    (q) =>
      q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(questions.map((q) => q.category))];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Question Bank</h1>
          <p className="text-muted-foreground mt-1">
            Manage your examination questions
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="gold"
              size="lg"
              onClick={() => {
                setEditingQuestion(null);
                setFormData({
                  text: "",
                  options: ["", "", "", ""],
                  correctAnswer: 0,
                  category: "",
                });
              }}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingQuestion ? "Edit Question" : "Add New Question"}
              </DialogTitle>
              <DialogDescription>
                {editingQuestion
                  ? "Update the question details below"
                  : "Create a new multiple-choice question"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Baptism, Biblical History"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="question">Question Text</Label>
                <Textarea
                  id="question"
                  placeholder="Enter your question here..."
                  rows={3}
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                />
              </div>
              <div className="space-y-4">
                <Label>Answer Options</Label>
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, correctAnswer: index })
                      }
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        formData.correctAnswer === index
                          ? "border-success bg-success text-success-foreground"
                          : "border-border hover:border-success/50"
                      }`}
                    >
                      {formData.correctAnswer === index && (
                        <CheckCircle className="h-5 w-5" />
                      )}
                    </button>
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...formData.options];
                        newOptions[index] = e.target.value;
                        setFormData({ ...formData, options: newOptions });
                      }}
                    />
                  </div>
                ))}
                <p className="text-sm text-muted-foreground">
                  Click the circle to mark the correct answer
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
                  {editingQuestion ? "Update Question" : "Add Question"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats & Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <FileQuestion className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{questions.length}</p>
                <p className="text-sm text-muted-foreground">Total Questions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="md:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions or categories..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={!searchQuery ? "gold" : "outline"}
          className="cursor-pointer"
          onClick={() => setSearchQuery("")}
        >
          All ({questions.length})
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category}
            variant={searchQuery === category ? "gold" : "outline"}
            className="cursor-pointer"
            onClick={() => setSearchQuery(category)}
          >
            {category} ({questions.filter((q) => q.category === category).length})
          </Badge>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileQuestion className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">No questions found</h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? "Try a different search term"
                  : "Add your first question to get started"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredQuestions.map((question, index) => (
            <Card
              key={question.id}
              variant="elevated"
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="muted">{question.category}</Badge>
                      <span className="text-sm text-muted-foreground">
                        #{index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-4">{question.text}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-lg text-sm ${
                            optIndex === question.correctAnswer
                              ? "bg-success/10 text-success border border-success/30"
                              : "bg-secondary/50"
                          }`}
                        >
                          <span className="font-medium mr-2">
                            {String.fromCharCode(65 + optIndex)}.
                          </span>
                          {option}
                          {optIndex === question.correctAnswer && (
                            <CheckCircle className="inline-block h-4 w-4 ml-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(question)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(question.id)}
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
