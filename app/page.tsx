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
      className="w-full px-2 sm:px-4"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation indicators */}
      <div className="flex justify-center space-x-2 mb-4 sm:mb-6">
        {personalityDetails.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPersonality(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentPersonality === index ? "bg-gray-800" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <button
          onClick={() => setCurrentPersonality(Math.max(0, currentPersonality - 1))}
          disabled={currentPersonality === 0}
          className={`p-2 rounded-full ${
            currentPersonality === 0 ? "text-gray-300" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <h2 className="text-lg sm:text-2xl font-bold text-center px-2" style={{ color: currentDetail.color }}>
          {currentDetail.title}
        </h2>

        <button
          onClick={() => setCurrentPersonality(Math.min(personalityDetails.length - 1, currentPersonality + 1))}
          disabled={currentPersonality === personalityDetails.length - 1}
          className={`p-2 rounded-full ${
            currentPersonality === personalityDetails.length - 1 ? "text-gray-300" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Content */}
      <Card className="w-full mx-auto">
        <CardHeader className={`text-white text-center py-3 sm:py-4 ${currentDetail.bgColor}`}>
          <CardTitle className="text-lg sm:text-2xl">{currentDetail.title}</CardTitle>
          <p className="text-sm sm:text-lg opacity-90">{currentDetail.subtitle}</p>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Strengths */}
            <div>
              <h4 className="font-bold text-sm sm:text-base mb-2 sm:mb-3 text-gray-800">STRENGTHS</h4>
              <div className="space-y-0.5 sm:space-y-1">
                {currentDetail.sections.strengths.map((strength, idx) => (
                  <div key={idx} className="text-[10px] sm:text-xs text-gray-700 flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mr-2 mt-0.5 sm:mt-1 flex-shrink-0"
                      style={{ backgroundColor: currentDetail.color }}
                    ></span>
                    {strength}
                  </div>
                ))}
              </div>
            </div>

            {/* Emotions */}
            <div>
              <h4 className="font-bold text-sm sm:text-base mb-2 sm:mb-3 text-gray-800">EMOTIONS</h4>
              <div className="space-y-0.5 sm:space-y-1">
                {currentDetail.sections.emotions.map((emotion, idx) => (
                  <div key={idx} className="text-[10px] sm:text-xs text-gray-700 flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mr-2 mt-0.5 sm:mt-1 flex-shrink-0"
                      style={{ backgroundColor: currentDetail.color }}
                    ></span>
                    {emotion}
                  </div>
                ))}
              </div>
            </div>

            {/* At Work */}
            <div>
              <h4 className="font-bold text-sm sm:text-base mb-2 sm:mb-3 text-gray-800">AT WORK</h4>
              <div className="space-y-0.5 sm:space-y-1">
                {currentDetail.sections.atWork.map((work, idx) => (
                  <div key={idx} className="text-[10px] sm:text-xs text-gray-700 flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mr-2 mt-0.5 sm:mt-1 flex-shrink-0"
                      style={{ backgroundColor: currentDetail.color }}
                    ></span>
                    {work}
                  </div>
                ))}
              </div>
            </div>

            {/* As Parent */}
            <div>
              <h4 className="font-bold text-sm sm:text-base mb-2 sm:mb-3 text-gray-800">AS PARENT</h4>
              <div className="space-y-0.5 sm:space-y-1">
                {currentDetail.sections.asParent.map((parent, idx) => (
                  <div key={idx} className="text-[10px] sm:text-xs text-gray-700 flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mr-2 mt-0.5 sm:mt-1 flex-shrink-0"
                      style={{ backgroundColor: currentDetail.color }}
                    ></span>
                    {parent}
                  </div>
                ))}
              </div>
            </div>

            {/* As Friend */}
            <div>
              <h4 className="font-bold text-sm sm:text-base mb-2 sm:mb-3 text-gray-800">AS FRIEND</h4>
              <div className="space-y-0.5 sm:space-y-1">
                {currentDetail.sections.asFriend.map((friend, idx) => (
                  <div key={idx} className="text-[10px] sm:text-xs text-gray-700 flex items-start">
                    <span
                      className="w-2 h-2 rounded-full mr-2 mt-0.5 sm:mt-1 flex-shrink-0"
                      style={{ backgroundColor: currentDetail.color }}
                    ></span>
                    {friend}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Swipe hint */}
      <div className="text-center mt-3 sm:mt-4 text-gray-500 text-xs sm:text-sm">
        Swipe left/right or use arrows to explore other personality types
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
        className={`p-3 sm:p-6 ${isTotal ? "bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 border-2 border-purple-300" : "bg-white"} rounded-lg shadow-lg mb-4 sm:mb-6 mx-2 sm:mx-0`}
      >
        <h3
          className={`${isTotal ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"} font-bold text-center mb-4 sm:mb-6 ${isTotal ? "text-purple-900 bg-white/70 py-2 px-4 rounded-lg shadow-sm" : "text-gray-800"}`}
        >
          {title}
        </h3>

        {/* Radar Chart and Bar Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-center">
          {/* Radar Chart */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm sm:text-base font-semibold mb-0.5 sm:mb-1 text-gray-700">Radar View</h4>
            <div className="relative flex justify-center px-12 py-8">
              <svg width="240" height="240" viewBox="0 0 200 200" className="mb-3 sm:mb-4 sm:w-[270px] sm:h-[270px]">
                {/* Grid lines */}
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
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                  )
                })}

                {/* Axis lines */}
                <line x1="100" y1="20" x2="100" y2="180" stroke="#d1d5db" strokeWidth="1" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="#d1d5db" strokeWidth="1" />

                {/* Data area - now uses dominant temperament color */}
                <path
                  d={pathData}
                  fill={isTotal ? `${dominantColor}40` : `${dominantColor}33`}
                  stroke={isTotal ? dominantColor : dominantColor}
                  strokeWidth={isTotal ? "3" : "2"}
                />

                {/* Data points */}
                {points.map((point, index) => (
                  <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill={temperamentColors[orderedData[index].key as keyof typeof temperamentColors]}
                    stroke="white"
                    strokeWidth="2"
                  />
                ))}
              </svg>

              {/* Labels positioned 40% closer to center */}
              <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className="text-[9px] font-semibold text-center px-1"
                  style={{ color: temperamentColors.melancholy }}
                >
                  <div className="text-[9px] leading-tight">Perfect</div>
                  <div className="text-[9px] leading-tight">Melancholy</div>
                  <span className="text-xs font-bold">{data.melancholy}</span>
                </div>
              </div>
              <div className="absolute right-[20%] top-1/2 transform translate-x-1/2 -translate-y-1/2">
                <div
                  className="text-[9px] font-semibold text-center px-1"
                  style={{ color: temperamentColors.choleric }}
                >
                  <div className="text-[9px] leading-tight">Powerful</div>
                  <div className="text-[9px] leading-tight">Choleric</div>
                  <span className="text-xs font-bold">{data.choleric}</span>
                </div>
              </div>
              <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <div
                  className="text-[9px] font-semibold text-center px-1"
                  style={{ color: temperamentColors.sanguine }}
                >
                  <div className="text-[9px] leading-tight">Popular</div>
                  <div className="text-[9px] leading-tight">Sanguine</div>
                  <span className="text-xs font-bold">{data.sanguine}</span>
                </div>
              </div>
              <div className="absolute left-[20%] top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className="text-[9px] font-semibold text-center px-1"
                  style={{ color: temperamentColors.phlegmatic }}
                >
                  <div className="text-[9px] leading-tight">Peaceful</div>
                  <div className="text-[9px] leading-tight">Phlegmatic</div>
                  <span className="text-xs font-bold">{data.phlegmatic}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Bar Chart */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm sm:text-base font-semibold mb-0.5 sm:mb-1 text-gray-700">Bar Chart View</h4>
            <div className="w-full max-w-xs sm:max-w-sm flex justify-center">
              <svg width="100%" height="250" viewBox="0 0 280 250" className="mb-3 sm:mb-4 sm:h-[300px]">
                {/* Grid lines */}
                {[0, 5, 10, 15, 20].map((value, i) => (
                  <g key={i}>
                    <line
                      x1="35"
                      y1={220 - (value / 20) * 180}
                      x2="260"
                      y2={220 - (value / 20) * 180}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                    <text x="30" y={225 - (value / 20) * 180} textAnchor="end" fontSize="10" fill="#6b7280">
                      {value}
                    </text>
                  </g>
                ))}

                {/* Bars */}
                {Object.entries(data).map(([temperament, score], index) => {
                  const barWidth = 35
                  const barHeight = (Number(score) / Math.max(20, maxValue)) * 180
                  const x = 50 + index * 50
                  const y = 220 - barHeight

                  return (
                    <g key={temperament}>
                      {/* Bar */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill={temperamentColors[temperament as keyof typeof temperamentColors]}
                        rx="2"
                        stroke={isTotal ? "#ffffff" : "none"}
                        strokeWidth={isTotal ? "2" : "0"}
                        filter={isTotal ? "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" : "none"}
                      />
                      {/* Score label on top of bar */}
                      <text
                        x={x + barWidth / 2}
                        y={y - 5}
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="bold"
                        fill={temperamentColors[temperament as keyof typeof temperamentColors]}
                      >
                        {score}
                      </text>
                      {/* Temperament label */}
                      <text
                        x={x + barWidth / 2}
                        y={235}
                        textAnchor="middle"
                        fontSize="8"
                        fill="#374151"
                        transform={`rotate(-45, ${x + barWidth / 2}, 235)`}
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

        {/* Combined Legend - All in one row */}
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-4 sm:mt-6 w-full mx-auto">
          {Object.entries(data).map(([temperament, score]) => (
            <div key={temperament} className="flex items-center space-x-1 min-w-0">
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: temperamentColors[temperament as keyof typeof temperamentColors] }}
              />
              <div className="flex flex-col min-w-0">
                <div className="text-[6px] sm:text-[8px] font-medium leading-tight truncate">
                  {temperamentNames[temperament as keyof typeof temperamentNames]}
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-center">{score}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div
      className="min-h-screen bg-gray-50 overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      ref={containerRef}
    >
      {/* Page Navigation Indicators */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2">
        {[1, 2, 3].map((page) => (
          <div
            key={page}
            className={`w-3 h-3 rounded-full transition-all ${currentPage === page ? "bg-blue-600" : "bg-gray-300"}`}
          />
        ))}
      </div>

      {/* Swipe Navigation Hints */}
      <div className="fixed top-4 right-4 z-50 flex space-x-2">
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)} className="p-2 bg-white rounded-full shadow-lg">
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {currentPage < 3 && (
          <button onClick={() => setCurrentPage(currentPage + 1)} className="p-2 bg-white rounded-full shadow-lg">
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div
        className="flex transition-transform duration-300 ease-in-out h-screen"
        style={{ transform: `translateX(-${(currentPage - 1) * 100}%)` }}
      >
        {/* Page 1 - Descriptions (moved to the left) */}
        <div className="w-full flex-shrink-0 p-2 sm:p-4 overflow-y-auto">
          <div className="max-w-4xl mx-auto pt-12 sm:pt-16">
            <PersonalityDetailsPage />
          </div>
        </div>

        {/* Page 2 - Home/Scoring Sheet (now in the middle) */}
        <div className="w-full flex-shrink-0 p-2 sm:p-4 overflow-y-auto">
          <div className="max-w-5xl mx-auto pt-12 sm:pt-16">
            {/* Header */}
            <div className="bg-gray-600 text-white text-center py-2 sm:py-3 mb-0">
              <h1 className="text-lg sm:text-xl font-bold">Personality Scoring Sheet</h1>
              <p className="text-xs sm:text-sm mt-1">Use (x) to mark your choice</p>
              <p className="text-xs sm:text-sm font-semibold text-red-300 mt-1">
                It is important to choose Only one decision that most describes you
              </p>
            </div>

            {/* Column Headers */}
            <style jsx global>{`
              .assessment-cell {
                word-break: break-word;
                hyphens: auto;
                overflow-wrap: break-word;
              }
            `}</style>
            <div
              className="grid border-b-2 border-gray-400"
              style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}
            >
              <div className="bg-gray-200 border border-gray-400 p-1 sm:p-2 text-center font-bold text-[8px] sm:text-sm"></div>
              <div
                className="text-white border border-gray-400 p-1 sm:p-2 text-center font-bold text-[8px] sm:text-xs"
                style={{ backgroundColor: temperamentColors.sanguine }}
              >
                Popular Sanguine
                <br />
                <span className="text-[7px] sm:text-xs font-normal hidden sm:inline">
                  Extrovert • Talker • Optimist
                </span>
              </div>
              <div
                className="text-white border border-gray-400 p-1 sm:p-2 text-center font-bold text-[8px] sm:text-xs"
                style={{ backgroundColor: temperamentColors.choleric }}
              >
                Powerful Choleric
                <br />
                <span className="text-[7px] sm:text-xs font-normal hidden sm:inline">Extrovert • Doer • Optimist</span>
              </div>
              <div
                className="text-white border border-gray-400 p-1 sm:p-2 text-center font-bold text-[8px] sm:text-xs"
                style={{ backgroundColor: temperamentColors.melancholy }}
              >
                Perfect Melancholy
                <br />
                <span className="text-[7px] sm:text-xs font-normal hidden sm:inline">
                  Introvert • Thinker • Pessimist
                </span>
              </div>
              <div
                className="text-white border border-gray-400 p-1 sm:p-2 text-center font-bold text-[8px] sm:text-xs"
                style={{ backgroundColor: temperamentColors.phlegmatic }}
              >
                Peaceful Phlegmatic
                <br />
                <span className="text-[7px] sm:text-xs font-normal hidden sm:inline">
                  Introvert • Watcher • Pessimist
                </span>
              </div>
            </div>

            {/* Strengths Section Header */}
            <div className="bg-blue-200 border border-gray-400 p-1 sm:p-2 text-center font-bold text-xs sm:text-sm">
              Strengths
            </div>

            {/* Strengths Rows (1-20) */}
            <div className="border border-gray-400">
              {personalityData.slice(0, 20).map((row, index) => (
                <div
                  key={index}
                  className="grid border-b border-gray-300"
                  style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}
                >
                  <div className="bg-gray-100 border-r border-gray-300 p-1 sm:p-2 text-center font-bold text-[6px] sm:text-sm flex items-center justify-center">
                    {index + 1}
                  </div>
                  {Object.entries(row).map(([temperament, trait]) => (
                    <div
                      key={temperament}
                      className="border-r border-gray-300 px-0.5 py-1.5 sm:p-2 bg-white assessment-cell"
                    >
                      <label className="flex items-start space-x-1 sm:space-x-2 cursor-pointer text-[8px] sm:text-xs leading-none">
                        <input
                          type="radio"
                          name={`row-${index}`}
                          value={temperament}
                          checked={selections[index] === temperament}
                          onChange={() => handleSelection(index, temperament)}
                          className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0 mt-0.5"
                        />
                        <span className="flex-1 leading-tight break-words hyphens-auto font-bold">{trait}</span>
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Progress Bar - moved to just above Weaknesses */}
            <div className="bg-white border-x border-gray-400 p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-semibold text-gray-700">Progress</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  {Object.keys(selections).length}/40 completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 sm:h-3 rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${(Object.keys(selections).length / 40) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-gray-600 text-center">
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
            <div className="bg-yellow-300 border border-gray-400 p-1 sm:p-2 text-center font-bold text-xs sm:text-sm">
              Weaknesses
            </div>

            {/* Weaknesses Rows (21-40) */}
            <div className="border border-gray-400">
              {personalityData.slice(20, 40).map((row, index) => (
                <div
                  key={index + 20}
                  className="grid border-b border-gray-300"
                  style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}
                >
                  <div className="bg-gray-100 border-r border-gray-300 p-1 sm:p-2 text-center font-bold text-[6px] sm:text-sm flex items-center justify-center">
                    {index + 21}
                  </div>
                  {Object.entries(row).map(([temperament, trait]) => (
                    <div
                      key={temperament}
                      className="border-r border-gray-300 px-0.5 py-1.5 sm:p-2 bg-yellow-50 assessment-cell"
                    >
                      <label className="flex items-start space-x-1 sm:space-x-2 cursor-pointer text-[8px] sm:text-xs leading-none">
                        <input
                          type="radio"
                          name={`row-${index + 20}`}
                          value={temperament}
                          checked={selections[index + 20] === temperament}
                          onChange={() => handleSelection(index + 20, temperament)}
                          className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0 mt-0.5"
                        />
                        <span className="flex-1 leading-tight break-words hyphens-auto font-bold">{trait}</span>
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Scoring Table */}
            <div className="mt-4 border border-gray-400">
              {/* Score Strengths Row */}
              <div
                className="grid border-b border-gray-300"
                style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}
              >
                <div className="bg-yellow-200 border-r border-gray-300 p-1 sm:p-2 text-center font-bold text-[6px] sm:text-xs leading-tight">
                  Score
                  <br />
                  Strengths
                </div>
                {Object.entries(temperamentNames).map(([key, name]) => (
                  <div key={key} className="bg-yellow-100 border-r border-gray-300 p-1 sm:p-2 text-center">
                    <div className="text-base sm:text-lg font-bold text-blue-800">
                      {strengthScores[key as keyof typeof strengthScores]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Score Weakness Row */}
              <div
                className="grid border-b border-gray-300"
                style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}
              >
                <div className="bg-yellow-200 border-r border-gray-300 p-1 sm:p-2 text-center font-bold text-[6px] sm:text-xs leading-tight">
                  Score
                  <br />
                  Weakness
                </div>
                {Object.entries(temperamentNames).map(([key, name]) => (
                  <div key={key} className="bg-yellow-100 border-r border-gray-300 p-1 sm:p-2 text-center">
                    <div className="text-base sm:text-lg font-bold text-red-800">
                      {weaknessScores[key as keyof typeof weaknessScores]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Score Total Row */}
              <div className="grid" style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}>
                <div className="bg-yellow-300 border-r border-gray-300 p-1 sm:p-2 text-center font-bold text-[6px] sm:text-xs leading-tight">
                  Score
                  <br />
                  Total
                </div>
                {Object.entries(temperamentNames).map(([key, name]) => (
                  <div key={key} className="bg-yellow-200 border-r border-gray-300 p-1 sm:p-2 text-center">
                    <div className="text-base sm:text-lg font-bold text-purple-800">
                      {scores[key as keyof typeof scores]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save and Refresh Buttons - Apple Liquid Glass Style */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={handleSaveResults}
                disabled={savedData !== null}
                className={`w-40 h-12 rounded-2xl font-semibold text-white transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg ${
                  savedData === null
                    ? "bg-gradient-to-br from-green-400/80 to-green-600/80 hover:from-green-500/90 hover:to-green-700/90 hover:shadow-xl hover:scale-105 active:scale-95"
                    : "bg-gradient-to-br from-gray-300/60 to-gray-500/60 cursor-not-allowed opacity-60"
                }`}
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <span className="flex items-center justify-center gap-2">Save Results</span>
              </button>
              <button
                onClick={handleRefresh}
                className="w-40 h-12 rounded-2xl font-semibold text-white bg-gradient-to-br from-red-400/80 to-red-600/80 hover:from-red-500/90 hover:to-red-700/90 shadow-lg transition-all duration-300 backdrop-blur-md border border-white/20 hover:shadow-xl hover:scale-105 active:scale-95"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <span className="flex items-center justify-center gap-2">Refresh</span>
              </button>
            </div>

            {/* Saved Data Display */}
            {savedData && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <p className="text-green-800 font-semibold">
                  ✅ Results saved for: <span className="font-bold">{savedData.name}</span>
                </p>
                <p className="text-green-600 text-sm">Saved on: {savedData.date}</p>
              </div>
            )}

            {/* Save Results Popup - 90% Transparent */}
            {showSavePopup && (
              <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 backdrop-blur-sm">
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 w-80 mx-4 shadow-2xl border border-white/20">
                  <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Save Assessment Results</h3>
                  <p className="text-gray-600 text-center mb-6">Enter your name to save the assessment results</p>
                  <input
                    type="text"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full p-4 border border-gray-200 rounded-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                    autoFocus
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowSavePopup(false)
                        setPersonName("")
                      }}
                      className="flex-1 h-12 bg-gradient-to-br from-gray-400/80 to-gray-600/80 text-white rounded-2xl hover:from-gray-500/90 hover:to-gray-700/90 transition-all duration-300 backdrop-blur-md border border-white/20 font-semibold hover:scale-105 active:scale-95"
                      style={{
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmSave}
                      disabled={!personName.trim()}
                      className={`flex-1 h-12 rounded-2xl transition-all duration-300 backdrop-blur-md border border-white/20 font-semibold hover:scale-105 active:scale-95 ${
                        personName.trim()
                          ? "bg-gradient-to-br from-green-400/80 to-green-600/80 text-white hover:from-green-500/90 hover:to-green-700/90"
                          : "bg-gradient-to-br from-gray-300/60 to-gray-500/60 text-gray-400 cursor-not-allowed opacity-60"
                      }`}
                      style={{
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Page 3 - Charts (moved to the right) */}
        <div className="w-full flex-shrink-0 p-2 sm:p-4 overflow-y-auto">
          <div className="max-w-2xl mx-auto pt-12 sm:pt-16">
            <RadarChart data={strengthScores} title="Personality Profile Strengths" />
            <RadarChart data={weaknessScores} title="Personality Profile Weaknesses" />
            {/* Special header for Total Profile */}
            <div className="text-center mb-3 sm:mb-4 px-2">
              <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 sm:px-6 py-2 rounded-full shadow-lg">
                <span className="text-sm sm:text-lg font-bold">🎯 YOUR COMPLETE PERSONALITY PROFILE</span>
              </div>
            </div>
            <RadarChart data={scores} title="Total Personality Profile" isTotal={true} />

            {/* Print Button */}
            <div className="flex justify-center mt-8 mb-6">
              <button
                onClick={handlePrint}
                className="w-48 h-14 rounded-2xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg transition-all duration-300 backdrop-blur-md border border-white/20 hover:shadow-xl hover:scale-105 active:scale-95"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <span className="flex items-center justify-center gap-2">Print Report</span>
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
