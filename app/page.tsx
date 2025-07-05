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
        scores: { ...scores },
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
                
                <!-- Y-axis labels -->
                <text x="30" y="225" textAnchor="end" fontSize="10" fill="rgba(255, 255, 255, 0.8)">0</text>
                <text x="30" y="189" textAnchor="end" fontSize="10" fill="rgba(255, 255, 255, 0.8)">5</text>
                <text x="30" y="153" textAnchor="end" fontSize="10" fill="rgba(255, 255, 255, 0.8)">10</text>
                <text x="30" y="117" textAnchor="end" fontSize="10" fill="rgba(255, 255, 255, 0.8)">15</text>
                <text x="30" y="81" textAnchor="end" fontSize="10" fill="rgba(255, 255, 255, 0.8)">20</text>
                
                <!-- Bars -->
                <rect x="50" y="${220 - strengthScores.sanguine * 9}" width="35" height="${strengthScores.sanguine * 9}" fill="#3B82F6" rx="4" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2"/>
                <rect x="100" y="${220 - strengthScores.choleric * 9}" width="35" height="${strengthScores.choleric * 9}" fill="#EF4444" rx="4" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2"/>
                <rect x="150" y="${220 - strengthScores.melancholy * 9}" width="35" height="${strengthScores.melancholy * 9}" fill="#22C55E" rx="4" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2"/>
                <rect x="200" y="${220 - strengthScores.phlegmatic * 9}" width="35" height="${strengthScores.phlegmatic * 9}" fill="#A855F7" rx="4" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2"/>
                
                <!-- Score labels -->
                <text x="67.5" y="${220 - strengthScores.sanguine * 9 - 8}" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">${strengthScores.sanguine}</text>
                <text x="117.5" y="${220 - strengthScores.choleric * 9 - 8}" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">${strengthScores.choleric}</text>
                <text x="167.5" y="${220 - strengthScores.melancholy * 9 - 8}" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">${strengthScores.melancholy}</text>
                <text x="217.5" y="${220 - strengthScores.phlegmatic * 9 - 8}" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">${strengthScores.phlegmatic}</text>
                
                <!-- X-axis labels -->
                <text x="67.5" y="240" textAnchor="middle" fontSize="8" fill="rgba(255, 255, 255, 0.9)" transform="rotate(-45, 67.5, 240)">Sanguine</text>
                <text x="117.5" y="240" textAnchor="middle" fontSize="8" fill="rgba(255, 255, 255, 0.9)" transform="rotate(-45, 117.5, 240)">Choleric</text>
                <text x="167.5" y="240" textAnchor="middle" fontSize="8" fill="rgba(255, 255, 255, 0.9)" transform="rotate(-45, 167.5, 240)">Melancholy</text>
                <text x="217.5" y="240" textAnchor="middle" fontSize="8" fill="rgba(255, 255, 255, 0.9)" transform="rotate(-45, 217.5, 240)">Phlegmatic</text>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Legend -->
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 32px;">
          <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #3B82F6; box-shadow: 0 0 8px #3B82F660;"></div>
              <div style="display: flex; flex-direction: column;">
                <div style="font-size: 10px; font-weight: 500; color: rgba(255, 255, 255, 0.9);">Popular Sanguine</div>
                <div style="font-size: 14px; font-weight: bold; text-align: center; color: white;">${strengthScores.sanguine}</div>
              </div>
            </div>
          </div>
          <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #EF4444; box-shadow: 0 0 8px #EF444460;"></div>
              <div style="display: flex; flex-direction: column;">
                <div style="font-size: 10px; font-weight: 500; color: rgba(255, 255, 255, 0.9);">Powerful Choleric</div>
                <div style="font-size: 14px; font-weight: bold; text-align: center; color: white;">${strengthScores.choleric}</div>
              </div>
            </div>
          </div>
          <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #22C55E; box-shadow: 0 0 8px #22C55E60;"></div>
              <div style="display: flex; flex-direction: column;">
                <div style="font-size: 10px; font-weight: 500; color: rgba(255, 255, 255, 0.9);">Perfect Melancholy</div>
                <div style="font-size: 14px; font-weight: bold; text-align: center; color: white;">${strengthScores.melancholy}</div>
              </div>
            </div>
          </div>
          <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #A855F7; box-shadow: 0 0 8px #A855F760;"></div>
              <div style="display: flex; flex-direction: column;">
                <div style="font-size: 10px; font-weight: 500; color: rgba(255, 255, 255, 0.9);">Peaceful Phlegmatic</div>
                <div style="font-size: 14px; font-weight: bold; text-align: center; color: white;">${strengthScores.phlegmatic}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Weaknesses Chart -->
      <div style="margin-bottom: 40px; padding: 24px; border-radius: 16px; background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);">
        <h3 style="font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 32px; color: white; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);">
          Personality Profile Weaknesses
        </h3>
        
        <!-- Radar and Bar Chart Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center;">
          
          <!-- Radar Chart -->
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="background: rgba(255, 255, 255, 0.1); border-radius: 9999px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2); margin-bottom: 12px;">
              <h4 style="font-size: 14px; font-weight: 600; color: white; margin: 0;">Radar View</h4>
            </div>
            <div style="position: relative; display: flex; justify-content: center; padding: 32px 48px;">
              <svg width="270" height="270" viewBox="0 0 200 200" style="filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.8));">
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
                <path d="M 100 ${20 + (20 - weaknessScores.melancholy) * 4} L ${100 + weaknessScores.choleric * 4} 100 L 100 ${180 - (20 - weaknessScores.sanguine) * 4} L ${100 - weaknessScores.phlegmatic * 4} 100 Z" 
                      fill="#EF444440" stroke="#EF4444" strokeWidth="3" style="filter: drop-shadow(0 0 10px #EF444480);"/>
                
                <!-- Data points -->
                <circle cx="100" cy="${20 + (20 - weaknessScores.melancholy) * 4}" r="5" fill="#22C55E" stroke="white" strokeWidth="2"/>
                <circle cx="${100 + weaknessScores.choleric * 4}" cy="100" r="5" fill="#EF4444" stroke="white" strokeWidth="2"/>
                <circle cx="100" cy="${180 - (20 - weaknessScores.sanguine) * 4}" r="5" fill="#3B82F6" stroke="white" strokeWidth="2"/>
                <circle cx="${100 - weaknessScores.phlegmatic * 4}" cy="100" r="5" fill="#A855F7" stroke="white" strokeWidth="2"/>
              </svg>
              
              <!-- Labels -->
              <div style="position: absolute; top: 15%; left: 50%; transform: translate(-50%, -50%); background: rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 4px 8px; border: 1px solid rgba(255, 255, 255, 0.3);">
                <div style="font-size: 9px; font-weight: 600; text-align: center; color: white;">
                  <div>Perfect</div>
                  <div>Melancholy</div>
                  <span style="font-size: 12px; font-weight: bold;">${weaknessScores.melancholy}</span>
                </div>
              </div>
              <div style="position: absolute; right: 15%; top: 50%; transform: translate(50%, -50%); background: rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 4px 8px; border: 1px solid rgba(255, 255, 255, 0.3);">
                <div style="font-size: 9px; font-weight: 600; text-align: center; color: white;">
                  <div>Powerful</div>
                  <div>Choleric</div>
                  <span style="font-size: 12px; font-weight: bold;">${weaknessScores.choleric}</span>
                </div>
              </div>
              <div style="position: absolute; bottom: 15%; left: 50%; transform: translate(-50%, 50%); background: rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 4px 8px; border: 1px solid rgba(255, 255, 255, 0.3);">
                <div style="font-size: 9px; font-weight: 600; text-align: center; color: white;">
                  <div>Popular</div>
                  <div>Sanguine</div>
                  <span style="font-size: 12px; font-weight: bold;">${weaknessScores.sanguine}</span>
                </div>
              </div>
              <div style="position: absolute; left: 15%; top: 50%; transform: translate(-50%, -50%); background: rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 4px 8px; border: 1px solid rgba(255, 255, 255, 0.3);">
                <div style="font-size: 9px; font-weight: 600; text-align: center; color: white;">
                  <div>Peaceful</div>
                  <div>Phlegmatic</div>
                  <span style="font-size: 12px; font-weight: bold;">${weaknessScores.phlegmatic}</span>
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
                
                <!-- Y-axis labels -->
                <text x="30" y="225" textAnchor="end" fontSize="10" fill="rgba(255, 255, 255, 0.8)">0</text>
                <text x="30" y="189" textAnchor="end" fontSize="10" fill="rgba(255, 255, 255, 0.8)">5</text>
                <text x="30" y="153" textAnchor="end" fontSize="10" fill="rgba(255, 255, 255, 0.8)">10</text>
                <text x="30" y="117" textAnchor="end" fontSize="10" fill="rgba(255, 255, 255, 0.8)">15</text>
                <text x="30" y="81" textAnchor="end" fontSize="10" fill="rgba(255, 255, 255, 0.8)">20</text>
                
                <!-- Bars -->
                <rect x="50" y="${220 - weaknessScores.sanguine * 9}" width="35" height="${weaknessScores.sanguine * 9}" fill="#3B82F6" rx="4" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2"/>
                <rect x="100" y="${220 - weaknessScores.choleric * 9}" width="35" height="${weaknessScores.choleric * 9}" fill="#EF4444" rx="4" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2"/>
                <rect x="150" y="${220 - weaknessScores.melancholy * 9}" width="35" height="${weaknessScores.melancholy * 9}" fill="#22C55E" rx="4" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2"/>
                <rect x="200" y="${220 - weaknessScores.phlegmatic * 9}" width="35" height="${weaknessScores.phlegmatic * 9}" fill="#A855F7" rx="4" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2"/>
                
                <!-- Score labels -->
                <text x="67.5" y="${220 - weaknessScores.sanguine * 9 - 8}" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">${weaknessScores.sanguine}</text>
                <text x="117.5" y="${220 - weaknessScores.choleric * 9 - 8}" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">${weaknessScores.choleric}</text>
                <text x="167.5" y="${220 - weaknessScores.melancholy * 9 - 8}" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">${weaknessScores.melancholy}</text>
                <text x="217.5" y="${220 - weaknessScores.phlegmatic * 9 - 8}" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">${weaknessScores.phlegmatic}</text>
                
                <!-- X-axis labels -->
                <text x="67.5" y="240" textAnchor="middle" fontSize="8" fill="rgba(255, 255, 255, 0.9)" transform="rotate(-45, 67.5, 240)">Sanguine</text>
                <text x="117.5" y="240" textAnchor="middle" fontSize="8" fill="rgba(255, 255, 255, 0.9)" transform="rotate(-45, 117.5, 240)">Choleric</text>
                <text x="167.5" y="240" textAnchor="middle" fontSize="8" fill="rgba(255, 255, 255, 0.9)" transform="rotate(-45, 167.5, 240)">Melancholy</text>
                <text x="217.5" y="240" textAnchor="middle" fontSize="8" fill="rgba(255, 255, 255, 0.9)" transform="rotate(-45, 217.5, 240)">Phlegmatic</text>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Legend -->
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 32px;">
          <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #3B82F6; box-shadow: 0 0 8px #3B82F660;"></div>
              <div style="display: flex; flex-direction: column;">
                <div style="font-size: 10px; font-weight: 500; color: rgba(255, 255, 255, 0.9);">Popular Sanguine</div>
                <div style="font-size: 14px; font-weight: bold; text-align: center; color: white;">${weaknessScores.sanguine}</div>
              </div>
            </div>
          </div>
          <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #EF4444; box-shadow: 0 0 8px #EF444460;"></div>
              <div style="display: flex; flex-direction: column;">
                <div style="font-size: 10px; font-weight: 500; color: rgba(255, 255, 255, 0.9);">Powerful Choleric</div>
                <div style="font-size: 14px; font-weight: bold; text-align: center; color: white;">${weaknessScores.choleric}</div>
              </div>
            </div>
          </div>
          <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #22C55E; box-shadow: 0 0 8px #22C55E60;"></div>
              <div style="display: flex; flex-direction: column;">
                <div style="font-size: 10px; font-weight: 500; color: rgba(255, 255, 255, 0.9);">Perfect Melancholy</div>
                <div style="font-size: 14px; font-weight: bold; text-align: center; color: white;">${weaknessScores.melancholy}</div>
              </div>
            </div>
          </div>
          <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #A855F7; box-shadow: 0 0 8px #A855F760;"></div>
              <div style="display: flex; flex-direction: column;">
                <div style="font-size: 10px; font-weight: 500; color: rgba(255, 255, 255, 0.9);">Peaceful Phlegmatic</div>
                <div style="font-size: 14px; font-weight: bold; text-align: center; color: white;">${weaknessScores.phlegmatic}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Profile Header -->
      <div style="text-center; margin-bottom: 32px; padding: 8px;">
        <div style="display: inline-block; background: linear-gradient(to right, rgba(147, 51, 234, 0.6), rgba(59, 130, 246, 0.6)); color: white; padding: 12px 32px; border-radius: 9999px; box-shadow: 0 0 60px rgba(147, 51, 234, 0.4); border: 1px solid rgba(255, 255, 255, 0.3); position: relative; overflow: hidden;">
          <div style="position: absolute; inset: 0; background: linear-gradient(to right, rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.3)); opacity: 0.5; filter: blur(16px);"></div>
          <span style="font-size: 18px; font-weight: bold; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); position: relative; z-index: 10;">
            🎯 YOUR COMPLETE PERSONALITY PROFILE
          </span>
        </div>
      </div>

      <!-- Total Chart -->
      <div style="margin-bottom: 40px; padding: 24px; border-radius: 16px; background: linear-gradient(135deg, rgba(147, 51, 234, 0.4), rgba(59, 130, 246, 0.4), rgba(99, 102, 241, 0.4)); backdrop-filter: blur(20px); border: 4px solid rgba(147, 51, 234, 0.6); box-shadow: 0 0 80px rgba(147, 51, 234, 0.5), 0 0 120px rgba(147, 51, 234, 0.3), 0 25px 50px rgba(0, 0, 0, 0.2); transform: scale(1.05); position: relative; overflow: hidden;">
        <!-- Special pulsing border -->
        <div style="position: absolute; inset: 0; border-radius: 16px; border: 4px solid rgba(147, 51, 234, 0.6); box-shadow: 0 0 40px rgba(147, 51, 234, 0.6);"></div>
        
        <h3 style="font-size: 32px; font-weight: bold; text-align: center; margin-bottom: 32px; color: white; text-shadow: 0 0 30px rgba(147, 51, 234, 1), 0 0 60px rgba(147, 51, 234, 0.8), 0 4px 8px rgba(0, 0, 0, 0.5); filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5)); position: relative; z-index: 10;">
          <div style="display: inline-block; background: linear-gradient(to right, rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.3)); border-radius: 9999px; padding: 24px; border: 2px solid rgba(147, 51, 234, 0.5); box-shadow: 0 0 40px rgba(0, 0, 0, 0.2); margin-bottom: 12px;">
            <span style="background: linear-gradient(to right, #e9d5ff, #dbeafe); -webkit-background-clip: text; background-clip: text; color: transparent; font-weight: 800;">
              Total Personality Profile
            </span>
          </div>
        </h3>
        
        <!-- Radar and Bar Chart Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center; position: relative; z-index: 10;">
          
          <!-- Radar Chart -->
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="background: rgba(255, 255, 255, 0.1); border-radius: 9999px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2); margin-bottom: 12px;">
              <h4 style="font-size: 16px; font-weight: 600; color: white; margin: 0;">Radar View</h4>
            </div>
            <div style="position: relative; display: flex; justify-content: center; padding: 32px 48px; transform: scale(1.1);">
              <svg width="270" height="270" viewBox="0 0 200 200" style="filter: drop-shadow(0 0 20px rgba(147, 51, 234, 0.8)) drop-shadow(0 0 40px rgba(147, 51, 234, 0.4));">
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
                <path d="M 100 ${20 + (20 - scores.melancholy) * 4} L ${100 + scores.choleric * 4} 100 L 100 ${180 - (20 - scores.sanguine) * 4} L ${100 - scores.phlegmatic * 4} 100 Z" 
                      fill="rgba(147, 51, 234, 0.8)" stroke="#9333ea" strokeWidth="6" style="filter: drop-shadow(0 0 20px #9333eaFF) drop-shadow(0 0 40px #9333ea80);"/>
                
                <!-- Data points -->
                <circle cx="100" cy="${20 + (20 - scores.melancholy) * 4}" r="7" fill="#22C55E" stroke="white" strokeWidth="3" style="filter: drop-shadow(0 0 15px #22C55EFF) drop-shadow(0 0 30px #22C55E80);"/>
                <circle cx="${100 + scores.choleric * 4}" cy="100" r="7" fill="#EF4444" stroke="white" strokeWidth="3" style="filter: drop-shadow(0 0 15px #EF4444FF) drop-shadow(0 0 30px #EF444480);"/>
                <circle cx="100" cy="${180 - (20 - scores.sanguine) * 4}" r="7" fill="#3B82F6" stroke="white" strokeWidth="3" style="filter: drop-shadow(0 0 15px #3B82F6FF) drop-shadow(0 0 30px #3B82F680);"/>
                <circle cx="${100 - scores.phlegmatic * 4}" cy="100" r="7" fill="#A855F7" stroke="white" strokeWidth="3" style="filter: drop-shadow(0 0 15px #A855F7FF) drop-shadow(0 0 30px #A855F780);"/>
              </svg>
              
              <!-- Labels -->
              <div style="position: absolute; top: 15%; left: 50%; transform: translate(-50%, -50%); background: rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 4px 8px; border: 1px solid rgba(255, 255, 255, 0.3);">
                <div style="font-size: 9px; font-weight: 600; text-align: center; color: white;">
                  <div>Perfect</div>
                  <div>Melancholy</div>
                  <span style="font-size: 12px; font-weight: bold;">${scores.melancholy}</span>
                </div>
              </div>
              <div style="position: absolute; right: 15%; top: 50%; transform: translate(50%, -50%); background: rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 4px 8px; border: 1px solid rgba(255, 255, 255, 0.3);">
                <div style="font-size: 9px; font-weight: 600; text-align: center; color: white;">
                  <div>Powerful</div>
                  <div>Choleric</div>
                  <span style="font-size: 12px; font-weight: bold;">${scores.choleric}</span>
                </div>
              </div>
              <div style="position: absolute; bottom: 15%; left: 50%; transform: translate(-50%, 50%); background: rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 4px 8px; border: 1px solid rgba(255, 255, 255, 0.3);">
                <div style="font-size: 9px; font-weight: 600; text-align: center; color: white;">
                  <div>Popular</div>
                  <div>Sanguine</div>
                  <span style="font-size: 12px; font-weight: bold;">${scores.sanguine}</span>
                </div>
              </div>
              <div style="position: absolute; left: 15%; top: 50%; transform: translate(-50%, -50%); background: rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 4px 8px; border: 1px solid rgba(255, 255, 255, 0.3);">
                <div style="font-size: 9px; font-weight: 600; text-align: center; color: white;">
                  <div>Peaceful</div>
                  <div>Phlegmatic</div>
                  <span style="font-size: 12px; font-weight: bold;">${scores.phlegmatic}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Bar Chart -->
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="background: rgba(255, 255, 255, 0.1); border-radius: 9999px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2); margin-bottom: 12px;">
              <h4 style="font-size: 16px; font-weight: 600; color: white; margin: 0;">Bar Chart View</h4>
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
                
                <!-- Y-axis labels -->
                <text x="30" y="225" textAnchor="end" fontSize="10" fill="rgba(255, 255, 255, 0.8)">0</text>
                <text x="30" y="189" textAnchor="end" fontSize="10" fill="rgba(255, 255, 255, 0.8)">5</text>
                <text x="30" y="153" textAnchor="end" fontSize="10" fill="rgba(255, 255, 255, 0.8)">10</text>
                <text x="30" y="117" textAnchor="end" fontSize="10" fill="rgba(255, 255, 255, 0.8)">15</text>
                <text x="30" y="81" textAnchor="end" fontSize="10" fill="rgba(255, 255, 255, 0.8)">20</text>
                
                <!-- Bars -->
                <rect x="50" y="${220 - scores.sanguine * 9}" width="35" height="${scores.sanguine * 9}" fill="#3B82F6" rx="4" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" style="filter: drop-shadow(0 0 15px #3B82F660) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));"/>
                <rect x="100" y="${220 - scores.choleric * 9}" width="35" height="${scores.choleric * 9}" fill="#EF4444" rx="4" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" style="filter: drop-shadow(0 0 15px #EF444460) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));"/>
                <rect x="150" y="${220 - scores.melancholy * 9}" width="35" height="${scores.melancholy * 9}" fill="#22C55E" rx="4" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" style="filter: drop-shadow(0 0 15px #22C55E60) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));"/>
                <rect x="200" y="${220 - scores.phlegmatic * 9}" width="35" height="${scores.phlegmatic * 9}" fill="#A855F7" rx="4" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" style="filter: drop-shadow(0 0 15px #A855F760) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));"/>
                
                <!-- Score labels -->
                <text x="67.5" y="${220 - scores.sanguine * 9 - 8}" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" style="filter: drop-shadow(0 0 8px #3B82F680) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));">${scores.sanguine}</text>
                <text x="117.5" y="${220 - scores.choleric * 9 - 8}" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" style="filter: drop-shadow(0 0 8px #EF444480) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));">${scores.choleric}</text>
                <text x="167.5" y="${220 - scores.melancholy * 9 - 8}" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" style="filter: drop-shadow(0 0 8px #22C55E80) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));">${scores.melancholy}</text>
                <text x="217.5" y="${220 - scores.phlegmatic * 9 - 8}" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" style="filter: drop-shadow(0 0 8px #A855F780) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));">${scores.phlegmatic}</text>
                
                <!-- X-axis labels -->
                <text x="67.5" y="240" textAnchor="middle" fontSize="8" fill="rgba(255, 255, 255, 0.9)" transform="rotate(-45, 67.5, 240)">Sanguine</text>
                <text x="117.5" y="240" textAnchor="middle" fontSize="8" fill="rgba(255, 255, 255, 0.9)" transform="rotate(-45, 117.5, 240)">Choleric</text>
                <text x="167.5" y="240" textAnchor="middle" fontSize="8" fill="rgba(255, 255, 255, 0.9)" transform="rotate(-45, 167.5, 240)">Melancholy</text>
                <text x="217.5" y="240" textAnchor="middle" fontSize="8" fill="rgba(255, 255, 255, 0.9)" transform="rotate(-45, 217.5, 240)">Phlegmatic</text>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Legend -->
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 32px; position: relative; z-index: 10;">
          <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #3B82F6; box-shadow: 0 0 8px #3B82F660;"></div>
              <div style="display: flex; flex-direction: column;">
                <div style="font-size: 10px; font-weight: 500; color: rgba(255, 255, 255, 0.9);">Popular Sanguine</div>
                <div style="font-size: 14px; font-weight: bold; text-align: center; color: white;">${scores.sanguine}</div>
              </div>
            </div>
          </div>
          <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #EF4444; box-shadow: 0 0 8px #EF444460;"></div>
              <div style="display: flex; flex-direction: column;">
                <div style="font-size: 10px; font-weight: 500; color: rgba(255, 255, 255, 0.9);">Powerful Choleric</div>
                <div style="font-size: 14px; font-weight: bold; text-align: center; color: white;">${scores.choleric}</div>
              </div>
            </div>
          </div>
          <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #22C55E; box-shadow: 0 0 8px #22C55E60;"></div>
              <div style="display: flex; flex-direction: column;">
                <div style="font-size: 10px; font-weight: 500; color: rgba(255, 255, 255, 0.9);">Perfect Melancholy</div>
                <div style="font-size: 14px; font-weight: bold; text-align: center; color: white;">${scores.melancholy}</div>
              </div>
            </div>
          </div>
          <div style="background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #A855F7; box-shadow: 0 0 8px #A855F760;"></div>
              <div style="display: flex; flex-direction: column;">
                <div style="font-size: 10px; font-weight: 500; color: rgba(255, 255, 255, 0.9);">Peaceful Phlegmatic</div>
                <div style="font-size: 14px; font-weight: bold; text-align: center; color: white;">${scores.phlegmatic}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

    tempDiv.innerHTML = resultsHTML

    // Wait for content to render
    await new Promise((resolve) => setTimeout(resolve, 500))

    const canvas = await html2canvas(tempDiv, {
      width: 794,
      height: Math.max(1123, tempDiv.scrollHeight),
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#0f172a",
      logging: false,
    })

    document.body.removeChild(tempDiv)
    return canvas.toDataURL("image/png")
  }

  // Function to capture Assessment Page with clean styling
  const captureAssessmentPage = async () => {
    const html2canvas = (await import("html2canvas")).default

    const tempDiv = createCaptureElement(null, "capture-assessment")
    tempDiv.style.backgroundColor = "#ffffff"
    tempDiv.style.padding = "20px"

    // Generate clean assessment table HTML
    let assessmentHTML = `
    <div style="font-family: 'Arial', sans-serif; background: #ffffff; min-height: 1083px;">
      <h1 style="font-size: 24px; text-align: center; margin-bottom: 25px; color: #1f2937; border-bottom: 3px solid #2563eb; padding-bottom: 15px;">
        Personality Scoring Sheet
      </h1>
      <table style="width: 100%; border-collapse: collapse; font-size: 10px; margin-bottom: 15px; background: #ffffff;">
        <thead>
          <tr>
            <th style="border: 2px solid #000000; padding: 8px; background: #f8fafc; font-weight: bold; text-align: center; width: 40px;"></th>
            <th style="border: 2px solid #000000; padding: 8px; background: #3b82f6; color: white; text-align: center; font-weight: bold;">Popular Sanguine<br><span style="font-size: 8px;">Extrovert • Talker • Optimist</span></th>
            <th style="border: 2px solid #000000; padding: 8px; background: #ef4444; color: white; text-align: center; font-weight: bold;">Powerful Choleric<br><span style="font-size: 8px;">Extrovert • Doer • Optimist</span></th>
            <th style="border: 2px solid #000000; padding: 8px; background: #22c55e; color: white; text-align: center; font-weight: bold;">Perfect Melancholy<br><span style="font-size: 8px;">Introvert • Thinker • Pessimist</span></th>
            <th style="border: 2px solid #000000; padding: 8px; background: #a855f7; color: white; text-align: center; font-weight: bold;">Peaceful Phlegmatic<br><span style="font-size: 8px;">Introvert • Watcher • Pessimist</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="5" style="border: 2px solid #000000; padding: 8px; background: #dbeafe; font-weight: bold; text-align: center; font-size: 12px;">STRENGTHS</td>
          </tr>
  `

    // Add strengths rows
    personalityData.slice(0, 20).forEach((row, index) => {
      assessmentHTML += `
      <tr>
        <td style="border: 2px solid #000000; padding: 6px; text-align: center; font-weight: bold; background: #f1f5f9;">${index + 1}</td>
        <td style="border: 2px solid #000000; padding: 6px; background: ${selections[index] === "sanguine" ? "#dbeafe" : "#ffffff"};">${selections[index] === "sanguine" ? "✓ " : ""}${row.sanguine}</td>
        <td style="border: 2px solid #000000; padding: 6px; background: ${selections[index] === "choleric" ? "#fecaca" : "#ffffff"};">${selections[index] === "choleric" ? "✓ " : ""}${row.choleric}</td>
        <td style="border: 2px solid #000000; padding: 6px; background: ${selections[index] === "melancholy" ? "#dcfce7" : "#ffffff"};">${selections[index] === "melancholy" ? "✓ " : ""}${row.melancholy}</td>
        <td style="border: 2px solid #000000; padding: 6px; background: ${selections[index] === "phlegmatic" ? "#f3e8ff" : "#ffffff"};">${selections[index] === "phlegmatic" ? "✓ " : ""}${row.phlegmatic}</td>
      </tr>
    `
    })

    assessmentHTML += `
          <tr>
            <td colspan="5" style="border: 2px solid #000000; padding: 8px; background: #fef3c7; font-weight: bold; text-align: center; font-size: 12px;">WEAKNESSES</td>
          </tr>
  `

    // Add weaknesses rows
    personalityData.slice(20, 40).forEach((row, index) => {
      assessmentHTML += `
      <tr>
        <td style="border: 2px solid #000000; padding: 6px; text-align: center; font-weight: bold; background: #f1f5f9;">${index + 21}</td>
        <td style="border: 2px solid #000000; padding: 6px; background: ${selections[index + 20] === "sanguine" ? "#dbeafe" : "#fffbeb"};">${selections[index + 20] === "sanguine" ? "✓ " : ""}${row.sanguine}</td>
        <td style="border: 2px solid #000000; padding: 6px; background: ${selections[index + 20] === "choleric" ? "#fecaca" : "#fffbeb"};">${selections[index + 20] === "choleric" ? "✓ " : ""}${row.choleric}</td>
        <td style="border: 2px solid #000000; padding: 6px; background: ${selections[index + 20] === "melancholy" ? "#dcfce7" : "#fffbeb"};">${selections[index + 20] === "melancholy" ? "✓ " : ""}${row.melancholy}</td>
        <td style="border: 2px solid #000000; padding: 6px; background: ${selections[index + 20] === "phlegmatic" ? "#f3e8ff" : "#fffbeb"};">${selections[index + 20] === "phlegmatic" ? "✓ " : ""}${row.phlegmatic}</td>
      </tr>
    `
    })

    // Add scoring rows
    assessmentHTML += `
          <tr style="background: #fef3c7;">
            <td style="border: 2px solid #000000; padding: 8px; background: #fde68a; font-weight: bold; text-align: center; font-size: 10px;">Score<br>Strengths</td>
            <td style="border: 2px solid #000000; padding: 8px; text-align: center; font-weight: bold; color: #1e40af; font-size: 16px; background: #dbeafe;">${strengthScores.sanguine}</td>
            <td style="border: 2px solid #000000; padding: 8px; text-align: center; font-weight: bold; color: #dc2626; font-size: 16px; background: #fecaca;">${strengthScores.choleric}</td>
            <td style="border: 2px solid #000000; padding: 8px; text-align: center; font-weight: bold; color: #16a34a; font-size: 16px; background: #dcfce7;">${strengthScores.melancholy}</td>
            <td style="border: 2px solid #000000; padding: 8px; text-align: center; font-weight: bold; color: #9333ea; font-size: 16px; background: #f3e8ff;">${strengthScores.phlegmatic}</td>
          </tr>
          <tr style="background: #fef3c7;">
            <td style="border: 2px solid #000000; padding: 8px; background: #fde68a; font-weight: bold; text-align: center; font-size: 10px;">Score<br>Weakness</td>
            <td style="border: 2px solid #000000; padding: 8px; text-align: center; font-weight: bold; color: #1e40af; font-size: 16px; background: #dbeafe;">${weaknessScores.sanguine}</td>
            <td style="border: 2px solid #000000; padding: 8px; text-align: center; font-weight: bold; color: #dc2626; font-size: 16px; background: #fecaca;">${weaknessScores.choleric}</td>
            <td style="border: 2px solid #000000; padding: 8px; text-align: center; font-weight: bold; color: #16a34a; font-size: 16px; background: #dcfce7;">${weaknessScores.melancholy}</td>
            <td style="border: 2px solid #000000; padding: 8px; text-align: center; font-weight: bold; color: #9333ea; font-size: 16px; background: #f3e8ff;">${weaknessScores.phlegmatic}</td>
          </tr>
          <tr style="background: #fde68a;">
            <td style="border: 2px solid #000000; padding: 8px; background: #fbbf24; font-weight: bold; text-align: center; font-size: 10px;">Score<br>Total</td>
            <td style="border: 2px solid #000000; padding: 8px; text-align: center; font-weight: bold; color: #1e40af; font-size: 18px; background: #dbeafe;">${scores.sanguine}</td>
            <td style="border: 2px solid #000000; padding: 8px; text-align: center; font-weight: bold; color: #dc2626; font-size: 18px; background: #fecaca;">${scores.choleric}</td>
            <td style="border: 2px solid #000000; padding: 8px; text-align: center; font-weight: bold; color: #16a34a; font-size: 18px; background: #dcfce7;">${scores.melancholy}</td>
            <td style="border: 2px solid #000000; padding: 8px; text-align: center; font-weight: bold; color: #9333ea; font-size: 18px; background: #f3e8ff;">${scores.phlegmatic}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `

    tempDiv.innerHTML = assessmentHTML

    const canvas = await html2canvas(tempDiv, {
      width: 794,
      height: 1123,
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    })

    document.body.removeChild(tempDiv)
    return canvas.toDataURL("image/png")
  }

  // Function to capture Info Page with clean styling
  const captureInfoPage = async () => {
    const html2canvas = (await import("html2canvas")).default

    const tempDiv = createCaptureElement(null, "capture-info")
    tempDiv.style.backgroundColor = "#ffffff"
    tempDiv.style.padding = "20px"

    let infoHTML = `
    <div style="font-family: 'Arial', sans-serif; background: #ffffff; min-height: 1083px;">
      <h1 style="font-size: 24px; text-align: center; margin-bottom: 25px; color: #1f2937; border-bottom: 3px solid #2563eb; padding-bottom: 15px;">
        Personality Types Information Guide
      </h1>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; height: calc(100% - 80px);">
  `

    personalityDetails.forEach((detail) => {
      infoHTML += `
      <div style="border: 3px solid ${detail.color}; border-radius: 12px; overflow: hidden; break-inside: avoid; height: fit-content; background: #ffffff;">
        <div style="padding: 15px; color: white; text-align: center; font-weight: bold; font-size: 16px; background: ${detail.color};">
          <div style="margin-bottom: 5px;">${detail.title}</div>
          <div style="font-size: 12px; opacity: 0.9;">${detail.subtitle}</div>
        </div>
        <div style="padding: 15px; font-size: 9px; line-height: 1.4;">
          <div style="font-weight: bold; font-size: 11px; margin: 0 0 8px 0; color: #1f2937; text-transform: uppercase; border-bottom: 2px solid ${detail.color}; padding-bottom: 3px;">STRENGTHS</div>
          ${detail.sections.strengths
            .slice(0, 8)
            .map(
              (item) =>
                `<div style="margin-bottom: 3px; padding-left: 10px; position: relative;"><span style="position: absolute; left: 0; color: ${detail.color}; font-weight: bold;">•</span>${item}</div>`,
            )
            .join("")}
          
          <div style="font-weight: bold; font-size: 11px; margin: 12px 0 8px 0; color: #1f2937; text-transform: uppercase; border-bottom: 2px solid ${detail.color}; padding-bottom: 3px;">EMOTIONS</div>
          ${detail.sections.emotions
            .slice(0, 4)
            .map(
              (item) =>
                `<div style="margin-bottom: 3px; padding-left: 10px; position: relative;"><span style="position: absolute; left: 0; color: ${detail.color}; font-weight: bold;">•</span>${item}</div>`,
            )
            .join("")}
          
          <div style="font-weight: bold; font-size: 11px; margin: 12px 0 8px 0; color: #1f2937; text-transform: uppercase; border-bottom: 2px solid ${detail.color}; padding-bottom: 3px;">AT WORK</div>
          ${detail.sections.atWork
            .slice(0, 4)
            .map(
              (item) =>
                `<div style="margin-bottom: 3px; padding-left: 10px; position: relative;"><span style="position: absolute; left: 0; color: ${detail.color}; font-weight: bold;">•</span>${item}</div>`,
            )
            .join("")}
          
          <div style="font-weight: bold; font-size: 11px; margin: 12px 0 8px 0; color: #1f2937; text-transform: uppercase; border-bottom: 2px solid ${detail.color}; padding-bottom: 3px;">AS FRIEND</div>
          ${detail.sections.asFriend
            .slice(0, 4)
            .map(
              (item) =>
                `<div style="margin-bottom: 3px; padding-left: 10px; position: relative;"><span style="position: absolute; left: 0; color: ${detail.color}; font-weight: bold;">•</span>${item}</div>`,
            )
            .join("")}
        </div>
      </div>
    `
    })

    infoHTML += `
      </div>
    </div>
  `

    tempDiv.innerHTML = infoHTML

    const canvas = await html2canvas(tempDiv, {
      width: 794,
      height: 1123,
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    })

    document.body.removeChild(tempDiv)
    return canvas.toDataURL("image/png")
  }

  // Main print function - updated
  const handlePrint = async () => {
    setIsGeneratingPDF(true)

    try {
      // Import jsPDF
      const { jsPDF } = await import("jspdf")

      // Temporarily switch to results page to ensure charts are rendered
      const originalPage = currentPage
      if (currentPage !== 3) {
        setCurrentPage(3)
        // Wait for page transition and chart rendering
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      // Generate PNG images for each page
      console.log("Generating Results Page image...")
      const resultsImage = await captureResultsPage()

      console.log("Generating Assessment Page image...")
      const assessmentImage = await captureAssessmentPage()

      console.log("Generating Info Page image...")
      const infoImage = await captureInfoPage()

      // Restore original page
      if (originalPage !== 3) {
        setCurrentPage(originalPage)
      }

      // Create PDF with proper A4 dimensions
      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm

      // Add Results Page (Page 1)
      pdf.addImage(resultsImage, "PNG", 0, 0, pageWidth, pageHeight)

      // Add Assessment Page (Page 2)
      pdf.addPage()
      pdf.addImage(assessmentImage, "PNG", 0, 0, pageWidth, pageHeight)

      // Add Info Page (Page 3)
      pdf.addPage()
      pdf.addImage(infoImage, "PNG", 0, 0, pageWidth, pageHeight)

      // Download PDF
      const fileName = savedData ? `${savedData.name}_Personality_Report.pdf` : "Personality_Assessment_Report.pdf"
      pdf.save(fileName)

      console.log("PDF generated successfully!")
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const RadarChart = ({ data, title, isTotal = false }: { data: any; title: string; isTotal?: boolean }) => {
    const temperaments = Object.keys(data)
    const values = Object.values(data) as number[]
    const maxValue = Math.max(...values, 10) // Minimum scale of 10

    // Find the temperament with the highest score
    const highestScoreTemperament = temperaments.reduce((prev, current) =>
      data[current] > data[prev] ? current : prev,
    )
    const dominantColor = temperamentColors[highestScoreTemperament as keyof typeof temperamentColors]

    // Calculate points for the radar chart (4 points positioned correctly)
    const getPoint = (value: number, index: number) => {
      // Position temperaments correctly: Melancholy (top), Choleric (right), Sanguine (bottom), Phlegmatic (left)
      const angles = [-90, 0, 90, 180] // degrees for top, right, bottom, left
      const angle = angles[index] * (Math.PI / 180)
      const radius = (value / maxValue) * 80 // Scale to 80px radius
      const centerX = 100
      const centerY = 100
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      }
    }

    // Reorder data to match the visual layout: melancholy, choleric, sanguine, phlegmatic
    const orderedData = [
      { key: "melancholy", value: data.melancholy },
      { key: "choleric", value: data.choleric },
      { key: "sanguine", value: data.sanguine },
      { key: "phlegmatic", value: data.phlegmatic },
    ]

    const points = orderedData.map((item, index) => getPoint(item.value, index))
    const pathData = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"

    // Grid lines (concentric squares)
    const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0]

    return (
      <div
        data-chart={
          title === "Personality Profile Strengths"
            ? "strengths"
            : title === "Personality Profile Weaknesses"
              ? "weaknesses"
              : "total"
        }
        className={`p-4 sm:p-6 rounded-2xl shadow-2xl mb-6 sm:mb-8 mx-2 sm:mx-0 backdrop-blur-xl border relative overflow-hidden ${
          isTotal
            ? "bg-gradient-to-br from-purple-600/40 via-blue-600/40 to-indigo-600/40 border-purple-400/50 transform scale-105"
            : "bg-white/10 border-white/20"
        }`}
        style={{
          boxShadow: isTotal
            ? `0 0 80px ${dominantColor}50, 0 0 120px ${dominantColor}30, 0 25px 50px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.3)`
            : `0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
          animation: isTotal ? "float 3s ease-in-out infinite, glow 4s ease-in-out infinite" : "none",
        }}
      >
        {/* Chart background glow */}
        <div
          className="absolute inset-0 blur-2xl"
          style={{
            background: isTotal
              ? `radial-gradient(circle at 50% 50%, ${dominantColor}60, rgba(147, 51, 234, 0.4), transparent 70%)`
              : `radial-gradient(circle at 50% 50%, ${dominantColor}40, transparent 70%)`,
            opacity: isTotal ? 0.4 : 0.2,
          }}
        />
        {/* Special pulsing border for total chart */}
        {isTotal && (
          <div
            className="absolute inset-0 rounded-2xl border-4 border-purple-400/60 animate-pulse"
            style={{
              boxShadow: `0 0 40px ${dominantColor}60, inset 0 0 40px ${dominantColor}20`,
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        )}

        <h3
          className={`${isTotal ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"} font-bold text-center mb-6 sm:mb-8 text-white relative z-10`}
          style={{
            textShadow: isTotal
              ? `0 0 30px ${dominantColor}FF, 0 0 60px ${dominantColor}80, 0 4px 8px rgba(0, 0, 0, 0.5)`
              : "0 2px 4px rgba(0, 0, 0, 0.3)",
            filter: isTotal
              ? "drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))"
              : "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
          }}
        >
          {isTotal && (
            <div className="inline-block backdrop-blur-sm bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full px-6 py-3 border-2 border-purple-400/50 shadow-2xl mb-3 animate-pulse">
              <span className="bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent font-extrabold">
                {title}
              </span>
            </div>
          )}
          {!isTotal && title}
        </h3>

        {/* Radar Chart and Bar Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center relative z-10">
          {/* Radar Chart */}
          <div className="flex flex-col items-center">
            <div className="backdrop-blur-sm bg-white/10 rounded-full px-3 py-1 border border-white/20 shadow-lg mb-3">
              <h4 className="text-sm sm:text-base font-semib old text-white drop-shadow-sm">Radar View</h4>
            </div>
            <div className="relative flex justify-center px-12 py-8">
              <svg
                width="240"
                height="240"
                viewBox="0 0 200 200"
                className={`mb-4 sm:w-[270px] sm:h-[270px] drop-shadow-lg ${isTotal ? "transform scale-110" : ""}`}
                style={{
                  filter: isTotal
                    ? `drop-shadow(0 0 20px ${dominantColor}80) drop-shadow(0 0 40px ${dominantColor}40)`
                    : "none",
                }}
              >
                {/* Grid lines with glow */}
                {gridLevels.map((level, i) => {
                  const size = level * 80
                  return (
                    <rect
                      key={i}
                      x={100 - size}
                      y={100 - size}
                      width={size * 2}
                      height={size * 2}
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="1"
                      style={{
                        filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))",
                      }}
                    />
                  )
                })}

                {/* Axis lines with glow */}
                <line
                  x1="100"
                  y1="20"
                  x2="100"
                  y2="180"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="1"
                  style={{ filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))" }}
                />
                <line
                  x1="20"
                  y1="100"
                  x2="180"
                  y2="100"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="1"
                  style={{ filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))" }}
                />

                {/* Data area with enhanced glow */}
                <path
                  d={pathData}
                  fill={isTotal ? `${dominantColor}80` : `${dominantColor}40`}
                  stroke={dominantColor}
                  strokeWidth={isTotal ? "6" : "3"}
                  style={{
                    filter: isTotal
                      ? `drop-shadow(0 0 20px ${dominantColor}FF) drop-shadow(0 0 40px ${dominantColor}80)`
                      : `drop-shadow(0 0 10px ${dominantColor}80)`,
                  }}
                />

                {/* Data points with enhanced glow */}
                {points.map((point, index) => (
                  <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r={isTotal ? "7" : "5"}
                    fill={temperamentColors[orderedData[index].key as keyof typeof temperamentColors]}
                    stroke="white"
                    strokeWidth={isTotal ? "3" : "2"}
                    style={{
                      filter: isTotal
                        ? `drop-shadow(0 0 15px ${temperamentColors[orderedData[index].key as keyof typeof temperamentColors]}FF) drop-shadow(0 0 30px ${temperamentColors[orderedData[index].key as keyof typeof temperamentColors]}80)`
                        : `drop-shadow(0 0 8px ${temperamentColors[orderedData[index].key as keyof typeof temperamentColors]}80)`,
                    }}
                  />
                ))}
              </svg>

              {/* Labels with glass effect */}
              <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="backdrop-blur-sm bg-white/20 rounded-lg px-2 py-1 border border-white/30 shadow-lg">
                  <div className="text-[9px] font-semibold text-center text-white drop-shadow-sm">
                    <div className="text-[9px] leading-tight">Perfect</div>
                    <div className="text-[9px] leading-tight">Melancholy</div>
                    <span className="text-xs font-bold">{data.melancholy}</span>
                  </div>
                </div>
              </div>
              <div className="absolute right-[20%] top-1/2 transform translate-x-1/2 -translate-y-1/2">
                <div className="backdrop-blur-sm bg-white/20 rounded-lg px-2 py-1 border border-white/30 shadow-lg">
                  <div className="text-[9px] font-semibold text-center text-white drop-shadow-sm">
                    <div className="text-[9px] leading-tight">Powerful</div>
                    <div className="text-[9px] leading-tight">Choleric</div>
                    <span className="text-xs font-bold">{data.choleric}</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <div className="backdrop-blur-sm bg-white/20 rounded-lg px-2 py-1 border border-white/30 shadow-lg">
                  <div className="text-[9px] font-semibold text-center text-white drop-shadow-sm">
                    <div className="text-[9px] leading-tight">Popular</div>
                    <div className="text-[9px] leading-tight">Sanguine</div>
                    <span className="text-xs font-bold">{data.sanguine}</span>
                  </div>
                </div>
              </div>
              <div className="absolute left-[20%] top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="backdrop-blur-sm bg-white/20 rounded-lg px-2 py-1 border border-white/30 shadow-lg">
                  <div className="text-[9px] font-semibold text-center text-white drop-shadow-sm">
                    <div className="text-[9px] leading-tight">Peaceful</div>
                    <div className="text-[9px] leading-tight">Phlegmatic</div>
                    <span className="text-xs font-bold">{data.phlegmatic}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Bar Chart */}
          <div className="flex flex-col items-center">
            <div className="backdrop-blur-sm bg-white/10 rounded-full px-3 py-1 border border-white/20 shadow-lg mb-3">
              <h4 className="text-sm sm:text-base font-semibold text-white drop-shadow-sm">Bar Chart View</h4>
            </div>
            <div className="w-full max-w-xs sm:max-w-sm flex justify-center">
              <svg width="100%" height="250" viewBox="0 0 280 250" className="mb-4 sm:h-[300px] drop-shadow-lg">
                {/* Grid lines with glow */}
                {[0, 5, 10, 15, 20].map((value, i) => (
                  <g key={i}>
                    <line
                      x1="35"
                      y1={220 - (value / 20) * 180}
                      x2="260"
                      y2={220 - (value / 20) * 180}
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="1"
                      style={{ filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))" }}
                    />
                    <text
                      x="30"
                      y={225 - (value / 20) * 180}
                      textAnchor="end"
                      fontSize="10"
                      fill="rgba(255, 255, 255, 0.8)"
                      style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))" }}
                    >
                      {value}
                    </text>
                  </g>
                ))}

                {/* Bars with enhanced glow */}
                {Object.entries(data).map(([temperament, score], index) => {
                  const barWidth = 35
                  const barHeight = (Number(score) / Math.max(20, maxValue)) * 180
                  const x = 50 + index * 50
                  const y = 220 - barHeight
                  const color = temperamentColors[temperament as keyof typeof temperamentColors]

                  return (
                    <g key={temperament}>
                      {/* Bar with glow */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill={color}
                        rx="4"
                        stroke="rgba(255, 255, 255, 0.3)"
                        strokeWidth="2"
                        style={{
                          filter: `drop-shadow(0 0 15px ${color}60) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))`,
                        }}
                      />
                      {/* Score label with glow */}
                      <text
                        x={x + barWidth / 2}
                        y={y - 8}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="bold"
                        fill="white"
                        style={{
                          filter: `drop-shadow(0 0 8px ${color}80) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))`,
                        }}
                      >
                        {score}
                      </text>
                      {/* Temperament label with backdrop */}
                      <text
                        x={x + barWidth / 2}
                        y={240}
                        textAnchor="middle"
                        fontSize="8"
                        fill="rgba(255, 255, 255, 0.9)"
                        transform={`rotate(-45, ${x + barWidth / 2}, 240)`}
                        style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))" }}
                      >
                        {temperamentNames[temperament as keyof typeof temperamentNames].split(" ")[1]}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Combined Legend with glass effect */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 w-full mx-auto relative z-10">
          {Object.entries(data).map(([temperament, score]) => (
            <div
              key={temperament}
              className="backdrop-blur-sm bg-white/10 rounded-xl px-3 py-2 border border-white/20 shadow-lg"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: temperamentColors[temperament as keyof typeof temperamentColors],
                    boxShadow: `0 0 8px ${temperamentColors[temperament as keyof typeof temperamentColors]}60`,
                  }}
                />
                <div className="flex flex-col">
                  <div className="text-[8px] sm:text-[10px] font-medium leading-tight text-white/90 drop-shadow-sm">
                    {temperamentNames[temperament as keyof typeof temperamentNames]}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-center text-white drop-shadow-sm">{score}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen overflow-hidden relative"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      ref={containerRef}
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e40af 75%, #3b82f6 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
      }}
    >
      {/* Global gradient animation */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        /* moved here from the deleted inner style tag */
        .assessment-cell {
          word-break: break-word;
          hyphens: auto;
          overflow-wrap: break-word;
        }

        /* Radio button styling for assessment page */
        input[type="radio"] {
          appearance: none;
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border: 2px solid rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        input[type="radio"]:checked {
          background: #000000;
          border-color: #000000;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8);
        }

        input[type="radio"]:hover {
          border-color: rgba(255, 255, 255, 0.8);
          transform: scale(1.1);
        }

        @media (min-width: 640px) {
          input[type="radio"] {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>

      {/* Ambient lighting overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-800/20 via-transparent to-blue-900/30" />
        <div
          className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-slate-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s", animationDelay: "4s" }}
        />
      </div>

      {/* Page Navigation Indicators with enhanced glass effect */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-3">
        {[1, 2, 3].map((page) => (
          <div
            key={page}
            className={`w-4 h-4 rounded-full transition-all duration-300 backdrop-blur-xl border border-white/30 ${
              currentPage === page ? "bg-white/90 shadow-2xl" : "bg-white/20 hover:bg-white/40"
            }`}
            style={{
              boxShadow:
                currentPage === page
                  ? "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
                  : "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              animation: currentPage === page ? "glow 2s ease-in-out infinite" : "none",
            }}
          />
        ))}
      </div>

      {/* Swipe Navigation Hints with enhanced glass effect */}
      <div className="fixed top-4 right-4 z-50 flex space-x-3">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-3 backdrop-blur-xl bg-white/20 rounded-full shadow-2xl border border-white/30 hover:bg-white/30 hover:scale-110 transition-all duration-300"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            <ChevronLeft className="w-5 h-5 text-white drop-shadow-lg" />
          </button>
        )}
        {currentPage < 3 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-3 backdrop-blur-xl bg-white/20 rounded-full shadow-2xl border border-white/30 hover:bg-white/30 hover:scale-110 transition-all duration-300"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              animation: "float 3s ease-in-out infinite",
              animationDelay: "1s",
            }}
          >
            <ChevronRight className="w-5 h-5 text-white drop-shadow-lg" />
          </button>
        )}
      </div>

      <div
        className="flex transition-transform duration-500 ease-out h-screen"
        style={{ transform: `translateX(-${(currentPage - 1) * 100}%)` }}
      >
        {/* Page 1 - Descriptions */}
        <div className="w-full flex-shrink-0 p-2 sm:p-4 overflow-y-auto">
          <div className="max-w-4xl mx-auto pt-12 sm:pt-16">
            <PersonalityDetailsPage />
          </div>
        </div>

        {/* Page 2 - Home/Scoring Sheet */}
        <div className="w-full flex-shrink-0 p-2 sm:p-4 overflow-y-auto relative">
          <div className="max-w-5xl mx-auto pt-12 sm:pt-16">
            {/* Header with enhanced glass effect */}
            <div
              className="backdrop-blur-xl bg-gray-800/80 text-white text-center py-3 sm:py-4 mb-0 rounded-t-2xl border border-white/20 shadow-2xl relative overflow-hidden"
              style={{
                boxShadow: "0 0 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              }}
            >
              {/* Header glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-50" />

              <h1 className="text-lg sm:text-xl font-bold relative z-10 drop-shadow-lg">Personality Scoring Sheet</h1>
              <p className="text-xs sm:text-sm mt-1 relative z-10 drop-shadow-md opacity-90">
                Pick the word that best describes you in each row
              </p>
            </div>

            {/* Column Headers with enhanced styling */}
            <div
              className="grid border-b-2 border-white/30 backdrop-blur-sm"
              style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}
            >
              <div className="backdrop-blur-xl bg-white/20 border border-white/30 p-1 sm:p-2 text-center font-bold text-[8px] sm:text-sm shadow-lg"></div>
              <div
                className="text-white border border-white/30 p-1 sm:p-2 text-center font-bold text-[8px] sm:text-xs backdrop-blur-xl shadow-lg"
                style={{
                  backgroundColor: `${temperamentColors.sanguine}CC`,
                  boxShadow: `0 0 20px ${temperamentColors.sanguine}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                }}
              >
                Popular Sanguine
                <br />
                <span className="text-[7px] sm:text-xs font-normal hidden sm:inline opacity-90">
                  Extrovert • Talker • Optimist
                </span>
              </div>
              <div
                className="text-white border border-white/30 p-1 sm:p-2 text-center font-bold text-[8px] sm:text-xs backdrop-blur-xl shadow-lg"
                style={{
                  backgroundColor: `${temperamentColors.choleric}CC`,
                  boxShadow: `0 0 20px ${temperamentColors.choleric}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                }}
              >
                Powerful Choleric
                <br />
                <span className="text-[7px] sm:text-xs font-normal hidden sm:inline opacity-90">
                  Extrovert • Doer • Optimist
                </span>
              </div>
              <div
                className="text-white border border-white/30 p-1 sm:p-2 text-center font-bold text-[8px] sm:text-xs backdrop-blur-xl shadow-lg"
                style={{
                  backgroundColor: `${temperamentColors.melancholy}CC`,
                  boxShadow: `0 0 20px ${temperamentColors.melancholy}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                }}
              >
                Perfect Melancholy
                <br />
                <span className="text-[7px] sm:text-xs font-normal hidden sm:inline opacity-90">
                  Introvert • Thinker • Pessimist
                </span>
              </div>
              <div
                className="text-white border border-white/30 p-1 sm:p-2 text-center font-bold text-[8px] sm:text-xs backdrop-blur-xl shadow-lg"
                style={{
                  backgroundColor: `${temperamentColors.phlegmatic}CC`,
                  boxShadow: `0 0 20px ${temperamentColors.phlegmatic}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                }}
              >
                Peaceful Phlegmatic
                <br />
                <span className="text-[7px] sm:text-xs font-normal hidden sm:inline opacity-90">
                  Introvert • Watcher • Pessimist
                </span>
              </div>
            </div>

            {/* Strengths Section Header */}
            <div
              className="backdrop-blur-xl bg-blue-400/80 border border-white/30 p-1 sm:p-2 text-center font-bold text-xs sm:text-sm text-white shadow-lg"
              style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)" }}
            >
              Strengths
            </div>

            {/* Strengths Rows (1-20) */}
            <div className="border border-white/30 backdrop-blur-sm bg-white/5 shadow-xl rounded-b-lg overflow-hidden">
              {personalityData.slice(0, 20).map((row, index) => (
                <div
                  key={index}
                  className="grid border-b border-white/20 hover:bg-white/10 transition-all duration-200"
                  style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}
                >
                  <div className="backdrop-blur-sm bg-white/20 border-r border-white/20 p-1 sm:p-2 text-center font-bold text-[6px] sm:text-sm flex items-center justify-center text-white drop-shadow-sm">
                    {index + 1}
                  </div>
                  {Object.entries(row).map(([temperament, trait]) => (
                    <div
                      key={temperament}
                      className="border-r border-white/20 px-0.5 py-1.5 sm:p-2 backdrop-blur-sm bg-white/10 assessment-cell hover:bg-white/20 transition-all duration-200"
                    >
                      <label className="flex items-start space-x-1 sm:space-x-2 cursor-pointer text-[8px] sm:text-xs leading-none">
                        <input
                          type="radio"
                          name={`row-${index}`}
                          value={temperament}
                          checked={selections[index] === temperament}
                          onChange={() => handleSelection(index, temperament)}
                          className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0 mt-0.5 accent-white"
                        />
                        <span className="flex-1 leading-tight break-words hyphens-auto font-bold text-white drop-shadow-sm">
                          {trait}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Progress Bar with enhanced glass effect */}
            <div
              className="backdrop-blur-xl bg-white/10 border border-white/30 p-4 sm:p-6 shadow-2xl rounded-2xl my-6"
              style={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm sm:text-base font-semibold text-white drop-shadow-sm">Progress</span>
                <span className="text-sm sm:text-base font-semibold text-white drop-shadow-sm">
                  {Object.keys(selections).length}/40 completed
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 sm:h-4 backdrop-blur-sm border border-white/30 shadow-inner">
                <div
                  className="h-3 sm:h-4 rounded-full transition-all duration-500 ease-out shadow-lg"
                  style={{
                    width: `${(Object.keys(selections).length / 40) * 100}%`,
                    background: "linear-gradient(90deg, #3B82F6, #22C55E, #EF4444, #A855F7)",
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                  }}
                ></div>
              </div>
              <div className="mt-3 text-xs sm:text-sm text-white/90 text-center backdrop-blur-sm bg-white/10 rounded-full px-4 py-2 border border-white/20 shadow-lg">
                {Object.keys(selections).length === 0 && "Start by selecting traits that describe you best"}
                {Object.keys(selections).length > 0 &&
                  Object.keys(selections).length < 20 &&
                  "Keep going! Select one trait from each row"}
                {Object.keys(selections).length >= 20 &&
                  Object.keys(selections).length < 40 &&
                  "Great progress! Complete the remaining questions"}
                {Object.keys(selections).length === 40 &&
                  "🎉 Assessment complete! Check your results on the charts page"}
              </div>
            </div>

            {/* Weaknesses Section Header */}
            <div
              className="backdrop-blur-xl bg-yellow-400/80 border border-white/30 p-1 sm:p-2 text-center font-bold text-xs sm:text-sm text-white shadow-lg"
              style={{ boxShadow: "0 0 20px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)" }}
            >
              Weaknesses
            </div>

            {/* Weaknesses Rows (21-40) */}
            <div className="border border-white/30 backdrop-blur-sm bg-white/5 shadow-xl rounded-b-lg overflow-hidden">
              {personalityData.slice(20, 40).map((row, index) => (
                <div
                  key={index + 20}
                  className="grid border-b border-white/20 hover:bg-white/10 transition-all duration-200"
                  style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}
                >
                  <div className="backdrop-blur-sm bg-white/20 border-r border-white/20 p-1 sm:p-2 text-center font-bold text-[6px] sm:text-sm flex items-center justify-center text-white drop-shadow-sm">
                    {index + 21}
                  </div>
                  {Object.entries(row).map(([temperament, trait]) => (
                    <div
                      key={temperament}
                      className="border-r border-white/20 px-0.5 py-1.5 sm:p-2 backdrop-blur-sm bg-yellow-200/20 assessment-cell hover:bg-yellow-200/30 transition-all duration-200"
                    >
                      <label className="flex items-start space-x-1 sm:space-x-2 cursor-pointer text-[8px] sm:text-xs leading-none">
                        <input
                          type="radio"
                          name={`row-${index + 20}`}
                          value={temperament}
                          checked={selections[index + 20] === temperament}
                          onChange={() => handleSelection(index + 20, temperament)}
                          className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0 mt-0.5 accent-white"
                        />
                        <span className="flex-1 leading-tight break-words hyphens-auto font-bold text-white drop-shadow-sm">
                          {trait}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Scoring Table with enhanced glass effect */}
            <div
              className="mt-6 border border-white/30 backdrop-blur-xl bg-white/10 shadow-2xl rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)" }}
            >
              {/* Score Strengths Row */}
              <div
                className="grid border-b border-white/20"
                style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}
              >
                <div
                  className="backdrop-blur-xl bg-yellow-300/80 border-r border-white/20 p-1 sm:p-2 text-center font-bold text-[6px] sm:text-xs leading-tight text-white drop-shadow-sm"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)" }}
                >
                  Score
                  <br />
                  Strengths
                </div>
                {Object.entries(temperamentNames).map(([key, name]) => (
                  <div
                    key={key}
                    className="backdrop-blur-sm bg-yellow-200/20 border-r border-white/20 p-1 sm:p-2 text-center"
                  >
                    <div
                      className="text-base sm:text-lg font-bold text-blue-200 drop-shadow-lg"
                      style={{ filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))" }}
                    >
                      {strengthScores[key as keyof typeof strengthScores]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Score Weakness Row */}
              <div
                className="grid border-b border-white/20"
                style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}
              >
                <div
                  className="backdrop-blur-xl bg-yellow-300/80 border-r border-white/20 p-1 sm:p-2 text-center font-bold text-[6px] sm:text-xs leading-tight text-white drop-shadow-sm"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)" }}
                >
                  Score
                  <br />
                  Weakness
                </div>
                {Object.entries(temperamentNames).map(([key, name]) => (
                  <div
                    key={key}
                    className="backdrop-blur-sm bg-yellow-200/20 border-r border-white/20 p-1 sm:p-2 text-center"
                  >
                    <div
                      className="text-base sm:text-lg font-bold text-red-300 drop-shadow-lg"
                      style={{ filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))" }}
                    >
                      {weaknessScores[key as keyof typeof weaknessScores]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Score Total Row */}
              <div className="grid" style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}>
                <div
                  className="backdrop-blur-xl bg-yellow-400/80 border-r border-white/20 p-1 sm:p-2 text-center font-bold text-[6px] sm:text-xs leading-tight text-white drop-shadow-sm"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)" }}
                >
                  Score
                  <br />
                  Total
                </div>
                {Object.entries(temperamentNames).map(([key, name]) => (
                  <div
                    key={key}
                    className="backdrop-blur-sm bg-yellow-300/20 border-r border-white/20 p-1 sm:p-2 text-center"
                  >
                    <div
                      className="text-base sm:text-lg font-bold text-purple-200 drop-shadow-lg"
                      style={{ filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))" }}
                    >
                      {scores[key as keyof typeof scores]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Results Popup with enhanced glass effect */}
            {showSavePopup && (
              <div
                className="mt-6 p-6 backdrop-blur-2xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 mx-auto max-w-sm relative overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 60px rgba(255, 255, 255, 0.2), 0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
              >
                {/* Popup glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-50 blur-xl" />

                <h3 className="text-lg font-bold text-center mb-3 text-white drop-shadow-lg relative z-10">
                  Save Assessment Results
                </h3>
                <p className="text-white/80 text-center mb-4 text-sm drop-shadow-sm relative z-10">
                  Enter your name to save the assessment results
                </p>
                <input
                  type="text"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full p-3 backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl mb-4 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 text-white placeholder-white/60 shadow-lg relative z-10"
                  style={{ boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.1)" }}
                  autoFocus
                />
                <div className="flex gap-3 relative z-10">
                  <button
                    onClick={() => {
                      setShowSavePopup(false)
                      setPersonName("")
                    }}
                    className="flex-1 h-12 backdrop-blur-xl bg-gray-500/60 text-white rounded-2xl hover:bg-gray-500/80 transition-all duration-300 font-semibold hover:scale-105 active:scale-95 shadow-lg border border-white/20"
                    style={{
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmSave}
                    disabled={!personName.trim()}
                    className={`flex-1 h-12 rounded-2xl transition-all duration-300 font-semibold hover:scale-105 active:scale-95 shadow-lg border border-white/20 ${
                      personName.trim()
                        ? "backdrop-blur-xl bg-green-500/60 text-white hover:bg-green-500/80"
                        : "backdrop-blur-xl bg-gray-400/40 text-white/60 cursor-not-allowed opacity-60"
                    }`}
                    style={{
                      boxShadow: personName.trim()
                        ? "0 0 20px rgba(34, 197, 94, 0.4), 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                        : "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* Save and Refresh Buttons with enhanced glass effect */}
            <div className="mt-8 flex justify-center gap-6">
              <button
                onClick={handleSaveResults}
                disabled={savedData !== null}
                className={`w-48 h-14 rounded-3xl font-semibold text-white transition-all duration-300 backdrop-blur-2xl border border-white/30 shadow-2xl ${
                  savedData === null
                    ? "bg-green-500/60 hover:bg-green-500/80 hover:shadow-2xl hover:scale-105 active:scale-95"
                    : "bg-gray-400/40 cursor-not-allowed opacity-60"
                }`}
                style={{
                  boxShadow:
                    savedData === null
                      ? "0 0 40px rgba(34, 197, 94, 0.4), 0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                      : "0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  animation: savedData === null ? "float 4s ease-in-out infinite" : "none",
                }}
              >
                <span className="flex items-center justify-center gap-2 drop-shadow-lg">Save Results</span>
              </button>
              <button
                onClick={handleRefresh}
                className="w-48 h-14 rounded-3xl font-semibold text-white backdrop-blur-2xl bg-red-500/60 hover:bg-red-500/80 shadow-2xl transition-all duration-300 border border-white/30 hover:shadow-2xl hover:scale-105 active:scale-95"
                style={{
                  boxShadow:
                    "0 0 40px rgba(239, 68, 68, 0.4), 0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  animation: "float 4s ease-in-out infinite",
                  animationDelay: "2s",
                }}
              >
                <span className="flex items-center justify-center gap-2 drop-shadow-lg">Refresh</span>
              </button>
            </div>

            {/* Saved Data Display with enhanced glass effect */}
            {savedData && (
              <div
                className="mt-6 p-6 backdrop-blur-2xl bg-green-500/20 border border-green-400/30 rounded-3xl text-center shadow-2xl relative overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 40px rgba(34, 197, 94, 0.3), 0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
              >
                {/* Success glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 opacity-50 blur-xl" />

                <p className="text-white font-semibold drop-shadow-lg relative z-10">
                  ✅ Results saved for: <span className="font-bold">{savedData.name}</span>
                </p>
                <p className="text-white/80 text-sm drop-shadow-sm relative z-10">Saved on: {savedData.date}</p>
              </div>
            )}
          </div>
        </div>

        {/* Page 3 - Charts */}
        <div className="w-full flex-shrink-0 p-2 sm:p-4 overflow-y-auto">
          <div className="max-w-2xl mx-auto pt-12 sm:pt-16">
            <RadarChart data={strengthScores} title="Personality Profile Strengths" />
            <RadarChart data={weaknessScores} title="Personality Profile Weaknesses" />

            {/* Special header for Total Profile with enhanced effects */}
            <div className="text-center mb-6 sm:mb-8 px-2">
              <div
                className="inline-block backdrop-blur-2xl bg-gradient-to-r from-purple-500/60 to-blue-500/60 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl border border-white/30 relative overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 60px rgba(147, 51, 234, 0.4), 0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  animation: "float 5s ease-in-out infinite",
                }}
              >
                {/* Header glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-blue-400/30 opacity-50 blur-lg" />

                <span className="text-sm sm:text-lg font-bold drop-shadow-lg relative z-10">
                  🎯 YOUR COMPLETE PERSONALITY PROFILE
                </span>
              </div>
            </div>

            <RadarChart data={scores} title="Total Personality Profile" isTotal={true} />

            {/* Print Button with enhanced glass effect */}
            <div className="flex justify-center mt-10 mb-8">
              <button
                onClick={handlePrint}
                disabled={isGeneratingPDF}
                className={`w-56 h-16 rounded-3xl font-semibold text-white shadow-2xl transition-all duration-300 backdrop-blur-2xl border border-white/30 hover:shadow-2xl hover:scale-105 active:scale-95 ${
                  isGeneratingPDF
                    ? "bg-gray-500/60 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500/60 to-blue-500/60 hover:from-purple-600/80 hover:to-blue-600/80"
                }`}
                style={{
                  boxShadow: isGeneratingPDF
                    ? "0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                    : "0 0 60px rgba(147, 51, 234, 0.4), 0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  animation: isGeneratingPDF ? "none" : "float 6s ease-in-out infinite",
                }}
              >
                <span className="flex items-center justify-center gap-3 drop-shadow-lg text-lg">
                  {isGeneratingPDF ? "Generating PDF..." : "Print Report"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Print Content - Hidden on screen, visible when printing */}
      <div className="print-content" style={{ display: "none" }}>
        {/* Page 1: Results */}
        <div className="print-page print-results">
          <h1>Personality Assessment Results</h1>

          <h3>Personality Profile Strengths</h3>
          <div className="score-display">
            <div className="score-item">
              <div className="score-label">Popular Sanguine</div>
              <div className="score-value" style={{ color: "#3B82F6" }}>
                {strengthScores.sanguine}
              </div>
            </div>
            <div className="score-item">
              <div className="score-label">Powerful Choleric</div>
              <div className="score-value" style={{ color: "#EF4444" }}>
                {strengthScores.choleric}
              </div>
            </div>
            <div className="score-item">
              <div className="score-label">Perfect Melancholy</div>
              <div className="score-value" style={{ color: "#22C55E" }}>
                {strengthScores.melancholy}
              </div>
            </div>
            <div className="score-item">
              <div className="score-label">Peaceful Phlegmatic</div>
              <div className="score-value" style={{ color: "#A855F7" }}>
                {strengthScores.phlegmatic}
              </div>
            </div>
          </div>

          <h3>Personality Profile Weaknesses</h3>
          <div className="score-display">
            <div className="score-item">
              <div className="score-label">Popular Sanguine</div>
              <div className="score-value" style={{ color: "#3B82F6" }}>
                {weaknessScores.sanguine}
              </div>
            </div>
            <div className="score-item">
              <div className="score-label">Powerful Choleric</div>
              <div className="score-value" style={{ color: "#EF4444" }}>
                {weaknessScores.choleric}
              </div>
            </div>
            <div className="score-item">
              <div className="score-label">Perfect Melancholy</div>
              <div className="score-value" style={{ color: "#22C55E" }}>
                {weaknessScores.melancholy}
              </div>
            </div>
            <div className="score-item">
              <div className="score-label">Peaceful Phlegmatic</div>
              <div className="score-value" style={{ color: "#A855F7" }}>
                {weaknessScores.phlegmatic}
              </div>
            </div>
          </div>

          <h3>Total Personality Profile</h3>
          <div className="score-display">
            <div className="score-item">
              <div className="score-label">Popular Sanguine</div>
              <div className="score-value" style={{ color: "#3B82F6" }}>
                {scores.sanguine}
              </div>
            </div>
            <div className="score-item">
              <div className="score-label">Powerful Choleric</div>
              <div className="score-value" style={{ color: "#EF4444" }}>
                {scores.choleric}
              </div>
            </div>
            <div className="score-item">
              <div className="score-label">Perfect Melancholy</div>
              <div className="score-value" style={{ color: "#22C55E" }}>
                {scores.melancholy}
              </div>
            </div>
            <div className="score-item">
              <div className="score-label">Peaceful Phlegmatic</div>
              <div className="score-value" style={{ color: "#A855F7" }}>
                {scores.phlegmatic}
              </div>
            </div>
          </div>
        </div>

        {/* Page 2: Assessment Sheet */}
        <div className="print-page print-assessment">
          <h1>Personality Scoring Sheet</h1>

          <table>
            <thead>
              <tr>
                <th></th>
                <th style={{ backgroundColor: "#3182ce", color: "white" }}>Popular Sanguine</th>
                <th style={{ backgroundColor: "#e53e3e", color: "white" }}>Powerful Choleric</th>
                <th style={{ backgroundColor: "#38a169", color: "white" }}>Perfect Melancholy</th>
                <th style={{ backgroundColor: "#805ad5", color: "white" }}>Peaceful Phlegmatic</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="section-header" style={{ backgroundColor: "#bee3f8" }}>
                  Strengths
                </td>
              </tr>
              {personalityData.slice(0, 20).map((row, index) => (
                <tr key={index}>
                  <td className="row-number">{index + 1}</td>
                  <td>
                    {selections[index] === "sanguine" ? "✓ " : ""}
                    {row.sanguine}
                  </td>
                  <td>
                    {selections[index] === "choleric" ? "✓ " : ""}
                    {row.choleric}
                  </td>
                  <td>
                    {selections[index] === "melancholy" ? "✓ " : ""}
                    {row.melancholy}
                  </td>
                  <td>
                    {selections[index] === "phlegmatic" ? "✓ " : ""}
                    {row.phlegmatic}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="section-header" style={{ backgroundColor: "#faf089" }}>
                  Weaknesses
                </td>
              </tr>
              {personalityData.slice(20, 40).map((row, index) => (
                <tr key={index + 20}>
                  <td className="row-number">{index + 21}</td>
                  <td style={{ backgroundColor: "#fffbeb" }}>
                    {selections[index + 20] === "sanguine" ? "✓ " : ""}
                    {row.sanguine}
                  </td>
                  <td style={{ backgroundColor: "#fffbeb" }}>
                    {selections[index + 20] === "choleric" ? "✓ " : ""}
                    {row.choleric}
                  </td>
                  <td style={{ backgroundColor: "#fffbeb" }}>
                    {selections[index + 20] === "melancholy" ? "✓ " : ""}
                    {row.melancholy}
                  </td>
                  <td style={{ backgroundColor: "#fffbeb" }}>
                    {selections[index + 20] === "phlegmatic" ? "✓ " : ""}
                    {row.phlegmatic}
                  </td>
                </tr>
              ))}
              <tr style={{ backgroundColor: "#fef3c7" }}>
                <td style={{ backgroundColor: "#fde68a", fontWeight: "bold" }}>Score Strengths</td>
                <td style={{ textAlign: "center", fontWeight: "bold", color: "#1e40af" }}>{strengthScores.sanguine}</td>
                <td style={{ textAlign: "center", fontWeight: "bold", color: "#1e40af" }}>{strengthScores.choleric}</td>
                <td style={{ textAlign: "center", fontWeight: "bold", color: "#1e40af" }}>
                  {strengthScores.melancholy}
                </td>
                <td style={{ textAlign: "center", fontWeight: "bold", color: "#1e40af" }}>
                  {strengthScores.phlegmatic}
                </td>
              </tr>
              <tr style={{ backgroundColor: "#fef3c7" }}>
                <td style={{ backgroundColor: "#fde68a", fontWeight: "bold" }}>Score Weakness</td>
                <td style={{ textAlign: "center", fontWeight: "bold", color: "#dc2626" }}>{weaknessScores.sanguine}</td>
                <td style={{ textAlign: "center", fontWeight: "bold", color: "#dc2626" }}>{weaknessScores.choleric}</td>
                <td style={{ textAlign: "center", fontWeight: "bold", color: "#dc2626" }}>
                  {weaknessScores.melancholy}
                </td>
                <td style={{ textAlign: "center", fontWeight: "bold", color: "#dc2626" }}>
                  {weaknessScores.phlegmatic}
                </td>
              </tr>
              <tr style={{ backgroundColor: "#fde68a" }}>
                <td style={{ backgroundColor: "#fbbf24", fontWeight: "bold" }}>Score Total</td>
                <td style={{ textAlign: "center", fontWeight: "bold", color: "#7c3aed" }}>{scores.sanguine}</td>
                <td style={{ textAlign: "center", fontWeight: "bold", color: "#7c3aed" }}>{scores.choleric}</td>
                <td style={{ textAlign: "center", fontWeight: "bold", color: "#7c3aed" }}>{scores.melancholy}</td>
                <td style={{ textAlign: "center", fontWeight: "bold", color: "#7c3aed" }}>{scores.phlegmatic}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Page 3: Personality Info */}
        <div className="print-page print-info">
          <h1>Personality Types Information</h1>
          <div className="personality-grid">
            {personalityDetails.map((detail) => (
              <div key={detail.key} className="personality-card">
                <div className="personality-header" style={{ backgroundColor: detail.color }}>
                  <div>{detail.title}</div>
                  <div style={{ fontSize: "9px", opacity: 0.9 }}>{detail.subtitle}</div>
                </div>
                <div className="personality-content">
                  <div className="section-title">STRENGTHS</div>
                  {detail.sections.strengths.slice(0, 6).map((item, idx) => (
                    <div key={idx} className="trait-item">
                      • {item}
                    </div>
                  ))}

                  <div className="section-title">EMOTIONS</div>
                  {detail.sections.emotions.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="trait-item">
                      • {item}
                    </div>
                  ))}

                  <div className="section-title">AT WORK</div>
                  {detail.sections.atWork.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="trait-item">
                      • {item}
                    </div>
                  ))}

                  <div className="section-title">AS FRIEND</div>
                  {detail.sections.asFriend.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="trait-item">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
