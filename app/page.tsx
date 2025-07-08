"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Add print styles
const printStyles = `
@media print {
  @page {
    size: A4;
    margin: 0.5in;
  }
  
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  /* Hide the normal app layout */
  .min-h-screen {
    display: none !important;
  }
  
  /* Show only print content */
  .print-content {
    display: block !important;
    visibility: visible !important;
  }
  
  /* Page breaks */
  .print-page {
    page-break-after: always;
    width: 100%;
    margin: 0;
    padding: 15px;
    box-sizing: border-box;
  }
  
  .print-page:last-child {
    page-break-after: auto;
  }
  
  /* Results page styling */
  .print-results h1 {
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .print-results h3 {
    font-size: 16px;
    margin: 15px 0 10px 0;
    color: #444;
    border-bottom: 2px solid #ddd;
    padding-bottom: 5px;
  }
  
  .print-results .score-display {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin: 15px 0;
    font-size: 14px;
  }
  
  .print-results .score-item {
    text-align: center;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .print-results .score-item .score-label {
    font-weight: bold;
    font-size: 12px;
    margin-bottom: 5px;
  }
  
  .print-results .score-item .score-value {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  
  /* Assessment page styling */
  .print-assessment {
    font-size: 9px;
  }
  
  .print-assessment h1 {
    font-size: 18px;
    text-align: center;
    margin-bottom: 15px;
    color: #333;
  }
  
  .print-assessment table {
    width: 100%;
    border-collapse: collapse;
    font-size: 8px;
    margin-bottom: 10px;
  }
  
  .print-assessment th,
  .print-assessment td {
    border: 1px solid #000;
    padding: 3px 5px;
    text-align: left;
    vertical-align: top;
  }
  
  .print-assessment th {
    background-color: #f0f0f0;
    font-weight: bold;
    text-align: center;
    font-size: 9px;
  }
  
  .print-assessment .row-number {
    text-align: center;
    font-weight: bold;
    width: 25px;
  }
  
  .print-assessment .section-header {
    background-color: #e0e0e0;
    font-weight: bold;
    text-align: center;
    font-size: 10px;
  }
  
  /* Info page styling */
  .print-info {
    font-size: 8px;
  }
  
  .print-info h1 {
    font-size: 18px;
    text-align: center;
    margin-bottom: 15px;
    color: #333;
  }
  
  .print-info .personality-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    height: calc(100vh - 100px);
  }
  
  .print-info .personality-card {
    border: 2px solid #000;
    border-radius: 8px;
    overflow: hidden;
    break-inside: avoid;
    height: fit-content;
  }
  
  .print-info .personality-header {
    padding: 8px;
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
  }
  
  .print-info .personality-content {
    padding: 8px;
    font-size: 7px;
    line-height: 1.2;
  }
  
  .print-info .section-title {
    font-weight: bold;
    font-size: 8px;
    margin: 6px 0 3px 0;
    color: #333;
    text-transform: uppercase;
  }
  
  .print-info .section-title:first-child {
    margin-top: 0;
  }
  
  .print-info .trait-item {
    margin-bottom: 1px;
    line-height: 1.1;
  }
}
`

// Add the styles to the document head
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style")
  styleElement.textContent = printStyles
  document.head.appendChild(styleElement)
}

const personalityData = [
  { sanguine: "Animated", choleric: "Adventurous", melancholy: "Analytical", phlegmatic: "Adaptable" },
  { sanguine: "Playful", choleric: "Persuasive", melancholy: "Persistent", phlegmatic: "Peaceful" },
  { sanguine: "Sociable", choleric: "Strong-willed", melancholy: "Self-sacrificing", phlegmatic: "Submissive" },
  { sanguine: "Convincing", choleric: "Competitive", melancholy: "Considerate", phlegmatic: "Controlled" },
  { sanguine: "Refreshing", choleric: "Resourceful", melancholy: "Respectful", phlegmatic: "Reserved" },
  { sanguine: "Spirited", choleric: "Self-reliant", melancholy: "Sensitive", phlegmatic: "Satisfied" },
  { sanguine: "Promoter", choleric: "Positive", melancholy: "Planner", phlegmatic: "Patient" },
  { sanguine: "Spontaneous", choleric: "Sure", melancholy: "Scheduled", phlegmatic: "Shy" },
  { sanguine: "Optimistic", choleric: "Outspoken", melancholy: "Orderly", phlegmatic: "Obliging" },
  { sanguine: "Funny", choleric: "Forceful", melancholy: "Faithful", phlegmatic: "Friendly" },
  { sanguine: "Delightful", choleric: "Daring", melancholy: "Detailed", phlegmatic: "Diplomatic" },
  { sanguine: "Cheerful", choleric: "Confident", melancholy: "Cultured", phlegmatic: "Consistent" },
  { sanguine: "Inspiring", choleric: "Independent", melancholy: "Idealistic", phlegmatic: "Inoffensive" },
  { sanguine: "Demonstrative", choleric: "Decisive", melancholy: "Deep", phlegmatic: "Dry humor" },
  { sanguine: "Mixes Easily", choleric: "Mover", melancholy: "Musical", phlegmatic: "Mediator" },
  { sanguine: "Talker", choleric: "Tenacious", melancholy: "Thoughtful", phlegmatic: "Tolerant" },
  { sanguine: "Lively", choleric: "Leader", melancholy: "Loyal", phlegmatic: "Listener" },
  { sanguine: "Cute", choleric: "Chief", melancholy: "Chartmaker", phlegmatic: "Contented" },
  { sanguine: "Popular", choleric: "Productive", melancholy: "Perfectionist", phlegmatic: "Pleasant" },
  { sanguine: "Bouncy", choleric: "Bold", melancholy: "Behaved", phlegmatic: "Balanced" },
  // Weaknesses start here (row 21)
  { sanguine: "Brassy", choleric: "Bossy", melancholy: "Bashful", phlegmatic: "Blank" },
  { sanguine: "Undisciplined", choleric: "Unsympathetic", melancholy: "Unforgiving", phlegmatic: "Unenthusiastic" },
  { sanguine: "Repetitious", choleric: "Resistant", melancholy: "Resentful", phlegmatic: "Reticent" },
  { sanguine: "Forgetful", choleric: "Frank", melancholy: "Fussy", phlegmatic: "Fearful" },
  { sanguine: "Interrupts", choleric: "Impatient", melancholy: "Insecure", phlegmatic: "Indecisive" },
  { sanguine: "Unpredictable", choleric: "Unaffectionate", melancholy: "Unpopular", phlegmatic: "Uninvolved" },
  { sanguine: "Haphazard", choleric: "Headstrong", melancholy: "Hard to please", phlegmatic: "Hesitant" },
  { sanguine: "Permissive", choleric: "Proud", melancholy: "Pessimistic", phlegmatic: "Plain" },
  { sanguine: "Angered easily", choleric: "Nervy", melancholy: "Alienated", phlegmatic: "Aimless" },
  { sanguine: "Naive", choleric: "Argumentative", melancholy: "Negative attitude", phlegmatic: "Nonchalant" },
  { sanguine: "Wants credit", choleric: "Workaholic", melancholy: "Withdrawn", phlegmatic: "Worrier" },
  { sanguine: "Talkative", choleric: "Tactless", melancholy: "Too sensitive", phlegmatic: "Timid" },
  { sanguine: "Disorganized", choleric: "Domineering", melancholy: "Depressed", phlegmatic: "Doubtful" },
  { sanguine: "Inconsistent", choleric: "Intolerant", melancholy: "Introvert", phlegmatic: "Indifferent" },
  { sanguine: "Messy", choleric: "Manipulative", melancholy: "Moody", phlegmatic: "Mumbles" },
  { sanguine: "Show-off", choleric: "Stubborn", melancholy: "Skeptical", phlegmatic: "Slow" },
  { sanguine: "Loud", choleric: "Lord over Others", melancholy: "Loner", phlegmatic: "Lazy" },
  { sanguine: "Scatterbrained", choleric: "Short-tempered", melancholy: "Suspicious", phlegmatic: "Sluggish" },
  { sanguine: "Restless", choleric: "Rash", melancholy: "Revengeful", phlegmatic: "Reluctant" },
  { sanguine: "Changeable", choleric: "Crafty", melancholy: "Critical", phlegmatic: "Compromising" },
]

const temperamentColors = {
  sanguine: "#3B82F6", // Blue
  choleric: "#EF4444", // Red
  melancholy: "#22C55E", // Green
  phlegmatic: "#A855F7", // Purple
}

const temperamentNames = {
  sanguine: "Popular Sanguine",
  choleric: "Powerful Choleric",
  melancholy: "Perfect Melancholy",
  phlegmatic: "Peaceful Phlegmatic",
}

// Detailed information for each temperament (used by both the Info page and print)
const personalityDetails = [
  {
    key: "sanguine",
    title: "Popular Sanguine",
    subtitle: "Extrovert • Talker • Optimist",
    color: "#3B82F6",
    bgColor: "bg-blue-500",
    sections: {
      strengths: [
        "Appealing personality",
        "Talkative, storyteller",
        "Life of the party",
        "Good sense of humor",
        "Memory for color",
        "Physically holds on to listener",
        "Emotional and demonstrative",
        "Enthusiastic",
        "Cheerful and bubbling over",
        "Curious",
        "Good on stage",
        "Wide-eyed and innocent",
        "Lives in the present",
        "Changeable disposition",
        "Sincere at heart",
        "Always a child",
      ],
      emotions: [
        "Makes home fun",
        "Is liked by children's friends",
        "Turns disaster into humor",
        "Is the circus master",
        "Envied by others",
        "Doesn't hold grudges",
        "Apologizes quickly",
        "Prevents dull moments",
        "Likes spontaneous activities",
      ],
      atWork: [
        "Thinks up new activities",
        "Looks great on surface",
        "Creative and colorful",
        "Has energy and enthusiasm",
        "Starts in a flashy way",
        "Inspires others to join",
        "Charms others at work",
      ],
      asParent: [
        "Makes friends easily",
        "Loves people",
        "Thrives on compliments",
        "Seems exciting",
        "Envied by others",
        "Doesn't hold grudges",
        "Apologizes quickly",
        "Prevents dull moments",
        "Likes spontaneous activities",
      ],
      asFriend: [
        "Makes friends easily",
        "Loves people",
        "Thrives on compliments",
        "Seems exciting",
        "Envied by others",
        "Doesn't hold grudges",
        "Apologizes quickly",
        "Prevents dull moments",
        "Likes spontaneous activities",
      ],
    },
  },
  {
    key: "choleric",
    title: "Powerful Choleric",
    subtitle: "Extrovert • Doer • Optimist",
    color: "#EF4444",
    bgColor: "bg-red-500",
    sections: {
      strengths: [
        "Born leader",
        "Dynamic and active",
        "Compulsive need for change",
        "Must correct wrongs",
        "Strong willed and decisive",
        "Unemotional",
        "Not easily discouraged",
        "Independent and self-sufficient",
        "Exudes confidence",
        "Can run anything",
      ],
      emotions: [
        "Exerts sound leadership",
        "Establishes goals",
        "Motivates family to action",
        "Knows the right answer",
        "Organizes household",
      ],
      atWork: [
        "Goal oriented",
        "Sees the whole picture",
        "Organizes well",
        "Seeks practical solutions",
        "Moves quickly to action",
        "Delegates work",
        "Insists on production",
        "Makes the goal",
        "Stimulates activity",
        "Thrives on opposition",
      ],
      asParent: [
        "Exerts sound leadership",
        "Establishes goals",
        "Motivates family to action",
        "Knows the right answer",
        "Organizes household",
      ],
      asFriend: [
        "Has little need for friends",
        "Will work for group activity",
        "Will lead and organize",
        "Is usually right",
        "Excels in emergencies",
      ],
    },
  },
  {
    key: "melancholy",
    title: "Perfect Melancholy",
    subtitle: "Introvert • Thinker • Pessimist",
    color: "#22C55E",
    bgColor: "bg-green-500",
    sections: {
      strengths: [
        "Deep and thoughtful",
        "Analytical",
        "Serious and purposeful",
        "Genius prone",
        "Talented and creative",
        "Artistic and musical",
        "Philosophical and poetic",
        "Appreciative of beauty",
        "Sensitive to others",
        "Self-sacrificing",
        "Conscientious",
        "Idealistic",
      ],
      emotions: [
        "Sets high standards",
        "Wants everything done right",
        "Keeps home in good order",
        "Picks up after children",
        "Sacrifices own will for others",
        "Encourages scholarship and talent",
      ],
      atWork: [
        "Schedule oriented",
        "Perfectionist, high standards",
        "Detail conscious",
        "Persistent and thorough",
        "Orderly and organized",
        "Neat and tidy",
        "Economical",
        "Sees the problems",
        "Finds creative solutions",
        "Needs to finish what is started",
        "Likes charts, graphs, figures, lists",
      ],
      asParent: [
        "Sets high standards",
        "Wants everything done right",
        "Keeps home in good order",
        "Picks up after children",
        "Sacrifices own will for others",
        "Encourages scholarship and talent",
      ],
      asFriend: [
        "Makes friends cautiously",
        "Content to stay in background",
        "Avoids causing attention",
        "Faithful and devoted",
        "Will listen to complaints",
        "Can solve other's problems",
        "Deep concern for other people",
        "Moved to tears with compassion",
        "Seeks ideal mate",
      ],
    },
  },
  {
    key: "phlegmatic",
    title: "Peaceful Phlegmatic",
    subtitle: "Introvert • Watcher • Pessimist",
    color: "#A855F7",
    bgColor: "bg-purple-500",
    sections: {
      strengths: [
        "Low-key personality",
        "Easygoing and relaxed",
        "Calm, cool and collected",
        "Patient, well balanced",
        "Consistent life",
        "Quiet but witty",
        "Sympathetic",
        "Keeps emotions hidden",
        "Happily reconciled to life",
        "All-purpose person",
      ],
      emotions: [
        "Makes good parent",
        "Takes time for children",
        "Is not in a hurry",
        "Can take the good with the bad",
        "Doesn't get upset easily",
      ],
      atWork: [
        "Competent and steady",
        "Peaceful and agreeable",
        "Has administrative ability",
        "Mediates problems",
        "Avoids conflicts",
        "Good under pressure",
        "Finds the easy way",
      ],
      asParent: [
        "Makes good parent",
        "Takes time for children",
        "Is not in a hurry",
        "Can take the good with the bad",
        "Doesn't get upset easily",
      ],
      asFriend: [
        "Easy to get along with",
        "Pleasant and enjoyable",
        "Inoffensive",
        "Good listener",
        "Dry sense of humor",
        "Enjoys watching people",
        "Has many friends",
        "Has compassion and concern",
      ],
    },
  },
]

// Welcome Screen Component
const WelcomeScreen = ({ onStartAssessment }: { onStartAssessment: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay with glass morphism */}
      <div
        className="absolute inset-0 backdrop-blur-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 25%, rgba(51, 65, 85, 0.9) 50%, rgba(30, 64, 175, 0.9) 75%, rgba(59, 130, 246, 0.9) 100%)",
        }}
      />

      {/* Ambient lighting effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Welcome content */}
      <div
        className="relative max-w-2xl w-full backdrop-blur-2xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 sm:p-12 text-center overflow-hidden"
        style={{
          boxShadow:
            "0 0 60px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          animation: "float 6s ease-in-out infinite",
        }}
      >
        {/* Content glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 blur-xl" />

        <div className="relative z-10">
          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-lg"
            style={{
              textShadow: "0 0 30px rgba(59, 130, 246, 0.8), 0 4px 8px rgba(0, 0, 0, 0.3)",
              filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))",
            }}
          >
            Welcome to Personality Profile!
          </h1>

          {/* Description */}
          <div className="text-white/90 text-base sm:text-lg leading-relaxed mb-8 space-y-4 drop-shadow-sm">
            <p>
              Discover your unique blend of personality traits and how they influence your emotions, relationships, and
              daily life.
            </p>
            <p>
              This app features a practical, easy-to-use personality test based on the classic four temperament types —
              each with its own strengths and challenges.
            </p>
            <p>
              Understand yourself better, improve how you relate to others, and unlock new ways to grow personally and
              professionally.
            </p>
          </div>

          {/* Start Assessment Button */}
          <button
            onClick={onStartAssessment}
            className="w-full sm:w-auto px-12 py-4 rounded-2xl font-semibold text-lg text-white backdrop-blur-xl bg-gradient-to-r from-blue-500/60 to-purple-500/60 hover:from-blue-600/80 hover:to-purple-600/80 shadow-2xl transition-all duration-300 border border-white/30 hover:shadow-2xl hover:scale-105 active:scale-95"
            style={{
              boxShadow:
                "0 0 40px rgba(59, 130, 246, 0.4), 0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              animation: "glow 3s ease-in-out infinite",
            }}
          >
            <span className="flex items-center justify-center gap-3 drop-shadow-lg">Start Assessment</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const PersonalityDetailsPage = () => {
  const [currentPersonality, setCurrentPersonality] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null)
    setTouchStartX(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return
    const distance = touchStartX - touchEndX
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentPersonality < personalityDetails.length - 1) {
      setCurrentPersonality(currentPersonality + 1)
    }
    if (isRightSwipe && currentPersonality > 0) {
      setCurrentPersonality(currentPersonality - 1)
    }
  }

  const currentDetail = personalityDetails[currentPersonality]

  return (
    <div
      className="w-full px-2 sm:px-4 relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient lighting effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ backgroundColor: currentDetail.color }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ backgroundColor: currentDetail.color, animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ backgroundColor: currentDetail.color, animationDelay: "4s" }}
        />
      </div>

      {/* Navigation indicators with glass effect */}
      <div className="flex justify-center space-x-2 mb-4 sm:mb-6 relative z-10">
        {personalityDetails.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPersonality(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 ${
              currentPersonality === index ? "bg-white/90 shadow-lg shadow-white/50" : "bg-white/30 hover:bg-white/50"
            }`}
            style={{
              boxShadow:
                currentPersonality === index
                  ? `0 0 20px ${currentDetail.color}40, 0 0 40px ${currentDetail.color}20`
                  : "none",
            }}
          />
        ))}
      </div>

      {/* Navigation arrows with enhanced glass effect */}
      <div className="flex justify-between items-center mb-3 sm:mb-4 relative z-10">
        <button
          onClick={() => setCurrentPersonality(Math.max(0, currentPersonality - 1))}
          disabled={currentPersonality === 0}
          className={`p-3 rounded-full backdrop-blur-xl border border-white/30 transition-all duration-300 ${
            currentPersonality === 0
              ? "text-white/40 bg-white/10"
              : "text-white/80 bg-white/20 hover:bg-white/30 hover:scale-110 shadow-lg hover:shadow-xl"
          }`}
          style={{
            background:
              currentPersonality === 0
                ? "rgba(255, 255, 255, 0.1)"
                : `linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))`,
            boxShadow:
              currentPersonality === 0
                ? "none"
                : `0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
          }}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="text-center px-4">
          <h2
            className="text-lg sm:text-2xl font-bold text-white drop-shadow-lg"
            style={{
              textShadow: `0 0 20px ${currentDetail.color}80, 0 2px 4px rgba(0, 0, 0, 0.3)`,
              filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
            }}
          >
            {currentDetail.title}
          </h2>
        </div>

        <button
          onClick={() => setCurrentPersonality(Math.min(personalityDetails.length - 1, currentPersonality + 1))}
          disabled={currentPersonality === personalityDetails.length - 1}
          className={`p-3 rounded-full backdrop-blur-xl border border-white/30 transition-all duration-300 ${
            currentPersonality === personalityDetails.length - 1
              ? "text-white/40 bg-white/10"
              : "text-white/80 bg-white/20 hover:bg-white/30 hover:scale-110 shadow-lg hover:shadow-xl"
          }`}
          style={{
            background:
              currentPersonality === personalityDetails.length - 1
                ? "rgba(255, 255, 255, 0.1)"
                : `linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))`,
            boxShadow:
              currentPersonality === personalityDetails.length - 1
                ? "none"
                : `0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
          }}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Content with enhanced glass morphism */}
      <Card className="w-full mx-auto backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl relative z-10 overflow-hidden">
        {/* Card glow effect */}
        <div
          className="absolute inset-0 opacity-20 blur-xl"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${currentDetail.color}40, transparent 70%)`,
          }}
        />

        <CardHeader
          className="text-white text-center py-4 sm:py-6 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${currentDetail.color}E6, ${currentDetail.color}CC)`,
            boxShadow: `0 0 40px ${currentDetail.color}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
          }}
        >
          {/* Header lighting effect */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse at top, rgba(255, 255, 255, 0.3), transparent 70%)`,
            }}
          />

          <CardTitle className="text-lg sm:text-2xl relative z-10 drop-shadow-lg">{currentDetail.title}</CardTitle>
          <p className="text-sm sm:text-lg opacity-90 relative z-10 drop-shadow-md">{currentDetail.subtitle}</p>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 backdrop-blur-sm bg-white/5 relative">
          {/* Content background glow */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${currentDetail.color}20, transparent 60%)`,
            }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 relative z-10">
            {/* Strengths */}
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg">
              <h4 className="font-bold text-sm sm:text-base mb-2 text-white drop-shadow-md">STRENGTHS</h4>
              <div className="space-y-1 sm:space-y-1.5">
                {currentDetail.sections.strengths.map((strength, idx) => (
                  <div key={idx} className="text-[10px] sm:text-xs text-white/90 flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mr-2 mt-1 flex-shrink-0 shadow-sm"
                      style={{
                        backgroundColor: currentDetail.color,
                        boxShadow: `0 0 8px ${currentDetail.color}60`,
                      }}
                    />
                    <span className="drop-shadow-sm">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emotions */}
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg">
              <h4 className="font-bold text-sm sm:text-base mb-2 text-white drop-shadow-md">EMOTIONS</h4>
              <div className="space-y-1 sm:space-y-1.5">
                {currentDetail.sections.emotions.map((emotion, idx) => (
                  <div key={idx} className="text-[10px] sm:text-xs text-white/90 flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mr-2 mt-1 flex-shrink-0 shadow-sm"
                      style={{
                        backgroundColor: currentDetail.color,
                        boxShadow: `0 0 8px ${currentDetail.color}60`,
                      }}
                    />
                    <span className="drop-shadow-sm">{emotion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* At Work */}
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg">
              <h4 className="font-bold text-sm sm:text-base mb-2 text-white drop-shadow-md">AT WORK</h4>
              <div className="space-y-1 sm:space-y-1.5">
                {currentDetail.sections.atWork.map((work, idx) => (
                  <div key={idx} className="text-[10px] sm:text-xs text-white/90 flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mr-2 mt-1 flex-shrink-0 shadow-sm"
                      style={{
                        backgroundColor: currentDetail.color,
                        boxShadow: `0 0 8px ${currentDetail.color}60`,
                      }}
                    />
                    <span className="drop-shadow-sm">{work}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* As Parent */}
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg">
              <h4 className="font-bold text-sm sm:text-base mb-2 text-white drop-shadow-md">AS PARENT</h4>
              <div className="space-y-1 sm:space-y-1.5">
                {currentDetail.sections.asParent.map((parent, idx) => (
                  <div key={idx} className="text-[10px] sm:text-xs text-white/90 flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mr-2 mt-1 flex-shrink-0 shadow-sm"
                      style={{
                        backgroundColor: currentDetail.color,
                        boxShadow: `0 0 8px ${currentDetail.color}60`,
                      }}
                    />
                    <span className="drop-shadow-sm">{parent}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* As Friend */}
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg">
              <h4 className="font-bold text-sm sm:text-base mb-2 text-white drop-shadow-md">AS FRIEND</h4>
              <div className="space-y-1 sm:space-y-1.5">
                {currentDetail.sections.asFriend.map((friend, idx) => (
                  <div key={idx} className="text-[10px] sm:text-xs text-white/90 flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mr-2 mt-1 flex-shrink-0 shadow-sm"
                      style={{
                        backgroundColor: currentDetail.color,
                        boxShadow: `0 0 8px ${currentDetail.color}60`,
                      }}
                    />
                    <span className="drop-shadow-sm">{friend}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Swipe hint with glass effect */}
      <div className="text-center mt-4 sm:mt-6 relative z-10">
        <div className="inline-block backdrop-blur-sm bg-white/10 rounded-full px-4 py-2 border border-white/20 shadow-lg">
          <span className="text-white/80 text-xs sm:text-sm drop-shadow-sm">
            Swipe left/right or use arrows to explore other personality types
          </span>
        </div>
      </div>
    </div>
  )
}

export default function PersonalityPlusApp() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [currentPage, setCurrentPage] = useState(2) // Start at page 2 (Home page, which is now in the middle)
  const [selections, setSelections] = useState<{ [key: number]: string }>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const [savedData, setSavedData] = useState<{
    name: string
    date: string
    selections: { [key: number]: string }
    scores: any
  } | null>(null)
  const [showSavePopup, setShowSavePopup] = useState(false)
  const [personName, setPersonName] = useState("")

  const handleStartAssessment = () => {
    setShowWelcome(false)
    setCurrentPage(2) // Navigate to assessment page
  }

  const handleSelection = (rowIndex: number, temperament: string) => {
    setSelections((prev) => ({
      ...prev,
      [rowIndex]: temperament,
    }))
  }

  const calculateScores = () => {
    const scores = { sanguine: 0, choleric: 0, melancholy: 0, phlegmatic: 0 }
    Object.values(selections).forEach((temperament) => {
      if (temperament in scores) {
        scores[temperament as keyof typeof scores]++
      }
    })
    return scores
  }

  const getStrengthsScore = () => {
    const strengthScores = { sanguine: 0, choleric: 0, melancholy: 0, phlegmatic: 0 }
    for (let i = 0; i < 20; i++) {
      if (selections[i]) {
        strengthScores[selections[i] as keyof typeof strengthScores]++
      }
    }
    return strengthScores
  }

  const getWeaknessesScore = () => {
    const weaknessScores = { sanguine: 0, choleric: 0, melancholy: 0, phlegmatic: 0 }
    for (let i = 20; i < 40; i++) {
      if (selections[i]) {
        weaknessScores[selections[i] as keyof typeof weaknessScores]++
      }
    }
    return weaknessScores
  }

  const handleSaveResults = () => {
    setShowSavePopup(true)
  }

  const confirmSave = () => {
    if (personName.trim()) {
      const currentDate = new Date().toLocaleDateString()
      setSavedData({
        name: personName.trim(),
        date: currentDate,
        selections: { ...selections },
        scores: { ...calculateScores() },
      })
      setShowSavePopup(false)
      setPersonName("")
    }
  }

  const handleRefresh = () => {
    setSelections({})
    setSavedData(null)
    setPersonName("")
    setShowSavePopup(false)
  }

  // Touch handlers for swiping
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    // Left swipe goes to next page (right), Right swipe goes to previous page (left)
    if (isLeftSwipe && currentPage < 3) {
      setCurrentPage(currentPage + 1)
    }
    if (isRightSwipe && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const scores = calculateScores()
  const strengthScores = getStrengthsScore()
  const weaknessScores = getWeaknessesScore()

  // Function to create a temporary element for capturing
  const createCaptureElement = (content: React.ReactNode, className = "") => {
    const tempDiv = document.createElement("div")
    tempDiv.style.position = "absolute"
    tempDiv.style.left = "-9999px"
    tempDiv.style.top = "0"
    tempDiv.style.width = "794px" // A4 width in pixels at 96 DPI
    tempDiv.style.height = "1123px" // A4 height in pixels at 96 DPI
    tempDiv.style.backgroundColor = "white"
    tempDiv.style.padding = "40px"
    tempDiv.style.boxSizing = "border-box"
    tempDiv.className = className
    document.body.appendChild(tempDiv)
    return tempDiv
  }

  // Function to capture Results Page exactly like the app's Results Page
  const captureResultsPage = async () => {
    const html2canvas = (await import("html2canvas")).default

    // Get the current date
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Get person name from saved data or use default
    const personName = savedData?.name || "Assessment Participant"

    const tempDiv = createCaptureElement(null, "capture-results")
    tempDiv.style.height = "auto"
    tempDiv.style.minHeight = "1123px"
    tempDiv.style.padding = "20px"
    tempDiv.style.backgroundColor = "#0f172a"
    tempDiv.style.background =
      "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e40af 75%, #3b82f6 100%)"

    // Create the exact same layout as the app's Results Page
    const resultsHTML = `
    <div style="font-family: 'Arial', sans-serif; background: transparent; min-height: 1083px; padding: 20px; color: white;">
      
      <!-- Strengths Chart -->
      <div style="margin-bottom: 40px; padding: 24px; border-radius: 16px; background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);">
        <h3 style="font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 32px; color: white; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);">
          Personality Profile Strengths
        </h3>
        
        <!-- Radar and Bar Chart Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center;">
          
          <!-- Radar Chart -->
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="background: rgba(255, 255, 255, 0.1); border-radius: 9999px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2); margin-bottom: 12px;">
              <h4 style="font-size: 14px; font-weight: 600; color: white; margin: 0;">Radar View</h4>
            </div>
            <div style="position: relative; display: flex; justify-content: center; padding: 32px 48px;">
              <svg width="270" height="270" viewBox="0 0 200 200" style="filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.8));">
                <!-- Grid lines -->
                <rect x="84" y="84" width="32" height="32" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1"/>
                <rect x="68" y="68" width="64" height="64" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1"/>
                <rect x="52" y="52" width="96" height="96" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1"/>
                <rect x="36" y="36" width="128" height="128" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1"/>
                <rect x="20" y="20" width="160" height="160" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1"/>
                
                <!-- Axis lines -->
                <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1"/>
                <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1"/>
                
                <!-- Data area -->
                <path d="M 100 ${20 + (20 - strengthScores.melancholy) * 4} L ${100 + strengthScores.choleric * 4} 100 L 100 ${180 - (20 - strengthScores.sanguine) * 4} L ${100 - strengthScores.phlegmatic * 4} 100 Z" 
                      fill="#3B82F640" stroke="#3B82F6" strokeWidth="3" style="filter: drop-shadow(0 0 10px #3B82F680);"/>
                
                <!-- Data points -->
                <circle cx="100" cy="${20 + (20 - strengthScores.melancholy) * 4}" r="5" fill="#22C55E" stroke="white" strokeWidth="2"/>
                <circle cx="${100 + strengthScores.choleric * 4}" cy="100" r="5" fill="#EF4444" stroke="white" strokeWidth="2"/>
                <circle cx="100" cy="${180 - (20 - strengthScores.sanguine) * 4}" r="5" fill="#3B82F6" stroke="white" strokeWidth="2"/>
                <circle cx="${100 - strengthScores.phlegmatic * 4}" cy="100" r="5" fill="#A855F7" stroke="white" strokeWidth="2"/>
              </svg>
              
              <!-- Labels -->
              <div style="position: absolute; top: 15%; left: 50%; transform: translate(-50%, -50%); background: rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 4px 8px; border: 1px solid rgba(255, 255, 255, 0.3);">
                <div style="font-size: 9px; font-weight: 600; text-align: center; color: white;">
                  <div>Perfect</div>
                  <div>Melancholy</div>
                  <span style="font-size: 12px; font-weight: bold;">${strengthScores.melancholy}</span>
                </div>
              </div>
              <div style="position: absolute; right: 15%; top: 50%; transform: translate(50%, -50%); background: rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 4px 8px; border: 1px solid rgba(255, 255, 255, 0.3);">
                <div style="font-size: 9px; font-weight: 600; text-align: center; color: white;">
                  <div>Powerful</div>
                  <div>Choleric</div>
                  <span style="font-size: 12px; font-weight: bold;">${strengthScores.choleric}</span>
                </div>
              </div>
              <div style="position: absolute; bottom: 15%; left: 50%; transform: translate(-50%, 50%); background: rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 4px 8px; border: 1px solid rgba(255, 255, 255, 0.3);">
                <div style="font-size: 9px; font-weight: 600; text-align: center; color: white;">
                  <div>Popular</div>
                  <div>Sanguine</div>
                  <span style="font-size: 12px; font-weight: bold;">${strengthScores.sanguine}</span>
                </div>
              </div>
              <div style="position: absolute; left: 15%; top: 50%; transform: translate(-50%, -50%); background: rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 4px 8px; border: 1px solid rgba(255, 255, 255, 0.3);">
                <div style="font-size: 9px; font-weight: 600; text-align: center; color: white;">
                  <div>Peaceful</div>
                  <div>Phlegmatic</div>
                  <span style="font-size: 12px; font-weight: bold;">${strengthScores.phlegmatic}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Bar Chart -->
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="background: rgba(255, 255, 255, 0.1); border-radius: 9999px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2); margin-bottom: 12px;">
              <h4 style="font-size: 14px; font-weight: 600; color: white; margin: 0;">Bar Chart View</h4>
            </div>
            <div style="width: 100%; max-width: 320px; display: flex; justify-content: center;">
              <svg width="100%" height="300" viewBox="0 0 280 250">
                <!-- Grid lines -->
                <line x1="35" y1="220" x2="260" y2="220" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1"/>
                <line x1="35" y1="184" x2="260" y2="184" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1"/>
                <line x1="35" y1="148" x2="260" y2="148" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1"/>
                <line x1="35" y1="112" x2="260" y2="112" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1"/>
                <line x1="35" y1="76" x2="260" y2="76" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1"/>
                <line x1="35" y1="40" x2="260" y2="40" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1"/>
                
                <!-- Bars -->
                <rect x="40" y="${220 - strengthScores.sanguine * 8}" width="200" height="${strengthScores.sanguine * 8}" fill="#3B82F6"/>
                <rect x="40" y="${184 - strengthScores.choleric * 8}" width="200" height="${strengthScores.choleric * 8}" fill="#EF4444"/>
                <rect x="40" y="${148 - strengthScores.melancholy * 8}" width="200" height="${strengthScores.melancholy * 8}" fill="#22C55E"/>
                <rect x="40" y="${112 - strengthScores.phlegmatic * 8}" width="200" height="${strengthScores.phlegmatic * 8}" fill="#A855F7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    `
    tempDiv.innerHTML = resultsHTML

    // Capture the canvas
    const canvas = await html2canvas(tempDiv)
    const imgData = canvas.toDataURL("image/png")
    const pdf = new window.jspdf.jsPDF("p", "mm", "a4")
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297)
    pdf.save(`${personName}_Personality_Profile_Results.pdf`)

    // Clean up
    document.body.removeChild(tempDiv)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
      {showWelcome ? (
        <WelcomeScreen onStartAssessment={handleStartAssessment} />
      ) : (
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          {currentPage === 2 && (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">Personality Assessment</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {personalityData.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold text-white mb-4 drop-shadow-lg">Row {rowIndex + 1}</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {Object.entries(row).map(([temperament, description]) => (
                        <button
                          key={temperament}
                          onClick={() => handleSelection(rowIndex, temperament)}
                          className={`w-full p-4 rounded-lg text-white font-semibold transition-all duration-300 ${
                            selections[rowIndex] === temperament
                              ? "bg-white/90 shadow-lg shadow-white/50"
                              : "bg-white/30 hover:bg-white/50"
                          }`}
                          style={{
                            backgroundColor: temperamentColors[temperament],
                            boxShadow:
                              selections[rowIndex] === temperament
                                ? `0 0 20px ${temperamentColors[temperament]}40, 0 0 40px ${temperamentColors[temperament]}20`
                                : "none",
                          }}
                        >
                          {description}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <button
                  onClick={handleSaveResults}
                  className="px-8 py-4 rounded-lg bg-white/90 text-white font-semibold shadow-lg shadow-white/50 transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}
                >
                  Save Results
                </button>
              </div>
            </div>
          )}
          {currentPage === 3 && (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">Results</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold text-white mb-4 drop-shadow-lg">Strengths</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {Object.entries(strengthScores).map(([temperament, score]) => (
                      <div key={temperament} className="flex flex-col items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20 shadow-lg mb-4">
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-white drop-shadow-lg">{score}</span>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-white drop-shadow-lg">
                          {temperamentNames[temperament]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold text-white mb-4 drop-shadow-lg">Weaknesses</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {Object.entries(weaknessScores).map(([temperament, score]) => (
                      <div key={temperament} className="flex flex-col items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20 shadow-lg mb-4">
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-white drop-shadow-lg">{score}</span>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-white drop-shadow-lg">
                          {temperamentNames[temperament]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button
                  onClick={captureResultsPage}
                  className="px-8 py-4 rounded-lg bg-white/90 text-white font-semibold shadow-lg shadow-white/50 transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}
                >
                  Generate PDF
                </button>
              </div>
            </div>
          )}
          {currentPage === 4 && <PersonalityDetailsPage />}
          {showSavePopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-8 sm:p-12 text-center overflow-hidden">
                <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Save Your Results</h2>
                <input
                  type="text"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  className="w-full p-4 rounded-lg bg-white/30 text-white font-semibold mb-6 transition-all duration-300 hover:bg-white/50"
                  placeholder="Enter your name"
                />
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={confirmSave}
                    className="px-8 py-4 rounded-lg bg-white/90 text-white font-semibold shadow-lg shadow-white/50 transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowSavePopup(false)}
                    className="px-8 py-4 rounded-lg bg-white/30 text-white font-semibold shadow-lg shadow-white/50 transition-all duration-300 hover:bg-white/50"
                    style={{
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
