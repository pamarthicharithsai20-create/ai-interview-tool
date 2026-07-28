import { useEffect, useRef, useState } from "react";
import "./App.css";

const roles = [
  "Python Developer",
  "Java Developer",
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "Data Analyst",
  "Data Scientist",
  "DevOps Engineer",
  "QA / Test Engineer",
];

// ==================== PERSONAL QUESTIONS ====================
const personalQuestions = [
  "Tell me about yourself.",
  "Why do you want to work at this company?",
  "What are your strengths and weaknesses?",
  "Where do you see yourself in 5 years?",
  "Why should we hire you?",
  "What motivates you?",
  "What are your career goals?",
  "How do you handle pressure or stressful situations?",
];

// ==================== 25 TECHNICAL QUESTIONS PER ROLE ====================
const technicalQuestionsByRole = {
  "Python Developer": [
    "Explain the difference between list and tuple in Python.",
    "What are decorators in Python?",
    "Explain list comprehension with an example.",
    "What is the difference between deep copy and shallow copy?",
    "What is the Global Interpreter Lock (GIL) in Python?",
    "Explain the difference between *args and **kwargs.",
    "What are generators in Python?",
    "Explain exception handling in Python.",
    "What is the difference between @staticmethod and @classmethod?",
    "How does Python manage memory?",
    "What is the difference between mutable and immutable objects?",
    "Explain Python's garbage collector.",
    "What is a lambda function?",
    "Explain the difference between == and is in Python.",
    "What are Python context managers?",
    "What is the difference between a module and a package?",
    "Explain monkey patching in Python.",
    "What is the difference between multithreading and multiprocessing?",
    "What are Python magic/dunder methods?",
    "How do you handle circular imports?",
    "Explain duck typing in Python.",
    "How does Python's dictionary work internally?",
    "Explain synchronous vs asynchronous programming in Python.",
    "How would you optimize a slow Python script?",
    "What are Python data classes?",
  ],

  "Java Developer": [
    "Explain method overloading and overriding in Java.",
    "What is the difference between abstract class and interface?",
    "What is the difference between JDK, JRE, and JVM?",
    "Explain garbage collection in Java.",
    "What are the four pillars of OOP?",
    "What is the difference between == and .equals()?",
    "Explain checked vs unchecked exceptions.",
    "What is the difference between ArrayList and LinkedList?",
    "Explain multithreading and synchronization in Java.",
    "What is the difference between final, finally, and finalize?",
    "What is the difference between HashMap and TreeMap?",
    "Explain Java Generics.",
    "What is the difference between HashSet and TreeSet?",
    "Explain the Java Memory Model.",
    "What is the purpose of the 'volatile' keyword?",
    "Explain composition vs inheritance.",
    "What are Java Streams?",
    "Explain the Singleton design pattern.",
    "What is the difference between a constructor and a method?",
    "Explain try-with-resources.",
    "What is dependency injection in Java?",
    "Explain fail-fast vs fail-safe iterators.",
    "What is reflection in Java?",
    "Explain thread pools and ExecutorService.",
    "How does Java achieve platform independence?",
  ],

  "Frontend Developer": [
    "Explain the difference between let, var and const in JavaScript.",
    "What is the Virtual DOM in React?",
    "What is the difference between props and state?",
    "Explain event bubbling and delegation.",
    "What are React hooks?",
    "What is the difference between Flexbox and Grid?",
    "Explain the browser rendering pipeline.",
    "What is debouncing and throttling?",
    "What is a closure in JavaScript?",
    "Explain hoisting in JavaScript.",
    "What is the difference between synchronous and asynchronous JS?",
    "Explain Promises vs async/await.",
    "What is the difference between controlled and uncontrolled components?",
    "Explain useMemo and useCallback.",
    "What is the difference between client-side and server-side routing?",
    "Explain localStorage, sessionStorage, and cookies.",
    "Explain React's reconciliation algorithm.",
    "What is CSS specificity?",
    "Explain lazy loading and code splitting.",
    "What is the difference between REST and GraphQL from frontend?",
    "What is the purpose of a CSS preprocessor?",
    "Explain accessibility best practices.",
    "What is the difference between inline, block, and inline-block?",
    "How does the JavaScript event loop work?",
    "What is prop drilling and how to avoid it?",
  ],

  "Backend Developer": [
    "Explain REST API architecture.",
    "What is the difference between SQL and NoSQL?",
    "How does JWT authentication work?",
    "Explain database indexing.",
    "What is the difference between authentication and authorization?",
    "Explain database normalization.",
    "What are microservices?",
    "Explain ACID properties.",
    "What is the difference between a primary key and foreign key?",
    "Explain database transactions.",
    "What is connection pooling?",
    "Explain horizontal vs vertical sharding.",
    "What is the CAP theorem?",
    "Explain rate limiting in APIs.",
    "What is the difference between session and token authentication?",
    "Explain idempotency in API design.",
    "What is a message queue?",
    "Explain the difference between PUT and PATCH.",
    "What is the N+1 query problem?",
    "Explain database replication.",
    "What is the difference between stateless and stateful services?",
    "Explain optimistic vs pessimistic locking.",
    "What is the purpose of an API gateway?",
    "Explain webhooks.",
    "How would you secure sensitive data in a database?",
  ],

  "Full-Stack Developer": [
    "Explain REST API architecture.",
    "What is the Virtual DOM in React?",
    "How does JWT authentication work?",
    "What is the difference between server-side and client-side rendering?",
    "Explain how you would design a login system end to end.",
    "What is CORS and why does it matter?",
    "Explain MVC architecture.",
    "How do you handle state management?",
    "What is the difference between monolithic and microservices?",
    "Explain folder structure for a full-stack project.",
    "What is the difference between GET and POST?",
    "Explain pagination in full-stack apps.",
    "How would you design a real-time chat feature?",
    "What is the role of an ORM?",
    "Explain how you would handle file uploads.",
    "What is the difference between client-side and server-side validation?",
    "Explain role-based access control (RBAC).",
    "What is the difference between REST and GraphQL?",
    "How would you deploy a full-stack application?",
    "Explain environment variables.",
    "How would you design a many-to-many relationship?",
    "Explain unit, integration, and E2E testing.",
    "How would you implement caching in full-stack apps?",
    "What is the difference between WebSockets and HTTP?",
    "How would you secure a full-stack app against XSS and CSRF?",
  ],

  "Data Analyst": [
    "Explain different types of SQL JOINs.",
    "What is the difference between GROUP BY and HAVING?",
    "How do you handle missing data?",
    "Explain correlation vs causation.",
    "What is a pivot table?",
    "Explain bar chart vs histogram.",
    "How would you clean a messy dataset?",
    "Explain mean, median, and mode.",
    "How do you detect outliers?",
    "What is a KPI?",
    "Explain subquery vs JOIN.",
    "What is data normalization?",
    "Explain quantitative vs qualitative data.",
    "How would you design a dashboard?",
    "What is A/B testing?",
    "Explain window functions in SQL.",
    "What is the difference between structured and unstructured data?",
    "Explain statistical significance.",
    "What is data wrangling?",
    "How would you validate a dataset?",
    "Explain data warehouse vs database.",
    "How do you analyze time-series data?",
    "Explain standard deviation.",
    "What is cohort analysis?",
    "How do you choose the right chart type?",
  ],

  "Data Scientist": [
    "Explain the bias-variance tradeoff.",
    "What is the difference between supervised and unsupervised learning?",
    "Explain overfitting and how to prevent it.",
    "What is cross-validation?",
    "Explain precision and recall.",
    "What is regularization (L1 vs L2)?",
    "Explain how a decision tree works.",
    "What is the difference between bagging and boosting?",
    "What is feature engineering?",
    "What is a confusion matrix?",
    "Explain gradient descent.",
    "What is the curse of dimensionality?",
    "How do you handle imbalanced classes?",
    "Explain hyperparameter tuning.",
    "What is the ROC curve and AUC?",
    "Explain batch vs stochastic gradient descent.",
    "What is ensemble learning?",
    "Explain the difference between clustering and classification.",
    "What is transfer learning?",
    "What is data leakage?",
    "Explain feature scaling.",
    "What is the difference between a validation set and test set?",
    "Explain model interpretability vs accuracy.",
    "What is the difference between parametric and non-parametric models?",
    "How would you evaluate a model in production?",
  ],

  "DevOps Engineer": [
    "What is Docker and how is it different from a VM?",
    "Explain the difference between CI and CD.",
    "What is Kubernetes?",
    "Explain Infrastructure as Code.",
    "What is a CI/CD pipeline?",
    "Explain horizontal vs vertical scaling.",
    "What is the purpose of a load balancer?",
    "Explain blue-green vs canary deployment.",
    "What is monitoring and logging?",
    "What is the difference between a Docker image and container?",
    "Explain immutable infrastructure.",
    "What is a reverse proxy?",
    "Explain how you would design a rollback strategy.",
    "What is the difference between public, private, and hybrid cloud?",
    "Explain auto-scaling.",
    "What is the difference between configuration management and orchestration?",
    "Explain secrets management in CI/CD.",
    "What are readiness and liveness probes in Kubernetes?",
    "What is a service mesh?",
    "Explain GitOps.",
    "What is the difference between vertical and horizontal pod autoscaling?",
    "How would you set up alerting?",
    "Explain namespaces in Kubernetes.",
    "What is the principle of least privilege?",
    "Explain logs, metrics, and traces.",
  ],

  "QA / Test Engineer": [
    "What is the difference between verification and validation?",
    "Explain the bug life cycle.",
    "What is the difference between manual and automated testing?",
    "Explain smoke testing vs regression testing.",
    "What is the difference between black-box and white-box testing?",
    "What is boundary value analysis?",
    "Explain unit testing vs integration testing.",
    "What is exploratory testing?",
    "What is the difference between severity and priority?",
    "Explain equivalence partitioning.",
    "What is test-driven development (TDD)?",
    "Explain load testing vs stress testing.",
    "How do you write a good bug report?",
    "What is a traceability matrix?",
    "Explain positive vs negative testing.",
    "How would you test an API?",
    "What is test data management?",
    "Explain static vs dynamic testing.",
    "How do you decide when a feature is ready to ship?",
    "What is sanity testing?",
    "Explain defect density.",
    "How would you set up automated regression in CI/CD?",
    "What is the difference between mocking and stubbing?",
    "Explain accessibility testing.",
    "What is risk-based testing?",
  ],
};

function App() {
  const [role, setRole] = useState("Python Developer");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const [recordingQuestion, setRecordingQuestion] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const [timeLeft, setTimeLeft] = useState(120);
  const timerRef = useRef(null);

  const [interviewTimeLeft, setInterviewTimeLeft] = useState(600);
  const interviewTimerRef = useRef(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [interviewCompleted, setInterviewCompleted] = useState(false);

  const [answersAnalysed, setAnswersAnalysed] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [recentFeedback, setRecentFeedback] = useState([]);

  const recognitionRef = useRef(null);
  const keepRecordingRef = useRef(false);
  // Holds only the CONFIRMED ("final") transcript text for the question
  // currently being recorded. Interim (still-being-guessed) text is kept
  // separate and never gets baked into this permanently.
  const finalTranscriptRef = useRef("");

  // ==================== GET 7 QUESTIONS (2 Personal + 5 Technical) ====================
  function startInterview() {
    setLoading(true);
    setAnswers({});
    setFeedback({});
    setAnswersAnalysed(0);
    setAverageScore(0);
    setBestScore(0);
    setRecentFeedback([]);
    setCurrentQuestionIndex(0);
    setTimeLeft(120);
    setInterviewCompleted(false);
    setInterviewTimeLeft(600);

    if (interviewTimerRef.current) clearInterval(interviewTimerRef.current);
    interviewTimerRef.current = setInterval(() => {
      setInterviewTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // 2 Personal + 5 Technical
    const shuffledPersonal = [...personalQuestions].sort(() => Math.random() - 0.5).slice(0, 2);
    const techQuestions = technicalQuestionsByRole[role] || technicalQuestionsByRole["Python Developer"];
    const shuffledTechnical = [...techQuestions].sort(() => Math.random() - 0.5).slice(0, 5);

    const selectedQuestions = [...shuffledPersonal, ...shuffledTechnical];
    setQuestions(selectedQuestions);
    setLoading(false);
  }

  function updateAnswer(question, value) {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  }

  function startTimer(question) {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(120);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          stopRecording();

          const currentQ = questions[currentQuestionIndex];
          if (answers[currentQ]?.trim()) {
            analyzeSingleAnswer(currentQ);
          }

          if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
              setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
              setTimeLeft(120);
            }, 800);
          } else {
            setTimeout(() => setInterviewCompleted(true), 800);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  const startingRecognitionRef = useRef(false);

  async function startRecording(question) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition isn't supported in this browser. Please use Google Chrome.");
      return;
    }

    // Prevent double-start if a click lands while a previous session is
    // still spinning up or tearing down.
    if (startingRecognitionRef.current || isRecording) return;
    startingRecognitionRef.current = true;

    // Explicitly ask for mic permission first. This is the step that was
    // missing — without it, a permission denial or missing mic fails
    // completely silently inside recognition.start()'s try/catch.
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // We only needed this to trigger/confirm the permission prompt and
      // catch failures early — release the mic immediately, the
      // SpeechRecognition API opens its own audio stream internally.
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      startingRecognitionRef.current = false;
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        alert(
          "Microphone access is blocked. Click the 🔒/🎤 icon in the address bar, allow microphone access for this site, then try again."
        );
      } else if (err.name === "NotFoundError") {
        alert("No microphone was found on this device. Please connect one and try again.");
      } else {
        alert("Couldn't access the microphone: " + err.message);
      }
      return;
    }

    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognitionRef.current = recognition;
    keepRecordingRef.current = true;

    // Seed with whatever text already exists for this question (e.g. typed
    // manually, or left over from a previous recording pass), so we build
    // on top of it instead of losing it.
    finalTranscriptRef.current = answers[question] ? answers[question] + " " : "";

    recognition.onresult = (event) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const piece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          // Confirmed text — commit it permanently, exactly once.
          finalTranscriptRef.current += piece + " ";
        } else {
          // Still-being-refined text — show it, but don't commit it yet.
          interimTranscript += piece;
        }
      }

      setAnswers((prev) => ({
        ...prev,
        [question]: (finalTranscriptRef.current + interimTranscript).trim(),
      }));
    };

    recognition.onerror = (event) => {
      // "no-speech" fires often during natural pauses; harmless, ignore it.
      if (event.error === "no-speech") return;

      console.log("Speech recognition error:", event.error);
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        alert("Microphone access was blocked. Allow it in your browser's site settings and try again.");
        keepRecordingRef.current = false;
        setIsRecording(false);
        setRecordingQuestion(null);
      } else if (event.error === "audio-capture") {
        alert("No microphone was found. Please check your device.");
        keepRecordingRef.current = false;
        setIsRecording(false);
        setRecordingQuestion(null);
      } else if (event.error === "network") {
        alert("Speech recognition needs an internet connection. Please check yours and try again.");
      }
    };

    recognition.onstart = () => {
      startingRecognitionRef.current = false;
    };

    recognition.onend = () => {
      if (keepRecordingRef.current) {
        try { recognition.start(); } catch {}
      }
    };

    setRecordingQuestion(question);
    setIsRecording(true);
    startTimer(question);

    try {
      recognition.start();
    } catch (error) {
      startingRecognitionRef.current = false;
      console.log(error);
      alert("Couldn't start speech recognition: " + error.message);
      setIsRecording(false);
      setRecordingQuestion(null);
    }
  }

  function stopRecording() {
    keepRecordingRef.current = false;
    setIsRecording(false);
    setRecordingQuestion(null);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimeLeft(120);

    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
  }

  async function requestAnalysis(question, answer) {
    const response = await fetch("http://127.0.0.1:8001/analyze-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer }),
    });

    const rawBody = await response.text();
    let data;

    try {
      data = JSON.parse(rawBody);
    } catch {
      throw new Error(
        `The analysis server returned an invalid response (HTTP ${response.status}). Make sure it is running at http://127.0.0.1:8001.`
      );
    }

    if (!response.ok) {
      throw new Error(data.detail || data.message || "Analysis request failed.");
    }

    if (typeof data.score !== "number") {
      throw new Error("The analysis server response is missing a numeric score.");
    }

    return data;
  }

  async function analyzeSingleAnswer(question) {
    const answer = answers[question]?.trim();
    if (!answer) return;

    try {
      const data = await requestAnalysis(question, answer);

      setFeedback((prev) => ({ ...prev, [question]: data }));
      setAnswersAnalysed((previousCount) => {
        const nextCount = previousCount + 1;
        setAverageScore((previousAverage) =>
          Math.round(
            (previousAverage * previousCount + data.score) / nextCount
          )
        );
        return nextCount;
      });
      setBestScore((previousBest) => Math.max(previousBest, data.score));
      setRecentFeedback((prev) =>
        [`${question} - ${data.score}/100`, ...prev].slice(0, 5)
      );
    } catch (error) {
      console.error("Auto analysis failed:", error);
      alert(`Could not analyze this answer: ${error.message}`);
    }
  }

  async function analyzeAllAnswers() {
    const answerEntries = questions
      .map((question) => ({
        question,
        answer: answers[question]?.trim() || "",
      }))
      .filter(({ answer }) => answer);

    if (answerEntries.length === 0) {
      alert("Please enter at least one answer before submitting.");
      return;
    }

    setAnalyzing(true);

    try {
      const results = await Promise.all(
        answerEntries.map(async ({ question, answer }) => ({
          question,
          data: await requestAnalysis(question, answer),
        }))
      );

      const newFeedback = Object.fromEntries(
        results.map(({ question, data }) => [question, data])
      );
      const scores = results.map(({ data }) => data.score);
      const totalScore = scores.reduce((sum, score) => sum + score, 0);

      setFeedback(newFeedback);
      setAnswersAnalysed(results.length);
      setBestScore(Math.max(...scores));
      setAverageScore(Math.round(totalScore / results.length));
      setRecentFeedback(
        results
          .map(({ question, data }) => `${question} - ${data.score}/100`)
          .slice(0, 5)
      );
      setInterviewCompleted(true);
    } catch (error) {
      console.error("Error analyzing answers:", error);
      alert(`Could not analyze answers: ${error.message}`);
    } finally {
      setAnalyzing(false);
    }
  }

  function goToNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      stopRecording();
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(120);
    }
  }

  function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
      stopRecording();
      setCurrentQuestionIndex((prev) => prev - 1);
      setTimeLeft(120);
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (interviewTimerRef.current) clearInterval(interviewTimerRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
    };
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="app">
      <h1>AI Interview Tool</h1>

      {questions.length > 0 && !interviewCompleted && (
        <div className="global-timer">
          ⏳ Interview Time Left: <span>{formatTime(interviewTimeLeft)}</span>
        </div>
      )}

      {isRecording && (
        <div className="timer-container">
          <div className="timer">
            ⏱ Question Time: <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
      )}

      <div className="role-selector">
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          {roles.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <button onClick={startInterview} disabled={loading}>
          {loading ? "Loading..." : "Start Interview"}
        </button>
      </div>

      {questions.length > 0 && currentQuestion && !interviewCompleted && (
        <div className="question-card">
          <div className="question-header">
            <h3>Question {currentQuestionIndex + 1} of {questions.length}</h3>
          </div>

          <p>{currentQuestion}</p>

          <textarea
            value={answers[currentQuestion] || ""}
            onChange={(e) => updateAnswer(currentQuestion, e.target.value)}
            placeholder="Type or speak your answer..."
          />

          <div className="recording-controls">
            <button
              onClick={() => startRecording(currentQuestion)}
              disabled={isRecording && recordingQuestion === currentQuestion}
            >
              {isRecording && recordingQuestion === currentQuestion
                ? "🎙️ Listening…"
                : "🎤 Speak Answer"}
            </button>
          </div>

          <div className="navigation-buttons">
            <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
              ← Previous
            </button>

            {isLastQuestion ? (
              <button
                onClick={analyzeAllAnswers}
                disabled={analyzing}
                style={{ background: "linear-gradient(135deg, #7c3aed, #c026ff)" }}
              >
                {analyzing ? "Analyzing..." : "Submit & Analyze All"}
              </button>
            ) : (
              <button onClick={goToNextQuestion}>
                Next →
              </button>
            )}
          </div>
        </div>
      )}

      {interviewCompleted && (
        <div className="completion-message">
          <h2>🎉 Interview Completed!</h2>
          <p>All answers have been analyzed automatically.</p>
        </div>
      )}

      {(answersAnalysed > 0 || interviewCompleted) && (
        <div className="dashboard">
          <h3>Final Results</h3>
          <p><strong>Answers Analysed:</strong> {answersAnalysed}</p>
          <p><strong>Average Score:</strong> {averageScore}/100</p>
          <p><strong>Best Score:</strong> {bestScore}/100</p>

          <h4>Question-wise Scores:</h4>
          <ul>
            {Object.keys(feedback).map((q, i) => (
              <li key={i}>{q} — <strong>{feedback[q].score}/100</strong></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

