"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
  sanguine: "#3B82F6",
  choleric: "#EF4444",
  melancholy: "#22C55E",
  phlegmatic: "#A855F7",
}

const temperamentNames = {
  sanguine: "Popular Sanguine",
  choleric: "Powerful Choleric",
  melancholy: "Perfect Melancholy",
  phlegmatic: "Peaceful Phlegmatic",
}

const personalityDetails = [
  {
    key: "sanguine",
    title: "Popular Sanguine",
    subtitle: "Extrovert • Talker • Optimist",
    color: "#3B82F6",
    sections: {
      strengths: ["Appealing personality", "Talkative, storyteller", "Life of the party", "Good sense of humor"],
      emotions: ["Makes home fun", "Is liked by children's friends", "Turns disaster into humor"],
      atWork: ["Thinks up new activities", "Looks great on surface", "Creative and colorful"],
      asParent: ["Makes friends easily", "Loves people", "Thrives on compliments"],
      asFriend: ["Makes friends easily", "Loves people", "Thrives on compliments"],
    },
  },
  {
    key: "choleric",
    title: "Powerful Choleric",
    subtitle: "Extrovert • Doer • Optimist",
    color: "#EF4444",
    sections: {
      strengths: ["Born leader", "Dynamic and active", "Compulsive need for change"],
      emotions: ["Exerts sound leadership", "Establishes goals", "Motivates family to action"],
      atWork: ["Goal oriented", "Sees the whole picture", "Organizes well"],
      asParent: ["Exerts sound leadership", "Establishes goals", "Motivates family to action"],
      asFriend: ["Has little need for friends", "Will work for group activity", "Will lead and organize"],
    },
  },
  {
    key: "melancholy",
    title: "Perfect Melancholy",
    subtitle: "Introvert • Thinker • Pessimist",
    color: "#22C55E",
    sections: {
      strengths: ["Deep and thoughtful", "Analytical", "Serious and purposeful"],
      emotions: ["Sets high standards", "Wants everything done right", "Keeps home in good order"],
      atWork: ["Schedule oriented", "Perfectionist, high standards", "Detail conscious"],
      asParent: ["Sets high standards", "Wants everything done right", "Keeps home in good order"],
      asFriend: ["Makes friends cautiously", "Content to stay in background", "Avoids causing attention"],
    },
  },
  {
    key: "phlegmatic",
    title: "Peaceful Phlegmatic",
    subtitle: "Introvert • Watcher • Pessimist",
    color: "#A855F7",
    sections: {
      strengths: ["Low-key personality", "Easygoing and relaxed", "Calm, cool and collected"],
      emotions: ["Makes good parent", "Takes time for children", "Is not in a hurry"],
      atWork: ["Competent and steady", "Peaceful and agreeable", "Has administrative ability"],
      asParent: ["Makes good parent", "Takes time for children", "Is not in a hurry"],
      asFriend: ["Easy to get along with", "Pleasant and enjoyable", "Inoffensive"],
    },
  },
]

const WelcomeScreen = ({ onStartAssessment }: { onStartAssessment: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 backdrop-blur-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 25%, rgba(51, 65, 85, 0.9) 50%, rgba(30, 64, 175, 0.9) 75%, rgba(59, 130, 246, 0.9) 100%)",
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative max-w-2xl w-full backdrop-blur-2xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 sm:p-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Welcome to Personality Profile!</h1>
        <div className="text-white/90 text-base sm:text-lg leading-relaxed mb-8 space-y-4">
          <p>
            Discover your unique blend of personality traits and how they influence your emotions, relationships, and
            daily life.
          </p>
          <p>
            This app features a practical, easy-to-use personality test based on the classic four temperament types.
          </p>
        </div>
        <button
          onClick={onStartAssessment}
          className="w-full sm:w-auto px-12 py-4 rounded-2xl font-semibold text-lg text-white backdrop-blur-xl bg-gradient-to-r from-blue-500/60 to-purple-500/60 hover:from-blue-600/80 hover:to-purple-600/80 shadow-2xl transition-all duration-300 border border-white/30"
        >
          Start Assessment
        </button>
      </div>
    </div>
  )
}

const PersonalityDetailsPage = () => {
  const [currentPersonality, setCurrentPersonality] = useState(0)
  const currentDetail = personalityDetails[currentPersonality]

  return (
    <div className="w-full px-2 sm:px-4 relative">
      <div className="flex justify-center space-x-2 mb-4 sm:mb-6 relative z-10">
        {personalityDetails.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPersonality(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 ${
              currentPersonality === index ? "bg-white/90 shadow-lg" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mb-3 sm:mb-4 relative z-10">
        <button
          onClick={() => setCurrentPersonality(Math.max(0, currentPersonality - 1))}
          disabled={currentPersonality === 0}
          className={`p-3 rounded-full backdrop-blur-xl border border-white/30 transition-all duration-300 ${
            currentPersonality === 0 ? "text-white/40 bg-white/10" : "text-white/80 bg-white/20 hover:bg-white/30"
          }`}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <h2 className="text-lg sm:text-2xl font-bold text-white">{currentDetail.title}</h2>

        <button
          onClick={() => setCurrentPersonality(Math.min(personalityDetails.length - 1, currentPersonality + 1))}
          disabled={currentPersonality === personalityDetails.length - 1}
          className={`p-3 rounded-full backdrop-blur-xl border border-white/30 transition-all duration-300 ${
            currentPersonality === personalityDetails.length - 1
              ? "text-white/40 bg-white/10"
              : "text-white/80 bg-white/20 hover:bg-white/30"
          }`}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <Card className="w-full mx-auto backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl">
        <CardHeader
          className="text-white text-center py-4 sm:py-6"
          style={{ background: `linear-gradient(135deg, ${currentDetail.color}E6, ${currentDetail.color}CC)` }}
        >
          <CardTitle className="text-lg sm:text-2xl">{currentDetail.title}</CardTitle>
          <p className="text-sm sm:text-lg opacity-90">{currentDetail.subtitle}</p>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 backdrop-blur-sm bg-white/5">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {Object.entries(currentDetail.sections).map(([sectionKey, items]) => (
              <div
                key={sectionKey}
                className="backdrop-blur-sm bg-white/10 rounded-xl p-3 sm:p-4 border border-white/20"
              >
                <h4 className="font-bold text-sm sm:text-base mb-2 text-white uppercase">
                  {sectionKey.replace(/([A-Z])/g, " $1").trim()}
                </h4>
                <div className="space-y-1 sm:space-y-1.5">
                  {items.map((item: string, idx: number) => (
                    <div key={idx} className="text-[10px] sm:text-xs text-white/90 flex items-start">
                      <span
                        className="w-2 h-2 rounded-full mr-2 mt-1 flex-shrink-0"
                        style={{ backgroundColor: currentDetail.color }}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const RadarChart = ({ data, title, isTotal = false }: { data: any; title: string; isTotal?: boolean }) => {
  const temperaments = Object.keys(data)
  const values = Object.values(data) as number[]
  const maxValue = Math.max(...values, 10)

  const highestScoreTemperament = temperaments.reduce((prev, current) => (data[current] > data[prev] ? current : prev))
  const dominantColor = temperamentColors[highestScoreTemperament as keyof typeof temperamentColors]

  const getPoint = (value: number, index: number) => {
    const angles = [-90, 0, 90, 180]
    const angle = angles[index] * (Math.PI / 180)
    const radius = (value / maxValue) * 80
    const centerX = 100
    const centerY = 100
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  }

  const orderedData = [
    { key: "melancholy", value: data.melancholy },
    { key: "choleric", value: data.choleric },
    { key: "sanguine", value: data.sanguine },
    { key: "phlegmatic", value: data.phlegmatic },
  ]

  const points = orderedData.map((item, index) => getPoint(item.value, index))
  const pathData = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"

  return (
    <div
      className={`p-4 sm:p-6 rounded-2xl shadow-2xl mb-6 sm:mb-8 mx-2 sm:mx-0 backdrop-blur-xl border ${
        isTotal
          ? "bg-gradient-to-br from-purple-600/40 via-blue-600/40 to-indigo-600/40 border-purple-400/50 transform scale-105"
          : "bg-white/10 border-white/20"
      }`}
    >
      <h3
        className={`${isTotal ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"} font-bold text-center mb-6 sm:mb-8 text-white`}
      >
        {title}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
        <div className="flex flex-col items-center">
          <div className="backdrop-blur-sm bg-white/10 rounded-full px-3 py-1 border border-white/20 shadow-lg mb-3">
            <h4 className="text-sm sm:text-base font-semibold text-white">Radar View</h4>
          </div>
          <div className="relative flex justify-center px-12 py-8">
            <svg width="240" height="240" viewBox="0 0 200 200" className="mb-4 sm:w-[270px] sm:h-[270px]">
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, i) => {
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
                  />
                )
              })}

              <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />

              <path
                d={pathData}
                fill={isTotal ? `${dominantColor}80` : `${dominantColor}40`}
                stroke={dominantColor}
                strokeWidth={isTotal ? "6" : "3"}
              />

              {points.map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r={isTotal ? "7" : "5"}
                  fill={temperamentColors[orderedData[index].key as keyof typeof temperamentColors]}
                  stroke="white"
                  strokeWidth={isTotal ? "3" : "2"}
                />
              ))}
            </svg>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="backdrop-blur-sm bg-white/10 rounded-full px-3 py-1 border border-white/20 shadow-lg mb-3">
            <h4 className="text-sm sm:text-base font-semibold text-white">Bar Chart View</h4>
          </div>
          <div className="w-full max-w-xs sm:max-w-sm flex justify-center">
            <svg width="100%" height="250" viewBox="0 0 280 250" className="mb-4 sm:h-[300px]">
              {[0, 5, 10, 15, 20].map((value, i) => (
                <g key={i}>
                  <line
                    x1="35"
                    y1={220 - (value / 20) * 180}
                    x2="260"
                    y2={220 - (value / 20) * 180}
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="1"
                  />
                  <text
                    x="30"
                    y={225 - (value / 20) * 180}
                    textAnchor="end"
                    fontSize="10"
                    fill="rgba(255, 255, 255, 0.8)"
                  >
                    {value}
                  </text>
                </g>
              ))}

              {Object.entries(data).map(([temperament, score], index) => {
                const barWidth = 35
                const barHeight = (Number(score) / Math.max(20, maxValue)) * 180
                const x = 50 + index * 50
                const y = 220 - barHeight
                const color = temperamentColors[temperament as keyof typeof temperamentColors]

                return (
                  <g key={temperament}>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      fill={color}
                      rx="4"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="2"
                    />
                    <text
                      x={x + barWidth / 2}
                      y={y - 8}
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="bold"
                      fill="white"
                    >
                      {score}
                    </text>
                    <text
                      x={x + barWidth / 2}
                      y={240}
                      textAnchor="middle"
                      fontSize="8"
                      fill="rgba(255, 255, 255, 0.9)"
                      transform={`rotate(-45, ${x + barWidth / 2}, 240)`}
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

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
        {Object.entries(data).map(([temperament, score]) => (
          <div key={temperament} className="backdrop-blur-sm bg-white/10 rounded-xl px-3 py-2 border border-white/20">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: temperamentColors[temperament as keyof typeof temperamentColors] }}
              />
              <div className="flex flex-col">
                <div className="text-[8px] sm:text-[10px] font-medium leading-tight text-white/90">
                  {temperamentNames[temperament as keyof typeof temperamentNames]}
                </div>
                <div className="text-xs sm:text-sm font-bold text-center text-white">{score}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PersonalityPlusApp() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [currentPage, setCurrentPage] = useState(2)
  const [selections, setSelections] = useState<{ [key: number]: string }>({})
  const [savedData, setSavedData] = useState<any>(null)
  const [showSavePopup, setShowSavePopup] = useState(false)
  const [personName, setPersonName] = useState("")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleStartAssessment = () => {
    setShowWelcome(false)
    setCurrentPage(2)
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

  const handlePrint = async () => {
    setIsGeneratingPDF(true)
    try {
      const { jsPDF } = await import("jspdf")
      const pdf = new jsPDF("p", "mm", "a4")

      // Simple text-based PDF for now
      pdf.text("Personality Assessment Results", 20, 20)
      pdf.text(`Sanguine: ${calculateScores().sanguine}`, 20, 40)
      pdf.text(`Choleric: ${calculateScores().choleric}`, 20, 50)
      pdf.text(`Melancholy: ${calculateScores().melancholy}`, 20, 60)
      pdf.text(`Phlegmatic: ${calculateScores().phlegmatic}`, 20, 70)

      const fileName = savedData ? `${savedData.name}_Personality_Report.pdf` : "Personality_Assessment_Report.pdf"
      pdf.save(fileName)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const scores = calculateScores()
  const strengthScores = getStrengthsScore()
  const weaknessScores = getWeaknessesScore()

  if (showWelcome) {
    return <WelcomeScreen onStartAssessment={handleStartAssessment} />
  }

  return (
    <div
      className="min-h-screen overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e40af 75%, #3b82f6 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
      }}
    >
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
        input[type="radio"] {
          appearance: none;
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
      `}</style>

      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-3">
        {[1, 2, 3].map((page) => (
          <div
            key={page}
            className={`w-4 h-4 rounded-full transition-all duration-300 backdrop-blur-xl border border-white/30 ${
              currentPage === page ? "bg-white/90 shadow-2xl" : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      <div className="fixed top-4 right-4 z-50 flex space-x-3">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-3 backdrop-blur-xl bg-white/20 rounded-full shadow-2xl border border-white/30 hover:bg-white/30 hover:scale-110 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        )}
        {currentPage < 3 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-3 backdrop-blur-xl bg-white/20 rounded-full shadow-2xl border border-white/30 hover:bg-white/30 hover:scale-110 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5 text-white" />
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

        {/* Page 2 - Assessment */}
        <div className="w-full flex-shrink-0 p-2 sm:p-4 overflow-y-auto relative">
          <div className="max-w-5xl mx-auto pt-12 sm:pt-16">
            <div className="backdrop-blur-xl bg-gray-800/80 text-white text-center py-3 sm:py-4 mb-0 rounded-t-2xl border border-white/20 shadow-2xl">
              <h1 className="text-lg sm:text-xl font-bold">Personality Scoring Sheet</h1>
              <p className="text-xs sm:text-sm mt-1 opacity-90">Pick the word that best describes you in each row</p>
            </div>

            <div
              className="grid border-b-2 border-white/30 backdrop-blur-sm"
              style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}
            >
              <div className="backdrop-blur-xl bg-white/20 border border-white/30 p-1 sm:p-2 text-center font-bold text-[8px] sm:text-sm"></div>
              {Object.entries(temperamentNames).map(([key, name]) => (
                <div
                  key={key}
                  className="text-white border border-white/30 p-1 sm:p-2 text-center font-bold text-[8px] sm:text-xs backdrop-blur-xl"
                  style={{ backgroundColor: `${temperamentColors[key as keyof typeof temperamentColors]}CC` }}
                >
                  {name}
                </div>
              ))}
            </div>

            <div className="backdrop-blur-xl bg-blue-400/80 border border-white/30 p-1 sm:p-2 text-center font-bold text-xs sm:text-sm text-white">
              Strengths
            </div>

            <div className="border border-white/30 backdrop-blur-sm bg-white/5 shadow-xl rounded-b-lg overflow-hidden">
              {personalityData.slice(0, 20).map((row, index) => (
                <div
                  key={index}
                  className="grid border-b border-white/20 hover:bg-white/10 transition-all duration-200"
                  style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}
                >
                  <div className="backdrop-blur-sm bg-white/20 border-r border-white/20 p-1 sm:p-2 text-center font-bold text-[6px] sm:text-sm flex items-center justify-center text-white">
                    {index + 1}
                  </div>
                  {Object.entries(row).map(([temperament, trait]) => (
                    <div
                      key={temperament}
                      className="border-r border-white/20 px-0.5 py-1.5 sm:p-2 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-200"
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
                        <span className="flex-1 leading-tight break-words font-bold text-white">{trait}</span>
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="backdrop-blur-xl bg-white/10 border border-white/30 p-4 sm:p-6 shadow-2xl rounded-2xl my-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm sm:text-base font-semibold text-white">Progress</span>
                <span className="text-sm sm:text-base font-semibold text-white">
                  {Object.keys(selections).length}/40 completed
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 sm:h-4 backdrop-blur-sm border border-white/30">
                <div
                  className="h-3 sm:h-4 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${(Object.keys(selections).length / 40) * 100}%`,
                    background: "linear-gradient(90deg, #3B82F6, #22C55E, #EF4444, #A855F7)",
                  }}
                />
              </div>
            </div>

            <div className="backdrop-blur-xl bg-yellow-400/80 border border-white/30 p-1 sm:p-2 text-center font-bold text-xs sm:text-sm text-white">
              Weaknesses
            </div>

            <div className="border border-white/30 backdrop-blur-sm bg-white/5 shadow-xl rounded-b-lg overflow-hidden">
              {personalityData.slice(20, 40).map((row, index) => (
                <div
                  key={index + 20}
                  className="grid border-b border-white/20 hover:bg-white/10 transition-all duration-200"
                  style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}
                >
                  <div className="backdrop-blur-sm bg-white/20 border-r border-white/20 p-1 sm:p-2 text-center font-bold text-[6px] sm:text-sm flex items-center justify-center text-white">
                    {index + 21}
                  </div>
                  {Object.entries(row).map(([temperament, trait]) => (
                    <div
                      key={temperament}
                      className="border-r border-white/20 px-0.5 py-1.5 sm:p-2 backdrop-blur-sm bg-yellow-200/20 hover:bg-yellow-200/30 transition-all duration-200"
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
                        <span className="flex-1 leading-tight break-words font-bold text-white">{trait}</span>
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-6 border border-white/30 backdrop-blur-xl bg-white/10 shadow-2xl rounded-2xl overflow-hidden">
              <div
                className="grid border-b border-white/20"
                style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}
              >
                <div className="backdrop-blur-xl bg-yellow-300/80 border-r border-white/20 p-1 sm:p-2 text-center font-bold text-[6px] sm:text-xs leading-tight text-white">
                  Score
                  <br />
                  Strengths
                </div>
                {Object.entries(temperamentNames).map(([key, name]) => (
                  <div
                    key={key}
                    className="backdrop-blur-sm bg-yellow-200/20 border-r border-white/20 p-1 sm:p-2 text-center"
                  >
                    <div className="text-base sm:text-lg font-bold text-blue-200">
                      {strengthScores[key as keyof typeof strengthScores]}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="grid border-b border-white/20"
                style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}
              >
                <div className="backdrop-blur-xl bg-yellow-300/80 border-r border-white/20 p-1 sm:p-2 text-center font-bold text-[6px] sm:text-xs leading-tight text-white">
                  Score
                  <br />
                  Weakness
                </div>
                {Object.entries(temperamentNames).map(([key, name]) => (
                  <div
                    key={key}
                    className="backdrop-blur-sm bg-yellow-200/20 border-r border-white/20 p-1 sm:p-2 text-center"
                  >
                    <div className="text-base sm:text-lg font-bold text-red-300">
                      {weaknessScores[key as keyof typeof weaknessScores]}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid" style={{ gridTemplateColumns: "35px 0.9fr 0.9fr 0.9fr 0.9fr" }}>
                <div className="backdrop-blur-xl bg-yellow-400/80 border-r border-white/20 p-1 sm:p-2 text-center font-bold text-[6px] sm:text-xs leading-tight text-white">
                  Score
                  <br />
                  Total
                </div>
                {Object.entries(temperamentNames).map(([key, name]) => (
                  <div
                    key={key}
                    className="backdrop-blur-sm bg-yellow-300/20 border-r border-white/20 p-1 sm:p-2 text-center"
                  >
                    <div className="text-base sm:text-lg font-bold text-purple-200">
                      {scores[key as keyof typeof scores]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {showSavePopup && (
              <div className="mt-6 p-6 backdrop-blur-2xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 mx-auto max-w-sm">
                <h3 className="text-lg font-bold text-center mb-3 text-white">Save Assessment Results</h3>
                <p className="text-white/80 text-center mb-4 text-sm">Enter your name to save the assessment results</p>
                <input
                  type="text"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full p-3 backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl mb-4 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowSavePopup(false)
                      setPersonName("")
                    }}
                    className="flex-1 h-12 backdrop-blur-xl bg-gray-500/60 text-white rounded-2xl hover:bg-gray-500/80 transition-all duration-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmSave}
                    disabled={!personName.trim()}
                    className={`flex-1 h-12 rounded-2xl transition-all duration-300 font-semibold ${
                      personName.trim()
                        ? "backdrop-blur-xl bg-green-500/60 text-white hover:bg-green-500/80"
                        : "backdrop-blur-xl bg-gray-400/40 text-white/60 cursor-not-allowed opacity-60"
                    }`}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-center gap-6">
              <button
                onClick={handleSaveResults}
                disabled={savedData !== null}
                className={`w-48 h-14 rounded-3xl font-semibold text-white transition-all duration-300 backdrop-blur-2xl border border-white/30 ${
                  savedData === null
                    ? "bg-green-500/60 hover:bg-green-500/80 hover:scale-105"
                    : "bg-gray-400/40 cursor-not-allowed opacity-60"
                }`}
              >
                Save Results
              </button>
              <button
                onClick={handleRefresh}
                className="w-48 h-14 rounded-3xl font-semibold text-white backdrop-blur-2xl bg-red-500/60 hover:bg-red-500/80 transition-all duration-300 border border-white/30 hover:scale-105"
              >
                Refresh
              </button>
            </div>

            {savedData && (
              <div className="mt-6 p-6 backdrop-blur-2xl bg-green-500/20 border border-green-400/30 rounded-3xl text-center shadow-2xl">
                <p className="text-white font-semibold">
                  ✅ Results saved for: <span className="font-bold">{savedData.name}</span>
                </p>
                <p className="text-white/80 text-sm">Saved on: {savedData.date}</p>
              </div>
            )}
          </div>
        </div>

        {/* Page 3 - Charts */}
        <div className="w-full flex-shrink-0 p-2 sm:p-4 overflow-y-auto">
          <div className="max-w-2xl mx-auto pt-12 sm:pt-16">
            <RadarChart data={strengthScores} title="Personality Profile Strengths" />
            <RadarChart data={weaknessScores} title="Personality Profile Weaknesses" />

            <div className="text-center mb-6 sm:mb-8 px-2">
              <div className="inline-block backdrop-blur-2xl bg-gradient-to-r from-purple-500/60 to-blue-500/60 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl border border-white/30">
                <span className="text-sm sm:text-lg font-bold">🎯 YOUR COMPLETE PERSONALITY PROFILE</span>
              </div>
            </div>

            <RadarChart data={scores} title="Total Personality Profile" isTotal={true} />

            <div className="flex justify-center mt-10 mb-8">
              <button
                onClick={handlePrint}
                disabled={isGeneratingPDF}
                className={`w-56 h-16 rounded-3xl font-semibold text-white shadow-2xl transition-all duration-300 backdrop-blur-2xl border border-white/30 hover:scale-105 ${
                  isGeneratingPDF
                    ? "bg-gray-500/60 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500/60 to-blue-500/60 hover:from-purple-600/80 hover:to-blue-600/80"
                }`}
              >
                <span className="flex items-center justify-center gap-3 text-lg">
                  {isGeneratingPDF ? "Generating PDF..." : "Print Report"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
