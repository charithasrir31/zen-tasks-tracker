import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Edit,
  Trash,
  Plus,
  Star,
  Clock,
  Calendar,
  Rocket,
  Zap,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type Priority = "low" | "medium" | "high";
type Task = {
  id: string;
  text: string;
  description: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
  dueDate?: Date;
  expanded: boolean;
};

export default function ZenTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>("medium");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [isHoveringAdd, setIsHoveringAdd] = useState(false);

  // Load tasks
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(
        parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
          expanded: false,
        }))
      );
    }
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;

    const newTaskObj: Task = {
      id: Date.now().toString(),
      text: newTask.trim(),
      description: newDescription.trim(),
      completed: false,
      priority: newTaskPriority,
      createdAt: new Date(),
      dueDate: dueDate ? new Date(dueDate) : undefined,
      expanded: false,
    };

    setTasks([newTaskObj, ...tasks]);
    setNewTask("");
    setNewDescription("");
    setNewTaskPriority("medium");
    setDueDate("");
    setShowDatePicker(false);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleExpand = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, expanded: !task.expanded } : task
      )
    );
  };

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTaskText(task.text);
    setEditedDescription(task.description);
  };

  const saveEdit = (id: string) => {
    if (editedTaskText.trim() === "") return;

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: editedTaskText.trim(),
              description: editedDescription.trim(),
            }
          : task
      )
    );
    setEditingTaskId(null);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
  };

  const changePriority = (id: string, priority: Priority) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, priority } : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "bg-gradient-to-r from-pink-500 to-purple-600 text-white";
      case "medium":
        return "bg-gradient-to-r from-amber-400 to-orange-500 text-white";
      case "low":
        return "bg-gradient-to-r from-emerald-400 to-teal-500 text-white";
      default:
        return "bg-gray-100";
    }
  };

  const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case "high":
        return <Zap className="h-3 w-3" />;
      case "medium":
        return <Star className="h-3 w-3" />;
      case "low":
        return <Sparkles className="h-3 w-3" />;
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 py-8 px-4 relative overflow-hidden">
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Nebula Clouds */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`nebula-${i}`}
            className="absolute rounded-full bg-purple-500/30 blur-3xl"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Pulsing Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
            }}
          />
        ))}

        {/* Shooting Stars */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: "2px",
              height: "2px",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: "0 0 10px 2px white",
            }}
            animate={{
              x: [0, window.innerWidth],
              y: [0, window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 5,
              repeat: Infinity,
              repeatDelay: Math.random() * 10 + 5,
            }}
          />
        ))}

        {/* Comet */}
        <motion.div
          className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full shadow-lg shadow-blue-300"
          initial={{
            x: -100,
            y: 50,
            opacity: 0,
          }}
          animate={{
            x: [0, window.innerWidth + 100],
            y: [50, window.innerHeight - 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 6,
            delay: 3,
            repeat: Infinity,
            repeatDelay: 15,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <motion.div
            className="absolute w-20 h-1 bg-gradient-to-r from-transparent to-white blur-sm"
            style={{
              transformOrigin: "left center",
            }}
            animate={{
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 6,
              delay: 3,
              repeat: Infinity,
              repeatDelay: 15,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-md mx-auto relative z-10"
      >
        <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <motion.div
              className="flex items-center justify-center gap-2 mb-2"
              whileHover={{ scale: 1.05 }}
            >
              <Rocket className="h-8 w-8 text-purple-400" />
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                ZenTask
              </h2>
            </motion.div>
            <p className="text-center text-purple-200">Cosmic Task Manager</p>
          </div>
          <div className="p-6">
            {/* Add Task Form */}
            <motion.div layout className="flex flex-col gap-3 mb-6">
              <div className="flex gap-2">
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Launch a new task..."
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  className="flex-1 px-3 py-2 border-2 border-purple-900 bg-gray-700 text-white placeholder-purple-300 rounded-md focus:outline-none focus:border-purple-500"
                />
                <motion.button
                  onClick={addTask}
                  onHoverStart={() => setIsHoveringAdd(true)}
                  onHoverEnd={() => setIsHoveringAdd(false)}
                  className={`px-3 rounded-md flex items-center justify-center ${
                    isHoveringAdd
                      ? "bg-gradient-to-r from-pink-500 to-purple-600"
                      : "bg-purple-600"
                  } text-white transition-all`}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {isHoveringAdd ? (
                      <motion.span
                        key="rocket"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <Rocket className="h-4 w-4" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="plus"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <Plus className="h-4 w-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Zen Notes"
                rows={2}
                className="px-3 py-2 border-2 border-purple-900 bg-gray-700 text-white placeholder-purple-300 rounded-md focus:outline-none focus:border-purple-500"
              />

              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {(["low", "medium", "high"] as Priority[]).map((priority) => (
                    <motion.button
                      key={priority}
                      onClick={() => setNewTaskPriority(priority)}
                      className={`px-2 py-1 text-xs rounded-full flex items-center ${
                        newTaskPriority === priority
                          ? getPriorityColor(priority) + " font-bold shadow-md"
                          : "bg-gray-700 border border-gray-600 text-gray-300"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {getPriorityIcon(priority)}
                      <span className="ml-1">{priority}</span>
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className={`ml-auto text-xs px-2 py-1 rounded-full flex items-center ${
                    dueDate
                      ? "bg-purple-900 text-purple-200 border border-purple-700"
                      : "bg-gray-700 border border-gray-600 text-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  {dueDate ? formatDate(new Date(dueDate)) : "Set date"}
                </motion.button>
              </div>

              {showDatePicker && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1 w-full px-3 py-2 bg-gray-700 border border-purple-900 text-white rounded-md"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </motion.div>
              )}
            </motion.div>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-2 mb-6">
              {(["all", "active", "completed"] as const).map((f) => (
                <motion.button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 text-xs rounded-full capitalize ${
                    filter === f
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {f}
                </motion.button>
              ))}
            </div>

            {/* Task List */}
            {tasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="relative inline-block mb-4">
                  <Rocket className="h-12 w-12 text-purple-400 mx-auto" />
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                  </motion.div>
                </div>
                <p className="text-purple-300">Your mission control is clear</p>
                <p className="text-sm text-purple-400 mt-1">
                  Add your first cosmic task above
                </p>
              </motion.div>
            ) : (
              <ul className="space-y-2">
                <AnimatePresence>
                  {filteredTasks.map((task) => (
                    <motion.li
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        x: -50,
                        transition: { duration: 0.2 },
                      }}
                      whileHover={{ scale: 1.01 }}
                      className={`rounded-lg overflow-hidden ${
                        task.completed ? "opacity-70" : ""
                      }`}
                    >
                      <div
                        className={`bg-gray-700 p-4 shadow-lg ${
                          task.completed ? "border-l-4 border-emerald-400" : ""
                        }`}
                      >
                        {editingTaskId === task.id ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-3"
                          >
                            <input
                              value={editedTaskText}
                              onChange={(e) =>
                                setEditedTaskText(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveEdit(task.id);
                                if (e.key === "Escape") cancelEdit();
                              }}
                              autoFocus
                              className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <textarea
                              value={editedDescription}
                              onChange={(e) =>
                                setEditedDescription(e.target.value)
                              }
                              rows={3}
                              className="px-3 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => saveEdit(task.id)}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => cancelEdit()}
                                className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
                              >
                                Cancel
                              </button>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            <div className="flex items-start gap-3">
                              <button
                                onClick={() => toggleTaskCompletion(task.id)}
                                className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                  task.completed
                                    ? "bg-green-400 border-green-400 text-white"
                                    : "border-gray-300 hover:border-indigo-300"
                                }`}
                              >
                                {task.completed && (
                                  <Check className="h-3 w-3" />
                                )}
                              </button>
                              <div className="flex-1">
                                <p
                                  className={`${
                                    task.completed
                                      ? "line-through text-gray-400"
                                      : "text-gray-200"
                                  }`}
                                >
                                  {task.text}
                                </p>
                                {task.dueDate && (
                                  <div className="flex items-center text-xs mt-1 text-purple-300">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Due: {formatDate(task.dueDate)}
                                    {new Date(task.dueDate) < new Date() &&
                                      !task.completed && (
                                        <span className="ml-2 text-red-400">
                                          Overdue
                                        </span>
                                      )}
                                  </div>
                                )}
                                {task.description && (
                                  <button
                                    onClick={() => toggleExpand(task.id)}
                                    className="text-xs text-purple-300 mt-2 flex items-center"
                                  >
                                    {task.expanded ? (
                                      <ChevronUp className="h-3 w-3 mr-1" />
                                    ) : (
                                      <ChevronDown className="h-3 w-3 mr-1" />
                                    )}
                                    Notes..
                                  </button>
                                )}
                              </div>
                              <div className="flex gap-1">
                                <button
                                  onClick={() => startEditing(task)}
                                  className="p-1 text-gray-400 hover:text-indigo-400 rounded-md"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => deleteTask(task.id)}
                                  className="p-1 text-gray-400 hover:text-red-400 rounded-md"
                                >
                                  <Trash className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            {task.expanded && task.description && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden ml-8"
                              >
                                <div className="mt-2 p-3 bg-gray-600 rounded-md text-sm text-gray-200">
                                  {task.description}
                                </div>
                              </motion.div>
                            )}
                            <div className="flex gap-2 ml-8">
                              {(["low", "medium", "high"] as Priority[]).map(
                                (priority) => (
                                  <button
                                    key={priority}
                                    onClick={() =>
                                      changePriority(task.id, priority)
                                    }
                                    className={`px-2 py-0.5 text-xs rounded-full border ${
                                      task.priority === priority
                                        ? getPriorityColor(priority) +
                                          " font-bold"
                                        : "bg-gray-600 border-gray-500 text-gray-300"
                                    }`}
                                  >
                                    {priority}
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}

            {/* Stats */}
            {tasks.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center"
              >
                <div className="text-sm text-purple-300 mb-1">
                  {tasks.filter((t) => t.completed).length} of {tasks.length}{" "}
                  missions completed
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        (tasks.filter((t) => t.completed).length /
                          tasks.length) *
                        100
                      }%`,
                    }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
